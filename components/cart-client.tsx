"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "./cart-context";
import { ADDON_PRICE, BEAR_BASE_PRICE, getAddon } from "@/lib/products";

const SHIPPING = 0;

export default function CartClient() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold text-charcoal-700">
        Your Cart
      </h1>

      <div className="mt-8 grid lg:grid-cols-[1fr_360px] gap-8">
        {/* Items */}
        <ul className="space-y-5">
          {items.map((item) => {
            const lineUnit = BEAR_BASE_PRICE + item.addonIds.length * ADDON_PRICE;
            const lineTotal = lineUnit * item.quantity;
            return (
              <li
                key={item.id}
                className="rounded-2xl bg-white border border-sage-100 p-5 grid sm:grid-cols-[140px_1fr_auto] gap-5 items-start"
              >
                <div className="relative aspect-square bg-cream-100 rounded-xl overflow-hidden">
                  <Image
                    src="/images/bear-standing.png"
                    alt={item.bearName || "Animal Buds bear"}
                    fill
                    sizes="140px"
                    className="object-contain p-2"
                  />
                </div>

                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal-700">
                    {item.bearName || "My Bud"}
                  </h3>
                  <p className="text-sm text-charcoal-300">The Original Bear</p>

                  {item.addonIds.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {item.addonIds.map((id) => {
                        const a = getAddon(id);
                        if (!a) return null;
                        return (
                          <li
                            key={id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sage-50 border border-sage-200 text-xs font-medium text-sage-800"
                          >
                            <span>{a.emoji}</span>
                            <span>{a.name}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  <div className="mt-4 flex items-center gap-3">
                    <div className="inline-flex items-center rounded-full border border-sage-200 bg-cream-50">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-9 h-9 rounded-full hover:bg-sage-100 text-charcoal-500 font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 rounded-full hover:bg-sage-100 text-charcoal-500 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-charcoal-300 hover:text-charcoal-700 underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-sage-700 sm:text-right">
                  ${lineTotal}
                </p>
              </li>
            );
          })}
        </ul>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-cream-100 border border-cream-300 p-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal-700">
              Order summary
            </h2>

            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-charcoal-500">
                <dt>Subtotal</dt>
                <dd className="font-semibold">${subtotal}</dd>
              </div>
              <div className="flex justify-between text-charcoal-500">
                <dt>Shipping</dt>
                <dd className="font-semibold">{SHIPPING === 0 ? "Free" : `$${SHIPPING}`}</dd>
              </div>
            </dl>

            <div className="mt-4 pt-4 border-t border-cream-300 flex justify-between items-baseline">
              <span className="font-bold text-charcoal-700">Total</span>
              <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-sage-700">
                ${subtotal + SHIPPING}
              </span>
            </div>

            <Link
              href="/checkout"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-sage-500 text-white font-bold hover:bg-sage-600 transition-colors"
            >
              Checkout →
            </Link>
            <Link
              href="/customize"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-sage-200 text-sage-700 font-semibold hover:bg-sage-50 transition-colors"
            >
              Add another Bud
            </Link>

            <p className="mt-4 text-xs text-charcoal-300 text-center">
              The companion app is free forever. No subscription.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-24 text-center">
      <div className="text-7xl">🧸</div>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal-700">
        Your cart is empty
      </h1>
      <p className="mt-2 text-charcoal-500">No Buds in here yet. Let&apos;s build one.</p>
      <Link
        href="/customize"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sage-500 text-white font-bold hover:bg-sage-600 transition-colors"
      >
        Build Your Bud →
      </Link>
    </div>
  );
}
