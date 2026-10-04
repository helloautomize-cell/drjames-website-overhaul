import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Hero } from "@/components/home/Hero";
import { ConditionsMosaic } from "@/components/home/ConditionsMosaic";
import { RightDoctor } from "@/components/home/RightDoctor";
import { HowHeWorks } from "@/components/home/HowHeWorks";
import { StepTracker } from "@/components/StepTracker";
import { MeetDrJames } from "@/components/home/MeetDrJames";
import { VisitBand } from "@/components/home/VisitBand";
import { CtaBand } from "@/components/home/CtaBand";
import { LibraryCarousel } from "@/components/LibraryCarousel";
import { Faq, HOME_FAQS } from "@/components/sections/Faq";
import { site } from "@/lib/site-config";
import { libraryArticles } from "@/lib/library-articles";
import {
  pageMeta,
  JsonLd,
  websiteNode,
  physicianNode,
  hospitalNode,
  faqPageNode,
} from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  `${site.name} · ${site.title} in Muscat`,
  "Specialist in Internal Medicine and Diabetes at Badr Al Samaa Royal Hospital, Muscat. Diabetes, blood pressure, heart risk, lungs, kidneys and liver, looked after together by one senior physician.",
  "/",
);

function SecHead({
  eyebrow,
  children,
  sub,
}: {
  eyebrow: string;
  children: ReactNode;
  sub?: string;
}) {
  return (
    <div className="sec-h">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

export default function Home() {
  const articles = libraryArticles();

  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          hospitalNode,
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

      <section className="sec">
        <div className="container">
          <SecHead
            eyebrow="Your first visit"
            sub="From booking to follow-up, here is exactly what happens."
          >
            Your first visit, step by <em className="acc">step</em>
          </SecHead>
          <StepTracker />
        </div>
      </section>

      <MeetDrJames />
      <VisitBand />

      <section className="sec">
        <div className="container">
          <SecHead
            eyebrow="Health Library"
            sub="Plain-words articles written and reviewed by Dr. James."
          >
            From the Health <em className="acc">Library</em>
          </SecHead>
          <LibraryCarousel articles={articles} />
        </div>
      </section>

      <section className="sec qa-white">
        <div className="container">
          <div className="qa-grid">
            <SecHead
              eyebrow="Questions"
              sub="The practical things patients ask most. Anything else, ask on WhatsApp."
            >
              Before you <em className="acc">come in</em>
            </SecHead>
            <Faq />
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
