import type { Metadata, Viewport } from "next";
import { Newsreader, Inter } from "next/font/google";
import Script from "next/script";
import { SiteChrome } from "@/components/shell/SiteChrome";
import { readNextByGroup } from "@/lib/read-next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// variable font — one woff2 for all weights+italics instead of four files
const newsreader = Newsreader({
  variable: "--font-serif",
  style: ["normal", "italic"],
  subsets: ["latin"],
  // preloaded + next/font metric fallback: swap without a CLS or LCP penalty
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://drjamesp.com"),
  title: {
    default: "Dr. James Kumar Pallivathukkal | Internal Medicine and Diabetes, Muscat",
    template: "%s | Dr. James",
  },
  description:
    "Specialist in Internal Medicine and Diabetes at Badr Al Samaa Royal Hospital, Al Ghubrah Street, Muscat, Oman. Book by WhatsApp or phone on +968 9751 0975.",
  robots:
    process.env.SITE_INDEXABLE === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#0A1C2E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-OM"
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${inter.variable}`}
    >
      <body>
        {/* GA4 with Consent Mode v2: only the dataLayer stub and the
            denied-by-default consent state live here — no tag, no config,
            no measurement. gtag.js loads only after the visitor allows
            optional analytics (components/analytics/Analytics.tsx), and
            every event dispatch re-checks consent so a withdrawal stops
            measurement and clears GA cookies. Ad signals stay denied. */}
        <Script id="ga4-consent" strategy="beforeInteractive">{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var _c=null;try{_c=JSON.parse(window.localStorage.getItem("dj-consent-v1"));}catch(e){}
gtag("consent","default",{analytics_storage:_c&&_c.analytics===true?"granted":"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",wait_for_update:500});
gtag("js", new Date());
`}</Script>
        {/* The tag itself is injected by Analytics on first interaction (or
            ~3.5s after load) once consent is granted, so ~180KB of
            third-party JS never competes with the LCP image and fonts —
            and never loads at all for visitors who decline. */}
        <a href="#main" className="sr-only">
          Skip to content
        </a>
        <SiteChrome readNext={readNextByGroup()}>{children}</SiteChrome>
        {/* Speed Insights only exists on Vercel — skip elsewhere so
            local/preview serves no 404 script. */}
        {process.env.VERCEL ? <SpeedInsights /> : null}
        {/* Vercel Web Analytics: cookieless, no personal data, counts every
            visit regardless of the cookie banner. GA4 stays consent-based. */}
        <Script id="vercel-web-analytics" strategy="afterInteractive">
          {`window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};`}
        </Script>
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
