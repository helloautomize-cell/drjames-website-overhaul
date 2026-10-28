"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pageView, track, updateConsent } from "@/lib/analytics";
import { analyticsAllowed, CONSENT_EVENT, type ConsentState } from "@/lib/consent";

/**
 * Keeps the Consent Mode v2 analytics_storage signal in sync with the
 * cookie banner and wires the delegated click events. The tag itself
 * loads on every page via the root layout — cookieless pings until
 * consent is granted. Rendered once inside SiteChrome.
 */
export function Analytics() {
  const pathname = usePathname();

  // Re-apply a stored choice on load; then every banner decision
  // (Accept, Decline, settings save) sends the matching update.
  useEffect(() => {
    updateConsent(analyticsAllowed());
    const onConsent = (e: Event) => {
      updateConsent((e as CustomEvent<ConsentState>).detail?.analytics === true);
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  // config runs with send_page_view:false — send the initial view and
  // one per SPA navigation. Consent state decides if cookies attach.
  useEffect(() => {
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
