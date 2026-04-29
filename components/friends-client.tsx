"use client";

import { useEffect, useState } from "react";
import { useApp } from "./app-context";
import FriendAvatar from "./friend-avatar";
import { STOCK_FRIENDS } from "@/lib/app-data";

type ShareStatus = "idle" | "copied" | "shared";

export default function FriendsClient() {
  const {
    friends,
    incomingRequests,
    addFriend,
    removeFriend,
    isFriendAdded,
    acceptFriendRequest,
    rejectFriendRequest,
    hydrated,
    user,
  } = useApp();
  const [search, setSearch] = useState("");
  const [shareStatus, setShareStatus] = useState<ShareStatus>("idle");

  // Prefill the search bar from a `?code=XXXX` query param so shared invite
  // links (e.g. opened from iMessage) land directly on the matching profile.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) setSearch(code.toUpperCase());
  }, []);

  if (!hydrated) {
    return <div className="p-5 text-charcoal-300 text-sm">Loading…</div>;
  }

  const handleShareInvite = async () => {
    const url = `${window.location.origin}/friends?code=${encodeURIComponent(user.inviteCode)}`;
    const shareData = {
      title: "Add me on Animal Buds",
      text: `Add me on Animal Buds with code ${user.inviteCode}`,
      url,
    };

    // Prefer the native share sheet — opens iMessage / WhatsApp / Messages
    // / etc. directly on iOS and Android.
    if (typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
        setShareStatus("shared");
        setTimeout(() => setShareStatus("idle"), 1800);
        return;
      } catch (err) {
        // User dismissed the share sheet — silent, no fallback.
        if ((err as Error).name === "AbortError") return;
        // Other errors fall through to clipboard.
      }
    }

    // Desktop / unsupported browsers: copy the full text + link to clipboard.
    try {
      await navigator.clipboard.writeText(`${shareData.text} → ${url}`);
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 1800);
    } catch {}
  };

  const incomingRequestIds = new Set(incomingRequests.map((f) => f.id));
  const filteredStock = STOCK_FRIENDS.filter((f) => {
    // Don't list pending requesters in Demo profiles — they live in the Friend
    // requests section above with Accept/Reject buttons instead.
    if (incomingRequestIds.has(f.id)) return false;
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
        <button
          type="button"
          onClick={handleShareInvite}
          className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sage-200 text-sage-700 text-sm font-bold hover:bg-sage-50 transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          {shareStatus === "shared"
            ? "Shared!"
            : shareStatus === "copied"
              ? "Link copied!"
              : "Share invite link"}
        </button>
      </div>

      {/* Find a bud — unified search by name or invite code */}
      <div className="mx-5 mt-4">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or invite code..."
            aria-label="Search friends by name or invite code"
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-cream-300 focus:border-sage-300 focus:outline-none text-sm text-charcoal-700 placeholder:text-charcoal-300"
          />
        </div>
      </div>

      {/* Friend requests */}
      {incomingRequests.length > 0 && (
        <section className="mt-7">
          <div className="flex items-baseline justify-between px-5 mb-2">
            <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-charcoal-700">
              Friend requests
            </h2>
            <span className="text-xs text-charcoal-300">{incomingRequests.length}</span>
          </div>
          <ul className="divide-y divide-cream-200 border-t border-b border-cream-200">
            {incomingRequests.map((requester) => (
              <li key={requester.id} className="flex items-center gap-3 px-5 py-3">
                <FriendAvatar friend={requester} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-charcoal-700 truncate">{requester.name}</p>
                  <p className="text-xs text-charcoal-300 truncate">
                    wants to be your bud
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => acceptFriendRequest(requester.id)}
                    className="px-3.5 py-1.5 rounded-full bg-sage-500 text-white text-xs font-bold hover:bg-sage-600 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => rejectFriendRequest(requester.id)}
                    className="px-3.5 py-1.5 rounded-full bg-cream-100 text-charcoal-500 text-xs font-bold hover:bg-cream-200 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

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
            No friends yet. Search by name or invite code above to add one.
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

      {/* Find a bud — list driven by the search bar above */}
      <section className="mt-7">
        <div className="px-5">
          <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-charcoal-700">
            {search ? "Search results" : "Find a bud"}
          </h2>
          <p className="text-xs text-charcoal-300 mt-0.5">
            {search
              ? `${filteredStock.length} ${filteredStock.length === 1 ? "match" : "matches"}`
              : "Browse demo profiles or use the bar above to find someone by code."}
          </p>
        </div>

        {filteredStock.length === 0 ? (
          <p className="mt-3 px-5 py-6 text-center text-sm text-charcoal-300 italic border-t border-b border-cream-200">
            No buds match &ldquo;{search}&rdquo;. Try a name, bear name, or invite code.
          </p>
        ) : (
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
        )}
      </section>
    </div>
  );
}
