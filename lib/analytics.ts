"use client";

/**
 * GA4 helpers for the Consent Mode v2 (advanced) setup.
 * The tag itself — denied-by-default consent, gtag.js and config — is
 * injected by the root layout on every page, so these helpers only
 * queue calls on the existing gtag stub. Consent Mode controls whether
 * pings may use cookies; ad signals stay denied always. Query strings
 * are stripped from reported URLs except utm_* parameters. No personal
 * or health data is ever attached to events.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-VE31QK70MB";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Clean page URL: origin + path + allowed utm_* params only. */
function cleanLocation(): string {
  const keep = new URLSearchParams();
  new URLSearchParams(window.location.search).forEach((v, k) => {
    if (k.startsWith("utm_")) keep.set(k, v);
  });
  const q = keep.toString();
  return window.location.origin + window.location.pathname + (q ? `?${q}` : "");
}

export function track(event: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

export function pageView() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_location: cleanLocation(),
    page_path: window.location.pathname,
  });
}

/** Consent Mode v2 update — analytics storage only; ad signals stay denied. */
export function updateConsent(analytics: boolean) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export const GA_ENABLED = Boolean(GA_ID);
