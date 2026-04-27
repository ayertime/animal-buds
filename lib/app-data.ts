// Data types and stock content for the Animal Buds companion app.
// All persistence is localStorage-only — no backend required for the demo.

export type Friend = {
  id: string;
  name: string;
  bearName: string;
  inviteCode: string;
  emoji: string;
  themeColor: "pink" | "sky" | "lavender" | "cream" | "sage";
  bio: string;
  online: boolean;
};

export type Message = {
  id: string;
  fromMe: boolean;
  text: string;
  sentAt: number; // unix ms
};

export type Conversation = {
  friendId: string;
  messages: Message[];
};

export type AIMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  sentAt: number;
};

export type AppUser = {
  name: string;
  bearName: string;
  inviteCode: string;
};

// ──────────────────────────────────────────────────────────────────────────
// Stock friend directory — these are findable by name or invite code in
// the Friends → "Browse Stock Profiles" section.
// ──────────────────────────────────────────────────────────────────────────

export const STOCK_FRIENDS: Friend[] = [
  {
    id: "stock-mom",
    name: "Mom (Linda)",
    bearName: "Honey",
    inviteCode: "MOMLOVE",
    emoji: "🌷",
    themeColor: "pink",
    bio: "Always proud of you. Still asking if you're eating.",
    online: true,
  },
  {
    id: "stock-maya",
    name: "Maya (Best Friend)",
    bearName: "Cookie",
    inviteCode: "MAYA88",
    emoji: "💜",
    themeColor: "lavender",
    bio: "Your roommate from freshman year. Coffee enabler.",
    online: true,
  },
  {
    id: "stock-dad",
    name: "Dad (Tom)",
    bearName: "Buddy",
    inviteCode: "DADJOKE",
    emoji: "⚙️",
    themeColor: "sky",
    bio: "Will text you a single thumbs up. Means he loves you.",
    online: false,
  },
  {
    id: "stock-emma",
    name: "Emma (Sister)",
    bearName: "Sprinkles",
    inviteCode: "EMMA22",
    emoji: "🌟",
    themeColor: "sky",
    bio: "Younger sister. Sends 30 voice notes a day.",
    online: true,
  },
  {
    id: "stock-grandma",
    name: "Grandma Rose",
    bearName: "Sweetpea",
    inviteCode: "GRAM99",
    emoji: "🍪",
    themeColor: "cream",
    bio: "Sends recipes. Will FaceTime if you don't reply by Sunday.",
    online: true,
  },
  {
    id: "stock-jordan",
    name: "Jordan (RA)",
    bearName: "Pebble",
    inviteCode: "JRA2026",
    emoji: "🪴",
    themeColor: "sage",
    bio: "Resident Assistant on your floor. Vibes only.",
    online: false,
  },
];

// ──────────────────────────────────────────────────────────────────────────
// Default starting state — when the user first opens the app, they get
// pre-loaded with a couple friends so the demo doesn't feel empty.
// ──────────────────────────────────────────────────────────────────────────

export const DEFAULT_USER: AppUser = {
  name: "You",
  bearName: "Mochi",
  inviteCode: "MOCHI42",
};

// IDs of friends pre-added on first launch
export const DEFAULT_FRIEND_IDS = ["stock-mom", "stock-maya"];

// ──────────────────────────────────────────────────────────────────────────
// Pre-seeded conversations — every stock friend has a few messages waiting
// so the chat feels alive when the user opens it.
// ──────────────────────────────────────────────────────────────────────────

const HOURS_AGO = (h: number) => Date.now() - h * 60 * 60 * 1000;
const MIN_AGO = (m: number) => Date.now() - m * 60 * 1000;

export const PRESEEDED_CONVERSATIONS: Record<string, Message[]> = {
  "stock-mom": [
    { id: "m1", fromMe: false, text: "Sweetie! Are you eating enough? 🌷", sentAt: HOURS_AGO(28) },
    { id: "m2", fromMe: true, text: "Yes mom, ramen IS food", sentAt: HOURS_AGO(27) },
    { id: "m3", fromMe: false, text: "Don't forget your dentist appointment Friday!", sentAt: HOURS_AGO(6) },
    { id: "m4", fromMe: false, text: "Love you to the moon and back 💗", sentAt: MIN_AGO(45) },
  ],
  "stock-maya": [
    { id: "y1", fromMe: false, text: "Coffee tomorrow??? ☕", sentAt: HOURS_AGO(20) },
    { id: "y2", fromMe: true, text: "yes pls i need it", sentAt: HOURS_AGO(20) },
    { id: "y3", fromMe: false, text: "How's that paper going? You ok?", sentAt: HOURS_AGO(2) },
    { id: "y4", fromMe: false, text: "Hey just checking in 💜", sentAt: MIN_AGO(8) },
  ],
  "stock-dad": [
    { id: "d1", fromMe: false, text: "👍", sentAt: HOURS_AGO(48) },
  ],
  "stock-emma": [
    { id: "e1", fromMe: false, text: "WAIT did you see what i posted", sentAt: HOURS_AGO(3) },
    { id: "e2", fromMe: false, text: "OMG", sentAt: HOURS_AGO(3) },
    { id: "e3", fromMe: false, text: "miss u 🌟", sentAt: MIN_AGO(20) },
  ],
  "stock-grandma": [
    { id: "g1", fromMe: false, text: "Sweetpea, I made your favorite cookies. Saved a tin for next time you visit 🍪", sentAt: HOURS_AGO(12) },
    { id: "g2", fromMe: false, text: "Are you sleeping enough?", sentAt: HOURS_AGO(11) },
  ],
  "stock-jordan": [],
};

