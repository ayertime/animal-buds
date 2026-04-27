import Link from "next/link";

export const metadata = {
  title: "About — Animal Buds",
  description: "Why we built Animal Buds — the mission, the science, and the people behind it.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-14">
      {/* HERO */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs font-bold tracking-widest uppercase text-sage-600">Our Story</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl font-bold text-charcoal-700">
          Comfort, in your corner.
        </h1>
        <p className="mt-4 text-lg text-charcoal-500 leading-relaxed">
          Animal Buds started with a question: what if a stuffed animal could carry the
          warmth of the people who love you, even when they&apos;re hours away?
        </p>
      </div>

      {/* PERSONAL STORY */}
      {/* TODO (your team): Replace this with your actual story.
          Why did your group decide to build this? What moment sparked it?
          A real story is more powerful than a generic one. */}
      <section className="mt-16 grid md:grid-cols-[180px_1fr] gap-8 items-start">
        <div className="text-7xl text-center md:text-left">💗</div>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal-700">
            Why we built this.
          </h2>
          <p className="mt-3 text-charcoal-500 leading-relaxed">
            Moving away from home — for college, for a new school, for a job — is supposed
            to be exciting. But for a lot of us, it&apos;s lonely. Texts go unanswered.
            Phone calls feel formal. The dorm room is quieter than expected.
          </p>
          <p className="mt-3 text-charcoal-500 leading-relaxed">
            We wanted to build something physical. Something you could squeeze. A reminder
            that the people who love you are still right here — even when they aren&apos;t.
          </p>
          <p className="mt-3 text-charcoal-500 leading-relaxed">
            That&apos;s Animal Buds. A soft bear. A glowing tummy screen. A friend.
          </p>
        </div>
      </section>

      {/* THE NUMBERS */}
      <section className="mt-20">
        <h2 className="text-center font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal-700">
          Why this matters.
        </h2>
        <p className="text-center text-charcoal-500 mt-2 max-w-xl mx-auto">
          Student mental health is at a critical point. The numbers tell us we&apos;re not alone.
        </p>

        <div className="mt-10 grid sm:grid-cols-3 gap-5">
          <Stat
            number="60%"
            label="of college students reported overwhelming anxiety in the past year"
            source="ACHA, 2023"
          />
          <Stat
            number="1 in 3"
            label="first-year students experience persistent homesickness"
            source="Journal of College Student Development"
          />
          <Stat
            number="44%"
            label="of students say loneliness affects their academic performance"
            source="Healthy Minds Network"
          />
        </div>

        <p className="mt-6 text-xs text-charcoal-300 text-center max-w-xl mx-auto">
          {/* TODO: Verify these stats with current sources before publishing. Placeholders for the demo. */}
          Statistics for illustrative use in a class project — verify before publication.
        </p>
      </section>

      {/* HOW IT HELPS */}
      <section className="mt-20 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-sage-50 border border-sage-100 p-7">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-sage-800">
            Tactile comfort
          </h3>
          <p className="mt-2 text-charcoal-500 leading-relaxed">
            Research shows that hugging a soft object lowers cortisol — the stress
            hormone — and triggers oxytocin release. The bear is physically calming,
            even before the screen lights up.
          </p>
        </div>
        <div className="rounded-2xl bg-mist-50 border border-mist-100 p-7">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-mist-700">
            Connection on demand
          </h3>
          <p className="mt-2 text-charcoal-500 leading-relaxed">
            A message from someone who loves you, delivered to a thing in your arms.
            It&apos;s lower-pressure than a call, more present than a text. A small thing
            that means a lot at the right moment.
          </p>
        </div>
        <div className="rounded-2xl bg-lavender-100 border border-lavender-200 p-7">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-lavender-500">
            A safe network
          </h3>
          <p className="mt-2 text-charcoal-500 leading-relaxed">
            Friends-only messaging means no strangers can ever reach your bear. You decide
            who&apos;s in your circle.
          </p>
        </div>
        <div className="rounded-2xl bg-cream-100 border border-cream-300 p-7">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal-700">
            Help when you need it
          </h3>
          <p className="mt-2 text-charcoal-500 leading-relaxed">
            The free app includes an AI companion trained <em>only</em> for mental health
            and anxiety. It listens, suggests resources, and can help bridge the gap to
            speaking with a real person — when you&apos;re ready.
          </p>
        </div>
      </section>

      {/* PROMISE */}
      <section className="mt-20 rounded-3xl bg-charcoal-700 text-cream-50 p-10 md:p-14 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
          Our promise.
        </h2>
        <ul className="mt-6 max-w-md mx-auto space-y-3 text-left">
          <Promise>The app is free, forever. No subscription.</Promise>
          <Promise>Your messages are private to you and your friends.</Promise>
          <Promise>The AI is for support, not diagnosis. We&apos;ll always point to real help.</Promise>
          <Promise>We don&apos;t sell your data. Ever.</Promise>
        </ul>
      </section>

      {/* CTA */}
      <section className="mt-16 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal-700">
          Ready to meet your Bud?
        </h2>
        <div className="mt-5 flex flex-wrap gap-3 justify-center">
          <Link
            href="/customize"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sage-500 text-white font-bold hover:bg-sage-600 transition-colors"
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
      </section>
    </div>
  );
}

function Stat({ number, label, source }: { number: string; label: string; source: string }) {
  return (
    <div className="rounded-2xl bg-white border border-sage-100 p-6 text-center">
      <p className="font-[family-name:var(--font-display)] text-4xl font-bold text-sage-700">{number}</p>
      <p className="mt-2 text-sm text-charcoal-500 leading-snug">{label}</p>
      <p className="mt-3 text-[10px] uppercase tracking-wider text-charcoal-300">{source}</p>
    </div>
  );
}

function Promise({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-sage-300 text-sage-900 text-xs font-bold flex items-center justify-center">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}
