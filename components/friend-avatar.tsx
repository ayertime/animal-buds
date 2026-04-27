import Image from "next/image";
import type { Friend } from "@/lib/app-data";

const RING_BY_THEME: Record<Friend["themeColor"], string> = {
  pink: "ring-sage-300",
  sky: "ring-mist-300",
  lavender: "ring-lavender-300",
  cream: "ring-cream-400",
  sage: "ring-sage-400",
};

const BG_BY_THEME: Record<Friend["themeColor"], string> = {
  pink: "bg-sage-100",
  sky: "bg-mist-100",
  lavender: "bg-lavender-100",
  cream: "bg-cream-100",
  sage: "bg-sage-50",
};

type Props = {
  friend: Friend;
  size?: "sm" | "md" | "lg" | "xl";
  showStatus?: boolean;
};

const SIZE = {
  sm: { wrapper: "w-10 h-10", emoji: "text-[10px] -bottom-0.5 -right-0.5 px-1 py-0.5", status: "w-2.5 h-2.5" },
  md: { wrapper: "w-14 h-14", emoji: "text-xs -bottom-1 -right-1 px-1.5 py-0.5", status: "w-3 h-3" },
  lg: { wrapper: "w-20 h-20", emoji: "text-sm -bottom-1 -right-1 px-2 py-0.5", status: "w-3.5 h-3.5" },
  xl: { wrapper: "w-32 h-32", emoji: "text-xl -bottom-1.5 -right-1.5 px-2.5 py-1", status: "w-4 h-4" },
};

export default function FriendAvatar({ friend, size = "md", showStatus = false }: Props) {
  const cfg = SIZE[size];
  return (
    <div className={`relative ${cfg.wrapper} flex-shrink-0`}>
      <div
        className={`w-full h-full rounded-full overflow-hidden ring-4 ${RING_BY_THEME[friend.themeColor]} ${BG_BY_THEME[friend.themeColor]}`}
      >
        <Image
          src="/images/bear-standing.png"
          alt={`${friend.bearName} bear`}
          width={128}
          height={128}
          className="w-full h-full object-contain"
        />
      </div>
      <span
        className={`absolute ${cfg.emoji} bg-white border border-cream-200 rounded-full leading-none shadow-sm`}
        aria-hidden="true"
      >
        {friend.emoji}
      </span>
      {showStatus && (
        <span
          className={`absolute top-0 right-0 ${cfg.status} rounded-full border-2 border-white ${
            friend.online ? "bg-sage-400" : "bg-charcoal-100"
          }`}
          aria-label={friend.online ? "Online" : "Offline"}
        />
      )}
    </div>
  );
}
