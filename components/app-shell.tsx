"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/messages", icon: MessagesIcon, label: "Messages" },
  { href: "/friends", icon: FriendsIcon, label: "Friends" },
  { href: "/chat", icon: AIIcon, label: "AI" },
  { href: "/profile", icon: ProfileIcon, label: "Me" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      {/* App top bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-cream-200">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link href="/messages" className="flex items-center gap-2 shrink-0" aria-label="Animal Buds app home">
            <Image
              src="/images/Picture3.png"
              alt=""
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-[family-name:var(--font-display)] text-base font-bold text-sage-700">
              Animal Buds
            </span>
          </Link>

          {/* Desktop inline nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="App navigation (desktop)">
            {TABS.map((tab) => {
              const active = isActive(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    active
                      ? "bg-sage-100 text-sage-700"
                      : "text-charcoal-500 hover:bg-cream-100 hover:text-charcoal-700"
                  }`}
                >
                  <tab.icon active={active} small />
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/"
            className="text-xs font-medium text-charcoal-300 hover:text-charcoal-700 shrink-0"
          >
            ← Exit demo
          </Link>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 max-w-md w-full mx-auto pb-24 md:pb-8">{children}</main>

      {/* Bottom tab nav — mobile only */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-cream-200 shadow-lg"
        aria-label="App navigation (mobile)"
      >
        <ul className="max-w-md mx-auto px-2 grid grid-cols-4">
          {TABS.map((tab) => {
            const active = isActive(tab.href);
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  className={`flex flex-col items-center justify-center py-3 gap-0.5 transition-colors ${
                    active ? "text-sage-600" : "text-charcoal-300 hover:text-charcoal-500"
                  }`}
                >
                  <tab.icon active={active} />
                  <span className="text-[10px] font-bold tracking-wider uppercase">
                    {tab.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function MessagesIcon({ active, small }: { active: boolean; small?: boolean }) {
  const size = small ? 16 : 22;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function FriendsIcon({ active, small }: { active: boolean; small?: boolean }) {
  const size = small ? 16 : 22;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function AIIcon({ active, small }: { active: boolean; small?: boolean }) {
  const size = small ? 16 : 22;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <circle cx="9" cy="11" r="0.8" fill="currentColor" />
      <circle cx="15" cy="11" r="0.8" fill="currentColor" />
    </svg>
  );
}

function ProfileIcon({ active, small }: { active: boolean; small?: boolean }) {
  const size = small ? 16 : 22;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
