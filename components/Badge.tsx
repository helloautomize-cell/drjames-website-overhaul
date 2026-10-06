import { useId } from "react";
import { iconPaths, type IconName } from "@/lib/icons";
import { badgeGlyphs, badgeNameToGlyph, type BadgeName } from "@/lib/badge-glyphs";
import badgePngs from "@/lib/badge-pngs.json";

const TICKS = Array.from({ length: 48 }, (_, i) => {
  const a = i * 7.5 * (Math.PI / 180);
  const r1 = i % 4 ? 52 : 50;
  return {
    x1: 68 + r1 * Math.cos(a),
    y1: 68 + r1 * Math.sin(a),
    x2: 68 + 54 * Math.cos(a),
    y2: 68 + 54 * Math.sin(a),
  };
});

/**
 * Navy coin badge from the design hand-off style guide: dashed orbit ring,
 * 3D coin turn + sheen on hover (CSS: `.badge` block in app/v2.css).
 *
 * Pass `name` (e.g. "blood-sugar", "step-book") — renders the inline SVG
 * glyph placeholder, or `/icons/badges/badge-<name>.png` automatically once
 * that file exists (see scripts/generate-badge-manifest.mjs).
 *
 * `light` uses the paper-section variant (off-white coin, ink→teal glyph).
 * `size` is xs (28px, orbit hidden), md (64px, default), lg (96px) or xl (104px).
 */
export function Badge({
  name,
  light,
  size,
  className,
  icon,
}: {
  name?: BadgeName;
  light?: boolean;
  /** Coin badge: "xs" (28px) / "lg" (96px) / "xl" (104px), default 64px. Legacy medallion: pixel size. */
  size?: "xs" | "lg" | "xl" | number;
  className?: string;
  icon?: IconName;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  if (name) {
    const g = `bg${uid}`;
    const hasPng = (badgePngs as Record<string, boolean>)[name] === true;
    const glyph = badgeGlyphs[badgeNameToGlyph[name]];
    return (
      <span
        className={`bcoin${light ? " light" : ""}${typeof size === "string" ? ` ${size}` : ""}${className ? ` ${className}` : ""}`}
        aria-hidden="true"
      >
        <i className="orbit" />
        <span className="coin">
          {hasPng ? (
            <picture>
              <source srcSet={`/icons/badges/badge-${name}.webp`} type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element -- 256px static PNG, next/image adds nothing here */}
              <img src={`/icons/badges/badge-${name}.png`} alt="" width="64" height="64" loading="lazy" />
            </picture>
          ) : (
            <svg
              viewBox="0 0 48 48"
              fill="none"
              stroke={`url(#${g})`}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <defs>
                <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor={light ? "#13213A" : "#C9A66B"} />
                  <stop offset="1" stopColor={light ? "#2D6A6B" : "#7FBFB3"} />
                </linearGradient>
              </defs>
              {glyph}
            </svg>
          )}
        </span>
      </span>
    );
  }

  /* Legacy white medallion (icon prop). Kept for existing call sites until the
     new coin badges are rolled out everywhere. */
  const g = `g${uid}`;
  const d = `d${uid}`;
  return (
    <svg
      viewBox="0 0 136 136"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={g} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#0E2F52" />
          <stop offset=".55" stopColor="#1D6B72" />
          <stop offset="1" stopColor="#2C8A90" />
        </linearGradient>
        <radialGradient id={d} cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E4F0F1" />
        </radialGradient>
      </defs>
      <circle cx="68" cy="68" r="62" fill="#FFFFFF" />
      <circle cx="68" cy="68" r="61" fill="none" stroke={`url(#${g})`} strokeWidth="1.5" />
      <g stroke="#C29A5B" strokeWidth="1.2" strokeLinecap="round">
        {TICKS.map((t, i) => (
          <line
            key={i}
            x1={t.x1.toFixed(1)}
            y1={t.y1.toFixed(1)}
            x2={t.x2.toFixed(1)}
            y2={t.y2.toFixed(1)}
          />
        ))}
      </g>
      <circle
        cx="68"
        cy="68"
        r="46"
        fill={`url(#${d})`}
        stroke={`url(#${g})`}
        strokeWidth="2.5"
      />
      <g
        transform="translate(41 41) scale(2.25)"
        fill="none"
        stroke={`url(#${g})`}
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon ? iconPaths[icon] : null}
      </g>
    </svg>
  );
}
