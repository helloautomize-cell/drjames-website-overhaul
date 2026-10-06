import type { ReactNode } from "react";

/**
 * 48x48 line glyphs from the design hand-off style guide (its `I` map).
 * Stroke colour is applied by the caller via a gradient `url(#id)`; all paths
 * are drawn with stroke-width 2.2, round caps and joins — same as the guide.
 */

export const badgeGlyphs: Record<string, ReactNode> = {
  sugar: (
    <>
      <path d="M24 6c6 9 12 15 12 22a12 12 0 0 1-24 0c0-7 6-13 12-22Z" />
      <path d="M19 30a5 5 0 0 0 5 5" />
    </>
  ),
  heart: (
    <>
      <path d="M24 40S8 30 8 18a8 8 0 0 1 16-3 8 8 0 0 1 16 3c0 12-16 22-16 22Z" />
      <path d="M12 24h7l3-5 4 10 3-5h7" />
    </>
  ),
  kidney: (
    <>
      <path d="M18 8c-7 0-10 7-10 15s4 17 11 17c5 0 6-4 5-8-1-3-4-4-4-9s3-6 3-9-2-6-5-6Z" />
      <path d="M30 8c7 0 10 7 10 15s-4 17-11 17" />
      <path d="M24 24h4" />
    </>
  ),
  lungs: (
    <>
      <path d="M24 6v16M24 22c-3 0-5 2-6 5" />
      <path d="M24 22c3 0 5 2 6 5" />
      <path d="M17 14c-6 2-9 12-9 20 0 4 3 6 7 5s5-4 5-8V18c0-3-1-4-3-4Z" />
      <path d="M31 14c6 2 9 12 9 20 0 4-3 6-7 5s-5-4-5-8V18c0-3 1-4 3-4Z" />
    </>
  ),
  liver: (
    <>
      <path d="M6 18c0-5 6-8 14-8h14c5 0 8 3 8 7 0 9-12 15-20 19-3 2-6 0-6-3 0-4-2-6-5-7-3-1-5-4-5-8Z" />
      <path d="M26 10v12" />
    </>
  ),
  thyroid: (
    <>
      <path d="M24 16v18" />
      <path d="M22 18c-4-6-12-4-12 4s4 14 9 14c3 0 3-3 3-5Z" />
      <path d="M26 18c4-6 12-4 12 4s-4 14-9 14c-3 0-3-3-3-5Z" />
    </>
  ),
  sleep: (
    <>
      <path d="M30 8a16 16 0 1 0 10 26A13 13 0 0 1 30 8Z" />
      <path d="M34 12h6l-6 6h6" />
    </>
  ),
  joint: (
    <>
      <path d="M16 6v14a8 8 0 0 0 16 0V6" />
      <path d="M16 42V30M32 42V30" />
      <circle cx="24" cy="22" r="3" />
    </>
  ),
  steth: (
    <>
      <path d="M12 6v10a8 8 0 0 0 16 0V6" />
      <path d="M20 24v6a9 9 0 0 0 18 0v-4" />
      <circle cx="38" cy="22" r="4" />
    </>
  ),
  calendar: (
    <>
      <rect x="8" y="10" width="32" height="30" rx="4" />
      <path d="M8 18h32M16 6v8M32 6v8M17 28l5 5 9-9" />
    </>
  ),
  clipboard: (
    <>
      <rect x="11" y="9" width="26" height="33" rx="3" />
      <path d="M18 9V6h12v3M17 20h14M17 27h14M17 34h8" />
    </>
  ),
  flask: (
    <>
      <path d="M19 6h10M21 6v13L10 38a3 3 0 0 0 3 4h22a3 3 0 0 0 3-4L27 19V6" />
      <path d="M14 31h20" />
    </>
  ),
  chat: (
    <>
      <path d="M8 12a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H20l-8 7v-7a4 4 0 0 1-4-4Z" />
      <path d="M16 18h16M16 24h10" />
    </>
  ),
  shield: (
    <>
      <path d="M24 5 9 11v11c0 10 7 17 15 21 8-4 15-11 15-21V11Z" />
      <path d="m17 24 5 5 9-9" />
    </>
  ),
  pills: (
    <>
      <rect x="6" y="18" width="24" height="12" rx="6" transform="rotate(-35 18 24)" />
      <path d="m14 17 8 12" />
      <circle cx="35" cy="33" r="7" />
      <path d="M30 33h10" />
    </>
  ),
  eye: (
    <>
      <path d="M4 24s7-12 20-12 20 12 20 12-7 12-20 12S4 24 4 24Z" />
      <circle cx="24" cy="24" r="5" />
    </>
  ),
  ear: (
    <>
      <path d="M15 20a10 10 0 0 1 20 0c0 6-6 8-6 14a6 6 0 0 1-11 3" />
      <path d="M20 21a5 5 0 0 1 10 0c0 3-3 4-3 7" />
    </>
  ),
  layers: (
    <>
      <path d="m24 8 16 8-16 8-16-8Z" />
      <path d="m8 25 16 8 16-8" />
      <path d="m8 33 16 8 16-8" />
    </>
  ),
  idcard: (
    <>
      <rect x="6" y="12" width="36" height="26" rx="3" />
      <circle cx="17" cy="23" r="4" />
      <path d="M11 33c1-3 3-4 6-4s5 1 6 4M28 21h9M28 27h7" />
    </>
  ),
};

/** Badge names (public API / PNG file slugs) -> style-guide glyph keys. */
export const badgeNameToGlyph = {
  "blood-sugar": "sugar",
  "heart-bp": "heart",
  kidneys: "kidney",
  lungs: "lungs",
  "liver-gut": "liver",
  thyroid: "thyroid",
  "sleep-energy": "sleep",
  joints: "joint",
  "step-book": "calendar",
  "step-arrive": "idcard",
  "step-consult": "steth",
  "step-tests": "flask",
  "step-plan": "clipboard",
  "step-follow-up": "chat",
  listens: "ear",
  together: "layers",
  "tests-reason": "flask",
  "plain-words": "chat",
} as const;

export type BadgeName = keyof typeof badgeNameToGlyph;
