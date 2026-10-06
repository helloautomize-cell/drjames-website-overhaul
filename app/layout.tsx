import type { Metadata, Viewport } from "next";
import { Newsreader, Inter, Mrs_Saint_Delafield } from "next/font/google";
import { SiteChrome } from "@/components/shell/SiteChrome";
import { readNextByGroup } from "@/lib/read-next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./v2.css";

const newsreader = Newsreader({
  variable: "--font-serif",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  // preloaded + next/font metric fallback: swap without a CLS or LCP penalty
  display: "swap",
  preload: true,
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const signature = Mrs_Saint_Delafield({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sig",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://drjamesp.com"),
  title: {
    default: "Dr. James Kumar Pallivathukkal | Internal Medicine and Diabetes, Muscat",
    template: "%s | Dr. James Kumar Pallivathukkal",
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
      className={`${newsreader.variable} ${inter.variable} ${signature.variable}`}
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
