"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: { sitekey: string; theme?: string; "response-field"?: boolean },
      ) => string;
      remove?: (id: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/**
 * Cloudflare Turnstile widget. Renders nothing when no site key is
 * configured (local dev / previews without keys) so the form still works.
 */
export function Turnstile() {
  const ref = useRef<HTMLDivElement>(null);
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    const el = ref.current;
    if (!sitekey || !el) return;

    let widgetId: string | undefined;
    const mount = () => {
      if (window.turnstile && !widgetId) {
        widgetId = window.turnstile.render(el, { sitekey, theme: "light" });
      }
    };

    if (window.turnstile) {
      mount();
    } else {
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      s.onload = mount;
      document.head.appendChild(s);
    }
    return () => {
      if (widgetId && window.turnstile?.remove) window.turnstile.remove(widgetId);
    };
  }, [sitekey]);

  if (!sitekey) return null;
  return <div ref={ref} className="tslot" data-testid="turnstile" />;
}
