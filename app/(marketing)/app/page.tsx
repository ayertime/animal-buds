import Link from "next/link";
import NotifyMeForm from "@/components/notify-me-form";

export const metadata = {
  title: "The App — Animal Buds",
  description: "Send messages, manage friends, and chat with our mental-health AI companion.",
};

export default function AppPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      {/* HERO */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-sage-200 text-sage-700">
          ✨ Demo available now · Free forever
        </span>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold text-charcoal-700">
          The Animal Buds App
        </h1>
        <p className="mt-3 text-charcoal-500 text-lg">
          The free companion app where you message your Buds, manage friends, and chat with
          a mental-health AI built just for you.
        </p>

        <div className="mt-7 flex flex-wrap gap-3 justify-center">
          <Link
            href="/messages"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sage-500 text-white font-bold hover:bg-sage-600 transition-colors shadow-lg shadow-sage-500/20"
          >
            🚀 Launch Demo App
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-sage-200 text-sage-700 font-bold hover:bg-sage-50 transition-colors"
          >
            Learn more ↓
          </a>
        </div>
        <p className="mt-3 text-xs text-charcoal-300">
          Works on phone or computer · Add to home screen for an app-like experience
        </p>
      </div>

      {/* PHONE MOCKUP */}
      <section id="features" className="mt-16 grid lg:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <PhoneMockup />
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal-700">
            Three things, done well.
          </h2>

          <ul className="mt-6 space-y-5">
            <FeatureRow
              icon="💌"
              title="Send messages to a Bud"
              body="Type a note. Tap send. It appears on your friend's bear in seconds. Voice notes too — they play through the ear speakers."
            />
            <FeatureRow
              icon="👥"
              title="Friends, not followers"
              body="No public profiles. You add friends by code or invite link. Either side can pause messages anytime."
            />
            <FeatureRow
              icon="🧠"
              title="A safe AI companion"
              body="An AI trained only for mental health and social anxiety. It listens without judgment, suggests coping techniques, and connects you to real help when you need it."
            />
          </ul>
        </div>
      </section>

      {/* AI EXPLAINER */}
      <section className="mt-20 rounded-3xl bg-gradient-to-br from-mist-100 via-cream-100 to-lavender-100 p-10 md:p-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal-700">
            About the AI companion
          </h2>
          <p className="mt-3 text-center text-charcoal-500">
            We trained it for one purpose. It does that one thing, and only that thing.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            <Card title="✓ It will" tone="good">
              <li>Listen without judgment</li>
              <li>Suggest grounding and breathing exercises</li>
              <li>Share resources for anxiety and homesickness</li>
              <li>Recommend talking to a counselor when helpful</li>
              <li>Detect crisis signals and surface real help</li>
            </Card>
            <Card title="✗ It won&apos;t" tone="bad">
              <li>Diagnose any condition</li>
              <li>Replace a therapist or doctor</li>
              <li>Help with homework or general chat</li>
              <li>Pretend to be a real person</li>
              <li>Share what you say with anyone</li>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW TO DOWNLOAD */}
      <section className="mt-20 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal-700">
          How to download
        </h2>
        <p className="mt-2 text-charcoal-500 max-w-xl mx-auto">
          The app launches alongside our first shipment of bears. Get notified when it&apos;s ready.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center opacity-60">
          <FauxStoreBadge store="App Store" />
          <FauxStoreBadge store="Google Play" />
        </div>

        <div className="mt-10 max-w-md mx-auto">
          <NotifyMeForm />
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 text-center">
        <p className="text-charcoal-500">Ready to start? Get a Bud first.</p>
        <Link
          href="/customize"
          className="mt-3 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sage-500 text-white font-bold hover:bg-sage-600 transition-colors"
        >
          Build Your Bud →
        </Link>
      </section>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative w-72 h-[580px] rounded-[3rem] bg-charcoal-700 p-4 shadow-2xl">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-charcoal-900 rounded-b-2xl z-10" />
      <div className="w-full h-full rounded-[2.4rem] bg-gradient-to-br from-cream-50 to-mist-100 overflow-hidden flex flex-col">
        {/* App header */}
        <div className="px-4 pt-10 pb-3 flex items-center gap-2 border-b border-sage-100">
          <div className="w-9 h-9 rounded-full bg-sage-300 flex items-center justify-center text-sm">🐻</div>
          <div>
            <p className="font-[family-name:var(--font-display)] font-bold text-sm text-charcoal-700">Mochi</p>
            <p className="text-[10px] text-sage-600">● Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 space-y-2 overflow-hidden">
          <Bubble side="left">Mom says hi! 🌷</Bubble>
          <Bubble side="right">Aw, tell her I said hi back 💗</Bubble>
          <Bubble side="left">Don&apos;t forget to eat dinner!</Bubble>
          <Bubble side="right">Ramen tonight 🍜</Bubble>
          <Bubble side="left">Love you ✨</Bubble>
        </div>

        {/* Input */}
        <div className="p-3 border-t border-sage-100">
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full text-xs text-charcoal-300">
            <span className="flex-1">Send a message...</span>
            <span className="w-7 h-7 rounded-full bg-sage-500 text-white flex items-center justify-center">→</span>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex justify-around py-2 border-t border-sage-100 bg-cream-50">
          <span className="text-xs">💬</span>
          <span className="text-xs">👥</span>
          <span className="text-xs">🧠</span>
          <span className="text-xs">⚙️</span>
        </div>
      </div>
    </div>
  );
}

function Bubble({ side, children }: { side: "left" | "right"; children: React.ReactNode }) {
  return (
    <div className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[70%] px-3 py-1.5 rounded-2xl text-xs ${
          side === "right"
            ? "bg-sage-500 text-white rounded-br-md"
            : "bg-white text-charcoal-700 rounded-bl-md"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

function FeatureRow({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <li className="flex items-start gap-4">
      <span className="text-3xl shrink-0">{icon}</span>
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal-700">{title}</h3>
        <p className="mt-1 text-charcoal-500 leading-relaxed">{body}</p>
      </div>
    </li>
  );
}

function Card({ title, tone, children }: { title: string; tone: "good" | "bad"; children: React.ReactNode }) {
  const accent = tone === "good" ? "border-sage-300 text-sage-800 bg-sage-50" : "border-mist-300 text-mist-700 bg-mist-50";
  return (
    <div className={`rounded-2xl border-2 p-6 ${accent}`}>
      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold">{title}</h3>
      <ul className="mt-3 space-y-1.5 text-sm text-charcoal-500 list-disc list-inside marker:text-sage-400">
        {children}
      </ul>
    </div>
  );
}

function FauxStoreBadge({ store }: { store: string }) {
  return (
    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-charcoal-700 text-cream-50 border border-charcoal-500">
      <span className="text-2xl">{store === "App Store" ? "" : "▷"}</span>
      <span className="text-left">
        <span className="block text-[10px] uppercase tracking-wider opacity-70">Coming soon</span>
        <span className="block text-sm font-bold">{store}</span>
      </span>
    </div>
  );
}
