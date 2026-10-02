import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Support — LipaBill",
  description:
    "Get help with LipaBill — the offline-first wallet for money, payments, and tickets.",
};

export default function SupportPage() {
  return (
    <main className="flex-1 bg-paper">
      <div className="blob-field border-b border-line/70">
        <SiteHeader solid />
      </div>

      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
          Support
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          We’re here to help
        </h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
          LipaBill is launching soon. In the meantime, here’s how to reach us
          and what the app is for.
        </p>

        <section className="mt-12 rounded-2xl border border-line bg-sky-soft/50 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue">
            Status
          </p>
          <p className="mt-2 text-xl font-semibold text-ink">Launching soon</p>
          <p className="mt-2 text-ink-soft">
            LipaBill isn’t on the Play Store yet. We’ll share the download link
            here when it’s ready.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">Contact</h2>
          <p className="mt-3 text-ink-soft">
            Email{" "}
            <a
              className="font-medium text-blue hover:underline"
              href="mailto:mboya.codes@gmail.com"
            >
              mboya.codes@gmail.com
            </a>
            . Tell us your device model and Android version if you’re reporting
            a problem — it helps us respond faster.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">
            What LipaBill is for
          </h2>
          <ul className="mt-4 space-y-4 text-ink-soft">
            <li>
              <strong className="text-ink">Send &amp; pay</strong>
              <p className="mt-1">
                Move money to people and businesses you choose, with a clear
                confirm step before anything goes out.
              </p>
            </li>
            <li>
              <strong className="text-ink">See your spending</strong>
              <p className="mt-1">
                Keep history and insights on this phone so you know where money
                went — even with little or no internet.
              </p>
            </li>
            <li>
              <strong className="text-ink">Tickets in one place</strong>
              <p className="mt-1">
                Hold event and travel passes next to your wallet and show them
                when you need to.
              </p>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">
            Common questions
          </h2>
          <div className="mt-6 space-y-6">
            <Faq
              q="Is LipaBill a bank or Safaricom?"
              a="No. LipaBill is an independent app that helps you manage M-Pesa activity and tickets on your phone. M-Pesa is a trademark of Safaricom PLC."
            />
            <Faq
              q="Does my data live in the cloud?"
              a="Your transaction history and tickets stay on your device. We don’t create a LipaBill cloud account for your ledger. Read more in our privacy policy."
            />
            <Faq
              q="Do I have to allow every permission?"
              a="No. SMS, contacts, camera, and similar permissions are optional. You can deny any of them and still use the parts of the app that don’t need them."
            />
            <Faq
              q="When can I download it?"
              a="We’re preparing the Android launch. Check back here, or email us if you’d like to be notified."
            />
          </div>
        </section>

        <p className="mt-14 text-sm text-mute">
          Privacy details:{" "}
          <Link href="/privacy" className="font-medium text-blue hover:underline">
            lipabill privacy policy
          </Link>
          .
        </p>
      </article>

      <SiteFooter />
    </main>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h3 className="font-semibold text-ink">{q}</h3>
      <p className="mt-2 leading-relaxed text-ink-soft">{a}</p>
    </div>
  );
}
