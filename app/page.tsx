import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Hero } from "@/components/hero/Hero";
import { ConcernPills } from "@/components/sections/ConcernPills";
import { WhyCards } from "@/components/sections/WhyCards";
import { Credentials } from "@/components/sections/Credentials";
import { ServiceTabs } from "@/components/ServiceTabs";
import { StepTracker } from "@/components/StepTracker";
import { VisitBand } from "@/components/home/VisitBand";
import { DoctorCard } from "@/components/sections/DoctorCard";
import { ConditionsMarquee } from "@/components/sections/Marquee";
import { LibraryCarousel } from "@/components/LibraryCarousel";
import { Faq } from "@/components/sections/Faq";
import { ContactBlock } from "@/components/sections/ContactBlock";
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

const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: "Where does Dr. James see patients?",
    a: "At Badr Al Samaa Royal Hospital, Al Ghubrah Street, Muscat. Book by WhatsApp or phone on +968 9751 0975, or use the form on this site.",
  },
  {
    q: "Do I need to fast before my visit?",
    a: "Not for the consultation. Some blood tests, such as fasting sugar or cholesterol, need 8 to 10 hours without food. We tell you when you book if your tests need fasting. Water is fine.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Your old prescriptions, recent reports, the medicines you take (or photos of the packs), and your sugar diary or meter if you have diabetes.",
  },
  {
    q: "Can Dr. James look after several conditions at once?",
    a: "Yes. An internal medicine physician looks at diabetes, blood pressure, cholesterol, kidneys, liver and lungs together, so your medicines and tests work as one plan.",
  },
];

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
        graph={[websiteNode, physicianNode, hospitalNode, faqPageNode("/", HOME_FAQS)]}
      />
      <Hero />

      <section className="sec concern-sec" aria-label="Find care by concern">
        <div className="container">
          <ConcernPills />
        </div>
      </section>

      <section className="sec">
        <div className="container">
          <SecHead
            eyebrow="01 / Why Dr. James"
            sub="Facts you can verify, in plain words."
          >
            Experience you can <em className="acc">check</em>
          </SecHead>
          <WhyCards />
        </div>
      </section>

      <section className="sec cred-sec">
        <div className="container">
          <SecHead
            eyebrow="02 / Training and career"
            sub="Every line is a checkable fact, from medical school in 2002 to head of department today."
          >
            A career built in hospital <em className="acc">medicine</em>
          </SecHead>
          <Credentials />
        </div>
      </section>

      <section className="sec">
        <div className="container">
          <SecHead
            eyebrow="03 / How Dr. James can help"
            sub="Pick the area closest to your concern. Each page explains what to expect at a visit."
          >
            Conditions he looks <em className="acc">after</em>
          </SecHead>
          <ServiceTabs />
        </div>
      </section>

      <section className="sec">
        <div className="container">
          <SecHead
            eyebrow="04 / Your first visit"
            sub="From booking to follow-up, here is exactly what happens."
          >
            Your first visit, step by <em className="acc">step</em>
          </SecHead>
          <StepTracker />
        </div>
      </section>

      <section className="sec vband-sec" aria-label="Visit us">
        <div className="container">
          <VisitBand />
        </div>
      </section>

      <section className="sec">
        <div className="container">
          <SecHead
            eyebrow="05 / Meet your doctor"
            sub="One physician for the whole picture, photographed at his hospital."
          >
            Meet <em className="acc">Dr. James</em>
          </SecHead>
          <DoctorCard />
        </div>
      </section>

      <section className="sec mq-sec">
        <div className="container">
          <SecHead
            eyebrow="07 / Conditions"
            sub="Linked below, each condition page explains who should book and what to expect."
          >
            Conditions Dr. James looks <em className="acc">after</em>
          </SecHead>
        </div>
        <ConditionsMarquee />
      </section>

      <section className="sec">
        <div className="container">
          <SecHead
            eyebrow="08 / Health Library"
            sub="Plain-words articles written and reviewed by Dr. James."
          >
            From the Health <em className="acc">Library</em>
          </SecHead>
          <LibraryCarousel articles={articles} />
        </div>
      </section>

      <section className="sec">
        <div className="container">
          <SecHead
            eyebrow="09 / Quick answers"
            sub="The questions patients ask most before a first visit."
          >
            Questions patients <em className="acc">ask</em>
          </SecHead>
          <Faq />
        </div>
      </section>

      <section className="sec contact-sec">
        <div className="container">
          <SecHead
            eyebrow="Contact"
            sub="One address, one phone number, answered by the clinic."
          >
            Find the clinic and <em className="acc">book</em>
          </SecHead>
          <ContactBlock />
        </div>
      </section>
    </main>
  );
}
