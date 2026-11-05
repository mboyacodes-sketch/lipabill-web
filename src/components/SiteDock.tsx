"use client";

import { useEffect, useRef } from "react";
import { CookieBanner } from "@/components/CookieBanner";
import { LiveBanner } from "@/components/LiveBanner";

/** Play live card sits above the cookie bar so it is never covered. */
export function SiteDock() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const apply = () => {
      document.body.style.paddingBottom = el.offsetHeight
        ? `${el.offsetHeight}px`
        : "";
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.body.style.paddingBottom = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col"
    >
      <LiveBanner />
      <CookieBanner />
    </div>
  );
}
