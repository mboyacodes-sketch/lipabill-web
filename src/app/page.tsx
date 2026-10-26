import Image from "next/image";
import Link from "next/link";
import { ConnectorLines } from "@/components/ConnectorLines";
import {
  OrbitScale,
  OrbitScaleProvider,
} from "@/components/InverseBrowserZoom";
import { JsonLd } from "@/components/JsonLd";
import { LaunchPromo } from "@/components/LaunchCountdown";
import { NotifyForm } from "@/components/NotifyForm";
import { PassesShowcase } from "@/components/PassesShowcase";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { faqJsonLd, homeFaqs, softwareApplicationJsonLd } from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "See your money",
    body: "Balance and history from the M-Pesa texts you already get.",
  },
  {
    n: "02",
    title: "Send and pay",
    body: "Even when data is weak. You confirm before anything leaves.",
  },
  {
    n: "03",
    title: "Show a pass",
    body: "SGR and event tickets, ready at the gate.",
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

      <OrbitScaleProvider>
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
                For M-Pesa on Android in Kenya
              </p>
              <h1 className="mt-3 text-[clamp(2.4rem,1.5rem+2.6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-ink">
                Your M-Pesa,
                <br />
                <span className="text-blue">on this phone.</span>
              </h1>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
                See what you spent. Send and pay when data is weak. Keep SGR
                tickets next to your wallet.
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-mute">
                Built from the M-Pesa confirmation texts you already get. They
                stay on this phone.
              </p>
              <LaunchPromo className="mt-8" />
              <div id="notify" className="mt-6 w-full max-w-md scroll-mt-24">
                <NotifyForm />
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto w-[min(68%,16.5rem)] xl:hidden">
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 -z-10 h-[130%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.2),transparent_68%)]"
                />
                <PhoneShot />
              </div>

              <div
                id="orbit-wide"
                className="relative hidden h-[40rem] xl:block"
              >
                <ConnectorLines stageId="orbit-wide" />
                <div
                  aria-hidden
                  className="bg-halo !top-1/2 !h-[42rem] !w-[42rem]"
                />

                <div
                  data-orbit-hub
                  className="absolute left-1/2 top-1/2 z-20 w-[15rem] -translate-x-1/2 -translate-y-1/2"
                >
                  <div
                    className="phone-tilt relative"
                    style={{ ["--phone-tilt" as string]: "-5deg" }}
                  >
                    <OrbitScale>
                      <PhoneShot />
                    </OrbitScale>
                  </div>
                </div>

                <div className="absolute left-2 top-[5%] z-30 w-[12.25rem]">
                  <OrbitScale>
                    <div
                      data-orbit-spoke
                      className="float-card tilt p-4"
                      style={{ ["--tilt" as string]: "-7deg" }}
                    >
                      <p className="text-[0.7rem] font-medium uppercase tracking-wide text-mute">
                        Everything in one place
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <div
                          className="h-14 w-14 shrink-0 rounded-full"
                          style={{
                            background:
                              "conic-gradient(#2f6bff 0 52%, #9cbcff 52% 78%, #e8eef8 78% 100%)",
                          }}
                        />
                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="h-2 rounded-full bg-sky" />
                          <div className="h-2 w-[80%] rounded-full bg-sky/70" />
                          <div className="h-2 w-[55%] rounded-full bg-sky/50" />
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-1.5">
                        {(
                          [
                            { label: "Send", href: "/#notify" },
                            { label: "Pay", href: "/#notify" },
                            { label: "Receive", href: "/#passes" },
                            { label: "Passes", href: "/#passes" },
                          ] as const
                        ).map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="rounded-lg bg-sky-soft px-1 py-2 text-center text-[0.55rem] font-medium text-blue-deep hover:bg-sky"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </OrbitScale>
                </div>

                <div className="absolute bottom-[4%] left-2 z-30 w-[13.5rem]">
                  <OrbitScale>
                    <div data-orbit-spoke className="flex flex-col gap-2.5">
                      <StepCard
                        className="tilt tilt-delay"
                        tilt="-4deg"
                        n="1"
                        title="See your money"
                        body="History from the M-Pesa texts you already get."
                      />
                      <StepCard
                        className="tilt"
                        tilt="3deg"
                        n="2"
                        title="Send and pay"
                        body="Even when data is weak. You confirm first."
                      />
                      <StepCard
                        className="tilt tilt-slow"
                        tilt="-5deg"
                        n="3"
                        title="Show a pass"
                        body="SGR and event tickets, ready at the gate."
                      />
                    </div>
                  </OrbitScale>
                </div>

                <div className="absolute right-3 top-[6%] z-30 w-[12.25rem]">
                  <OrbitScale>
                    <div
                      data-orbit-spoke
                      className="float-card tilt tilt-delay p-4"
                      style={{ ["--tilt" as string]: "6deg" }}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-[0.7rem] font-medium uppercase tracking-wide text-mute">
                          Clarity
                        </p>
                        <span className="rounded-md bg-sky px-2 py-0.5 text-[0.65rem] font-medium text-blue-deep">
                          Insights
                        </span>
                      </div>
                      <div className="mt-4 flex h-20 items-end gap-1.5">
                        {[35, 55, 42, 70, 48, 85, 62, 90, 58].map((h, i) => (
                          <span
                            key={i}
                            className="flex-1 rounded-t-md bg-blue/85"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-ink-soft">
                        See how you spend — at a glance
                      </p>
                    </div>
                  </OrbitScale>
                </div>

                <div className="absolute bottom-[5%] right-3 z-30 w-[14rem]">
                  <OrbitScale>
                    <div
                      data-orbit-spoke
                      className="float-card tilt p-4"
                      style={{ ["--tilt" as string]: "5deg" }}
                    >
                      <p className="text-base font-semibold text-ink">
                        Passes &amp; QR codes
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-mute">
                        Event and SGR QR or barcode passes — scan or import,
                        then show offline at the gate. Flight boarding coming
                        soon.
                      </p>
                      <TicketIllustration />
                    </div>
                  </OrbitScale>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      </OrbitScaleProvider>

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

      <section className="border-t border-line/70 bg-mist px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
            What LipaBill does
          </p>
          <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Your M-Pesa picture, on this phone.
          </h2>
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
            LipaBill is not a new bank, and it is not Safaricom. It is where
            your M-Pesa history lives on this phone — so you can see what went
            out, send and pay, and keep tickets next to your wallet.
          </p>
          <div className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2">
            <Feature
              label="History"
              title="See what you spent"
              body="Built from the M-Pesa confirmation texts you already get. Balance, history, Fuliza, savings, and airtime — on this phone, not in a LipaBill account."
              href="/mpesa"
            />
            <Feature
              label="Send &amp; Pay"
              title="Confirm before anything goes out"
              body="Send to a person, or pay Paybill, till, or Pochi. You confirm the amount and who gets paid. Then M-Pesa runs on this phone — even when data is weak."
              href="/mpesa"
            />
            <Feature
              label="Passes"
              title="Show the code at the gate"
              body="Keep event tickets and SGR / Madaraka Express next to your wallet. Open them at the gate even without data. Reminders before you travel."
              href="/sgr"
            />
            <Feature
              label="Again — or get paid"
              title="Repeat a payment, or share a QR"
              body="Run a past payment again, or share a QR so someone can pay your phone, till, or paybill."
            />
            <Feature
              label="Insights"
              title="See where money went"
              body="Charts from history already on your phone. Optional no-spend challenges if you want them."
            />
            <Feature
              label="On this phone"
              title="Locked to you"
              body="Fingerprint, face, or your phone PIN. Hide the balance until you tap. Uninstall, and that history leaves with the app."
            />
          </div>
        </div>
      </section>

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
            On this phone
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Your history stays on this phone.
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
            Payments, tickets, and settings live under your fingerprint, face,
            or phone PIN. There is no LipaBill account that holds your M-Pesa
            picture. Uninstall, and it leaves with the app.
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

function PhoneShot() {
  return (
    <div className="overflow-hidden rounded-[2.4rem] border-[0.4rem] border-[#1a1a1a] bg-[#1a1a1a] shadow-[0_32px_70px_-24px_rgba(15,28,51,0.45)]">
      <div className="relative aspect-[9/19.2]">
        <Image
          src="/screenshots/homepage.png"
          alt="LipaBill home — balance, send, pay, tickets, and recent transactions"
          fill
          priority
          className="object-cover object-top"
          sizes="(min-width: 1280px) 15rem, 70vw"
        />
      </div>
    </div>
  );
}

function TicketIllustration() {
  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-sky-soft to-white p-3">
      <div className="flex gap-3">
        <div className="flex h-14 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-blue text-white">
          <span className="text-[0.55rem] font-medium uppercase opacity-80">
            Pass
          </span>
          <span className="mt-0.5 text-base font-semibold leading-none">QR</span>
        </div>
        <div className="min-w-0 flex-1 space-y-2 py-1">
          <div className="h-2.5 w-[70%] rounded-full bg-ink/15" />
          <div className="h-2 w-[90%] rounded-full bg-ink/10" />
          <div className="h-2 w-[50%] rounded-full bg-ink/10" />
        </div>
      </div>
    </div>
  );
}

function StepCard({
  n,
  title,
  body,
  className = "",
  tilt = "0deg",
}: {
  n: string;
  title: string;
  body: string;
  className?: string;
  tilt?: string;
}) {
  return (
    <div
      className={`float-card flex gap-3 p-3 ${className}`}
      style={{ ["--tilt" as string]: tilt }}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky text-sm font-semibold text-blue">
        {n}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-xs leading-snug text-mute">{body}</p>
      </div>
    </div>
  );
}
