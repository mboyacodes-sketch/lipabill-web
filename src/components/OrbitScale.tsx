"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/** Typical browser zoom steps (Chrome / Safari / Edge). */
const ZOOM_STEPS = [
  0.25, 0.33, 0.5, 0.67, 0.75, 0.8, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4,
  5,
];

function snapZoom(raw: number): number {
  if (!Number.isFinite(raw) || raw <= 0) return 1;
  if (Math.abs(raw - 1) < 0.06) return 1;

  let nearest = raw;
  let best = Infinity;
  for (const step of ZOOM_STEPS) {
    const d = Math.abs(raw - step);
    if (d < best) {
      best = d;
      nearest = step;
    }
  }
  return nearest;
}

/**
 * Browser page zoom (1 = 100%).
 * Uses outerWidth / innerWidth: zoom changes innerWidth, not outerWidth.
 */
function readBrowserZoom(): number {
  if (typeof window === "undefined") return 1;

  const vv = window.visualViewport?.scale;
  if (typeof vv === "number" && Math.abs(vv - 1) > 0.02) {
    return snapZoom(vv);
  }

  const inner = Math.max(1, window.innerWidth);
  return snapZoom(window.outerWidth / inner);
}

/** Window size factor (1 = maximized). Independent of browser zoom. */
function readWindowSizeFactor(): number {
  if (typeof window === "undefined") return 1;

  const avail =
    window.screen.availWidth || window.screen.width || window.outerWidth;
  if (!avail || avail < 1) return 1;

  let size = window.outerWidth / avail;
  size = Math.min(1, Math.max(0.55, size));
  if (Math.abs(size - 1) < 0.03) return 1;
  return size;
}

/** Desktop orbit scale: inverse browser zoom × window size. Mobile always 1. */
function readOrbitScale(): number {
  if (typeof window === "undefined") return 1;
  if (!window.matchMedia("(min-width: 1280px)").matches) return 1;

  const next = (1 / readBrowserZoom()) * readWindowSizeFactor();
  if (!Number.isFinite(next)) return 1;
  if (Math.abs(next - 1) < 0.02) return 1;
  return next;
}

const OrbitScaleContext = createContext(1);

export function OrbitScaleProvider({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => setScale(readOrbitScale());
    update();

    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    const mq = window.matchMedia("(min-width: 1280px)");
    mq.addEventListener("change", update);
    const id = window.setInterval(update, 400);

    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
      mq.removeEventListener("change", update);
      window.clearInterval(id);
    };
  }, []);

  return (
    <OrbitScaleContext.Provider value={scale}>
      {children}
    </OrbitScaleContext.Provider>
  );
}

export function OrbitScale({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const scale = useContext(OrbitScaleContext);

  return (
    <div
      className={className}
      style={{
        ...style,
        transform: scale === 1 ? undefined : `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
}
