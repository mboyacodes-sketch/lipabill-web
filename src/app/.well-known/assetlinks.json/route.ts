/**
 * Digital Asset Links for com.lipabill.app.
 * Fingerprints from Play Console Deep links → Domains (upload, App Signing, and related certs).
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
        "AC:F6:6F:AD:F7:E4:A0:D6:C7:65:55:8C:85:C5:26:EA:1D:F3:7F:00:E7:FB:91:7E:2B:FA:5C:AB:EB:EE:2E:B7",
        "F3:5B:DB:0E:B6:23:1F:95:A1:0C:27:44:5F:FD:B5:B5:31:33:45:00:40:F1:55:7A:E0:36:48:F0:E1:F4:EE:66",
        "88:28:C7:E7:3A:DD:20:B3:AB:83:43:87:6D:13:F6:A4:CA:41:7D:5E:39:15:CD:90:41:6D:FD:4E:1A:57:DB:EE",
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
