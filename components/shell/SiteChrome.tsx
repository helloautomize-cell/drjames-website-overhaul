"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/site/Header";
import { Dock } from "@/components/site/Dock";
import { FinderProvider } from "@/components/site/SymptomFinder";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { CookieBanner } from "@/components/shell/CookieBanner";
import { Analytics } from "@/components/analytics/Analytics";
import type { ReadNext } from "@/lib/read-next";

/**
 * Production site chrome: concierge rail + floating header, main landmark,
 * footer, mobile dock, symptom finder, cookie banner.
 * `/styleguide` renders bare — it is the component showcase.
 */
export function SiteChrome({
  children,
  readNext,
}: {
  children: ReactNode;
  readNext: Record<string, ReadNext>;
}) {
  const pathname = usePathname();
  if (pathname === "/styleguide" || pathname === "/styleguide/") {
    return <>{children}</>;
  }
  return (
    <FinderProvider>
      <Header readNext={readNext} />
      {children}
      <div className="container" style={{ paddingBottom: 32 }}>
        <SiteFooter />
      </div>
      <Dock />
      <CookieBanner />
      <Analytics />
    </FinderProvider>
  );
}
