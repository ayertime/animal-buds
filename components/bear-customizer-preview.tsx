import Image from "next/image";
import { ADDONS, type Addon } from "@/lib/products";

type Props = {
  message?: string;
  bearName?: string;
  equippedAddonIds?: string[];
};

// Coordinates calibrated to /images/bear-standing.png
// (front-facing bear, centered, standing pose, white background).
const ACCESSORY_POSITIONS: Record<
  string,
  { top: string; left: string; size: string; rotate?: string; zIndex?: number }
> = {
  // Hats — sit on top of head (head top ~6%)
  "beanie-cream":   { top: "-2%", left: "50%", size: "6rem" },
  "graduation-cap": { top: "-3%", left: "53%", size: "5.5rem", rotate: "-6deg" },
  "sun-hat":        { top: "-5%", left: "50%", size: "7rem" },
  "bow-lavender":   { top: "0%",  left: "44%", size: "3.5rem" },

  // Accessories — anatomically positioned
  "glasses-round":  { top: "14%", left: "50%", size: "4rem", zIndex: 5 },
  "scarf-sage":     { top: "29%", left: "50%", size: "4.5rem" },
  "heart-pin":      { top: "38%", left: "32%", size: "2.5rem" },
  "backpack-mini":  { top: "38%", left: "76%", size: "3.5rem", rotate: "-15deg" },

  // Shoes — at the feet
  "sneakers-white": { top: "88%", left: "35%", size: "3rem" },
  "boots-cozy":     { top: "88%", left: "35%", size: "3rem" },
  "slippers-pink":  { top: "88%", left: "35%", size: "3rem" },
};

const SECOND_SHOE_LEFT = "65%";

export default function BearCustomizerPreview({
  message,
  bearName,
  equippedAddonIds = [],
}: Props) {
  const equipped: Addon[] = equippedAddonIds
    .map((id) => ADDONS.find((a) => a.id === id))
    .filter((a): a is Addon => Boolean(a));

  const hat = equipped.find((a) => a.category === "hat");
  const shoes = equipped.find((a) => a.category === "shoes");
  const accessory = equipped.find((a) => a.category === "accessory");

  const overlays = [hat, shoes, accessory].filter((a): a is Addon => Boolean(a));
  const displayMessage = message || (bearName ? `Hi, I'm ${bearName}!` : "Pick a name 💗");

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative w-full aspect-square">
        {/* Bear photo */}
        <Image
          src="/images/bear-standing.png"
          alt="Animal Buds bear"
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-contain rounded-3xl"
          priority
        />

        {/* Custom message overlay — covers the screen area on the photo */}
        <div
          className="absolute pointer-events-none flex items-center justify-center"
          style={{
            top: "42%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "28%",
            height: "17%",
            zIndex: 10,
          }}
        >
          <div className="w-full h-full bg-mist-400 rounded-md shadow-md flex items-center justify-center px-2">
            <p
              className="text-white text-center font-bold leading-tight"
              style={{ fontSize: "clamp(9px, 1.5vw, 14px)" }}
            >
              {displayMessage}
            </p>
          </div>
        </div>

        {/* Accessory overlays positioned anatomically on the photo */}
        {overlays.map((addon) => {
          const pos = ACCESSORY_POSITIONS[addon.id];
          if (!pos) return null;
          return (
            <span
              key={addon.id}
              aria-label={addon.name}
              className="absolute pointer-events-none drop-shadow-lg select-none"
              style={{
                top: pos.top,
                left: pos.left,
                fontSize: pos.size,
                lineHeight: 1,
                transform: `translateX(-50%) ${pos.rotate ? `rotate(${pos.rotate})` : ""}`.trim(),
                zIndex: pos.zIndex ?? 4,
              }}
            >
              {addon.emoji}
            </span>
          );
        })}

        {/* Second shoe (mirror) */}
        {shoes && ACCESSORY_POSITIONS[shoes.id] && (
          <span
            aria-hidden="true"
            className="absolute pointer-events-none drop-shadow-lg select-none"
            style={{
              top: ACCESSORY_POSITIONS[shoes.id].top,
              left: SECOND_SHOE_LEFT,
              fontSize: ACCESSORY_POSITIONS[shoes.id].size,
              lineHeight: 1,
              transform: "translateX(-50%) scaleX(-1)",
              zIndex: 4,
            }}
          >
            {shoes.emoji}
          </span>
        )}
      </div>

      {/* Bear name */}
      {bearName && (
        <p className="mt-3 text-center font-[family-name:var(--font-display)] text-2xl font-bold text-charcoal-700">
          {bearName}
        </p>
      )}

      {/* Outfit board — always shown so users can see what they've picked at a glance */}
      <div className="mt-4 rounded-2xl bg-white border border-cream-300 p-4">
        <p className="text-xs font-bold tracking-widest uppercase text-charcoal-300 mb-2">
          Outfit board
        </p>
        {equipped.length === 0 ? (
          <p className="text-sm text-charcoal-300 italic">
            Nothing picked yet — try on some clothes →
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {equipped.map((a) => (
              <li
                key={a.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sage-50 border border-sage-200 text-xs font-semibold text-sage-800"
              >
                <span className="text-base leading-none">{a.emoji}</span>
                <span>{a.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
