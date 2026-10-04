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

  // Delegated click events — no markup changes needed anywhere.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("call_click");
      else if (/wa\.me|whatsapp/.test(href)) track("whatsapp_click");
      else if (/maps\.app\.goo\.gl|google\.[a-z.]+\/maps|maps\?/.test(href))
        track("directions_click");
      else if (a.hash === "#book" || /#book\b/.test(href)) track("book_click");
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
