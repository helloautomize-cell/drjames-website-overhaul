"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { Icon } from "@/lib/icons";

/**
 * Fixed action bar under 1024px: Book Now, Call Now, WhatsApp.
 * Guide pages (/health-library/<slug>/) gain a Share button that uses
 * navigator.share when available and falls back to copying the link.
 * Hidden while typing in a form field and on /thank-you.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const [typing, setTyping] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const isField = (t: EventTarget | null) =>
      t instanceof HTMLElement &&
      t.matches("input, textarea, select, [contenteditable]");
    const onIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onOut = (e: FocusEvent) => isField(e.target) && setTyping(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  useEffect(() => {
    if (!shared) return;
    const t = setTimeout(() => setShared(false), 2000);
    return () => clearTimeout(t);
  }, [shared]);

  const isGuide = /^\/health-library\/(?!topic\/|page\/|rss)[^/]+\/$/.test(pathname ?? "");
  const hidden = typing || pathname?.startsWith("/thank-you");

  async function share() {
    const url = window.location.href;
    const title = document.title;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
      }
    } catch {
      /* dismissed or unavailable */
    }
  }

  return (
    <div className={`abar${hidden ? " off" : ""}`} role="group" aria-label="Quick actions">
      <Link className="barbtn" href={site.bookUrl}>
        <Icon name="calendar" size={22} />
        Book Now
      </Link>
      <a className="barbtn" href={site.phoneTel}>
        <Icon name="phone" size={22} />
        Call Now
      </a>
      <a
        className="barbtn"
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="whatsapp" size={22} />
        WhatsApp
      </a>
      {isGuide && (
        <button type="button" className="barbtn" onClick={share} aria-live="polite">
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3v13M8 7l4-4 4 4" />
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
          </svg>
          {shared ? "Copied" : "Share"}
        </button>
      )}
    </div>
  );
}
