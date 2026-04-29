"use client";

import Image from "next/image";
import { useState } from "react";
import { useApp } from "./app-context";

export default function ProfileClient() {
  const { user, friends, updateUser, pairBear, unpairBear, resetApp, hydrated } = useApp();
  const [editing, setEditing] = useState(false);
  const [bearName, setBearName] = useState(user.bearName);
  const [name, setName] = useState(user.name);
  const [copied, setCopied] = useState(false);
  const [pairingInput, setPairingInput] = useState("");
  const [pairingError, setPairingError] = useState<string | null>(null);

  if (!hydrated) {
    return <div className="p-5 text-charcoal-300 text-sm">Loading…</div>;
  }

  const handleSave = () => {
    updateUser({ name: name.trim() || "You", bearName: bearName.trim() || "Mochi" });
    setEditing(false);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(user.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const handlePair = () => {
    const result = pairBear(pairingInput);
    if (result.ok) {
      setPairingInput("");
      setPairingError(null);
    } else {
      setPairingError(result.error);
    }
  };

  const handleUnpair = () => {
    if (confirm("Unpair this Bud? Messages will stop showing on the bear's tummy screen.")) {
      unpairBear();
    }
  };

  const handleReset = () => {
    if (confirm("Reset the demo? This clears all your messages, friends, and AI chat history.")) {
      resetApp();
    }
  };

  return (
    <div>
      <div className="px-5 pt-6 pb-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal-700">
          Me
        </h1>
      </div>

      {/* Hero card */}
      <div className="mx-5 rounded-3xl bg-gradient-to-br from-sage-100 via-cream-100 to-mist-100 p-6 text-center">
        <div className="relative w-32 h-32 mx-auto">
          <Image
            src="/images/bear-standing.png"
            alt={user.bearName}
            fill
            sizes="128px"
            className="object-contain"
          />
        </div>
        <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-charcoal-700">
          {user.bearName}
        </p>
        <p className="text-sm text-charcoal-500">
          {user.name && user.name !== "You" ? `${user.name}'s Bud` : "Your Bud"}
        </p>

        <button
          type="button"
          onClick={handleCopyCode}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sage-200 text-sage-700 text-sm font-bold hover:bg-sage-50 transition-colors"
        >
          <span className="font-[family-name:var(--font-display)] tracking-wider">
            {user.inviteCode}
          </span>
          <span className="text-xs text-charcoal-300">{copied ? "Copied!" : "Tap to copy"}</span>
        </button>
        <p className="mt-2 text-xs text-charcoal-300">
          Share this code so friends can add you.
        </p>
      </div>

      {/* Pair your Bud */}
      <section className="mt-6 mx-5 rounded-2xl bg-white border border-cream-200 p-5">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔗</span>
          <h2 className="font-bold text-charcoal-700 text-sm">Pair your Bud</h2>
        </div>

        {user.pairedBearCode ? (
          <div className="mt-3">
            <div className="rounded-xl bg-sage-50 border border-sage-200 p-4 flex items-start gap-3">
              <span className="text-xl">✅</span>
              <div className="flex-1">
                <p className="font-bold text-sage-700 text-sm">Connected to your Bud</p>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Code{" "}
                  <span className="font-[family-name:var(--font-display)] tracking-wider text-charcoal-700">
                    {user.pairedBearCode}
                  </span>
                  . Messages will appear on the tummy screen.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleUnpair}
              className="mt-3 text-xs font-bold text-charcoal-500 hover:text-charcoal-700 underline"
            >
              Unpair this Bud
            </button>
          </div>
        ) : (
          <div className="mt-3">
            <p className="text-xs text-charcoal-500 leading-relaxed">
              Enter the pairing code from your Animal Bud&apos;s tummy screen to connect
              your bear. Messages from friends will then light up on the screen.
            </p>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={pairingInput}
                onChange={(e) => {
                  setPairingInput(e.target.value);
                  if (pairingError) setPairingError(null);
                }}
                placeholder="e.g. BUD-1234"
                aria-label="Pairing code"
                aria-invalid={pairingError ? true : undefined}
                className="flex-1 px-3 py-2 rounded-lg bg-cream-50 border border-cream-300 focus:border-sage-300 focus:outline-none text-sm font-[family-name:var(--font-display)] tracking-wider"
                maxLength={20}
              />
              <button
                type="button"
                onClick={handlePair}
                disabled={!pairingInput.trim()}
                className="px-4 py-2 rounded-full bg-sage-500 text-white text-sm font-bold hover:bg-sage-600 disabled:bg-cream-200 disabled:text-charcoal-300 disabled:cursor-not-allowed transition-colors"
              >
                Pair
              </button>
            </div>
            {pairingError && (
              <p role="alert" className="mt-2 text-xs text-red-600">
                {pairingError}
              </p>
            )}
            <p className="mt-2 text-[11px] text-charcoal-300 leading-relaxed">
              Don&apos;t see a code? Power on your Bud and check the tummy screen.
            </p>
          </div>
        )}
      </section>

      {/* Edit profile */}
      <section className="mt-6 mx-5 rounded-2xl bg-white border border-cream-200 p-5">
        {editing ? (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-300 mb-1">
                Your name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-cream-300 focus:border-sage-300 focus:outline-none text-sm"
                maxLength={20}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-300 mb-1">
                Bear name
              </label>
              <input
                type="text"
                value={bearName}
                onChange={(e) => setBearName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-cream-300 focus:border-sage-300 focus:outline-none text-sm"
                maxLength={20}
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 rounded-full bg-sage-500 text-white text-sm font-bold hover:bg-sage-600"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setName(user.name);
                  setBearName(user.bearName);
                  setEditing(false);
                }}
                className="px-4 py-2 rounded-full bg-cream-100 text-charcoal-500 text-sm font-bold hover:bg-cream-200"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="w-full text-left flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-charcoal-700 text-sm">Edit profile</p>
              <p className="text-xs text-charcoal-300">Change your name or bear name</p>
            </div>
            <span className="text-charcoal-300">›</span>
          </button>
        )}
      </section>

      {/* Stats */}
      <section className="mt-4 mx-5 grid grid-cols-2 gap-3">
        <Stat label="Friends" value={friends.length} />
        <Stat label="Bear" value={user.bearName} />
      </section>

      {/* About + Reset */}
      <section className="mt-6 mx-5 rounded-2xl bg-white border border-cream-200 divide-y divide-cream-200">
        <a
          href="/"
          className="flex items-center justify-between px-5 py-3.5"
        >
          <div>
            <p className="font-bold text-charcoal-700 text-sm">Back to website</p>
            <p className="text-xs text-charcoal-300">Shop, customize, or learn more</p>
          </div>
          <span className="text-charcoal-300">›</span>
        </a>
        <button
          type="button"
          onClick={handleReset}
          className="w-full flex items-center justify-between px-5 py-3.5 text-left"
        >
          <div>
            <p className="font-bold text-charcoal-500 text-sm">Reset demo</p>
            <p className="text-xs text-charcoal-300">Clear all chats and friends</p>
          </div>
          <span className="text-charcoal-300">↻</span>
        </button>
      </section>

      <div className="mt-6 px-5 text-center">
        <p className="text-xs text-charcoal-300">
          Animal Buds — Phase 2 Prototype
        </p>
        <p className="mt-1 text-[10px] text-charcoal-300">
          Class project · Local-only · No data leaves your device
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl bg-white border border-cream-200 p-4 text-center">
      <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-sage-700">
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-wider text-charcoal-300 mt-0.5">
        {label}
      </p>
    </div>
  );
}
