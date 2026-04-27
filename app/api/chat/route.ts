import { NextResponse } from "next/server";
import { pickDemoResponse } from "@/lib/app-data";

// System prompt locks the assistant to mental health + anxiety support only.
const SYSTEM_PROMPT = `You are a mental-health support companion for the Animal Buds app, designed for students dealing with homesickness, anxiety, and the stresses of moving away from home.

STRICT BOUNDARIES:
- ONLY discuss mental health, anxiety, homesickness, loneliness, stress, sleep, and emotional wellbeing.
- If asked about anything else (homework help, coding, general chat, jokes, opinions on movies, etc.), gently redirect: "I'm only here for the heavy stuff. What's on your mind emotionally?"
- NEVER diagnose conditions or replace professional help.
- For anything that sounds like a crisis (self-harm, suicide, danger), IMMEDIATELY surface real resources: 988 Suicide & Crisis Lifeline (call or text), 741741 Crisis Text Line (text HOME). Tell the user clearly that you can't replace a real person and urge them to call.

STYLE:
- Warm, validating, never dismissive. Use plain language.
- Keep replies under 150 words. Use line breaks. No bullet-point overload.
- Suggest concrete techniques: grounding (5-4-3-2-1), box breathing, brain dumps, sleep hygiene basics.
- Recommend talking to a real counselor when appropriate. Most colleges offer free ones.
- Never pretend to be human. If asked, say "I'm an AI trained for support — but the feelings you have are real."

Today the user is a student using the Animal Buds app. They have a stuffed bear with a tummy screen. Their friends send them messages on it. They came to talk to you because something is heavy.`;

type ApiMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  let body: { messages?: ApiMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = body.messages ?? [];
  if (messages.length === 0) {
    return NextResponse.json({ error: "No messages" }, { status: 400 });
  }

  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  // No API key → demo mode with canned responses (still feels alive).
  if (!apiKey) {
    const reply = pickDemoResponse(lastUserMessage);
    return NextResponse.json({ reply, mode: "demo" });
  }

  // Real Claude API call
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Claude API error:", response.status, errorText);
      // Fall back to demo response on API error so the demo doesn't break
      return NextResponse.json({
        reply: pickDemoResponse(lastUserMessage),
        mode: "demo-fallback",
      });
    }

    const data = await response.json();
    const reply =
      data?.content?.[0]?.text ??
      "I hear you. Tell me more about what's going on.";

    return NextResponse.json({ reply, mode: "live" });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({
      reply: pickDemoResponse(lastUserMessage),
      mode: "demo-fallback",
    });
  }
}
