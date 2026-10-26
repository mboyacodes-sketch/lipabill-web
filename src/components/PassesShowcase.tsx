import Image from "next/image";

const passes = [
  {
    src: "/passes/pass-event-qr.jpg",
    label: "Event pass",
    title: "QR at the stub",
    body: "Event tickets tear at the perforation — the QR sits on the stub you show at the door.",
    comingSoon: false,
  },
  {
    src: "/passes/pass-sgr.jpg",
    label: "SGR / Madaraka",
    title: "Rail barcode",
    body: "Nairobi ↔ Mombasa bookings with coach, seat, and a scan-ready barcode stub.",
    comingSoon: false,
  },
  {
    src: "/passes/pass-boarding.jpg",
    label: "Flight boarding",
    title: "Boarding QR",
    body: "Flight boarding passes with route, seat, and gate QR — coming to LipaBill next.",
    comingSoon: true,
  },
  {
    src: "/passes/pass-receive-qr.jpg",
    label: "Receive",
    title: "Pay-link QR",
    body: "Share a QR or link for your phone, till, or paybill so someone else can pay you.",
    comingSoon: false,
  },
] as const;

export function PassesShowcase() {
  return (
    <section
      id="passes"
      className="border-t border-line/70 bg-paper px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start gap-3">
          <Image
            src="/brand/lipabill-logo.png"
            alt=""
            width={40}
            height={40}
            className="mt-0.5 h-10 w-10 shrink-0"
          />
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
              Passes &amp; QR
            </p>
            <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Tickets next to your wallet
            </h2>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
          SGR and event tickets sit beside your M-Pesa history. Open them at
          the gate even without data. Flight boarding is coming later.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {passes.map((pass) => (
            <figure key={pass.src} className="flex flex-col">
              <div
                className={`relative overflow-hidden rounded-2xl border border-line bg-mist shadow-[0_18px_40px_-28px_rgba(15,28,51,0.45)] ${
                  pass.comingSoon ? "opacity-55" : ""
                }`}
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={pass.src}
                    alt={
                      pass.comingSoon
                        ? `${pass.label} (coming soon)`
                        : `${pass.label}: ${pass.title}`
                    }
                    fill
                    className={`object-cover object-top ${
                      pass.comingSoon ? "grayscale" : ""
                    }`}
                    sizes="(min-width: 1280px) 16rem, (min-width: 640px) 40vw, 90vw"
                  />
                  {pass.comingSoon ? (
                    <div className="pointer-events-none absolute inset-0 flex items-start justify-end bg-ink/10 p-3">
                      <span className="rounded-full bg-ink/85 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white">
                        Coming soon
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
              <figcaption className="mt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue">
                    {pass.label}
                  </p>
                  {pass.comingSoon ? (
                    <span className="rounded-full bg-mist px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-mute ring-1 ring-line">
                      Coming soon
                    </span>
                  ) : null}
                </div>
                <h3
                  className={`mt-1.5 text-lg font-semibold tracking-tight ${
                    pass.comingSoon ? "text-mute" : "text-ink"
                  }`}
                >
                  {pass.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {pass.body}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
