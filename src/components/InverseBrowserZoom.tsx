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
 *
 * Uses outerWidth / innerWidth: zoom changes innerWidth, not outerWidth.
 * Window resize changes both roughly together, so the ratio stays stable.
 * (DPR is NOT used — on Retina DPR=2 at 100% and was misread as 200% zoom.)
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

/**
 * Window size factor (1 = maximized / full).
 * Uses outerWidth vs screen — independent of browser zoom.
 * Full size → 1; shrink window → shrink (never above 1).
 */
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

/**
 * Combined:
 * - Browser zoom → inverse (out enlarges, in shrinks; 100% = unchanged)
 * - Window resize → direct (full = normal, shrink shrinks)
 * - Mobile / < xl → always 1 (stacked layout; scale breaks alignment)
 */
function readOrbitScale(): number {
  if (typeof window === "undefined") return 1;

  // Desktop orbit only — compact mobile layout must stay unscaled.
  if (!window.matchMedia("(min-width: 1280px)").matches) return 1;

  const invZoom = 1 / readBrowserZoom();
  const windowSize = readWindowSizeFactor();
  const next = invZoom * windowSize;

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

export function InverseBrowserZoom(props: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return <OrbitScale {...props} />;
}
