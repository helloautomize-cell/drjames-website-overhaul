import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { site } from "@/lib/site-config";
import { FaqBlock } from "@/components/page/FaqBlock";
import { visibleFaqs } from "@/lib/faqs";
import {
  pageMeta,
  JsonLd,
  breadcrumbNode,
  medicalWebPageNode,
  faqPageNode,
  physicianNode,
  hospitalNode,
  medicalClinicNode,
  websiteNode,
} from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "FAQs: appointments, visits and care",
  "Quick answers about booking, hours, what to bring, insurance, follow-ups and seeing Dr. James at Badr Al Samaa Royal Hospital, Muscat.",
  "/faqs/",
);

const crumbs = [{ label: "Home", href: "/" }, { label: "FAQs" }];

export default function FaqsPage() {
  const faqs = visibleFaqs();
  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          hospitalNode,
          medicalClinicNode,
          medicalWebPageNode("/faqs/", "FAQs", undefined, "[CONFIRM]"),
          faqPageNode("/faqs/", faqs),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        title="Quick answers"
        intro="The questions patients ask most, answered plainly. If yours is not here, WhatsApp or call us and we will answer it."
      />
      <div className="container">
        <div className="pg-grid" style={{ gridTemplateColumns: "1fr", maxWidth: 860 }}>
          <div className="main">
            <FaqBlock faqs={faqs} heading="Booking and visits" />
            <p className="em-line">
              Medical emergency? Call {site.emergency}. Do not wait for a website reply.
            </p>
          </div>
        </div>
        <div style={{ padding: "10px 0 64px" }} />
      </div>
    </main>
  );
}
