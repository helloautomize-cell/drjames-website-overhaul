import type { Metadata, Viewport } from "next";
import { Newsreader, Inter } from "next/font/google";
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
