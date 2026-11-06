import type { NextConfig } from "next";
import path from "path";

const baseSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

/**
 * Pay-link route + legacy static /p/index.html.
 * frame-ancestors 'none' — React landing is not iframed; blocks clickjacking.
 */
const paylinkCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data:",
  "font-src 'self' https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: path.join(__dirname),
  },
  async rewrites() {
    // `/p/{token}` is the Next.js React landing (OG + UI).
    // Keep `/p` → static index for empty path bookmarks only.
    return [{ source: "/p", destination: "/p/index.html" }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: baseSecurityHeaders,
      },
      {
        source: "/p",
        headers: [{ key: "Content-Security-Policy", value: paylinkCsp }],
      },
      {
        source: "/p/:path*",
        headers: [{ key: "Content-Security-Policy", value: paylinkCsp }],
      },
      {
        source: "/.well-known/assetlinks.json",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
