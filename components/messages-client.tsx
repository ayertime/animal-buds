"use client";

import Link from "next/link";
import { useApp } from "./app-context";
import FriendAvatar from "./friend-avatar";

export default function MessagesClient() {
  const { friends, getLastMessage, hydrated } = useApp();

  if (!hydrated) {
    return <div className="p-5 text-charcoal-300 text-sm">Loading…</div>;
  }

  // Sort friends by most recent message
  const sorted = [...friends].sort((a, b) => {
    const aLast = getLastMessage(a.id)?.sentAt ?? 0;
    const bLast = getLastMessage(b.id)?.sentAt ?? 0;
    return bLast - aLast;
  });

  return (
    <div>
      <div className="px-5 pt-6 pb-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal-700">
          Messages
        </h1>
        <p className="mt-1 text-sm text-charcoal-300">
          {friends.length === 0
            ? "Add a friend to start sending notes 💌"
            : `${friends.length} friend${friends.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {sorted.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="divide-y divide-cream-200 border-t border-cream-200">
          {sorted.map((friend) => {
            const last = getLastMessage(friend.id);
            return (
              <li key={friend.id}>
                <Link
                  href={`/messages/${friend.id}`}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-cream-100 transition-colors"
                >
                  <FriendAvatar friend={friend} size="md" showStatus />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="font-bold text-charcoal-700 truncate">
                        {friend.name}
                      </p>
                      {last && (
                        <span className="text-[10px] text-charcoal-300 shrink-0">
                          {formatTimeAgo(last.sentAt)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-charcoal-300 truncate">
                      {friend.bearName}
                    </p>
                    {last ? (
                      <p
                        className={`mt-0.5 text-sm truncate ${
                          last.fromMe ? "text-charcoal-300" : "text-charcoal-500 font-medium"
                        }`}
                      >
                        {last.fromMe && "You: "}
                        {last.text}
                      </p>
                    ) : (
                      <p className="mt-0.5 text-sm italic text-charcoal-300">
                        Say hi to {friend.bearName} 👋
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-5 py-16 text-center">
      <div className="text-6xl mb-3">💌</div>
      <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal-700">
        No friends yet
      </h2>
      <p className="mt-2 text-sm text-charcoal-300 max-w-xs mx-auto">
        Head to Friends to add someone — by their invite code, or browse the demo profiles.
      </p>
      <Link
        href="/friends"
        className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sage-500 text-white font-bold text-sm hover:bg-sage-600 transition-colors"
      >
        Find friends →
      </Link>
    </div>
  );
}

function formatTimeAgo(timestamp: number) {
  const diffMs = Date.now() - timestamp;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return new Date(timestamp).toLocaleDateString();
}
