import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "LipaBill — Offline-First Transaction Wallet for Android";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const icon = await readFile(join(process.cwd(), "public/brand/lipabill-logo.png"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f7fc",
          color: "#0f1c33",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${icon.toString("base64")}`}
            width={96}
            height={96}
            alt=""
          />
          <div style={{ display: "flex", marginLeft: 28, fontSize: 42, fontWeight: 700 }}>
            LipaBill
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: -1.5,
              lineHeight: 1.05,
            }}
          >
            No internet? No problem.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 32,
              color: "#3a4a66",
            }}
          >
            Offline-First Transaction Wallet for Android
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, fontWeight: 600, color: "#2f6bff" }}>
          lipabill.mboya.dev
        </div>
      </div>
    ),
    { ...size },
  );
}
