/**
 * Digital Asset Links for com.lipabill.app.
 * Pretty-printed to match Play Console / Android docs examples.
 * Fingerprints: upload keystore + Play App Signing certificate.
 */
const ASSET_LINKS = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "com.lipabill.app",
      sha256_cert_fingerprints: [
        "6D:69:02:C7:F4:80:78:C9:C4:D6:0D:E2:CC:D0:D2:A4:B1:48:78:11:F2:25:47:99:92:AC:46:98:47:A2:8B:20",
        "C8:54:E8:7B:F8:EF:DE:0B:82:64:47:9E:2F:EC:5C:1A:9B:99:2A:AF:82:2C:E9:A0:64:F7:F4:4F:69:5E:A4:D8",
      ],
    },
  },
];

/** Exact Content-Type application/json — no charset, no Content-Disposition. */
export function GET() {
  return new Response(`${JSON.stringify(ASSET_LINKS, null, 2)}\n`, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
