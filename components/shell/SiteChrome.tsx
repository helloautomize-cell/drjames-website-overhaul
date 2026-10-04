"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { UtilityBar } from "@/components/shell/Shell";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { MobileActionBar } from "@/components/shell/MobileActionBar";
import { FloatingWhatsApp } from "@/components/shell/FloatingWhatsApp";
import { CookieBanner } from "@/components/shell/CookieBanner";

/**
 * Production site chrome: utility bar, sticky header, main landmark,
 * footer, mobile action bar, floating WhatsApp, cookie banner.
 * `/styleguide` renders bare — it is the component showcase.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/styleguide" || pathname === "/styleguide/") {
    return <>{children}</>;
  }
  return (
    <>
      <UtilityBar />
      <SiteHeader />
      <main id="main">{children}</main>
      <div className="container" style={{ paddingBottom: 32 }}>
        <SiteFooter />
      </div>
      <div className="abar-pad" aria-hidden="true" />
      <MobileActionBar />
      <FloatingWhatsApp />
      <CookieBanner />
    </>
  );
}
