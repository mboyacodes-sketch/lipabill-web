"use client";

import { useEffect, useRef } from "react";

function curveFromPhone(
  sx: number,
  sy: number,
  ex: number,
  ey: number
): string {
  const dx = ex - sx;
  const dy = ey - sy;
  const dist = Math.hypot(dx, dy) || 1;
  const bulge = Math.min(80, dist * 0.28);
  const nx = -dy / dist;
  const ny = dx / dist;
  const cx1 = sx + dx * 0.35 + nx * bulge * 0.35;
  const cy1 = sy + dy * 0.35 + ny * bulge * 0.35;
  const cx2 = sx + dx * 0.7 + nx * bulge;
  const cy2 = sy + dy * 0.7 + ny * bulge;
  return `M ${sx} ${sy} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${ex} ${ey}`;
}

function edgePoint(
  from: DOMRect,
  to: DOMRect,
  origin: DOMRect
): { x: number; y: number } {
  const fcx = from.left + from.width / 2 - origin.left;
  const fcy = from.top + from.height / 2 - origin.top;
  const tcx = to.left + to.width / 2 - origin.left;
  const tcy = to.top + to.height / 2 - origin.top;
  const dx = tcx - fcx;
  const dy = tcy - fcy;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  if (absDx > absDy) {
    return {
      x: dx > 0 ? from.right - origin.left : from.left - origin.left,
      y: fcy + dy * 0.15,
    };
  }
  return {
    x: fcx + dx * 0.15,
    y: dy > 0 ? from.bottom - origin.top : from.top - origin.top,
  };
}

function entryPoint(
  from: DOMRect,
  to: DOMRect,
  origin: DOMRect
): { x: number; y: number } {
  const fcx = from.left + from.width / 2 - origin.left;
  const fcy = from.top + from.height / 2 - origin.top;
  const tcx = to.left + to.width / 2 - origin.left;
  const tcy = to.top + to.height / 2 - origin.top;
  const dx = tcx - fcx;
  const dy = tcy - fcy;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  if (absDx > absDy) {
    return {
      x: dx > 0 ? to.left - origin.left : to.right - origin.left,
      y: tcy,
    };
  }
  return {
    x: tcx,
    y: dy > 0 ? to.top - origin.top : to.bottom - origin.top,
  };
}

function stageVisible(stage: HTMLElement) {
  const style = getComputedStyle(stage);
  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    stage.getClientRects().length > 0
  );
}

/** Dashed curves from phone hub to each spoke — tracks resize, zoom, and float. */
export function ConnectorLines({ stageId }: { stageId: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const stage = document.getElementById(stageId);
    const svg = svgRef.current;
    if (!stage || !svg) return;

    let alive = true;
    let raf = 0;

    const paint = () => {
      if (!alive) return;

      if (!stageVisible(stage)) {
        svg.replaceChildren();
        svg.setAttribute("width", "0");
        svg.setAttribute("height", "0");
        return;
      }

      const hub = stage.querySelector<HTMLElement>("[data-orbit-hub]");
      const targets = [
        ...stage.querySelectorAll<HTMLElement>("[data-orbit-spoke]"),
      ].filter((el) => {
        const style = getComputedStyle(el);
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          el.getClientRects().length > 0
        );
      });

      const origin = stage.getBoundingClientRect();
      if (!hub || targets.length === 0 || origin.width < 8 || origin.height < 8) {
        svg.replaceChildren();
        return;
      }

      svg.setAttribute("width", String(origin.width));
      svg.setAttribute("height", String(origin.height));
      svg.setAttribute("viewBox", `0 0 ${origin.width} ${origin.height}`);

      const hubBox = hub.getBoundingClientRect();
      const ns = "http://www.w3.org/2000/svg";

      while (svg.childNodes.length > targets.length) {
        svg.lastChild?.remove();
      }

      targets.forEach((el, i) => {
        const box = el.getBoundingClientRect();
        const start = edgePoint(hubBox, box, origin);
        const end = entryPoint(hubBox, box, origin);
        const d = curveFromPhone(start.x, start.y, end.x, end.y);

        let g = svg.children[i] as SVGGElement | undefined;
        if (!g) {
          g = document.createElementNS(ns, "g");
          const path = document.createElementNS(ns, "path");
          path.setAttribute("class", "dash-line");
          path.setAttribute("stroke-width", "1.6");
          const dot = document.createElementNS(ns, "circle");
          dot.setAttribute("r", "3");
          dot.setAttribute("fill", "#2f6bff");
          dot.setAttribute("opacity", "0.4");
          g.append(path, dot);
          svg.append(g);
        }

        const path = g.children[0] as SVGPathElement;
        const dot = g.children[1] as SVGCircleElement;
        path.setAttribute("d", d);
        dot.setAttribute("cx", String(end.x));
        dot.setAttribute("cy", String(end.y));
      });
    };

    const loop = () => {
      paint();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(paint);
    ro.observe(stage);
    window.addEventListener("resize", paint);
    window.visualViewport?.addEventListener("resize", paint);
    window.visualViewport?.addEventListener("scroll", paint);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", paint);
      window.visualViewport?.removeEventListener("resize", paint);
      window.visualViewport?.removeEventListener("scroll", paint);
    };
  }, [stageId]);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full overflow-visible"
    />
  );
}
