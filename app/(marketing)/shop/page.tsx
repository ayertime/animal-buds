import Link from "next/link";
import BearPhoto from "@/components/bear-photo";
import { ADDON_PRICE, BEAR_BASE_PRICE } from "@/lib/products";

export const metadata = {
  title: "Shop — Animal Buds",
  description: "Meet the original Animal Buds bear.",
};

export default function ShopPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs font-bold tracking-widest uppercase text-sage-600">The Collection</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl font-bold text-charcoal-700">
          Meet the Bear.
        </h1>
        <p className="mt-3 text-charcoal-500 text-lg">
          One bear, infinite ways to dress them up. More animal friends are on the way.
        </p>
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-12 items-center bg-gradient-to-br from-cream-100 to-mist-100 rounded-3xl p-8 md:p-12">
        <div>
          <BearPhoto size="lg" priority />
        </div>

        <div>
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-sage-200 text-sage-800">
            In stock
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold text-charcoal-700">
            The Original Bear
          </h2>
          <p className="mt-1 text-charcoal-300">Soft plush + LCD tummy screen + companion app</p>

          <p className="mt-5 font-[family-name:var(--font-display)] text-3xl font-bold text-sage-700">
            ${BEAR_BASE_PRICE}
            <span className="ml-2 text-sm font-medium text-charcoal-300">+ ${ADDON_PRICE}/add-on</span>
          </p>

          <ul className="mt-6 space-y-2 text-charcoal-500">
            <Bullet>Tummy LCD screen for messages</Bullet>
            <Bullet>Built-in ear speakers for voice notes</Bullet>
            <Bullet>USB-C charging, multi-day battery</Bullet>
            <Bullet>Pairs with the free Animal Buds app</Bullet>
            <Bullet>Custom name + outfit add-ons</Bullet>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/customize"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sage-500 text-white font-bold hover:bg-sage-600 transition-colors shadow-lg shadow-sage-500/20"
            >
              Customize Yours →
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-sage-200 text-sage-700 font-bold hover:bg-sage-50 transition-colors"
            >
              How It Works
            </Link>
          </div>

          <div className="mt-7 p-4 bg-cream-50 border border-cream-300 rounded-xl text-sm text-charcoal-500">
            <p><strong className="text-charcoal-700">No subscription, ever.</strong> The companion app is free for life. The only thing you ever pay for is the bear (and any cute outfits you can&apos;t resist).</p>
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="mt-16 text-center">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-charcoal-700">More Buds, coming soon.</h3>
        <p className="mt-2 text-charcoal-500">Bunny, fox, and otter are next in the workshop.</p>
        <div className="mt-6 flex justify-center gap-4 text-5xl opacity-60">
          <span title="Bunny">🐰</span>
          <span title="Fox">🦊</span>
          <span title="Otter">🦦</span>
        </div>
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}
