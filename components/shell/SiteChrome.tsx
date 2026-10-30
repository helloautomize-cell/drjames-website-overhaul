"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/site/Header";
import { Dock } from "@/components/site/Dock";
import { FinderProvider } from "@/components/site/SymptomFinder";
import { SiteFooter } from "@/components/sections/SiteFooter";
import type { ReadNext } from "@/lib/read-next";

/* Rendered nothing until needed — keep them out of the initial hydration
   pass so first paint and LCP aren't queued behind their evaluation. */
const CookieBanner = dynamic(
  () => import("@/components/shell/CookieBanner").then((m) => m.CookieBanner),
  { ssr: false },
);
const Analytics = dynamic(() => import("@/components/analytics/Analytics").then((m) => m.Analytics), {
  ssr: false,
});

/**
 * Production site chrome: concierge rail + floating header, main landmark,
 * footer, mobile dock, symptom finder, cookie banner.
 */
export function SiteChrome({
  children,
  readNext,
}: {
  children: ReactNode;
  readNext: Record<string, ReadNext>;
}) {
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
