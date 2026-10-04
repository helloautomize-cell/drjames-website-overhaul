"use client";

import { analyticsAllowed } from "@/lib/consent";

/**
 * GA4 loader, gated on cookie consent (7.4).
 * Nothing loads or fires until `analyticsAllowed()` is true;
 * ad signals stay denied under Consent Mode v2. Query strings
 * are stripped from reported URLs except utm_* parameters.
 * No personal or health data is ever attached to events.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let loaded = false;

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
  if (typeof window === "undefined") return;
  // Lazy-load: effects elsewhere in the tree may fire before the
  // Analytics component's own mount effect (e.g. generate_lead on
  // the thank-you page). loadGa() still gates on consent.
  if (!loaded && !loadGa()) return;
  window.gtag?.("event", event, params);
}

export function pageView() {
  if (!loaded || !window.gtag || !GA_ID) return;
  window.gtag("event", "page_view", {
    page_location: cleanLocation(),
    page_path: window.location.pathname,
  });
}

/** Inject gtag.js once, only after analytics consent. */
export function loadGa(): boolean {
  if (typeof window === "undefined" || !GA_ID || loaded || !analyticsAllowed()) {
    return false;
  }
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("config", GA_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });

  const s = document.createElement("script");
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.async = true;
  document.head.appendChild(s);
  pageView();
  return true;
}

export const GA_ENABLED = Boolean(GA_ID);
