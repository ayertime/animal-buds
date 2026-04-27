"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "./cart-context";

type FormState = {
  email: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

const EMPTY: FormState = {
  email: "",
  fullName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

export default function CheckoutClient() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0 && !submitting) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-24 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal-700">
          Your cart is empty
        </h1>
        <Link
          href="/customize"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sage-500 text-white font-bold hover:bg-sage-600 transition-colors"
        >
          Build Your Bud →
        </Link>
      </div>
    );
  }

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate processing delay
    setTimeout(() => {
      const orderNumber = "AB-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      const buyerName = form.fullName || "friend";
      clear();
      router.push(`/checkout/success?order=${orderNumber}&name=${encodeURIComponent(buyerName)}`);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold text-charcoal-700">
        Checkout
      </h1>
      <p className="mt-1 text-charcoal-300 text-sm">
        This is a class-project demo — no real payment is processed.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-6">
          {/* Contact */}
          <Section title="Contact">
            <Field label="Email" id="email" type="email" required value={form.email} onChange={update("email")} />
          </Section>

          {/* Shipping */}
          <Section title="Shipping address">
            <Field label="Full name" id="fullName" required value={form.fullName} onChange={update("fullName")} />
            <Field label="Address" id="address" required value={form.address} onChange={update("address")} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="City" id="city" required value={form.city} onChange={update("city")} />
              <Field label="State" id="state" required value={form.state} onChange={update("state")} />
              <Field label="ZIP" id="zip" required value={form.zip} onChange={update("zip")} />
            </div>
          </Section>

          {/* Payment */}
          <Section title="Payment" subtitle="Use any number — this is a demo.">
            <Field
              label="Card number"
              id="cardNumber"
              required
              placeholder="1234 5678 9012 3456"
              value={form.cardNumber}
              onChange={update("cardNumber")}
            />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Expiry (MM/YY)" id="expiry" required placeholder="12/27" value={form.expiry} onChange={update("expiry")} />
              <Field label="CVC" id="cvc" required placeholder="123" value={form.cvc} onChange={update("cvc")} />
            </div>
          </Section>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-cream-100 border border-cream-300 p-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal-700">Summary</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-charcoal-500 max-h-48 overflow-y-auto">
              {items.map((it) => (
                <li key={it.id} className="flex justify-between gap-2">
                  <span className="truncate">
                    {it.bearName || "My Bud"} × {it.quantity}
                  </span>
                  <span className="text-charcoal-300 shrink-0">
                    {it.addonIds.length} add-on{it.addonIds.length === 1 ? "" : "s"}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 pt-4 border-t border-cream-300 space-y-2 text-sm">
              <div className="flex justify-between text-charcoal-500">
                <dt>Subtotal</dt>
                <dd>${subtotal}</dd>
              </div>
              <div className="flex justify-between text-charcoal-500">
                <dt>Shipping</dt>
                <dd>Free</dd>
              </div>
              <div className="flex justify-between font-bold text-charcoal-700 pt-2 border-t border-cream-300">
                <dt>Total</dt>
                <dd className="font-[family-name:var(--font-display)] text-xl">${subtotal}</dd>
              </div>
            </dl>

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-sage-500 text-white font-bold hover:bg-sage-600 transition-colors disabled:opacity-60"
            >
              {submitting ? "Processing…" : `Pay $${subtotal} →`}
            </button>
            <p className="mt-3 text-xs text-charcoal-300 text-center">
              🔒 Demo checkout. No real charges.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white border border-sage-100 p-6">
      <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-charcoal-700">{title}</h2>
      {subtitle && <p className="text-xs text-charcoal-300 mt-0.5">{subtitle}</p>}
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function Field({
  label,
  id,
  ...rest
}: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        {...rest}
        className="w-full px-3 py-2.5 rounded-lg bg-cream-50 border border-cream-300 focus:border-sage-400 focus:outline-none text-charcoal-700"
      />
    </div>
  );
}
