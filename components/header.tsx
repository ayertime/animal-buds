"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "./cart-context";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/customize", label: "Customize" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/app", label: "The App" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream-50/80 border-b border-sage-100">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" aria-label="Animal Buds home">
          <Image
            src="/images/Picture3.png"
            alt="Animal Buds"
            width={48}
            height={48}
            priority
            className="rounded-full"
          />
          <span className="font-[family-name:var(--font-display)] text-xl font-bold text-sage-700 group-hover:text-sage-600 transition-colors">
            Animal Buds
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal-500 hover:text-sage-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-300 text-sage-900 font-semibold hover:bg-sage-400 transition-colors text-sm"
          >
            <CartIcon />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-bold rounded-full bg-charcoal-700 text-cream-50">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-sage-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-sage-100 bg-cream-50">
          <ul className="px-5 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg text-charcoal-500 hover:bg-sage-100 hover:text-sage-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
    </svg>
  );
}
