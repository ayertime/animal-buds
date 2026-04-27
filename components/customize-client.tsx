"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BearCustomizerPreview from "./bear-customizer-preview";
import { useCart } from "./cart-context";
import {
  ADDONS,
  ADDON_CATEGORIES,
  ADDON_PRICE,
  BEAR_BASE_PRICE,
  type AddonCategory,
} from "@/lib/products";

export default function CustomizeClient() {
  const router = useRouter();
  const { addItem } = useCart();

  const [bearName, setBearName] = useState("");
  const [equipped, setEquipped] = useState<Record<AddonCategory, string | null>>({
    hat: null,
    shirt: null,
    pants: null,
    shoes: null,
    accessory: null,
  });
  const [activeTab, setActiveTab] = useState<AddonCategory>("hat");
  const [adding, setAdding] = useState(false);

  const equippedIds = Object.values(equipped).filter((id): id is string => Boolean(id));
  const totalPrice = BEAR_BASE_PRICE + equippedIds.length * ADDON_PRICE;

  const handleToggle = (category: AddonCategory, id: string) => {
    setEquipped((prev) => ({
      ...prev,
      [category]: prev[category] === id ? null : id,
    }));
  };

  const handleAddToCart = () => {
    setAdding(true);
    addItem({
      bearName: bearName.trim() || "My Bud",
      addonIds: equippedIds,
    });
    setTimeout(() => router.push("/cart"), 600);
  };

  const visibleAddons = ADDONS.filter((a) => a.category === activeTab);

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="text-center mb-10">
        <p className="text-xs font-bold tracking-widest uppercase text-sage-600">Customize</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-charcoal-700">
          Build Your Bud
        </h1>
        <p className="mt-2 text-charcoal-500">Pick a name. Try on outfits. Make them yours.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10">
        {/* PREVIEW */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-gradient-to-br from-cream-100 via-mist-100 to-lavender-200 p-6">
            <BearCustomizerPreview
              bearName={bearName || undefined}
              equippedAddonIds={equippedIds}
            />
          </div>

          <div className="mt-5 rounded-2xl bg-white border border-sage-100 p-5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-charcoal-500">Your total</span>
              <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-sage-700">
                ${totalPrice}
              </span>
            </div>
            <p className="mt-1 text-xs text-charcoal-300">
              Bear: ${BEAR_BASE_PRICE} · Add-ons: {equippedIds.length} × ${ADDON_PRICE}
            </p>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={adding}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-sage-500 text-white font-bold hover:bg-sage-600 transition-colors disabled:opacity-60"
            >
              {adding ? "Adding…" : "Add to Cart →"}
            </button>
          </div>
        </div>

        {/* CONTROLS */}
        <div>
          {/* Name */}
          <div className="rounded-2xl bg-white border border-sage-100 p-6">
            <label htmlFor="bearName" className="block font-[family-name:var(--font-display)] text-lg font-bold text-charcoal-700">
              1. Name your Bud
            </label>
            <p className="text-sm text-charcoal-300 mt-0.5">Up to 20 characters. We&apos;ll embroider it on a tag.</p>
            <input
              id="bearName"
              type="text"
              value={bearName}
              onChange={(e) => setBearName(e.target.value.slice(0, 20))}
              placeholder="e.g. Mochi, Buddy, Honey…"
              className="mt-4 w-full px-4 py-3 rounded-xl bg-cream-50 border-2 border-cream-300 focus:border-sage-400 focus:outline-none text-charcoal-700 placeholder:text-charcoal-100"
            />
          </div>

          {/* Outfits */}
          <div className="mt-5 rounded-2xl bg-white border border-sage-100 p-6">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-charcoal-700">
              2. Dress them up
              <span className="ml-2 text-sm font-medium text-charcoal-300">${ADDON_PRICE} each</span>
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {ADDON_CATEGORIES.map((cat) => {
                const isActive = activeTab === cat.id;
                const isEquipped = Boolean(equipped[cat.id]);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-sage-500 text-white"
                        : isEquipped
                        ? "bg-sage-100 text-sage-800 border border-sage-300"
                        : "bg-cream-100 text-charcoal-500 hover:bg-cream-200"
                    }`}
                  >
                    {cat.label}
                    {isEquipped && !isActive && <span className="ml-1.5">✓</span>}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              {visibleAddons.map((addon) => {
                const isOn = equipped[addon.category] === addon.id;
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => handleToggle(addon.category, addon.id)}
                    className={`flex items-start gap-3 p-4 rounded-xl text-left border-2 transition-all ${
                      isOn
                        ? "border-sage-400 bg-sage-50 shadow-sm"
                        : "border-cream-200 bg-white hover:border-sage-200"
                    }`}
                  >
                    <span className="text-2xl shrink-0">{addon.emoji}</span>
                    <span className="flex-1">
                      <span className="block font-semibold text-charcoal-700 text-sm">{addon.name}</span>
                      <span className="block text-xs text-charcoal-300 mt-0.5">{addon.description}</span>
                    </span>
                    {isOn && (
                      <span className="text-sage-600 text-sm font-bold shrink-0">✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-xs text-charcoal-300">
              One choice per category. Tap again to remove.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
