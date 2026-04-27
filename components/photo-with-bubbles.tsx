"use client";

import { useEffect, useState } from "react";
import BearPhoto from "./bear-photo";

const BUBBLES = [
  { text: "Thinking of you! 💗", side: "left" as const, top: "10%" },
  { text: "Mom says hi 🌷", side: "right" as const, top: "20%" },
  { text: "Proud of you ⭐", side: "left" as const, top: "55%" },
  { text: "Sleep tight 🌙", side: "right" as const, top: "70%" },
];

export default function PhotoWithBubbles() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % BUBBLES.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <BearPhoto size="hero" priority />

      {BUBBLES.map((bubble, i) => {
        const isActive = i === activeIndex;
        const sideClasses =
          bubble.side === "left"
            ? "left-0 -translate-x-3 sm:-translate-x-6 rounded-bl-md"
            : "right-0 translate-x-3 sm:translate-x-6 rounded-br-md";
        return (
          <div
            key={bubble.text}
            className={`pointer-events-none absolute z-10 px-4 py-2.5 rounded-2xl shadow-lg transition-all duration-500 whitespace-nowrap text-sm font-semibold ${sideClasses} ${
              i % 2 === 0
                ? "bg-sage-500 text-white"
                : "bg-mist-400 text-white"
            } ${
              isActive
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90 -translate-y-2"
            }`}
            style={{ top: bubble.top }}
          >
            {bubble.text}
          </div>
        );
      })}
    </div>
  );
}