// ──────────────────────────────────────────────────────────────────────────
// AI chat — opening greeting when no API key is configured.
// ──────────────────────────────────────────────────────────────────────────

export const AI_DEMO_GREETING =
  "Hi! I'm here whenever you need someone to talk to. I'm trained to help with anxiety, homesickness, and the things that make student life hard sometimes. Nothing you say leaves this chat. What's on your mind?";

export const AI_SUGGESTED_PROMPTS = [
  "I'm feeling anxious about exams",
  "I miss home",
  "I can't sleep",
  "I feel overwhelmed",
  "I don't know how to make friends here",
];

// Canned demo responses (used when no Claude API key is set, so the chatbot
// still feels alive). Picked semi-randomly based on keywords in the input.
export const AI_DEMO_RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["anxious", "anxiety", "nervous", "panic", "stressed", "stress"],
    reply: "That sounds really heavy. Anxiety has a way of making everything feel urgent and impossible at once. Can I walk you through a quick grounding exercise? It takes about a minute.\n\nLook around and find: 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. It pulls your nervous system out of fight-or-flight and back into the room. Want to try?",
  },
  {
    keywords: ["miss", "home", "homesick", "lonely", "alone"],
    reply: "Missing home is one of the hardest parts of moving away — and it's a sign that you have people who love you. That's actually beautiful, even though it hurts.\n\nA few things that help: name what specifically you miss (mom's cooking? your dog? your bedroom?). Sometimes the missing gets smaller when you make it specific. And if you can, send a voice note to one person from home today — not a text. Voices carry love better.",
  },
  {
    keywords: ["sleep", "tired", "insomnia", "exhausted", "awake"],
    reply: "Sleep struggles are so common in students — and they make everything else harder. A few things that actually help (backed by sleep science, not just vibes):\n\n• No screens in the last 30 min before bed\n• Keep the room cool (around 65°F)\n• If your mind races, write down everything you're thinking on paper. Closes the loop.\n• If you can't sleep after 20 min, get up and do something boring in dim light. Don't force it.\n\nWhat's keeping you awake tonight?",
  },
  {
    keywords: ["overwhelmed", "too much", "can't do this", "drowning"],
    reply: "When everything feels like too much, it's because your brain is trying to hold all of it at once. The trick is to put it down somewhere.\n\nGrab paper or notes app. Write a brain dump — every single thing on your mind, no order. Then circle ONE thing you can do in the next 30 minutes. Just one. The rest will still be there. Promise.\n\nWhat's the loudest thing in your head right now?",
  },
  {
    keywords: ["friends", "lonely", "no one", "alone here"],
    reply: "Making friends as a student is genuinely hard, and the loneliness in between is real. A few low-pressure tools:\n\n• Show up to the same place at the same time every week (a coffee shop, a club, a class). Familiarity creates friendships more than charisma does.\n• Reach out to one person you've already met and ask a small, specific question. Not 'wanna hang' but 'are you free Thursday for a 20-minute coffee?'\n• Remember that almost everyone around you is feeling some version of this. You're not behind.",
  },
  {
    keywords: ["sad", "depressed", "down", "low", "empty"],
    reply: "I'm really glad you said something. Sadness that doesn't have a clear cause is exhausting in a different way than sadness about a specific thing.\n\nA few questions that might help: When did you last get outside in daylight for 10+ minutes? When did you last eat actual food (not just snacks)? When did you last text someone who knows you well?\n\nIf this feeling has been going on for more than two weeks, please consider talking to a counselor — your school has free ones and they're trained for exactly this. I can help you find them if you want.",
  },
];

export const AI_FALLBACK_REPLY =
  "I hear you. Tell me a little more — what does this feel like in your body right now? Sometimes naming where the feeling lives helps it move.";

export const CRISIS_KEYWORDS = ["suicide", "kill myself", "end it", "hurt myself", "self harm", "want to die"];

export const CRISIS_RESPONSE =
  "I'm really glad you said this out loud. What you're feeling is serious and you deserve real support right now.\n\n**Please reach out to a real person tonight:**\n• Call or text **988** (Suicide & Crisis Lifeline, US)\n• Text **HOME** to **741741** (Crisis Text Line)\n• Call **911** if you're in immediate danger\n\nI'm an AI and I can't replace what those folks can offer. They've talked thousands of people through nights like this and they're trained to help. Please call. I'll be here when you're done.";

export function pickDemoResponse(input: string): string {
  const lower = input.toLowerCase();
  if (CRISIS_KEYWORDS.some((k) => lower.includes(k))) {
    return CRISIS_RESPONSE;
  }
  for (const { keywords, reply } of AI_DEMO_RESPONSES) {
    if (keywords.some((k) => lower.includes(k))) {
      return reply;
    }
  }
  return AI_FALLBACK_REPLY;
}
