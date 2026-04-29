"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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

const MAX_RECORDING_SEC = 30;

type Props = { friendId: string };

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const blobToDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

export default function ChatClient({ friendId }: Props) {
  const { friends, getMessagesFor, sendMessage, sendVoiceMessage, receiveAutoReply, hydrated } = useApp();
  const [draft, setDraft] = useState("");
  const [theyTyping, setTheyTyping] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordingSec, setRecordingSec] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  // Recorder machinery — refs so callbacks read the latest values without
  // forcing re-renders or stale closures.
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingStartRef = useRef<number>(0);
  const cancelledRef = useRef(false);
  const durationTimerRef = useRef<number | null>(null);

  const friend = friends.find((f) => f.id === friendId)
    || STOCK_FRIENDS.find((f) => f.id === friendId);

  const messages = getMessagesFor(friendId);
  const lastMessage = messages[messages.length - 1];
  const screenMessage = lastMessage?.audio
    ? "🎤 Voice message"
    : (lastMessage?.text ?? `Hi from ${friend?.bearName ?? "your Bud"}!`);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const triggerAutoReply = useCallback(() => {
    setTimeout(() => setTheyTyping(true), 600);
    setTimeout(() => {
      setTheyTyping(false);
      receiveAutoReply(
        friendId,
        AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)]
      );
    }, 1800);
  }, [friendId, receiveAutoReply]);

  const stopRecording = useCallback((cancel: boolean) => {
    cancelledRef.current = cancel;
    if (durationTimerRef.current !== null) {
      window.clearInterval(durationTimerRef.current);
      durationTimerRef.current = null;
    }
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
  }, []);

  const startRecording = useCallback(async () => {
    setMicError(null);
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setMicError("Voice messages aren't supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      cancelledRef.current = false;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        // Always release the mic immediately so the browser tab indicator clears.
        audioStreamRef.current?.getTracks().forEach((t) => t.stop());
        audioStreamRef.current = null;
        setRecording(false);
        setRecordingSec(0);

        if (cancelledRef.current) return;

        const blob = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        if (blob.size === 0) return;

        const dataUrl = await blobToDataUrl(blob);
        const durationSec = Math.max(
          1,
          Math.round((Date.now() - recordingStartRef.current) / 1000)
        );
        sendVoiceMessage(friendId, { dataUrl, durationSec });
        triggerAutoReply();
      };

      mediaRecorderRef.current = recorder;
      recordingStartRef.current = Date.now();
      recorder.start();
      setRecording(true);
      setRecordingSec(0);

      durationTimerRef.current = window.setInterval(() => {
        const elapsed = Math.round((Date.now() - recordingStartRef.current) / 1000);
        setRecordingSec(elapsed);
        if (elapsed >= MAX_RECORDING_SEC) {
          stopRecording(false);
        }
      }, 250);
    } catch {
      setMicError(
        "Microphone access was blocked. Allow it in your browser to send voice messages."
      );
    }
  }, [friendId, sendVoiceMessage, stopRecording, triggerAutoReply]);

  // Cleanup if the user navigates away mid-recording.
  useEffect(() => {
    return () => {
      if (durationTimerRef.current !== null) {
        window.clearInterval(durationTimerRef.current);
      }
      const recorder = mediaRecorderRef.current;
      if (recorder && recorder.state !== "inactive") {
        cancelledRef.current = true;
        recorder.stop();
      }
      audioStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

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
    triggerAutoReply();
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
              {m.audio ? (
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl shadow-sm ${
                    m.fromMe
                      ? "bg-sage-500 rounded-br-md"
                      : "bg-white border border-cream-200 rounded-bl-md"
                  }`}
                >
                  <div className={`flex items-center gap-1.5 text-xs font-bold ${m.fromMe ? "text-white" : "text-charcoal-700"}`}>
                    <span aria-hidden="true">🎤</span>
                    <span>Voice message · {formatDuration(m.audio.durationSec)}</span>
                  </div>
                  <audio
                    src={m.audio.dataUrl}
                    controls
                    preload="metadata"
                    className="mt-1.5 w-full max-w-[220px] h-8"
                  />
                </div>
              ) : (
                <div
                  className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-sm leading-snug shadow-sm ${
                    m.fromMe
                      ? "bg-sage-500 text-white rounded-br-md"
                      : "bg-white border border-cream-200 text-charcoal-700 rounded-bl-md"
                  }`}
                >
                  {m.text}
                </div>
              )}
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
      <div className="sticky bottom-0 bg-white border-t border-cream-200">
        {micError && (
          <p role="alert" className="px-4 pt-2 text-xs text-red-600">
            {micError}
          </p>
        )}
        {recording ? (
          <div className="px-3 py-2.5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => stopRecording(true)}
              aria-label="Cancel recording"
              className="w-10 h-10 rounded-full bg-cream-100 text-charcoal-500 flex items-center justify-center hover:bg-cream-200 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="flex-1 px-4 py-2.5 rounded-full bg-red-50 border border-red-200 flex items-center gap-2">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-red-500 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-red-600" />
              </span>
              <span className="text-sm font-bold text-red-700 tabular-nums">
                Recording {formatDuration(recordingSec)}
              </span>
              <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-red-400">
                Max {MAX_RECORDING_SEC}s
              </span>
            </div>
            <button
              type="button"
              onClick={() => stopRecording(false)}
              aria-label="Stop and send voice message"
              className="w-10 h-10 rounded-full bg-sage-500 text-white flex items-center justify-center hover:bg-sage-600 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSend}
            className="px-3 py-2.5 flex items-center gap-2"
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
              type="button"
              onClick={startRecording}
              aria-label="Record voice message"
              className="w-10 h-10 rounded-full bg-cream-100 text-charcoal-500 flex items-center justify-center hover:bg-cream-200 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="22" />
              </svg>
            </button>
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
        )}
      </div>
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
