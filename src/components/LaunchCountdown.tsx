"use client";

import { useSyncExternalStore } from "react";
import { launchAt, playStore } from "@/lib/site";

const LAUNCH_MS = Date.parse(launchAt);

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  return Date.now();
}

function getServerSnapshot() {
  return 0;
}

function splitRemaining(now: number) {
  if (now === 0) return null;
  const ms = Math.max(0, LAUNCH_MS - now);
  const totalSeconds = Math.floor(ms / 1000);
  return {
    done: ms === 0,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function LaunchPromo({ className = "" }: { className?: string }) {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const remaining = splitRemaining(now);
  const headline = !remaining
    ? "Days to go"
    : remaining.done
      ? "Launch day"
      : remaining.days === 0
        ? "Launching today"
        : `${remaining.days} ${remaining.days === 1 ? "day" : "days"} to go`;

  return (
    <div
      className={`flex w-full max-w-md flex-col items-center text-center lg:items-start lg:text-left ${className}`}
    >
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-blue">
        Launch countdown
      </p>
      <p className="mt-2 text-[clamp(1.85rem,1.2rem+1.5vw,2.35rem)] font-semibold tracking-tight text-ink">
        {headline}
      </p>
      <div
        className="mt-4 grid w-full max-w-xs grid-cols-3 gap-2"
        role="timer"
        aria-label="Countdown to 12 October 2026"
      >
        <Tick value={remaining ? pad(remaining.hours) : "—"} label="Hours" />
        <Tick value={remaining ? pad(remaining.minutes) : "—"} label="Min" />
        <Tick value={remaining ? pad(remaining.seconds) : "—"} label="Sec" />
      </div>
      <p className="mt-3 text-xs text-mute">12 October 2026</p>
      <PlayStoreButton className="mt-5" />
    </div>
  );
}

function Tick({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-sky-soft px-2 py-2.5 text-center">
      <p className="text-xl font-semibold tabular-nums tracking-tight text-ink">{value}</p>
      <p className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-mute">
        {label}
      </p>
    </div>
  );
}

export function PlayStoreButton({ className = "" }: { className?: string }) {
  const live = playStore.enabled;

  return (
    <div className={`flex flex-col items-center lg:items-start ${className}`}>
      <a
        href={playStore.url}
        aria-disabled={live ? undefined : true}
        target={live ? "_blank" : undefined}
        rel={live ? "noopener noreferrer" : undefined}
        onClick={live ? undefined : (event) => event.preventDefault()}
        className={`inline-flex items-center gap-3 rounded-lg bg-black px-4 py-2 text-white shadow-[0_10px_24px_-16px_rgba(0,0,0,0.8)] ${
          live ? "hover:bg-neutral-900" : "cursor-not-allowed"
        }`}
      >
        <PlayGlyph />
        <span className="text-left leading-none">
          <span className="block text-[0.62rem] font-medium tracking-[0.04em]">GET IT ON</span>
          <span className="mt-1 block text-[1.15rem] font-medium tracking-[-0.03em]">
            Google Play
          </span>
        </span>
        {live ? null : (
          <span className="ml-1 rounded-md bg-white/15 px-1.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/80">
            Soon
          </span>
        )}
      </a>
      {live ? null : (
        <p className="mt-2 text-xs text-mute">Available on launch day</p>
      )}
    </div>
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
