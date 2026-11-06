import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { socialPlatforms, socialsCopy, socialsPath } from "@/lib/socials";

type Platform = (typeof socialPlatforms)[number];

const platformIcons: Record<
  Platform,
  { label: string; tone: string; icon: ReactNode }
> = {
  WhatsApp: {
    label: "WhatsApp",
    tone: "#25D366",
    icon: (
      <path
        d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Zm0 1.6a7.2 7.2 0 0 1 6.1 10.9l-.3.4.5 1.9-2-.5-.4.2A7.2 7.2 0 1 1 12 4.8Zm3.9 8.3c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1l-.6.7c-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.7-1.1-.6-.6-1.1-1.3-1.2-1.5-.1-.2 0-.3.1-.5l.4-.5c.1-.1.1-.3.1-.4 0-.1 0-.3-.1-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4.5.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1 0-.1-.2-.1-.4-.2Z"
        fill="currentColor"
      />
    ),
  },
  Facebook: {
    label: "Facebook",
    tone: "#1877F2",
    icon: (
      <path
        d="M13.6 21V12.9h2.5l.4-2.8h-2.9V8.3c0-.8.2-1.4 1.4-1.4h1.5V4.4c-.3 0-1.1-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8.2v2.8h2.4V21h3Z"
        fill="currentColor"
      />
    ),
  },
  Instagram: {
    label: "Instagram",
    tone: "#E1306C",
    icon: (
      <>
        <rect
          x="4.5"
          y="4.5"
          width="15"
          height="15"
          rx="4.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle
          cx="12"
          cy="12"
          r="3.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle cx="16.7" cy="7.4" r="1.1" fill="currentColor" />
      </>
    ),
  },
  TikTok: {
    label: "TikTok",
    tone: "#111111",
    icon: (
      <path
        d="M15.4 3.2v2.3c1.2.9 2.6 1.4 4.1 1.5v2.5c-1.5-.1-2.9-.5-4.1-1.3v5.4c0 3.1-2.5 5.6-5.6 5.6S4.2 16.7 4.2 13.6c0-3 2.3-5.4 5.2-5.6v2.6c-1.5.2-2.6 1.4-2.6 3 0 1.7 1.3 3 3 3s3-1.3 3-3V3.2h2.6Z"
        fill="currentColor"
      />
    ),
  },
  YouTube: {
    label: "YouTube",
    tone: "#FF0000",
    icon: (
      <>
        <rect
          x="3.2"
          y="6.2"
          width="17.6"
          height="11.6"
          rx="3"
          fill="currentColor"
        />
        <path d="M10.4 9.2v5.6L15.4 12 10.4 9.2Z" fill="#fff" />
      </>
    ),
  },
  X: {
    label: "X",
    tone: "#111111",
    icon: (
      <path
        d="M6.2 5.2h3.1l2.8 3.9 3.4-3.9h2.3l-4.5 5.1 4.9 6.5h-3.1l-3.2-4.3-3.8 4.3H5.8l4.8-5.4L6.2 5.2Zm1.7 1.4 7.7 10.2h1.1L9 6.6H7.9Z"
        fill="currentColor"
      />
    ),
  },
  Telegram: {
    label: "Telegram",
    tone: "#229ED9",
    icon: (
      <path
        d="M19.8 5.1 4.7 10.8c-1 .4-1 1.1-.2 1.4l3.7 1.2 1.4 4.4c.2.5.7.6 1.1.3l2-1.9 3.9 2.9c.5.3.8.1.9-.4l2.8-13c.3-.9-.3-1.3-1.1-1Zm-3 2.1-7.8 7-.3 3.1-1.4-4.3 9.5-5.8Z"
        fill="currentColor"
      />
    ),
  },
  LinkedIn: {
    label: "LinkedIn",
    tone: "#0A66C2",
    icon: (
      <path
        d="M7.2 9.4H4.6V19h2.6V9.4Zm.2-3c0-.8-.6-1.4-1.5-1.4S4.4 5.6 4.4 6.4c0 .7.6 1.4 1.5 1.4.8 0 1.5-.7 1.5-1.4ZM19.4 13.2c0-2.4-1.3-4-3.3-4-1.1 0-1.9.5-2.3 1.2V9.4h-2.6c0 .6 0 9.6 0 9.6h2.6v-5.4c0-.3 0-.6.1-.8.3-.6.9-1.3 1.9-1.3 1.4 0 1.9 1 1.9 2.5V19h2.7v-5.8Z"
        fill="currentColor"
      />
    ),
  },
  Threads: {
    label: "Threads",
    tone: "#111111",
    icon: (
      <path
        d="M12.1 4.2c2.9 0 5 1.4 5.8 3.7l-1.8.6c-.5-1.5-1.9-2.5-4-2.5-2.8 0-4.6 1.9-4.6 5.1 0 1.7.6 3 1.6 3.8 1 .8 2.3 1.1 3.7 1 .9 0 1.8-.2 2.5-.5v-2.2c-.5.2-1.1.3-1.8.3-1.7 0-2.8-.8-2.8-2.3 0-1.4 1-2.3 2.5-2.3.9 0 1.6.3 2 .9.2.3.4.7.4 1.2v5.4c0 1.9-.5 3.3-1.5 4.2-1 .9-2.4 1.3-4.2 1.3-1.9 0-3.4-.5-4.5-1.5-1.1-1-1.7-2.5-1.7-4.4h1.9c0 1.3.4 2.3 1.1 2.9.7.6 1.8.9 3.2.9 1.3 0 2.2-.3 2.8-.8.6-.5.9-1.4.9-2.7v-.5c-.6.6-1.5 1-2.7 1-2.6 0-4.4-1.7-4.4-4.3 0-2.7 1.9-4.7 4.8-4.7Z"
        fill="currentColor"
      />
    ),
  },
};

