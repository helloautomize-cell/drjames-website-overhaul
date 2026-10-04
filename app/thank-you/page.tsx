import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shell/Breadcrumbs";
import { Icon } from "@/lib/icons";
import { Confirm } from "@/components/Confirm";
import { ThankYouTrack } from "@/components/analytics/ThankYouTrack";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

/** Confirmation shown after the booking form posts (wired in Phase 5). */
export default function ThankYou() {
  return (
    <main id="main" className="container">
      <ThankYouTrack />
      <div className="empty-page">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Thank you" }]} />
        <div className="thx-card">
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
