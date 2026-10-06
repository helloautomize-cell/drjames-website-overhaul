import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { site } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";
export const alt = `${site.name} — Specialist in Internal Medicine and Diabetes, Muscat`;

const font = (name: string) =>
  fs.readFileSync(path.join(process.cwd(), "resources", "fonts", name));

/** Default share card for pages without their own OG image: navy ground,
 *  d04 headshot in a gold ring, serif name + role. */
export default function OgImage() {
  const photo = `data:image/jpeg;base64,${fs
    .readFileSync(path.join(process.cwd(), "public", "images", "doctor", "d04-headshot-800sq.jpg"))
    .toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(800px 420px at 82% 18%, rgba(45,106,107,.35), transparent 70%), #0F1E30",
          alignItems: "center",
          padding: "0 72px",
          gap: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 260,
            height: 260,
            borderRadius: 999,
            border: "3px solid #C9A66B",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- OG renderer */}
          <img
            src={photo}
            alt=""
            width={260}
            height={260}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C9A66B",
            }}
          >
            {site.hospital} · Muscat
          </div>
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: 56,
              lineHeight: 1.06,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            {site.name}
          </div>
          <div style={{ fontSize: 26, color: "#B8C7CF" }}>{site.role}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Newsreader",
          data: font("newsreader-400.ttf"),
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
