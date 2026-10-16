import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { RightDoctor } from "@/components/home/RightDoctor";
import { HowHeWorks } from "@/components/home/HowHeWorks";
import { MeetDrJames } from "@/components/home/MeetDrJames";
import { VisitBand } from "@/components/home/VisitBand";

const ConditionsMosaic = dynamic(() =>
  import("@/components/home/ConditionsMosaic").then((m) => m.ConditionsMosaic),
);
const FirstVisit = dynamic(() =>
  import("@/components/home/FirstVisit").then((m) => m.FirstVisit),
);
import { LibraryHighlights } from "@/components/home/LibraryHighlights";
import { Faq, HOME_FAQS } from "@/components/sections/Faq";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import {
  pageMeta,
  JsonLd,
  websiteNode,
  physicianNode,
  hospitalNode,
  medicalClinicNode,
  faqPageNode,
} from "@/lib/seo";
export const metadata: Metadata = pageMeta(
  `${site.name} · ${site.title} in Muscat`,
  "Specialist in Internal Medicine and Diabetes at Badr Al Samaa Royal Hospital, Muscat. Diabetes, heart and kidney risk, lungs, infections, inflammatory disorders and complex adult conditions, looked after together by one senior specialist.",
  "/",
);

export default function Home() {
  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          hospitalNode,
          medicalClinicNode,
          faqPageNode(
            "/",
            HOME_FAQS.filter((f) => !f.confirm).map(({ q, a }) => ({ q, a })),
          ),
        ]}
      />
      <Hero />
      <ConditionsMosaic />
      <RightDoctor />
      <HowHeWorks />
      <FirstVisit />
      <MeetDrJames />
      <LibraryHighlights />
      <VisitBand />

      <section className="sec" aria-labelledby="fq-h">
        <div className="container">
          <div className="faqgrid">
            <div>
              <span className="eyebrow">Questions</span>
              <h2 id="fq-h">
                Before you <em className="acc">come in</em>
              </h2>
              <p className="fsub">
                The practical things patients ask most. Can&rsquo;t find your answer? Message the
                clinic on WhatsApp.
              </p>
              <a
                className="btn btn-o"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1f7a4d" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z" />
                </svg>
                Message on WhatsApp
              </a>
            </div>
            <Faq />
          </div>
        </div>
      </section>
    </main>
  );
}
