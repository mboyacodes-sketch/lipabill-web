#!/usr/bin/env node
/**
 * Regenerates public/og.png (+ app opengraph/twitter images) from screenshots.
 * Usage: node scripts/generate-og.mjs
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const W = 1200;
const H = 630;

async function phoneShot(src, { cropBottom = 0, width = 220, height = 448 }) {
  const abs = path.join(root, src);
  const meta = await sharp(abs).metadata();
  const bottom = Math.round(meta.height * cropBottom);
  const extractH = meta.height - bottom;
  const screen = await sharp(abs)
    .extract({ left: 0, top: 0, width: meta.width, height: extractH })
    .resize(width, height, { fit: "cover", position: "top" })
    .png()
    .toBuffer();

  const bezel = 11;
  const radius = 38;
  const pw = width + bezel * 2;
  const ph = height + bezel * 2;

  const frame = Buffer.from(`
    <svg width="${pw}" height="${ph}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3a3a3a"/>
          <stop offset="100%" stop-color="#0d0d0d"/>
        </linearGradient>
        <clipPath id="clip">
          <rect x="${bezel}" y="${bezel}" width="${width}" height="${height}" rx="${radius - 8}" ry="${radius - 8}"/>
        </clipPath>
      </defs>
      <rect width="${pw}" height="${ph}" rx="${radius}" ry="${radius}" fill="url(#g)"/>
      <rect x="${bezel}" y="${bezel}" width="${width}" height="${height}" rx="${radius - 8}" ry="${radius - 8}" fill="#000"/>
      <image href="data:image/png;base64,${screen.toString("base64")}"
        x="${bezel}" y="${bezel}" width="${width}" height="${height}" clip-path="url(#clip)"/>
      <rect x="${pw / 2 - 34}" y="${bezel + 8}" width="68" height="8" rx="4" fill="rgba(0,0,0,0.55)"/>
    </svg>`);

  const buf = await sharp(frame).png().toBuffer();
  const mask = Buffer.from(`
    <svg width="${pw}" height="${ph}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${pw}" height="${ph}" rx="${radius}" ry="${radius}" fill="#fff"/>
    </svg>`);
  const clipped = await sharp(buf)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  return { buf: clipped };
}

async function rotatePhone(phone, angleDeg) {
  const buf = await sharp(phone.buf)
    .rotate(angleDeg, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  return { buf };
}

async function softShadow(w, h) {
  const svg = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="s" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(0,0,0,0.55)"/>
          <stop offset="70%" stop-color="rgba(0,0,0,0.18)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="${w / 2}" cy="${h / 2}" rx="${w / 2}" ry="${h / 2}" fill="url(#s)"/>
    </svg>`);
  return sharp(svg).blur(10).png().toBuffer();
}

const [pHome, pDay, pOverview, pSend] = await Promise.all([
  phoneShot("public/screenshots/home-ledger.jpg", {
    cropBottom: 0,
    width: 236,
    height: 480,
  }),
  phoneShot("public/screenshots/insights-day.jpg", { cropBottom: 0 }),
  phoneShot("public/screenshots/insights-overview.jpg", { cropBottom: 0 }),
  phoneShot("public/screenshots/send-money.jpg", { cropBottom: 0 }),
]);

const farLeftPhone = await rotatePhone(pDay, -12);
const midLeftPhone = await rotatePhone(pSend, -4);
const midPhone = await rotatePhone(pHome, 0);
const rightPhone = await rotatePhone(pOverview, 11);
const logo = await sharp(path.join(root, "public/brand/lipabill-logo.png"))
  .resize(68, 68)
  .png()
  .toBuffer();

const bg = Buffer.from(`
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0a1428"/>
        <stop offset="42%" stop-color="#12306f"/>
        <stop offset="100%" stop-color="#2f6bff"/>
      </linearGradient>
      <radialGradient id="glow" cx="82%" cy="40%" r="58%">
        <stop offset="0%" stop-color="#8fb4ff" stop-opacity="0.42"/>
        <stop offset="55%" stop-color="#2f6bff" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#0a1428" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
  </svg>`);

const text = Buffer.from(`
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .brand { font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif; font-weight: 700; fill: #ffffff; font-size: 36px; }
      .h1 { font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif; font-weight: 800; fill: #ffffff; font-size: 60px; letter-spacing: -1.2px; }
      .sub { font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif; font-weight: 500; fill: #d5e3ff; font-size: 24px; }
      .pill { font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif; font-weight: 600; fill: #ffffff; font-size: 17px; }
      .url { font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif; font-weight: 600; fill: #b6cbff; font-size: 22px; }
    </style>
    <text x="152" y="96" class="brand">LipaBill</text>
    <text x="56" y="220" class="h1">Your money</text>
    <text x="56" y="290" class="h1">has a story.</text>
    <text x="56" y="352" class="sub">See it clearly — then send,</text>
    <text x="56" y="384" class="sub">pay, or show the code.</text>
    <!-- On device -->
    <rect x="56" y="432" width="148" height="40" rx="20" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.28)"/>
    <g transform="translate(72,442)" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3.5" y="0.5" width="11" height="18" rx="2.2"/>
      <path d="M7.5 15.5h3"/>
    </g>
    <text x="138" y="458" text-anchor="middle" class="pill">On device</text>
    <!-- East Africa -->
    <rect x="216" y="432" width="158" height="40" rx="20" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.28)"/>
    <g transform="translate(232,441)" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 1.5c-3.6 0-6.5 2.8-6.5 6.3 0 4.7 6.5 11.2 6.5 11.2s6.5-6.5 6.5-11.2c0-3.5-2.9-6.3-6.5-6.3z"/>
      <circle cx="9" cy="7.8" r="2.2"/>
    </g>
    <text x="306" y="458" text-anchor="middle" class="pill">East Africa</text>
    <!-- Google Play — official multicolor triangle mark -->
    <rect x="386" y="432" width="160" height="40" rx="20" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.28)"/>
    <g transform="translate(401.5,441) scale(0.75)">
      <!-- viewBox-ish 0 0 24 24 paths -->
      <path fill="#00A0FF" d="M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85c-.5-.24-.84-.76-.84-1.35z"/>
      <path fill="#FFD500" d="M16.81 15.12 6.05 21.34l8.49-8.49 2.27 2.27z"/>
      <path fill="#FF3A44" d="M16.81 8.88 14.54 11.15 6.05 2.66l10.76 6.22z"/>
      <path fill="#00A757" d="M20.16 10.81c.34.27.59.69.59 1.19s-.25.92-.59 1.19l-2.27 1.31-2.5-2.5 2.5-2.5 2.27 1.31z"/>
    </g>
    <text x="478" y="458" text-anchor="middle" class="pill">Google Play</text>
    <text x="56" y="562" class="url">lipabill.app</text>
  </svg>`);

const [shadowA, shadowB, shadowC, shadowM] = await Promise.all([
  softShadow(180, 34),
  softShadow(180, 34),
  softShadow(180, 34),
  softShadow(220, 40),
]);

const out = await sharp({
  create: { width: W, height: H, channels: 4, background: { r: 10, g: 20, b: 40, alpha: 1 } },
})
  .composite([
    { input: bg, top: 0, left: 0 },
    { input: logo, top: 54, left: 56 },
    { input: text, top: 0, left: 0 },
    { input: shadowA, left: 590, top: 560 },
    { input: shadowB, left: 700, top: 568 },
    { input: shadowC, left: 960, top: 560 },
    { input: shadowM, left: 800, top: 572 },
    // back row first, home in front
    { input: farLeftPhone.buf, left: 545, top: 95 },
    { input: midLeftPhone.buf, left: 655, top: 78 },
    { input: rightPhone.buf, left: 930, top: 88 },
    { input: midPhone.buf, left: 780, top: 48 },
  ])
  .png({ compressionLevel: 9 })
  .toBuffer();

const targets = [
  path.join(root, "public/og.png"),
  path.join(root, "src/app/opengraph-image.png"),
  path.join(root, "src/app/twitter-image.png"),
];
for (const t of targets) {
  fs.writeFileSync(t, out);
  console.log("Wrote", path.relative(root, t));
}
