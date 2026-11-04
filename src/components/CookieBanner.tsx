"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { legal } from "@/lib/legal";

type Choice = "essential" | "all";

function readChoice(): Choice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${legal.cookieName}=(essential|all)`)
  );
  if (match?.[1] === "essential" || match?.[1] === "all") return match[1];
  try {
    const stored = localStorage.getItem(legal.cookieName);
    if (stored === "essential" || stored === "all") return stored;
  } catch {
    /* private mode */
  }
  return null;
}

function writeChoice(choice: Choice) {
  const maxAge = legal.cookieMaxAgeDays * 24 * 60 * 60;
  document.cookie = `${legal.cookieName}=${choice}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  try {
    localStorage.setItem(legal.cookieName, choice);
  } catch {
    /* private mode */
  }
}

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(readChoice() === null);
  }, []);

  function choose(choice: Choice) {
    writeChoice(choice);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-copy"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div className="max-w-2xl">
          <p id="cookie-title" className="text-sm font-semibold text-ink">
            Cookies on this site
          </p>
          <p id="cookie-copy" className="mt-1 text-sm leading-relaxed text-ink-soft">
            We do not run ads. If you choose below, we store one preference
            cookie so we do not ask again. The Android app is separate.{" "}
            <Link href="/cookies" className="font-medium text-blue hover:underline">
              Cookie policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-mist"
            onClick={() => choose("essential")}
          >
            Essential only
          </button>
          <button
            type="button"
            className="rounded-xl bg-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-deep"
            onClick={() => choose("all")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
