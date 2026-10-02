import Image from "next/image";
import Link from "next/link";
import { ConnectorLines } from "@/components/ConnectorLines";
import {
  OrbitScale,
  OrbitScaleProvider,
} from "@/components/InverseBrowserZoom";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export default function Home() {
  return (
    <main className="flex-1">
      <OrbitScaleProvider>
      <section className="hero-soft relative min-h-[100svh] w-full overflow-x-clip">
        <div className="absolute inset-x-0 top-0 z-40">
          <SiteHeader />
        </div>

        <p
          aria-hidden
          className="watermark absolute left-1/2 top-[4.75rem] z-[2] hidden w-[min(94%,70rem)] -translate-x-1/2 text-center text-[clamp(3.5rem,9vw,9.5rem)] xl:block"
        >
          LipaBill
        </p>

        <div aria-hidden className="bg-halo" />

        <div
          id="orbit-wide"
          className="relative z-10 mx-auto hidden min-h-[100svh] w-full max-w-[100rem] xl:block"
        >
          <ConnectorLines stageId="orbit-wide" />

          <div
            data-orbit-hub
            className="absolute left-1/2 top-[54%] z-20 w-[clamp(16.5rem,19vw,22rem)] -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className="phone-tilt relative"
              style={{ ["--phone-tilt" as string]: "-5deg" }}
            >
              <PhoneShot sizes="22rem" />
            </div>
          </div>

          <div
            className="absolute left-[max(1.5rem,calc(50%-34rem))] top-[18%] z-30 w-[13.5rem] 2xl:left-[max(2rem,calc(50%-38rem))] 2xl:w-[14.5rem]"
          >
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
                    className="h-16 w-16 shrink-0 rounded-full"
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
                  {["Send", "Pay", "Tickets"].map((t) => (
                    <div
                      key={t}
                      className="rounded-lg bg-sky-soft px-1 py-2 text-center text-[0.6rem] font-medium text-blue-deep"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </OrbitScale>
          </div>

          <div
            className="absolute bottom-[12%] left-[max(1.5rem,calc(50%-36rem))] z-30 w-[17rem] 2xl:left-[max(2rem,calc(50%-40rem))] 2xl:w-[18.5rem]"
          >
            <OrbitScale>
              <div
                data-orbit-spoke
                className="flex flex-col gap-3"
              >
                <StepCard
                  className="tilt tilt-delay"
                  tilt="-4deg"
                  n="1"
                  title="Unlock your way"
                  body="Fingerprint, face, or your phone PIN."
                />
                <StepCard
                  className="tilt"
                  tilt="3deg"
                  n="2"
                  title="See your money"
                  body="Balance and history from M-Pesa confirmations."
                />
                <StepCard
                  className="tilt tilt-slow"
                  tilt="-5deg"
                  n="3"
                  title="Send, pay, board"
                  body="Move money — keep tickets ready offline."
                />
              </div>
            </OrbitScale>
          </div>

          <div
            className="absolute right-[max(1.5rem,calc(50%-34rem))] top-[16%] z-30 w-[14.5rem] 2xl:right-[max(2rem,calc(50%-38rem))] 2xl:w-[16rem]"
          >
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
                <div className="mt-4 flex h-24 items-end gap-1.5">
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

          <div
            className="absolute bottom-[11%] right-[max(1.5rem,calc(50%-36rem))] z-30 w-[18rem] 2xl:right-[max(2rem,calc(50%-40rem))] 2xl:w-[20rem]"
          >
            <OrbitScale>
              <div
                data-orbit-spoke
                className="float-card tilt p-5"
                style={{ ["--tilt" as string]: "5deg" }}
              >
                <p className="text-base font-semibold text-ink">
                  Your ticket wallet
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  Events, SGR, and more — show your pass when it counts.
                </p>
                <TicketIllustration />
                <ul className="mt-4 space-y-1.5 text-xs text-ink-soft">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue" /> Always
                    with you
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue/60" /> Works
                    offline
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky" /> Ready at the
                    gate
                  </li>
                </ul>
              </div>
            </OrbitScale>
          </div>

          <div
            className="absolute right-[max(12rem,calc(50%-20rem))] top-[42%] z-30 hidden w-[8.75rem] 2xl:block"
          >
            <OrbitScale>
              <div
                data-orbit-spoke
                className="float-card tilt tilt-slow p-3"
                style={{ ["--tilt" as string]: "-8deg" }}
              >
                <div className="relative mx-auto h-14 w-14">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "conic-gradient(#2f6bff 0 40%, #7aa3ff 40% 70%, #dcebff 70% 100%)",
                    }}
                  />
                  <div className="absolute inset-[28%] rounded-full bg-white" />
                </div>
                <p className="mt-2 text-center text-[0.65rem] font-medium text-mute">
                  On this phone
                </p>
              </div>
            </OrbitScale>
          </div>
        </div>

        <div className="relative z-30 mx-auto hidden max-w-2xl px-6 pb-10 pt-2 text-center xl:block">
          <h1 className="text-[clamp(1.6rem,1rem+1.4vw,2.4rem)] font-semibold tracking-tight text-ink">
            No internet? <span className="text-blue">No problem.</span>
          </h1>
          <p className="mt-2 text-ink-soft">
            Your wallet still works — balance, history, and tickets on this phone.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex rounded-xl bg-blue px-6 py-3 text-sm font-medium text-white">
              Launching soon
            </span>
          </div>
        </div>

        <div
          id="orbit-compact"
          className="relative z-10 flex flex-col px-4 pb-12 pt-20 xl:hidden"
        >
          <p className="text-center text-[clamp(2.25rem,11vw,3.5rem)] font-semibold tracking-[-0.05em] text-ink">
            LipaBill
          </p>
          <p className="mt-1 text-center text-xs font-medium uppercase tracking-[0.2em] text-blue">
            Offline-first wallet
          </p>

          <div className="relative z-20 mx-auto mt-8 w-[min(72%,18.5rem)]">
            <PhoneShot sizes="18.5rem" plain />
          </div>

          <div className="mt-10 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-ink">
              No internet? <span className="text-blue">No problem.</span>
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
              Balance, history, and tickets — on this phone.
            </p>
            <span className="mt-5 inline-flex rounded-xl bg-blue px-5 py-3 text-sm font-medium text-white">
              Launching soon
            </span>
          </div>

          <div className="mx-auto mt-10 grid w-full max-w-md gap-3">
            <div className="float-card p-4">
              <p className="text-[0.7rem] font-medium uppercase tracking-wide text-mute">
                One place
              </p>
              <p className="mt-2 text-sm font-semibold text-ink">
                Send · Pay · Tickets
              </p>
              <p className="mt-1.5 text-xs leading-snug text-mute">
                Move money and keep passes together on this device.
              </p>
            </div>

            <div className="float-card p-4">
              <p className="text-[0.7rem] font-medium uppercase tracking-wide text-mute">
                Clarity
              </p>
              <p className="mt-2 text-sm font-semibold text-ink">
                See how you spend
              </p>
              <div className="mt-3 flex h-14 items-end gap-1">
                {[40, 60, 45, 80, 55, 90].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-t bg-blue/85"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="float-card p-4">
              <p className="text-sm font-semibold text-ink">Your ticket wallet</p>
              <p className="mt-1.5 text-xs leading-snug text-mute">
                Events and SGR — ready offline at the gate.
              </p>
              <TicketIllustration />
            </div>

            <div className="flex flex-col gap-3">
              <StepCard
                n="1"
                title="Unlock your way"
                body="Biometrics or phone PIN."
              />
              <StepCard
                n="2"
                title="See your money"
                body="Balance and history on this phone."
              />
              <StepCard
                n="3"
                title="Send, pay, board"
                body="Tickets stay ready offline."
              />
            </div>
          </div>
        </div>
      </section>
      </OrbitScaleProvider>

      <section className="border-t border-line/70 bg-paper px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
            What LipaBill does
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            An M-Pesa companion that lives on your phone.
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
            LipaBill helps you send money, pay merchants, follow spending, and keep
            tickets handy — built around Safaricom M-Pesa on Android. It is not a
            bank and not Safaricom.
          </p>
        </div>
      </section>

      <section className="border-t border-line/70 bg-mist px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-2 lg:gap-16">
          <Feature
            label="Send &amp; pay"
            title="Confirm before anything goes out"
            body="Send to people you choose, or pay Paybill, Till, and Pochi. LipaBill prepares the payment — you confirm the amount and recipient before it leaves."
          />
          <Feature
            label="History"
            title="Balance from confirmation SMS"
            body="With optional SMS permission, LipaBill reads M-Pesa confirmation messages to show available balance and a local transaction list. Your ledger stays encrypted on the device."
          />
          <Feature
            label="Insights"
            title="See where money went"
            body="Charts and totals for income and spending over the dates you care about — built from the history already on your phone, even when signal is weak."
          />
          <Feature
            label="Tickets"
            title="Passes ready at the gate"
            body="Keep event tickets and SGR boarding passes next to your wallet. Scan a code or pull booking details, then open the pass offline when you need it."
          />
        </div>
      </section>

      <section className="border-t border-line/70 bg-paper px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
            On this phone
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            No LipaBill cloud account for your ledger.
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
            Payments history, tickets, and settings stay on the device under lock —
            fingerprint, face, or your phone PIN. Clear app storage or uninstall and
            that on-device data goes with it. Optional permissions (SMS, contacts,
            camera) only unlock the features that need them.
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

      <section
        id="brand"
        className="border-t border-line/70 bg-mist px-5 py-16 text-center sm:px-8"
      >
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue">
          Coming to Android
        </p>
        <h2 className="mx-auto mt-3 max-w-xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          LipaBill is launching soon.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">
          We&apos;ll share the download link here when it&apos;s ready. Questions
          now?{" "}
          <Link href="/support" className="font-medium text-blue hover:underline">
            Get support
          </Link>
          .
        </p>
        <span className="mt-8 inline-flex rounded-xl bg-blue px-7 py-3.5 text-sm font-medium text-white">
          Launching soon
        </span>
      </section>

      <SiteFooter />
    </main>
  );
}

function Feature({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue">
        {label}
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">
        {title}
      </h3>
      <p className="mt-3 leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}

function PhoneShot({
  sizes,
  plain = false,
}: {
  sizes: string;
  plain?: boolean;
}) {
  const frame = (
    <div className="overflow-hidden rounded-[2.6rem] border-[0.45rem] border-[#1a1a1a] bg-[#1a1a1a] shadow-[0_40px_90px_-20px_rgba(15,28,51,0.55)]">
      <div className="relative aspect-[9/19.2]">
        <Image
          src="/screenshots/homepage.png"
          alt="LipaBill home — M-PESA balance, send, pay, metrics, tickets, and recent transactions"
          fill
          priority
          className="object-cover object-top"
          sizes={sizes}
        />
      </div>
    </div>
  );

  if (plain) return frame;
  return <OrbitScale>{frame}</OrbitScale>;
}

function TicketIllustration() {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-sky-soft to-white p-3">
      <div className="flex gap-3">
        <div className="flex h-16 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-blue text-white">
          <span className="text-[0.55rem] font-medium uppercase opacity-80">
            Pass
          </span>
          <span className="mt-0.5 text-lg font-semibold leading-none">QR</span>
        </div>
        <div className="min-w-0 flex-1 space-y-2 py-1">
          <div className="h-2.5 w-[70%] rounded-full bg-ink/15" />
          <div className="h-2 w-[90%] rounded-full bg-ink/10" />
          <div className="h-2 w-[50%] rounded-full bg-ink/10" />
          <div className="mt-1 flex gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="h-3 w-1 rounded-sm bg-ink/25"
                style={{ opacity: i % 3 === 0 ? 0.5 : 1 }}
              />
            ))}
          </div>
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
  const tilted = Boolean(className.includes("tilt"));
  return (
    <div
      className={`float-card flex gap-3 p-3.5 ${className}`}
      style={tilted ? { ["--tilt" as string]: tilt } : undefined}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky text-sm font-semibold text-blue">
        {n}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-xs leading-snug text-mute">{body}</p>
      </div>
    </div>
  );
}
