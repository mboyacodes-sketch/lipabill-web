import Image from "next/image";

type PhoneProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

/** Device frame around a product screenshot — not a marketing card. */
export function Phone({ src, alt, priority = false, className = "" }: PhoneProps) {
  return (
    <div
      className={`relative mx-auto w-[min(100%,280px)] sm:w-[300px] ${className}`}
    >
      <div className="overflow-hidden rounded-[2rem] border border-line bg-ink shadow-[0_24px_60px_-28px_rgba(20,35,61,0.45)]">
        <div className="relative aspect-[9/19.5] bg-mist">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 280px, 300px"
            className="object-cover object-top"
            priority={priority}
          />
        </div>
      </div>
    </div>
  );
}

export function PhoneVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-[min(100%,280px)] sm:w-[300px] ${className}`}
    >
      <div className="overflow-hidden rounded-[2rem] border border-line bg-ink shadow-[0_24px_60px_-28px_rgba(20,35,61,0.45)]">
        <div className="relative aspect-[9/19.5] bg-mist">
          <video
            className="absolute inset-0 h-full w-full object-cover object-top"
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </div>
  );
}
