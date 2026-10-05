import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { site } from "@/lib/site-config";
import { FaqBlock } from "@/components/page/FaqBlock";
import {
  pageMeta,
  JsonLd,
  breadcrumbNode,
  medicalWebPageNode,
  faqPageNode,
  physicianNode,
  websiteNode,
} from "@/lib/seo";

const FAQS = [
  {
    q: "How do I book an appointment?",
    a: "Three ways: the form on the contact page, a WhatsApp message, or a call to +968 9751 0975. A request is confirmed when the practice replies with your exact time, usually within our reply window.",
  },
  {
    q: "What are the consultation hours?",
    a: "Saturday to Thursday, 8:30 am to 9 pm, with the clinic closed on Fridays. These times are being confirmed with the practice, so please check when you book. Public holiday timings may differ.",
  },
  {
    q: "Do I need a referral to see Dr. James?",
    a: "No. You can book directly. A referral from another doctor is welcome if you have one, but it is not required for a consultation.",
  },
  {
    q: "Can I book for a parent or a child?",
    a: "Yes. Family members often book for parents and children. For patients under 18, a parent or guardian fills the form and comes to the visit. For older parents, whoever helps them day to day is welcome to join the consultation.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Bring all your medicines or clear photos of the boxes, any older lab reports and scans, and home readings like sugar or blood pressure diaries. If blood tests may be needed, ask when booking whether to come fasting.",
  },
  {
    q: "Does Dr. James do home visits or online consultations?",
    a: "[CONFIRM: teleconsultation and home visits]. For now, appointments are at Badr Al Samaa Royal Hospital. Follow-up questions between visits can often be handled on WhatsApp or phone.",
  },
  {
    q: "Which insurance do you accept?",
    a: "[CONFIRM: insurance arrangements]. Insurance handling depends on the hospital's billing desk; bring your card and check when you book.",
  },
  {
    q: "How much is a consultation?",
    a: "Fees are handled by the hospital's billing desk rather than this website. Ask about the current consultation fee when you book [CONFIRM: fee display].",
  },
  {
    q: "I have diabetes and blood pressure. Can one doctor manage both?",
    a: "Yes, that is exactly what an internist is for. Dr. James manages related conditions together, so your sugar, pressure, cholesterol and kidneys are treated as one plan rather than separate problems.",
  },
  {
    q: "What languages does Dr. James speak?",
    a: "[CONFIRM: languages]. If you are worried about explaining symptoms in English, mention it when you book and we will help.",
  },
  {
    q: "How do I get my test results?",
    a: "Results are explained at your review visit or, when suitable, sent by message. Every result comes with an explanation of what it means and what, if anything, changes in your plan.",
  },
  {
    q: "Is my information private?",
    a: "Yes. Enquiries go only to the practice, and the website collects the minimum needed to answer you. The privacy policy explains what is stored and for how long, and analytics run only with your consent.",
  },
];

export const metadata: Metadata = pageMeta(
  "FAQs: appointments, visits and care",
  "Quick answers about booking, hours, what to bring, insurance, follow-ups and seeing Dr. James at Badr Al Samaa Royal Hospital, Muscat.",
  "/faqs/",
);

const crumbs = [{ label: "Home", href: "/" }, { label: "FAQs" }];

export default function FaqsPage() {
  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          medicalWebPageNode("/faqs/", "FAQs", undefined, "[CONFIRM]"),
          faqPageNode("/faqs/", FAQS),
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
            <FaqBlock faqs={FAQS} heading="Booking and visits" />
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
