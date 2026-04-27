import Image from "next/image";

type Props = {
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
  priority?: boolean;
};

const SIZE_MAP = {
  sm: { wrapper: "w-44", w: 320, h: 320 },
  md: { wrapper: "w-72", w: 480, h: 480 },
  lg: { wrapper: "w-96", w: 640, h: 640 },
  hero: { wrapper: "w-full max-w-md", w: 800, h: 800 },
};

export default function BearPhoto({ size = "md", className = "", priority = false }: Props) {
  const cfg = SIZE_MAP[size];
  return (
    <div className={`${cfg.wrapper} mx-auto ${className}`}>
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-cream-100 shadow-xl">
        <Image
          src="/images/bear-standing.png"
          alt="Animal Buds bear with tummy screen showing a message"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
          priority={priority}
        />
      </div>
    </div>
  );
}
