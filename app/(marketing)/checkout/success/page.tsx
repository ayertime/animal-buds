import Link from "next/link";
import BearPhoto from "@/components/bear-photo";

export const metadata = {
  title: "Order confirmed — Animal Buds",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; name?: string }>;
}) {
  const sp = await searchParams;
  const orderNumber = sp.order ?? "AB-DEMO";
  const name = sp.name ?? "friend";

  return (
    <div className="max-w-3xl mx-auto px-5 py-16 text-center">
      <div className="rounded-3xl bg-gradient-to-br from-sage-100 via-cream-100 to-mist-100 p-10 md:p-14">
        <div className="text-6xl">🎉</div>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-charcoal-700">
          Thank you, {name}!
        </h1>
        <p className="mt-3 text-charcoal-500 text-lg">
          Your order is confirmed. A Bud is on the way to spread some warmth.
        </p>

        <div className="mt-6 inline-block px-5 py-2.5 rounded-full bg-white border border-sage-200 text-sm">
          <span className="text-charcoal-300">Order number: </span>
          <span className="font-bold text-sage-700 tracking-wider">{orderNumber}</span>
        </div>

        <div className="mt-8 max-w-xs mx-auto">
          <BearPhoto size="md" />
          <p className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold text-charcoal-700">
            On my way, {name}!
          </p>
        </div>

        <div className="mt-10 text-left max-w-md mx-auto bg-white border border-sage-100 rounded-2xl p-6 space-y-3 text-sm text-charcoal-500">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-charcoal-700">What happens next?</h2>
          <Step n={1}>We&apos;ll send a confirmation email shortly.</Step>
          <Step n={2}>Your Bud ships in 3-5 business days.</Step>
          <Step n={3}>Download the free Animal Buds app and pair your Bud.</Step>
          <Step n={4}>Add friends and start sending notes. 💌</Step>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sage-500 text-white font-bold hover:bg-sage-600 transition-colors"
          >
            Learn About the App
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-sage-200 text-sage-700 font-bold hover:bg-sage-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-3">
      <span className="shrink-0 w-6 h-6 rounded-full bg-sage-200 text-sage-800 text-xs font-bold flex items-center justify-center">
        {n}
      </span>
      <span>{children}</span>
    </p>
  );
}
