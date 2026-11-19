import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LaunchPromo } from "@/components/LaunchPromo";
import { NotifyForm } from "@/components/NotifyForm";
import { PassesShowcase } from "@/components/PassesShowcase";
import { RailsStage } from "@/components/RailsStage";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { SocialsShowcase } from "@/components/SocialsShowcase";
import { faqJsonLd, homeFaqs, softwareApplicationJsonLd } from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "See the story",
    body: "Where it went — rent, family, a till — from the confirmation texts you already get, across the wallets you pick.",
  },
  {
    n: "02",
    title: "Do the next thing",
    body: "Send, pay, get paid, or share a social code. Even when data is weak.",
  },
  {
    n: "03",
    title: "What it became",
    body: "The trip, the night out, a QR so someone can pay you.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [softwareApplicationJsonLd(), faqJsonLd()],
        }}
      />

      <section className="hero-soft relative overflow-hidden">
        <div className="relative z-10">
          <SiteHeader />
          <div className="mx-auto max-w-[90rem] px-5 pt-1 sm:px-8 xl:px-10">
            <p
              aria-hidden
              className="watermark text-center text-[clamp(3.4rem,13vw,8.75rem)]"
            >
              LipaBill
            </p>
          </div>
          <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-5 pb-16 pt-6 sm:px-8 xl:grid-cols-[minmax(22rem,32rem)_minmax(0,1fr)] xl:gap-8 xl:px-10 xl:pb-16 xl:pt-4">
            <div className="relative z-20 mx-auto flex w-full max-w-xl flex-col items-center text-center lg:mx-0 lg:max-w-none lg:items-start lg:text-left">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
                Local first · East Africa on Google Play
              </p>
              <h1 className="mt-3 text-[clamp(2.4rem,1.5rem+2.6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-ink">
                Your money has a story.
                <br />
                <span className="text-blue">See it clearly.</span>
              </h1>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
                Rent, family, a night out, the train you already booked.
                LipaBill brings that picture together — then you can send,
                pay, share a social code, or show a pass, even when data is
                weak.
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-mute">
                The ledger stays on this phone. You pick the wallets.
              </p>
              <a
                href="#rails"
                className="mt-4 text-sm font-medium text-blue hover:underline"
              >
                Kenya · Tanzania · Uganda · Rwanda
              </a>
              <LaunchPromo className="mt-8" />
              <div id="notify" className="mt-6 w-full max-w-md scroll-mt-24">
                <NotifyForm />
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[28rem] xl:max-w-[34rem]">
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.2),transparent_68%)]"
              />
              <PhoneFan />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line/70 bg-paper px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.n}
              className="rounded-2xl border border-line bg-white px-5 py-5"
            >
              <p className="text-sm font-semibold tabular-nums text-blue">{step.n}</p>
              <h2 className="mt-3 text-base font-semibold tracking-tight text-ink">
                {step.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-mute">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <RailsStage />

      <section className="border-t border-line/70 bg-mist px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
            See, then move
          </p>
          <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Seeing where it went is only the beginning.
          </h2>
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
            Every confirmation is rent, family, a till, a ticket. LipaBill
            puts that picture together on this phone so you can see what is
            shaping your money — then send, pay, or show the code from here.
            It is not a bank. Kenya, Tanzania, Uganda, and Rwanda are live on
            Google Play. Send and Pay still run on Kenya M-Pesa.
          </p>
          <div className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2">
            <Feature
              label="The picture"
              title="Where it actually went"
              body="Built from confirmation texts for the wallets and banks you pick in Kenya, Tanzania, Uganda, and Rwanda — M-Pesa, Airtel Money, MTN MoMo, KCB, and others. Balance and history stay on this phone, not in a LipaBill account."
              href="/mpesa"
            />
            <Feature
              label="What keeps costing you"
              title="See what is shaping your money"
              body="Charts from history already on your phone. Optional no-spend challenges and a short weekly check-in if you want them."
            />
            <Feature
              label="When it needs to move"
              title="Confirm, then send or pay"
              body="In Kenya, send to a person or pay a bill, till, or Pochi on M-Pesa. You confirm the amount and who gets paid. Then it runs on this phone — even when data is weak."
              href="/mpesa"
            />
            <Feature
              label="Money coming in"
              title="A QR so someone can pay you"
              body="Share a code or link for your phone, till, or paybill. Repeat a past payment when you need the same one again."
              href="/#passes"
            />
            <Feature
              label="Socials"
              title="Share the handles you already use"
              body="WhatsApp, Instagram, TikTok, and more on Request. Friends scan a code and land on your page — app if they have it, web if they don’t."
              href="/socials"
            />
            <Feature
              label="What it became"
              title="The trip or night you already paid for"
              body="An SGR seat or an event stub is the money already spent. Open the QR at the gate even without data."
              href="/sgr"
            />
            <Feature
              label="Yours"
              title="The picture stays with you"
              body="Fingerprint, face, or your phone PIN. Hide the balance until you tap. Uninstall, and that history leaves with the app."
            />
          </div>
        </div>
      </section>

      <SocialsShowcase />

      <PassesShowcase />

      <section
        id="faq"
        className="border-t border-line/70 bg-paper px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
            Questions
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Straight answers
          </h2>
          <div className="mt-10 space-y-8">
            {homeFaqs.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-ink">{item.question}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line/70 bg-mist px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
            Yours
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            That picture stays on this phone.
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
            Payments, tickets, and settings live under your fingerprint, face,
            or phone PIN. There is no LipaBill account that holds your money
            story. Uninstall, and it leaves with the app.
          </p>
          <p className="mt-6 text-sm text-mute">
            Details in our{" "}
            <Link href="/privacy" className="font-medium text-blue hover:underline">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Feature({
  label,
  title,
  body,
  href,
}: {
  label: string;
  title: string;
  body: string;
  href?: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue">
        {label}
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-3 leading-relaxed text-ink-soft">{body}</p>
      {href ? (
        <Link
          href={href}
          className="mt-3 inline-block text-sm font-medium text-blue hover:underline"
        >
          Read more
        </Link>
      ) : null}
    </div>
  );
}

const heroPhones: {
  src: string;
  alt: string;
  rotate: number;
  className: string;
  priority?: boolean;
}[] = [
  {
    src: "/screenshots/insights-day.jpg",
    alt: "LipaBill Insights — day by day calendar",
    rotate: -12,
    className: "left-[0%] top-[14%] z-10 w-[40%]",
  },
  {
    src: "/screenshots/send-money.jpg",
    alt: "LipaBill Send money — pick M-Pesa or Airtel Money",
    rotate: -4,
    className: "left-[18%] top-[9%] z-20 w-[40%]",
  },
  {
    src: "/screenshots/insights-overview.jpg",
    alt: "LipaBill Insights — coming up and compared with last period",
    rotate: 11,
    className: "left-[58%] top-[12%] z-10 w-[40%]",
  },
  {
    src: "/screenshots/home-ledger.jpg",
    alt: "LipaBill home — M-Pesa card, send, pay, insights, and passes",
    rotate: 0,
    className: "left-[34%] top-[2%] z-30 w-[44%]",
    priority: true,
  },
];

/** Same 4-phone fan as the Open Graph share card. */
function PhoneFan() {
  return (
    <div
      className="relative mx-auto aspect-[5/4] w-full"
      role="img"
      aria-label="LipaBill on four screens: home, send money, and Insights"
    >
      {heroPhones.map((phone) => (
        <div
          key={phone.src}
          className={`absolute ${phone.className}`}
          style={{ transform: `rotate(${phone.rotate}deg)` }}
        >
          <div className="overflow-hidden rounded-[1.55rem] border-[0.28rem] border-[#1a1a1a] bg-[#1a1a1a] shadow-[0_28px_60px_-24px_rgba(15,28,51,0.55)]">
            <div className="relative aspect-[9/19.2]">
              <Image
                src={phone.src}
                alt={phone.alt}
                fill
                priority={phone.priority === true}
                className="object-cover object-top"
                sizes="(min-width: 1280px) 12rem, 40vw"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

