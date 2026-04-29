"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "./app-context";
import { AI_SUGGESTED_PROMPTS } from "@/lib/app-data";

export default function AIChatClient() {
  const { aiMessages, sendAIMessage, receiveAIMessage, resetAIChat, hydrated } = useApp();
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [aiMessages.length, thinking]);

  if (!hydrated) {
    return <div className="p-5 text-charcoal-300 text-sm">Loading…</div>;
  }

  const sendUserMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    sendAIMessage(trimmed);
    setDraft("");
    setThinking(true);

    try {
      const apiMessages = [
        ...aiMessages.map((m) => ({ role: m.role, content: m.text })),
        { role: "user" as const, content: trimmed },
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });
      const data = await res.json();
      const reply = data.reply ?? "I'm here. Tell me a little more.";
      // Brief delay so it feels natural
      setTimeout(() => {
        receiveAIMessage(reply);
        setThinking(false);
      }, 500);
    } catch {
      receiveAIMessage("I'm having trouble connecting right now — but I'm still here. Try again?");
      setThinking(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendUserMessage(draft);
  };

  const showSuggestions = aiMessages.length <= 1; // only greeting so far

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 56px - 80px)" }}>
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-cream-200 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lavender-200 to-mist-200 flex items-center justify-center text-xl">
          🌱
        </div>
        <div className="flex-1">
          <p className="font-bold text-charcoal-700 text-sm">Mental Health Companion</p>
          <p className="text-[10px] text-charcoal-300">Powered by Claude · Private to you</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (confirm("Start a fresh conversation? Your previous chat will be cleared.")) {
              resetAIChat();
            }
          }}
          aria-label="New conversation"
          className="text-xs text-charcoal-300 hover:text-charcoal-700 underline underline-offset-4"
        >
          New chat
        </button>
      </div>

      {/* Disclaimer */}
      <div className="bg-cream-100 px-4 py-2.5 text-[11px] text-charcoal-500 border-b border-cream-200 leading-relaxed">
        💛 I&apos;m a companion, not a replacement for a therapist. For emergencies,
        call <strong>988</strong> (Suicide &amp; Crisis Lifeline) or seek in-person care.
        {" "}
        <a
          href="https://www.psychologytoday.com/us/therapists"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-sage-700 underline underline-offset-2 hover:text-sage-800"
        >
          Find a therapist near you →
        </a>
      </div>

      {/* Messages */}
      <div ref={messagesRef} className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
        {aiMessages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                m.role === "user"
                  ? "bg-sage-500 text-white rounded-br-md"
                  : "bg-white border border-cream-200 text-charcoal-700 rounded-bl-md"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex justify-start">
            <div className="bg-white border border-cream-200 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
              <Dot delay={0} />
              <Dot delay={150} />
              <Dot delay={300} />
            </div>
          </div>
        )}

        {showSuggestions && (
          <div className="pt-2 space-y-1.5">
            <p className="text-[11px] font-bold tracking-widest uppercase text-charcoal-300 px-1">
              Try saying
            </p>
            {AI_SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendUserMessage(prompt)}
                className="w-full text-left px-3 py-2 rounded-xl bg-white border border-cream-200 hover:border-sage-200 hover:bg-sage-50 text-sm text-charcoal-700 transition-colors"
              >
                💬 {prompt}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 bg-white border-t border-cream-200 px-3 py-2.5 flex items-center gap-2"
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What's on your mind?"
          disabled={thinking}
          className="flex-1 px-4 py-2.5 rounded-full bg-cream-100 border border-cream-200 focus:border-sage-300 focus:outline-none text-sm text-charcoal-700 placeholder:text-charcoal-300 disabled:opacity-60"
          maxLength={500}
        />
        <button
          type="submit"
          disabled={!draft.trim() || thinking}
          aria-label="Send"
          className="w-10 h-10 rounded-full bg-sage-500 text-white flex items-center justify-center hover:bg-sage-600 transition-colors disabled:opacity-40"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="w-1.5 h-1.5 bg-charcoal-300 rounded-full animate-bounce"
      style={{ animationDelay: `${delay}ms`, animationDuration: "1s" }}
    />
  );
}
