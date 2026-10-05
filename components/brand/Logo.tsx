import { useId, type CSSProperties } from "react";

/**
 * The Dr. James logo redrawn as inline SVG (approved redraw, resources/brand/logo/).
 * The wordmark renders in Inter Tight from next/font via var(--font-sans).
 * White cut-outs follow --logo-ground: set it to the surface colour behind the logo.
 */

function MarkArtwork({ white }: { white: boolean }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const snake = `snake-${uid}`;
  const teal = `teal-${uid}`;
  const silver = `silver-${uid}`;
  const front = `front-${uid}`;
  const sn = `sn-${uid}`;
  const ecg = `ecg-${uid}`;

  const main = white ? "#FFFFFF" : "#0E2F52";
  const tealC = white ? "#FFFFFF" : "#1D6B72";
  const dark = white ? "#FFFFFF" : "#14545A";
  const ground = white ? "var(--logo-ground,#0E2F52)" : "var(--logo-ground,#fff)";

  return (
    <g>
      <defs>
        <linearGradient id={snake} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={white ? "#FFFFFF" : "#1D6B72"} />
          <stop offset=".55" stopColor={white ? "#FFFFFF" : "#14545A"} />
          <stop offset="1" stopColor={white ? "#FFFFFF" : "#0E2F52"} />
        </linearGradient>
        <linearGradient id={teal} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={dark} />
          <stop offset="1" stopColor={tealC} />
        </linearGradient>
        <linearGradient id={silver} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={white ? "#FFFFFF" : "#C3D2D5"} />
          <stop offset="1" stopColor={white ? "#FFFFFF" : "#A3BBBF"} stopOpacity="0" />
        </linearGradient>
        <clipPath id={front}>
          <rect x="120" y="128" width="100" height="40" />
          <rect x="120" y="250" width="100" height="38" />
        </clipPath>
        <path
          id={sn}
          d="M212,156 C176,140 124,152 130,184 C136,214 210,206 210,240 C210,272 130,266 130,298 C130,326 206,320 204,346 C202,366 180,370 172,380"
        />
        <path
          id={ecg}
          d="M14,262 H92 L102,236 L116,288 L127,248 L134,262 H206 L216,232 L228,286 L238,250 L244,262 H262 C276,262 284,250 290,232"
        />
      </defs>
      <path
        d="M50,150 C50,98 102,60 170,40 C238,60 290,98 290,150 L274,150 C274,112 232,86 170,70 C108,86 66,112 66,150Z"
        fill={`url(#${silver})`}
      />
      <path
        d="M150,364 H44 V146 C44,92 100,52 170,30 C240,52 296,92 296,146 V364 H190"
        fill="none"
        stroke={main}
        strokeWidth="13"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M150,342 H72 V158 C72,122 112,96 166,76 C178,72 184,64 186,54"
          stroke={ground}
          strokeWidth="19"
        />
        <path
          d="M150,342 H72 V158 C72,122 112,96 166,76 C178,72 184,64 186,54"
          stroke={`url(#${teal})`}
          strokeWidth="11"
        />
        <path
          d="M190,342 H268 V158 C268,122 228,96 174,76 C162,72 156,64 154,54"
          stroke={ground}
          strokeWidth="19"
        />
        <path
          d="M190,342 H268 V158 C268,122 228,96 174,76 C162,72 156,64 154,54"
          stroke={`url(#${teal})`}
          strokeWidth="11"
        />
      </g>
      <g transform="translate(170,32)">
        <path
          d="M0,-25 21.7,-12.5 21.7,12.5 0,25 -21.7,12.5 -21.7,-12.5Z"
          fill={main}
          stroke={ground}
          strokeWidth="5"
          paintOrder="stroke"
        />
        <path
          d="M0.00,-12.50 2.83,-6.84 8.84,-8.84 6.84,-2.83 12.50,0.00 6.84,2.83 8.84,8.84 2.83,6.84 0.00,12.50 -2.83,6.84 -8.84,8.84 -6.84,2.83 -12.50,0.00 -6.84,-2.83 -8.84,-8.84 -2.83,-6.84Z"
          fill={ground}
        />
        <circle r="3.4" fill={main} />
      </g>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <use href={`#${ecg}`} stroke={ground} strokeWidth="14" />
        <use href={`#${ecg}`} stroke={tealC} strokeWidth="6.5" />
      </g>
      <path
        d="M290,232 C284,204 300,182 330,176 C332,204 316,226 290,232Z"
        fill={tealC}
        stroke={ground}
        strokeWidth="3"
        paintOrder="stroke"
      />
      <path d="M293,228 L318,192" stroke={ground} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M304,252 v30 M289,267 h30" stroke={ground} strokeWidth="16" strokeLinecap="round" />
      <path d="M304,252 v30 M289,267 h30" stroke={tealC} strokeWidth="8.5" strokeLinecap="round" />
      <g fill="none" strokeLinecap="round">
        <use href={`#${sn}`} stroke={ground} strokeWidth="28" />
        <use href={`#${sn}`} stroke={`url(#${snake})`} strokeWidth="19" />
      </g>
      <path d="M170,126 V388" stroke={ground} strokeWidth="19" strokeLinecap="round" />
      <path d="M170,126 V388" stroke={main} strokeWidth="11" strokeLinecap="round" />
      <circle cx="170" cy="118" r="13" fill={main} stroke={ground} strokeWidth="4" paintOrder="stroke" />
      <g fill="none" strokeLinecap="round" clipPath={`url(#${front})`}>
        <use href={`#${sn}`} stroke={ground} strokeWidth="28" />
        <use href={`#${sn}`} stroke={`url(#${snake})`} strokeWidth="19" />
      </g>
      <path
        d="M204,152 C214,142 234,142 242,151 C247,158 238,165 226,165 C216,165 208,162 202,159Z"
        fill={dark}
        stroke={ground}
        strokeWidth="3.5"
        paintOrder="stroke"
      />
      <circle cx="229" cy="152" r="2.6" fill={ground} />
    </g>
  );
}

