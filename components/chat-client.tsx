"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useApp } from "./app-context";
import { STOCK_FRIENDS } from "@/lib/app-data";

const AUTO_REPLIES = [
  "Aw, thanks for the message 💗",
  "I miss you too! When are you home next?",
  "Reading this in bed and smiling 🥺",
  "You're the best 🌟",
  "That made my whole day",
  "Tell me more!",
  "Sending you a big hug right now 🤗",
  "Yes!! Let's plan it",
];

type Props = { friendId: string };

export default function ChatClient({ friendId }: Props) {
  const { friends, getMessagesFor, sendMessage, receiveAutoReply, hydrated } = useApp();
  const [draft, setDraft] = useState("");
  const [theyTyping, setTheyTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const friend = friends.find((f) => f.id === friendId)
    || STOCK_FRIENDS.find((f) => f.id === friendId);

  const messages = getMessagesFor(friendId);
  const lastMessage = messages[messages.length - 1];
  const screenMessage =
    lastMessage?.fromMe ? lastMessage.text : (lastMessage?.text ?? `Hi from ${friend?.bearName ?? "your Bud"}!`);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  if (!hydrated) {
    return <div className="p-5 text-charcoal-300 text-sm">Loading…</div>;
  }

  if (!friend) {
    return (
      <div className="p-8 text-center">
        <p className="text-charcoal-500">Friend not found.</p>
        <Link
          href="/messages"
          className="mt-4 inline-block text-sage-600 underline underline-offset-4"
        >
          ← Back to messages
        </Link>
      </div>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    sendMessage(friendId, text);
    setDraft("");

    // Simulate friend typing + auto-reply for the demo
    setTimeout(() => setTheyTyping(true), 600);
    setTimeout(() => {
      setTheyTyping(false);
      receiveAutoReply(
        friendId,
        AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)]
      );
    }, 1800);
  };

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 56px - 80px)" }}>
      {/* Friend header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-cream-200">
        <Link
          href="/messages"
          aria-label="Back"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream-100"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-charcoal-700 truncate">{friend.name}</p>
          <p className="text-xs text-charcoal-300">
            {friend.online ? "● Online" : "Offline"} · Bear: {friend.bearName}
          </p>
        </div>
      </div>

      {/* Bear preview with current screen message */}
      <div className="px-4 pt-4 pb-2">
        <BearWithScreen message={screenMessage} bearName={friend.bearName} />
      </div>

      {/* Message thread */}
      <div ref={messagesRef} className="flex-1 px-4 py-3 space-y-2 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-center text-sm text-charcoal-300 italic py-8">
            No messages yet. Send the first note 💌
          </p>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-sm leading-snug shadow-sm ${
                  m.fromMe
                    ? "bg-sage-500 text-white rounded-br-md"
                    : "bg-white border border-cream-200 text-charcoal-700 rounded-bl-md"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))
        )}
        {theyTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-cream-200 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
              <Dot delay={0} />
              <Dot delay={150} />
              <Dot delay={300} />
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={handleSend}
        className="sticky bottom-0 bg-white border-t border-cream-200 px-3 py-2.5 flex items-center gap-2"
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Send ${friend.bearName} a message...`}
          className="flex-1 px-4 py-2.5 rounded-full bg-cream-100 border border-cream-200 focus:border-sage-300 focus:outline-none text-sm text-charcoal-700 placeholder:text-charcoal-300"
          maxLength={140}
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          aria-label="Send message"
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

function BearWithScreen({ message, bearName }: { message: string; bearName: string }) {
  return (
    <div className="relative w-full aspect-square max-w-[280px] mx-auto">
      <Image
        src="/images/bear-standing.png"
        alt={`${bearName} bear`}
        fill
        sizes="280px"
        className="object-contain"
      />
      {/* Live message overlay on tummy screen */}
      <div
        className="absolute pointer-events-none flex items-center justify-center"
        style={{
          top: "42%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "30%",
          height: "18%",
        }}
      >
        <div className="w-full h-full bg-mist-400 rounded-md shadow-md flex items-center justify-center px-2">
          <p
            className="text-white text-center font-bold leading-tight"
            style={{ fontSize: "clamp(8px, 2vw, 12px)" }}
          >
            {message.length > 50 ? message.slice(0, 47) + "…" : message}
          </p>
        </div>
      </div>
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
