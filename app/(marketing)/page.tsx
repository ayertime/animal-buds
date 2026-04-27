import Link from "next/link";
import PhotoWithBubbles from "@/components/photo-with-bubbles";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100 via-cream-50 to-cream-50" />
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_30%_20%,#a8c5a0_0,transparent_40%),radial-gradient(circle_at_70%_60%,#c4b5d9_0,transparent_45%)]" />
        <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-sage-200 text-sage-800">
              For students far from home
            </span>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold leading-tight text-charcoal-700">
              A hug that{" "}
              <span className="text-sage-600">carries messages</span>
              {" "}from home.
            </h1>
            <p className="mt-5 text-lg text-charcoal-500 max-w-lg leading-relaxed">
              Animal Buds is a soft stuffed bear with a tummy screen that lights up with
              messages from the people who love you. Built for students dealing with
              homesickness and social anxiety — because comfort should never feel far away.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/customize"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sage-500 text-white font-bold hover:bg-sage-600 transition-colors shadow-lg shadow-sage-500/20"
              >
                Build Your Bud →
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-sage-200 text-sage-700 font-bold hover:bg-sage-50 transition-colors"
              >
                See How It Works
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-charcoal-500">
              <Stat label="Free app" value="$0" />
              <span className="w-px h-8 bg-sage-200" />
              <Stat label="Starting at" value="$42" />
              <span className="w-px h-8 bg-sage-200" />
              <Stat label="Friends-only" value="Safe" />
            </div>
          </div>

          <div className="relative">
            <PhotoWithBubbles />
          </div>
        </div>
      </section>

      {/* MISSION STRIP */}
      <section className="bg-sage-700 text-cream-50">
        <div className="max-w-6xl mx-auto px-5 py-12 md:py-14 text-center">
          <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl leading-snug max-w-3xl mx-auto">
            Loneliness is one of the biggest challenges students face when they leave home.
            <span className="text-sage-200"> We&apos;re here to make it a little smaller.</span>
          </p>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold text-charcoal-700">
            Comfort you can hold.
          </h2>
          <p className="mt-3 text-charcoal-500 text-lg">
            Three things that make Animal Buds different from a normal stuffed animal.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Pillar
            icon="💌"
            title="Real messages, real-time"
            body="When a friend sends you a note in the app, it shows up on your bear's tummy screen. Squeeze. Read. Smile."
          />
          <Pillar
            icon="🛡️"
            title="Safe by design"
            body="Friends-only messaging means no strangers, no spam. You decide who can send notes to your Bud."
          />
          <Pillar
            icon="🌱"
            title="Always-on support"
            body="The free app includes an AI chatbot trained only for mental health and anxiety — to listen, suggest resources, and help you take the next step."
          />
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-mist-200 via-cream-100 to-lavender-200 p-10 md:p-14 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-charcoal-700">
            Build a Bud for someone you miss.
          </h2>
          <p className="mt-3 text-charcoal-500 max-w-xl mx-auto">
            Pick a name, dress them up, and send them off with a tummy full of love.
            One purchase, no subscription, no extra fees.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link
              href="/customize"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal-700 text-cream-50 font-bold hover:bg-charcoal-900 transition-colors"
            >
              Start Customizing →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-charcoal-700 font-bold hover:bg-cream-100 transition-colors border border-cream-300"
            >
              Why We Built This
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-sage-700">
        {value}
      </p>
      <p className="text-xs uppercase tracking-wider text-charcoal-300 mt-0.5">{label}</p>
    </div>
  );
}

function Pillar({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-white border border-sage-100 p-7 hover:shadow-lg hover:border-sage-200 transition-all">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-charcoal-700">
        {title}
      </h3>
      <p className="mt-2 text-charcoal-500 leading-relaxed">{body}</p>
    </div>
  );
}
