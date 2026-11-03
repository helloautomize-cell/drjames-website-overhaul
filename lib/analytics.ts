"use client";

/**
 * GA4 helpers. The tag loads only after the visitor consents to optional
 * analytics (see components/analytics/Analytics.tsx); before that, only
 * the denied-by-default consent stub from the root layout exists on
 * dataLayer. Every dispatch re-checks consent so a withdrawal stops
 * measurement immediately. Reported locations carry no query string and
 * no condition- or guide-specific path — only the site section and a
 * coarse page type. No personal or health data is ever attached to events.
 */

import { readConsent } from "@/lib/consent";

/** True only when the visitor explicitly declined analytics. */
function declined() {
  return readConsent()?.analytics === false;
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-VE31QK70MB";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let loaded = false;

/**
 * Fetch gtag.js and configure the tag. Consent Mode v2 advanced: the tag
 * loads for everyone; until the visitor accepts, analytics_storage stays
 * denied so hits are cookieless. An explicit decline disables the tag.
 */
export function loadGa() {
  if (loaded || !GA_ID || typeof window === "undefined" || typeof window.gtag !== "function")
    return;
  loaded = true;
  const s = document.createElement("script");
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.async = true;
  document.head.appendChild(s);
  window.gtag("config", GA_ID, { send_page_view: false, anonymize_ip: true });
  // Views before the tag loaded had no destination; send the current one now.
  if (!declined()) {
    window.gtag("event", "page_view", { page_type: pageType(), page_location: cleanLocation() });
  }
}

/** Coarse page type — the only location signal sent to GA. */
export function pageType(pathname = window.location.pathname): string {
  const p = pathname.toLowerCase();
  if (p === "/" || p === "") return "home";
  if (/^\/conditions\/[^/]+/.test(p)) return "condition";
  if (p.startsWith("/conditions")) return "conditions";
  if (/^\/health-library\/topic\//.test(p)) return "topic";
  if (/^\/health-library\/[^/]+/.test(p)) return "guide";
  if (p.startsWith("/health-library")) return "library";
  if (p.startsWith("/contact")) return "contact";
  if (p.startsWith("/about-dr-james")) return "about";
  if (p.startsWith("/your-visit")) return "visit";
  if (p.startsWith("/faqs")) return "faqs";
  if (p.startsWith("/thank-you")) return "thank-you";
  if (
    /^\/(privacy-policy|medical-disclaimer|editorial-policy|terms-of-use|appointments-and-cancellations|patient-rights|accessibility)/.test(
      p,
    )
  )
    return "legal";
  return "page";
}

/** Section-level URL only — never a slug, query string or referrer. */
function cleanLocation(): string {
  const seg = window.location.pathname.split("/")[1] ?? "";
  return window.location.origin + (seg ? `/${seg}/` : "/");
}

export function track(event: string, params: Record<string, string | number | boolean> = {}) {
  if (
    typeof window === "undefined" ||
    declined() ||
    typeof window.gtag !== "function"
  )
    return;
  window.gtag("event", event, params);
}

export function pageView() {
  if (
    typeof window === "undefined" ||
    !loaded ||
    declined() ||
    typeof window.gtag !== "function"
  )
    return;
  window.gtag("event", "page_view", {
    page_type: pageType(),
    page_location: cleanLocation(),
  });
}

/** Expire every _ga* cookie on each plausible domain scope. */
function clearGaCookies() {
  const host = window.location.hostname;
  const domains = new Set(["", host, `.${host}`]);
  const parts = host.split(".");
  if (parts.length > 2) domains.add(`.${parts.slice(-2).join(".")}`);
  for (const c of document.cookie.split(";")) {
    const name = c.trim().split("=")[0];
    if (!name.startsWith("_ga")) continue;
    for (const d of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

/**
 * Consent Mode v2 update — analytics storage only; ad signals stay denied.
 * Withdrawal additionally disables the tag (ga-disable-<id>) and clears
 * GA cookies so nothing more is measured until re-acceptance.
 */
export function updateConsent(analytics: boolean) {
  if (typeof window === "undefined") return;
  if (GA_ID) (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = declined();
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
  if (!analytics) clearGaCookies();
}

export const GA_ENABLED = Boolean(GA_ID);
