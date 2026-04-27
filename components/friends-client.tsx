"use client";

import { useState } from "react";
import { useApp } from "./app-context";
import FriendAvatar from "./friend-avatar";
import { STOCK_FRIENDS } from "@/lib/app-data";

export default function FriendsClient() {
  const { friends, addFriend, removeFriend, isFriendAdded, hydrated, user } = useApp();
  const [code, setCode] = useState("");
  const [codeMessage, setCodeMessage] = useState<{ text: string; tone: "success" | "error" } | null>(null);
  const [search, setSearch] = useState("");

  if (!hydrated) {
    return <div className="p-5 text-charcoal-300 text-sm">Loading…</div>;
  }

  const handleAddByCode = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    const match = STOCK_FRIENDS.find((f) => f.inviteCode === trimmed);
    if (!match) {
      setCodeMessage({
        text: `No bud found with code "${trimmed}". Try one of the demo profiles below 👇`,
        tone: "error",
      });
      return;
    }
    if (isFriendAdded(match.id)) {
      setCodeMessage({ text: `${match.name} is already in your friends list ✓`, tone: "error" });
      return;
    }
    addFriend(match.id);
    setCode("");
    setCodeMessage({ text: `${match.name} added! Say hi 💌`, tone: "success" });
  };

  const filteredStock = STOCK_FRIENDS.filter((f) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      f.bearName.toLowerCase().includes(q) ||
      f.inviteCode.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="px-5 pt-6 pb-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal-700">
          Friends
        </h1>
        <p className="mt-1 text-sm text-charcoal-300">
          Only friends can send messages to your Bud.
        </p>
      </div>

      {/* Your invite code */}
      <div className="mx-5 rounded-2xl bg-gradient-to-br from-sage-100 to-mist-100 border border-sage-200 p-4">
        <p className="text-xs font-bold tracking-widest uppercase text-sage-700">
          Your invite code
        </p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal-700 tracking-wider">
          {user.inviteCode}
        </p>
        <p className="mt-1 text-xs text-charcoal-500">
          Share this so friends can add you.
        </p>
      </div>

      {/* Add by code */}
      <div className="mx-5 mt-4">
        <form onSubmit={handleAddByCode} className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setCodeMessage(null);
            }}
            placeholder="Enter friend's invite code"
            className="flex-1 px-4 py-2.5 rounded-full bg-white border border-cream-300 focus:border-sage-300 focus:outline-none text-sm font-semibold tracking-wider text-charcoal-700 placeholder:text-charcoal-300 placeholder:font-normal placeholder:tracking-normal"
            maxLength={12}
          />
          <button
            type="submit"
            disabled={!code.trim()}
            className="px-5 py-2.5 rounded-full bg-sage-500 text-white font-bold text-sm hover:bg-sage-600 transition-colors disabled:opacity-40"
          >
            Add
          </button>
        </form>
        {codeMessage && (
          <p
            className={`mt-2 text-xs font-medium ${
              codeMessage.tone === "success" ? "text-sage-700" : "text-charcoal-500"
            }`}
          >
            {codeMessage.text}
          </p>
        )}
      </div>

      {/* Your friends */}
      <section className="mt-7">
        <div className="flex items-baseline justify-between px-5 mb-2">
          <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-charcoal-700">
            Your friends
          </h2>
          <span className="text-xs text-charcoal-300">{friends.length}</span>
        </div>
        {friends.length === 0 ? (
          <p className="px-5 text-sm text-charcoal-300 italic py-4">
            No friends yet. Add one with their code or browse profiles below.
          </p>
        ) : (
          <ul className="divide-y divide-cream-200 border-t border-b border-cream-200">
            {friends.map((friend) => (
              <li key={friend.id} className="flex items-center gap-3 px-5 py-3">
                <FriendAvatar friend={friend} size="md" showStatus />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-charcoal-700 truncate">{friend.name}</p>
                  <p className="text-xs text-charcoal-300 truncate">{friend.bio}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFriend(friend.id)}
                  className="text-xs font-medium text-charcoal-300 hover:text-charcoal-700 underline underline-offset-4"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Stock directory */}
      <section className="mt-7">
        <div className="px-5">
          <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-charcoal-700">
            Demo profiles
          </h2>
          <p className="text-xs text-charcoal-300 mt-0.5">
            Pre-made friends for the demo. Add anyone to start chatting.
          </p>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or code..."
            className="mt-3 w-full px-4 py-2 rounded-full bg-cream-100 border border-cream-200 focus:border-sage-300 focus:outline-none text-sm text-charcoal-700 placeholder:text-charcoal-300"
          />
        </div>

        <ul className="mt-3 divide-y divide-cream-200 border-t border-cream-200">
          {filteredStock.map((stock) => {
            const added = isFriendAdded(stock.id);
            return (
              <li key={stock.id} className="flex items-center gap-3 px-5 py-3">
                <FriendAvatar friend={stock} size="md" showStatus />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-charcoal-700 truncate">{stock.name}</p>
                  <p className="text-xs text-charcoal-300 truncate">{stock.bio}</p>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-charcoal-300 mt-0.5">
                    Code: {stock.inviteCode}
                  </p>
                </div>
                {added ? (
                  <span className="text-xs font-bold text-sage-600 px-3 py-1.5">✓ Added</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => addFriend(stock.id)}
                    className="px-4 py-1.5 rounded-full bg-sage-500 text-white text-xs font-bold hover:bg-sage-600 transition-colors"
                  >
                    Add
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
