import { useId } from "react";
import { iconPaths, type IconName } from "@/lib/icons";

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
 * Service badge: white coin, gradient ring, sand dial ticks and a teal line
 * icon in the middle. Placeholder style until the illustrated PNG badges
 * arrive (public/images/icons/services/<slug>.webp).
 */
export function Badge({
  icon,
  size,
  className,
}: {
  icon: IconName;
  size?: number;
  className?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
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
      <g stroke="#C9A46A" strokeWidth="1.2" strokeLinecap="round">
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
        {iconPaths[icon]}
      </g>
    </svg>
  );
}
