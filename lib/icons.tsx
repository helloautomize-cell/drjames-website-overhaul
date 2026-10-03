import type { ReactNode } from "react";

export type IconName =
  | "drop"
  | "chol"
  | "tape"
  | "thy"
  | "bp"
  | "heart"
  | "lungs"
  | "chest"
  | "sleep"
  | "allergy"
  | "therm"
  | "kidney"
  | "liver"
  | "gut"
  | "elder"
  | "check"
  | "joint"
  | "rbc"
  | "clock"
  | "pulse"
  | "shield"
  | "book"
  | "message"
  | "calendar"
  | "phone"
  | "whatsapp"
  | "mail"
  | "pin"
  | "alert"
  | "info"
  | "heartline"
  | "arrow"
  | "arrowLeft"
  | "menu"
  | "pause"
  | "play"
  | "close";

export const iconPaths: Record<IconName, ReactNode> = {
  drop: (
    <>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
      <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
    </>
  ),
  chol: (
    <>
      <path d="M3 9h18M3 15h18" />
      <circle cx="8" cy="12" r="1.6" />
      <circle cx="13" cy="12" r="1.2" />
      <circle cx="17" cy="12" r="1.8" />
    </>
  ),
  tape: (
    <>
      <rect x="3" y="8" width="18" height="8" rx="2" />
      <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
    </>
  ),
  thy: (
    <path d="M8 6c-3 2-3 9 0 11 2 1 3-1 4-3 1 2 2 4 4 3 3-2 3-9 0-11-2-1-3 2-4 4-1-2-2-5-4-4z" />
  ),
  bp: (
    <>
      <rect x="3" y="6" width="12" height="12" rx="3" />
      <path d="M15 12h3a3 3 0 0 1 3 3v3" />
      <path d="M7 12h4" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.5-8 11-8 11z" />
      <path d="M4 12h4l2-3 3 6 2-3h5" />
    </>
  ),
  lungs: (
    <>
      <path d="M12 4v8M12 12l-3 2M12 12l3 2" />
      <path d="M9 7C6 7 4 11 4 16c0 2 1 3 3 3s3-1 3-3V9M15 7c3 0 5 4 5 9 0 2-1 3-3 3s-3-1-3-3V9" />
    </>
  ),
  chest: (
    <>
      <path d="M12 4v16" />
      <path d="M8 6c-2 1-4 4-4 9M16 6c2 1 4 4 4 9" />
      <circle cx="8" cy="14" r="1.5" />
      <circle cx="16" cy="11" r="1.2" />
    </>
  ),
  sleep: (
    <>
      <path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z" />
      <path d="M15 4h3l-3 3h3" />
    </>
  ),
  allergy: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </>
  ),
  therm: (
    <>
      <path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z" />
      <path d="M12 9v7" />
    </>
  ),
  kidney: (
    <>
      <path d="M9 4C5 4 4 8 4 11s1 8 5 8c2 0 3-2 3-4s-2-3-2-5 2-2 2-3-1-3-3-3z" />
      <path d="M15 4c4 0 5 4 5 7s-1 8-5 8" />
    </>
  ),
  liver: <path d="M3 10c0-3 3-5 8-5h6c3 0 4 2 4 4 0 5-6 10-11 10-4 0-7-4-7-9z" />,
  gut: <path d="M7 4v3c0 2 10 1 10 4s-10 1-10 4 10 1 10 4v1" />,
  elder: (
    <>
      <circle cx="10" cy="4.5" r="2" />
      <path d="M10 7v6l-3 7M10 13l3 7M10 9l-3 3M16 10v11M16 10c0-1.5 2-1.5 2 0" />
    </>
  ),
  check: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3v2h6V3M9 13l2 2 4-4" />
    </>
  ),
  joint: (
    <>
      <path d="M9 3v7a3 3 0 0 0 6 0V3" />
      <path d="M9 21v-5a3 3 0 0 1 6 0v5" />
    </>
  ),
  rbc: (
    <>
      <circle cx="9" cy="10" r="5" />
      <circle cx="16" cy="15" r="4" />
      <circle cx="9" cy="10" r="1.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  pulse: <path d="M2 12h4l2-6 4 12 2-6h8" />,
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  book: (
    <>
      <path d="M4 19V5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z" />
      <path d="M8 7h6M8 11h6" />
    </>
  ),
  message: (
    <>
      <path d="M4 5h16v11H8l-4 4z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6z" />
      <path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1-1.2 1.8.8c-.2 1-1 1.8-2 1.8-3 0-6.4-3.4-6.4-6.4 0-1 .8-1.8 1.8-2l.8 1.8z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3l9 16H3L12 3z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" />
    </>
  ),
  heartline: (
    <path d="M12 20s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.5-8 11-8 11z" />
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  pause: <path d="M9 5v14M15 5v14" strokeWidth="2.4" />,
  play: <path d="M9 5l10 7-10 7z" strokeLinejoin="round" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
};

export function Icon({
  name,
  size = 24,
  strokeWidth = 1.75,
  className,
  fill = "none",
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

export function StarIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
    </svg>
  );
}