const wordmarkFont = "var(--font-sans), 'Helvetica Neue', Arial, sans-serif";

export function LogoMark({
  white = false,
  title = "Dr. James Pallivathukkal",
  className,
  style,
}: {
  white?: boolean;
  title?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 400"
      role="img"
      className={className}
      style={style}
      aria-label={title}
    >
      <title>{title}</title>
      <MarkArtwork white={white} />
    </svg>
  );
}

export function LogoHorizontal({
  white = false,
  title = "Dr. James Pallivathukkal, Internal Medicine and Diabetes",
  className,
  style,
}: {
  white?: boolean;
  title?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const nameFill = white ? "#FFFFFF" : "#0E2F52";
  const subFill = white ? "#E3C994" : "#1D6B72";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2330 400"
      role="img"
      className={className}
      style={style}
      aria-label={title}
    >
      <title>{title}</title>
      <MarkArtwork white={white} />
      <g fontFamily={wordmarkFont}>
        <text
          x="384"
          y="228"
          fontSize="122"
          fontWeight="800"
          letterSpacing="2"
          textLength="1940"
          lengthAdjust="spacing"
          fill={nameFill}
        >
          DR. JAMES PALLIVATHUKKAL
        </text>
        <text
          x="388"
          y="326"
          fontSize="62"
          fontWeight="700"
          letterSpacing="9"
          textLength="1936"
          lengthAdjust="spacing"
          fill={subFill}
        >
          INTERNAL MEDICINE &amp; DIABETES
        </text>
      </g>
    </svg>
  );
}

export function LogoStacked({
  white = false,
  title = "Dr. James Pallivathukkal, Specialist in Internal Medicine and Diabetes, Muscat, Oman",
  className,
  style,
}: {
  white?: boolean;
  title?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const nameFill = white ? "#FFFFFF" : "#0E2F52";
  const subFill = white ? "#E3C994" : "#1D6B72";
  const locFill = white ? "#FFFFFF" : "#0E2F52";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 640"
      role="img"
      className={className}
      style={style}
      aria-label={title}
    >
      <title>{title}</title>
      <MarkArtwork white={white} />
      <g fontFamily={wordmarkFont} textAnchor="middle">
        <text x="500" y="480" fontSize="66" fontWeight="800" letterSpacing="1.5" fill={nameFill}>
          DR. JAMES PALLIVATHUKKAL
        </text>
        <text x="500" y="540" fontSize="31.5" fontWeight="700" letterSpacing="2" fill={subFill}>
          SPECIALIST IN INTERNAL MEDICINE &amp; DIABETES
        </text>
        <text x="500" y="596" fontSize="28" fontWeight="600" letterSpacing="6" fill={locFill}>
          MUSCAT · OMAN
        </text>
      </g>
    </svg>
  );
}

/**
 * Simplified mark for 16px and 32px icons: arch, eight-point star and rod only.
 * Shown on /styleguide for approval before launch.
 */
export function LogoMarkSimple({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 400"
      role="img"
      className={className}
      style={style}
      aria-label="Dr. James Pallivathukkal"
    >
      <path
        d="M150,364 H44 V146 C44,92 100,52 170,30 C240,52 296,92 296,146 V364 H190"
        fill="none"
        stroke="#0E2F52"
        strokeWidth="26"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <g transform="translate(170,32)">
        <path
          d="M0,-28 24.2,-14 24.2,14 0,28 -24.2,14 -24.2,-14Z"
          fill="#0E2F52"
          stroke="#fff"
          strokeWidth="6"
          paintOrder="stroke"
        />
        <path
          d="M0.00,-14 3.17,-7.65 9.88,-9.88 7.65,-3.17 14,0.00 7.65,3.17 9.88,9.88 3.17,7.65 0.00,14 -3.17,7.65 -9.88,9.88 -7.65,3.17 -14,0.00 -7.65,-3.17 -9.88,-9.88 -3.17,-7.65Z"
          fill="#fff"
        />
      </g>
      <path d="M170,126 V388" stroke="#1D6B72" strokeWidth="22" strokeLinecap="round" />
      <circle cx="170" cy="118" r="16" fill="#1D6B72" stroke="#fff" strokeWidth="5" paintOrder="stroke" />
    </svg>
  );
}
