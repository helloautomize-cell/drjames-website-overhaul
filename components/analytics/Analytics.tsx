"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { loadGa, pageView, track } from "@/lib/analytics";
import { CONSENT_EVENT, type ConsentState } from "@/lib/consent";

/**
 * Loads GA4 after analytics consent and wires the delegated
 * click events from 7.4. Rendered once inside SiteChrome.
 * Without a GA id it stays completely inert — no scripts,
 * no listeners with side effects.
 */
export function Analytics() {
  const pathname = usePathname();
  const firstPath = useRef(true);

  // Load on existing consent; react to the banner's Accept.
  useEffect(() => {
    loadGa();
    const onConsent = (e: Event) => {
      if ((e as CustomEvent<ConsentState>).detail?.analytics) loadGa();
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  // SPA navigations send a page_view once gtag exists. The initial
  // view is already sent by loadGa(), so skip the first run.
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    pageView();
  }, [pathname]);

  // Delegated click events — one document listener, at most one event
  // per click. Only page_path and link_location are sent; never the
  // phone number, email, link text or any form data.
  useEffect(() => {
    const social =
      /facebook\.com|instagram\.com|linkedin\.com|twitter\.com|(?:\/\/|\.)x\.com|youtube\.com|tiktok\.com/i;
    // CMS-content fallback only: whole-word CTA phrases.
    const ctaText =
      /\b(book appointment|book now|book a consultation|consult now|schedule)\b/i;

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";

      let event: string | null = null;
      if (a.dataset.ga === "appointment") event = "appointment_click";
      else if (href.startsWith("tel:")) event = "phone_click";
      else if (href.startsWith("mailto:")) event = "email_click";
      else if (href.startsWith("whatsapp://") || /wa\.me\/\d|api\.whatsapp\.com/.test(href))
        event = "whatsapp_click";
      else if (/maps\.app\.goo\.gl|google\.[a-z.]+\/maps|maps\.google|goo\.gl\/maps|maps\?/.test(href))
        event = "directions_click";
      else if (a.hash === "#book" || /#book\b/.test(href)) event = "appointment_click";
      else if (
        !a.closest("nav") &&
        !social.test(href) &&
        !/ebook/i.test(href + (a.textContent ?? "")) &&
        ctaText.test(a.textContent ?? "")
      )
        event = "appointment_click";
      if (!event) return;

      const linkLocation =
        a.closest<HTMLElement>("[data-ga-location]")?.dataset.gaLocation ??
        (a.closest("header")
          ? "header"
          : a.closest("footer")
            ? "footer"
            : a.closest("nav")
              ? "nav"
              : "body");
      track(event, { page_path: window.location.pathname, link_location: linkLocation });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
