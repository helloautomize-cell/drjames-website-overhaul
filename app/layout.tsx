import type { Metadata, Viewport } from "next";
import { Newsreader, Inter_Tight } from "next/font/google";
import { SiteChrome } from "@/components/shell/SiteChrome";
import { readNextByGroup } from "@/lib/read-next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./v2.css";

const newsreader = Newsreader({
  variable: "--font-serif",
  axes: ["opsz"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  // no preload: the 275KB variable pair would otherwise starve the
  // LCP image in the request queue; swap + adjusted fallback covers CLS
  preload: false,
});

const interTight = Inter_Tight({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
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
    <html lang="en-OM" className={`${newsreader.variable} ${interTight.variable}`}>
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
