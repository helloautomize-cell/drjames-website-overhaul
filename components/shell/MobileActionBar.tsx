"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { Icon } from "@/lib/icons";

/**
 * Fixed action bar under 1024px: Book Now, Call Now, WhatsApp.
 * Hidden while typing in a form field and on /thank-you.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const [typing, setTyping] = useState(false);

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

  const hidden = typing || pathname?.startsWith("/thank-you");

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
    </div>
  );
}
