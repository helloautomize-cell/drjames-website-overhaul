import type { Metadata, Viewport } from "next";
import { Newsreader, Inter } from "next/font/google";
import Script from "next/script";
import { SiteChrome } from "@/components/shell/SiteChrome";
import { readNextByGroup } from "@/lib/read-next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-VE31QK70MB";

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
        {/* GA4 with Consent Mode v2 (advanced): the denied-by-default
            consent state is set before gtag.js loads, so every page sends
            cookieless pings until the visitor allows analytics. A stored
            banner choice is applied via the same default. Ad signals
            stay denied; send_page_view is off — page_view is sent by
            Analytics after the consent state is applied. */}
        <Script id="ga4-consent" strategy="beforeInteractive">{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var _c=null;try{_c=JSON.parse(window.localStorage.getItem("dj-consent-v1"));}catch(e){}
gtag("consent","default",{analytics_storage:_c&&_c.analytics===true?"granted":"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",wait_for_update:500});
gtag("js", new Date());
gtag("config", "${GA_ID}", {send_page_view:false,anonymize_ip:true});
`}</Script>
        {/* The tag itself is injected by Analytics on first interaction (or
            ~3.5s after load) so ~180KB of third-party JS never competes with
            the LCP image and fonts. The stub above already queued consent
            defaults, config and any events on dataLayer. */}
        <a href="#main" className="sr-only">
          Skip to content
        </a>
        <SiteChrome readNext={readNextByGroup()}>{children}</SiteChrome>
        {/* Speed Insights only exists on Vercel — skip elsewhere so
            local/preview serves no 404 script. */}
        {process.env.VERCEL ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