export function SocialsShowcase() {
  const count = socialPlatforms.length;

  return (
    <section
      id="socials"
      className="relative overflow-hidden border-t border-line/70 bg-mist px-5 py-16 sm:px-8 sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.14),transparent_68%)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <div>
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
                {socialsCopy.kicker}
              </p>
              <h2 className="mt-2 max-w-xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {socialsCopy.title}
              </h2>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
            {socialsCopy.short} Same Request screen as pay QR — Payments for
            money in, Socials for the people who already know you.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute">
            Handles stay on this phone. LipaBill is not WhatsApp, Instagram, or
            any of those networks — we only open the profile they already have.
          </p>
          <Link
            href={socialsPath}
            className="mt-6 inline-block text-sm font-medium text-blue hover:underline"
          >
            How Socials works
          </Link>
        </div>

        <div className="relative mx-auto flex w-full max-w-[22rem] items-center justify-center sm:max-w-[24rem]">
          <div
            className="socials-orbit relative aspect-square w-full"
            role="img"
            aria-label={`Socials platforms: ${socialPlatforms.join(", ")}`}
          >
            <div
              aria-hidden
              className="absolute inset-[18%] rounded-full border border-dashed border-blue/25"
            />
            <div
              aria-hidden
              className="absolute inset-[32%] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.16),transparent_70%)]"
            />

            <div className="socials-orbit-hub absolute left-1/2 top-1/2 z-10 grid h-[5.5rem] w-[5.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-white shadow-[0_18px_40px_-24px_rgba(15,28,51,0.55)] sm:h-24 sm:w-24">
              <Image
                src="/brand/lipabill-logo.png"
                alt=""
                width={48}
                height={48}
                className="block h-12 w-12 object-contain sm:h-14 sm:w-14"
              />
            </div>

            <ul className="socials-orbit-ring absolute inset-0 list-none p-0" aria-hidden>
              {socialPlatforms.map((name, index) => {
                const meta = platformIcons[name];
                const angle = (360 / count) * index;
                return (
                  <li
                    key={name}
                    className="socials-orbit-item absolute left-1/2 top-1/2"
                    style={
                      {
                        ["--orbit-angle"]: `${angle}deg`,
                      } as CSSProperties
                    }
                  >
                    <span
                      className="socials-orbit-face flex h-11 w-11 items-center justify-center rounded-full text-white shadow-[0_10px_24px_-12px_rgba(15,28,51,0.55)] sm:h-12 sm:w-12"
                      style={{ background: meta.tone }}
                      title={meta.label}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5"
                        aria-hidden
                      >
                        {meta.icon}
                      </svg>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
