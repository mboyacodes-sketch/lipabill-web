import Image from "next/image";

const passes = [
  {
    src: "/passes/pass-event-qr.jpg",
    label: "Event pass",
    title: "QR at the stub",
    body: "Event tickets tear at the perforation — the QR sits on the stub you show at the door.",
  },
  {
    src: "/passes/pass-sgr.jpg",
    label: "SGR / Madaraka",
    title: "Rail barcode",
    body: "Nairobi ↔ Mombasa bookings with coach, seat, and a scan-ready barcode stub.",
  },
  {
    src: "/passes/pass-boarding.jpg",
    label: "Flight boarding",
    title: "Boarding QR",
    body: "Route, seat, and a boarding QR — outbound and return legs stay on the phone.",
  },
  {
    src: "/passes/pass-receive-qr.jpg",
    label: "Receive",
    title: "Pay-link QR",
    body: "Share a QR or link for your phone, till, or paybill so someone else can pay you.",
  },
] as const;

export function PassesShowcase() {
  return (
    <section
      id="passes"
      className="border-t border-line/70 bg-paper px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">
          Passes &amp; QR
        </p>
        <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          How passes look in LipaBill
        </h2>
        <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
          Mockups based on the in-app ticket and Receive screens — event QR
          stubs, SGR barcodes, flight boarding codes, and a shareable pay QR.
          Sample data only.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {passes.map((pass) => (
            <figure key={pass.src} className="flex flex-col">
              <div className="relative overflow-hidden rounded-2xl border border-line bg-mist shadow-[0_18px_40px_-28px_rgba(15,28,51,0.45)]">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={pass.src}
                    alt={`${pass.label}: ${pass.title}`}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1280px) 16rem, (min-width: 640px) 40vw, 90vw"
                  />
                </div>
              </div>
              <figcaption className="mt-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue">
                  {pass.label}
                </p>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-ink">
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
