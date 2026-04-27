"use client";

import { useState } from "react";

export default function NotifyMeForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Demo: in a real build, this would POST to an email-collection endpoint.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-sage-50 border border-sage-200 p-6 text-center">
        <p className="text-2xl">✨</p>
        <p className="mt-2 font-bold text-sage-800">You&apos;re on the list!</p>
        <p className="mt-1 text-sm text-charcoal-500">
          We&apos;ll email <strong className="text-charcoal-700">{email}</strong> as soon as the app is ready.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 rounded-full bg-white border-2 border-cream-300 focus:border-sage-400 focus:outline-none text-charcoal-700 placeholder:text-charcoal-100"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-full bg-sage-500 text-white font-bold hover:bg-sage-600 transition-colors"
      >
        Notify Me
      </button>
    </form>
  );
}
