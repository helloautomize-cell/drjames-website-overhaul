import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { isValidElement, type ReactNode } from "react";
import { publishedPostMeta } from "@/lib/content";
import { mainCondition, topicOf } from "@/lib/library";
import { site } from "@/lib/site-config";
import { CONTOURS } from "@/lib/contours";
import { iconPaths } from "@/lib/icons";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export function generateStaticParams() {
  return publishedPostMeta().map((p) => ({ slug: p.slug }));
}

const font = (name: string) =>
  fs.readFileSync(path.join(process.cwd(), "resources", "fonts", name));

/** Serializes an icon's intrinsic SVG children (fragments unwrapped). */
function nodeToSvg(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToSvg).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    const { type, props } = node as unknown as {
      type: string | symbol;
      props: Record<string, unknown>;
    };
    if (type === Symbol.for("react.fragment")) return nodeToSvg(props.children as ReactNode);
    const { children, ...rest } = props;
    const attrs = Object.entries(rest)
      .map(([k, v]) => ` ${k}="${String(v)}"`)
      .join("");
    return `<${String(type)}${attrs}>${nodeToSvg(children as ReactNode)}</${String(type)}>`;
  }
  return "";
}

/** 1200x630 share card: cover left 55% (warm grade), night panel right. */
export default async function GuideOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = publishedPostMeta().find((p) => p.slug === slug);
  if (!post) return new Response("Not found", { status: 404 });

  const topic = topicOf(post);
  const cond = mainCondition(post);

  let imgData: string | null = null;
  // satori cannot decode webp; jpeg/png covers are embedded, webp covers use
  // the designed panel below
  if (post.image && /\.(jpe?g|png)$/i.test(post.image)) {
    const file = path.join(process.cwd(), "public", post.image);
    if (fs.existsSync(file)) {
      imgData = `data:image/jpeg;base64,${fs.readFileSync(file).toString("base64")}`;
    }
  }

  // satori needs intrinsic svg children, so the icon is embedded as a data URI
  const iconSvg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" ` +
    `stroke="#D9B77E" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">` +
    nodeToSvg(iconPaths[cond?.icon ?? topic.icon]) +
    `</svg>`;
  const iconUri = `data:image/svg+xml;utf8,${encodeURIComponent(iconSvg)}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0A1C2E" }}>
        <div
          style={{
            width: "55%",
            height: "100%",
            display: "flex",
            position: "relative",
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imgData ? (
            // eslint-disable-next-line @next/next/no-img-element -- OG renderer
            <img
              src={imgData}
              alt=""
              width={660}
              height={630}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "contrast(1.04) saturate(.92)",
              }}
            />
          ) : (
            <>
              <svg
                width={660}
                height={630}
                viewBox="0 0 800 280"
                preserveAspectRatio="xMidYMid slice"
                style={{ position: "absolute", inset: 0 }}
              >
                {CONTOURS.slice(0, 5).map((c, i) => (
                  <path key={i} d={c.d} fill="none" stroke="#C29A5B" strokeOpacity="0.45" strokeWidth="1.2" />
                ))}
              </svg>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 120,
                    height: 120,
                    borderRadius: 999,
                    border: "2px solid #D9B77E",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- OG renderer */}
                  <img src={iconUri} alt="" width={56} height={56} />
                </div>
              </div>
            </>
          )}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "56px 64px",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#D9B77E",
              fontFamily: "sans-serif",
            }}
          >
            {topic.label}
          </div>
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: 54,
              lineHeight: 1.08,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            {post.heading}
          </div>
          <div style={{ fontSize: 22, color: "#B8C7CF", fontFamily: "sans-serif" }}>
            {site.name}
          </div>
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
