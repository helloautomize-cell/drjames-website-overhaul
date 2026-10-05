import type { Metadata, Viewport } from "next";
import { Figtree, Instrument_Serif } from "next/font/google";
import { SiteChrome } from "@/components/shell/SiteChrome";
import { readNextByGroup } from "@/lib/read-next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./v2.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "optional",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "optional",
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
    <html lang="en-OM" className={`${figtree.variable} ${instrumentSerif.variable}`}>
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
