import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "How It Works — Animal Buds",
  description: "Inside the bear, and the journey from app to tummy screen.",
};

export default function HowItWorksPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      {/* HERO */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs font-bold tracking-widest uppercase text-sage-600">How It Works</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl font-bold text-charcoal-700">
          A bear, but smarter.
        </h1>
        <p className="mt-3 text-charcoal-500 text-lg">
          From the soft plush exterior to the LCD tummy and tiny ear speakers — every part
          is built to deliver a hug from afar.
        </p>
      </div>

      {/* THE BEAR DIAGRAM */}
      <section className="mt-14 rounded-3xl bg-gradient-to-br from-cream-100 to-mist-100 p-8 md:p-14">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden bg-white shadow-xl">
            <Image
              src="/images/Picture2.png"
              alt="Animal Buds bear feature map: plush body, stomach screen, ear speakers, USB-C charging, on/off button, volume slider"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal-700">
              Inside the Bud
            </h2>
            <p className="mt-2 text-charcoal-500">
              Five hidden features, one cuddly package.
            </p>

            <ul className="mt-6 space-y-4">
              <Feature icon="📺" title="LCD Tummy Screen">
                A bright, low-power screen tucked behind a soft fabric flap. It shows
                messages from your friends — and turns off when you do.
              </Feature>
              <Feature icon="🔊" title="Ear Speakers">
                Tiny speakers in each ear so voice notes feel intimate, like someone&apos;s
                whispering close.
              </Feature>
              <Feature icon="🔋" title="USB-C Charging">
                Multi-day battery, easy charging with the cable you already have.
              </Feature>
              <Feature icon="⏻" title="On/Off Button">
                Press to wake the screen. Auto-sleeps to save power.
              </Feature>
              <Feature icon="🔉" title="Volume Slider">
                Subtle slide control on the side — quiet for class, louder for home.
              </Feature>
            </ul>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="mt-20">
        <h2 className="text-center font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal-700">
          From their phone to your arms.
        </h2>
        <p className="text-center text-charcoal-500 mt-2 max-w-xl mx-auto">
          The whole journey takes about a second. The feeling lasts much longer.
        </p>

        <ol className="mt-12 grid md:grid-cols-4 gap-5">
          <Step
            num={1}
            icon="📱"
            title="A friend opens the app"
            body="They tap your Bud&apos;s name and type a message — just like texting."
          />
          <Step
            num={2}
            icon="☁️"
            title="The message travels"
            body="Through our secure servers — friends-only, never shared with strangers."
          />
          <Step
            num={3}
            icon="🐻"
            title="Your bear lights up"
            body="The tummy screen glows with their note. A little chime plays from the ears."
          />
          <Step
            num={4}
            icon="💗"
            title="You feel less alone"
            body="Squeeze. Read. Smile. Reply when you&apos;re ready."
          />
        </ol>
      </section>

      {/* SAFETY */}
      <section className="mt-20 rounded-3xl bg-sage-700 text-cream-50 p-10 md:p-14">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">Safety, by design.</h2>
          <p className="mt-3 text-sage-100 leading-relaxed">
            Animal Buds is built for kids, students, and anyone who needs a little extra
            care. So safety isn&apos;t an add-on — it&apos;s the foundation.
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-5 text-left">
            <SafetyItem title="Friends-only">
              No public profiles. No DMs from strangers. You approve every connection.
            </SafetyItem>
            <SafetyItem title="Parental controls">
              Parents can review the friends list and pause messaging at any time.
            </SafetyItem>
            <SafetyItem title="Crisis support">
              The AI companion can detect distress signals and surface real, vetted resources.
            </SafetyItem>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal-700">
          Ready to send a hug?
        </h2>
        <Link
          href="/customize"
          className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sage-500 text-white font-bold hover:bg-sage-600 transition-colors"
        >
          Build Your Bud →
        </Link>
      </section>
    </div>
  );
}

function Feature({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span className="text-2xl shrink-0 w-10 h-10 rounded-full bg-white border border-sage-100 flex items-center justify-center">
        {icon}
      </span>
      <div>
        <p className="font-bold text-charcoal-700">{title}</p>
        <p className="text-sm text-charcoal-500 mt-0.5 leading-relaxed">{children}</p>
      </div>
    </li>
  );
}

function Step({ num, icon, title, body }: { num: number; icon: string; title: string; body: string }) {
  return (
    <li className="rounded-2xl bg-white border border-sage-100 p-6 text-center">
      <div className="text-3xl">{icon}</div>
      <p className="mt-2 text-xs font-bold tracking-widest uppercase text-sage-600">Step {num}</p>
      <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-bold text-charcoal-700">{title}</p>
      <p className="mt-2 text-sm text-charcoal-500 leading-relaxed">{body}</p>
    </li>
  );
}

function SafetyItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-bold text-cream-50">🛡️ {title}</p>
      <p className="mt-2 text-sm text-sage-100 leading-relaxed">{children}</p>
    </div>
  );
}
