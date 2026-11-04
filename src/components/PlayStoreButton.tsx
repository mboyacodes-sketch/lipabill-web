import { playStore } from "@/lib/site";

type PlayStoreButtonProps = {
  className?: string;
  /** Black badge on light surfaces; white badge on dark or blue. */
  tone?: "onLight" | "onDark";
};

export function PlayStoreButton({
  className = "",
  tone = "onLight",
}: PlayStoreButtonProps) {
  const live = playStore.enabled;
  const onDark = tone === "onDark";

  return (
    <a
      href={playStore.url}
      aria-label={
        live
          ? "Get it on Google Play (opens in a new tab)"
          : "Get it on Google Play, available on launch day"
      }
      aria-disabled={live ? undefined : true}
      target={live ? "_blank" : undefined}
      rel={live ? "noopener noreferrer" : undefined}
      onClick={live ? undefined : (event) => event.preventDefault()}
      className={`inline-flex shrink-0 items-center gap-3 rounded-lg px-4 py-2 shadow-[0_10px_24px_-16px_rgba(0,0,0,0.8)] ${
        onDark
          ? "bg-white text-ink hover:bg-sky-soft"
          : "bg-black text-white hover:bg-neutral-900"
      } ${live ? "" : "cursor-not-allowed"} ${className}`}
    >
      <PlayGlyph />
      <span className="text-left leading-none">
        <span className="block text-[0.62rem] font-medium tracking-[0.04em] opacity-80">
          GET IT ON
        </span>
        <span className="mt-1 block text-[1.15rem] font-medium tracking-[-0.03em]">
          Google Play
        </span>
      </span>
      {live ? null : (
        <span
          className={`ml-1 rounded-md px-1.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] ${
            onDark ? "bg-ink/10 text-ink-soft" : "bg-white/15 text-white/80"
          }`}
        >
          Soon
        </span>
      )}
    </a>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 29 32" className="h-8 w-7 shrink-0" aria-hidden>
      <path
        fill="#4285F4"
        d="M13.5 15.1 1.2 28.4c.4.8 1.2 1.3 2.1 1.3.5 0 .9-.1 1.3-.4l15.2-8.7-6.3-5.5z"
      />
      <path
        fill="#34A853"
        d="M24.2 13.2 19.8 10.7 13.5 16.1l6.4 5.6 4.3-2.5c1.2-.7 1.2-2.3 0-3z"
      />
      <path
        fill="#FBBC04"
        d="M1.2 3.6C1 4.1 1 4.7 1 5.3v21.4c0 .6 0 1.2.2 1.7l12.8-12.3L1.2 3.6z"
      />
      <path
        fill="#EA4335"
        d="M13.5 16.1 1.2 3.6C1.8 2.6 2.9 2 4.1 2c.5 0 1 .1 1.5.4l14.2 8.2-6.3 5.5z"
      />
    </svg>
  );
}
