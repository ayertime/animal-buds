import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-sage-100 bg-sage-50/50">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-10 md:grid-cols-4 text-sm">
        <div className="md:col-span-2">
          <p className="font-[family-name:var(--font-display)] text-xl font-bold text-sage-700">Animal Buds</p>
          <p className="mt-3 text-charcoal-500 max-w-sm leading-relaxed">
            A stuffed bear with a tummy screen for messages from the people who love you.
            Built to ease homesickness and help students feel less alone.
          </p>
          <p className="mt-4 text-xs text-charcoal-300">
            If you&apos;re in crisis, please reach out: call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline, US).
          </p>
        </div>

        <div>
          <h4 className="font-bold text-charcoal-700 mb-3">Shop</h4>
          <ul className="space-y-2 text-charcoal-500">
            <li><Link href="/shop" className="hover:text-sage-600">The Bear</Link></li>
            <li><Link href="/customize" className="hover:text-sage-600">Customize</Link></li>
            <li><Link href="/cart" className="hover:text-sage-600">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-charcoal-700 mb-3">Learn</h4>
          <ul className="space-y-2 text-charcoal-500">
            <li><Link href="/how-it-works" className="hover:text-sage-600">How It Works</Link></li>
            <li><Link href="/app" className="hover:text-sage-600">The App</Link></li>
            <li><Link href="/about" className="hover:text-sage-600">About Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sage-100">
        <div className="max-w-6xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-300">
          <p>© {new Date().getFullYear()} Animal Buds — A class project.</p>
          <p>Made with care for students far from home.</p>
        </div>
      </div>
    </footer>
  );
}
