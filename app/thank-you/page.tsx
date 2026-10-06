import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shell/Breadcrumbs";
import { Icon } from "@/lib/icons";
import { Confirm } from "@/components/Confirm";
import { ThankYouTrack } from "@/components/analytics/ThankYouTrack";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
  alternates: { canonical: `${process.env.SITE_URL ?? "https://drjamesp.com"}/thank-you/` },
};

/** Confirmation shown after the booking form posts (wired in Phase 5). */
export default function ThankYou() {
  return (
    <main id="main" className="container">
      <ThankYouTrack />
      <div className="empty-page">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Thank you" }]} />
        <div className="thx-card">
          <Image
            src="/images/doctor/d04-headshot-400sq.jpg"
            alt="Dr. James Kumar Pallivathukkal, specialist internist"
            width={96}
            height={96}
            className="thx-photo"
          />
          <span className="thx-ic">
            <Icon name="check" size={30} strokeWidth={2} />
          </span>
          <h1>Thank you, request received</h1>
          <p>
            Dr. James&apos;s team will confirm your appointment by message.
            Reply time: <Confirm />.
          </p>
          <p>
            If your need is urgent, call{" "}
            <a className="link" href={site.phoneTel}>
              {site.phoneDisplay}
            </a>{" "}
            now. In a medical emergency call {site.emergency}.
          </p>
        </div>
      </div>
    </main>
  );
}
