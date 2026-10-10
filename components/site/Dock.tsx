"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { Icon } from "@/lib/icons";
import { useFinder } from "@/components/site/SymptomFinder";

/** Mobile bottom dock: Book, Call, WhatsApp, Finder. Hidden while typing and on /thank-you. */
export function Dock() {
  const pathname = usePathname();
  const { openFinder, preloadFinder } = useFinder();
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const isField = (t: EventTarget | null) =>
      t instanceof HTMLElement && t.matches("input, textarea, select, [contenteditable]");
    const onIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onOut = (e: FocusEvent) => isField(e.target) && setTyping(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  const off = typing || pathname?.startsWith("/thank-you");
  return (
    <nav className={`x-dock${off ? " x-off" : ""}`} aria-label="Quick actions">
      <Link className="x-pri" href={site.bookUrl}>
        <Icon name="calendar" size={20} />
        Book
      </Link>
      <a href={site.phoneTel} aria-label={`Call ${site.phoneDisplay}`}>
        <Icon name="phone" size={22} />
      </a>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <Icon name="whatsapp" size={22} />
      </a>
      <button type="button" onClick={openFinder} onPointerEnter={preloadFinder} onFocus={preloadFinder} aria-label="Find care by symptom">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>
    </nav>
  );
}
