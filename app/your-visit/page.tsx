import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shell/Breadcrumbs";
import { BookButton } from "@/components/BookButton";
import { Confirm } from "@/components/Confirm";
import { Reveal } from "@/components/site/Reveal";
import { VisitMap } from "@/components/site/VisitMap";
import { CopyButton } from "@/components/site/CopyButton";
import { StepTracker } from "@/components/StepTracker";
import { VisitChips } from "@/components/page/VisitChips";
import { VisitChecklist } from "@/components/page/VisitChecklist";
import { FaqBlock } from "@/components/page/FaqBlock";
import { CtaBand } from "@/components/page/CtaBand";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { FAQS, visibleFaqs } from "@/lib/faqs";
import { Icon } from "@/lib/icons";
import {
  pageMeta,
  JsonLd,
  breadcrumbNode,
  medicalWebPageNode,
  faqPageNode,
  physicianNode,
  websiteNode,
} from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Plan your visit",
  "What to bring, how to prepare, where to go inside Badr Al Samaa Royal Hospital, and how follow-ups work with Dr. James in Muscat.",
  "/your-visit/",
);

const crumbs = [{ label: "Home", href: "/" }, { label: "Plan your visit" }];

const CHIPS = [
  { id: "steps", label: "Steps" },
  { id: "where", label: "Where to go" },
  { id: "bring", label: "What to bring" },
  { id: "after", label: "After your visit" },
  { id: "questions", label: "Questions" },
];

const PRACTICAL = [
  "Do I need a referral to see Dr. James?",
  "Can I book for a parent or a child?",
  "How do I get my test results?",
  "Is my information private?",
];

const showPending = process.env.NEXT_PUBLIC_SHOW_CONFIRM !== "0";

export default function VisitPage() {
  const practical = visibleFaqs(FAQS.filter((f) => PRACTICAL.includes(f.q)));
  const shareLocation = `https://wa.me/?text=${encodeURIComponent(
    `${site.address.hospital}, ${site.address.street}, Muscat. ${site.mapsUrl}`,
  )}`;
  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          medicalWebPageNode("/your-visit/", "Plan your visit", undefined, "[CONFIRM]"),
          faqPageNode("/your-visit/", practical),
          breadcrumbNode(crumbs),
        ]}
      />
      <div className="container">
        <header className="yv-hero">
          <div className="yv-hero-grid">
            <div>
              <Breadcrumbs items={crumbs} />
              <p className="eyebrow">Your visit</p>
              <h1>
                Plan your visit, <em>without the guesswork</em>.
              </h1>
              <p className="yv-intro">
                Where to go, what to bring, how to prepare and what happens after.
                Consultations are by appointment only.
              </p>
              <div className="yv-cta">
                <BookButton />
                <a
                  className="cx-btn cx-btn-o"
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={18} /> WhatsApp
                </a>
              </div>
            </div>
            <aside className="yv-glance" aria-label="At a glance">
              <dl>
                <div>
                  <dt>Where</dt>
                  <dd>
                    {site.address.hospital}, {site.address.city}
                  </dd>
                </div>
                <div>
                  <dt>When</dt>
                  <dd>
                    {site.hoursShort} <Confirm>[CONFIRM: hours]</Confirm>
                    <small>By appointment only</small>
                  </dd>
                </div>
                <div>
                  <dt>Book</dt>
                  <dd>
                    Call or WhatsApp{" "}
                    <a className="nowrap" href={site.phoneTel}>
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </dl>
              <a className="yv-dir" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                Get directions <span aria-hidden="true">→</span>
              </a>
            </aside>
          </div>
        </header>
      </div>

      <VisitChips items={CHIPS} />

      <div className="container">
        <Reveal as="section" className="yv-sec ab-fade" id="steps" aria-labelledby="yv-steps-h">
          <h2 id="yv-steps-h">Your first visit, step by step</h2>
          <p className="ab-sub">
            From booking to the plan you take home, this is what a first consultation with
            Dr. James looks like.
          </p>
          <StepTracker />
        </Reveal>

        <Reveal as="section" className="yv-sec ab-fade" id="where" aria-labelledby="yv-where-h">
          <h2 id="yv-where-h">Where to go</h2>
          <p className="ab-sub">
            Dr. James sees patients at {site.address.hospital} on {site.address.street},{" "}
            {site.address.city}.
          </p>
          <div className="yv-where">
            <VisitMap />
            <div className="yv-rows">
              <div className="yv-row">
                <b>Address</b>
                <p>
                  {site.address.hospital}
                  <br />
                  {site.address.street}, {site.address.city}, {site.address.country}
                  <br />
                  <span className="yv-plus">
                    Plus code {site.address.plusCode}{" "}
                    <CopyButton value={site.address.plusCode} />
                  </span>
                </p>
                <div className="yv-row-btns">
                  <a
                    className="cx-btn cx-btn-p"
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get directions
                  </a>
                  <a
                    className="cx-btn cx-btn-o"
                    href={shareLocation}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Share location on WhatsApp
                  </a>
                </div>
              </div>
              <div className="yv-row">
                <b>Inside the hospital</b>
                <p>
                  Ask for the Internal Medicine clinic at reception.{" "}
                  <Confirm>[CONFIRM: floor, OPD room]</Confirm>
                </p>
              </div>
              {showPending && (
                <div className="yv-row">
                  <b>Parking and access</b>
                  <p>
                    <Confirm>[CONFIRM: parking, lift and wheelchair access]</Confirm>
                  </p>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal
          as="section"
          className="yv-sec yv-print-zone ab-fade"
          id="bring"
          aria-labelledby="yv-bring-h"
        >
          <h2 id="yv-bring-h">What to bring</h2>
          <p className="ab-sub">
            Tick items off as you pack. Nothing is sent anywhere unless you choose to share
            the list yourself.
          </p>
          <VisitChecklist />
          <p className="print-addr">
            {site.address.hospital}, {site.address.street}, {site.address.city},{" "}
            {site.address.country}
          </p>
        </Reveal>

        <Reveal as="section" className="yv-sec ab-fade" id="after" aria-labelledby="yv-after-h">
          <h2 id="yv-after-h">After your visit</h2>
          <div className="yv-after">
            <div className="yv-after-i">
              <span aria-hidden="true">01</span>
              <h3>A written plan</h3>
              <p>What was found, what changes, which tests, and when to come back.</p>
            </div>
            <div className="yv-after-i">
              <span aria-hidden="true">02</span>
              <h3>Results explained</h3>
              <p>At a review visit or, when suitable, by message.</p>
            </div>
            <div className="yv-after-i">
              <span aria-hidden="true">03</span>
              <h3>Between visits</h3>
              <p>
                Small questions are welcome on WhatsApp or by phone on{" "}
                <a className="nowrap" href={site.phoneTel}>
                  {site.phoneDisplay}
                </a>
                .
              </p>
            </div>
          </div>
          <div className="callout em em-block yv-alert">
            <Icon name="alert" size={24} />
            <p>
              Chest pain, sudden breathlessness, fainting or signs of a stroke: do not
              wait.{" "}
              <a href={`tel:${site.emergency}`}>Call {site.emergency}</a>.
            </p>
          </div>
        </Reveal>

        <div id="questions" className="yv-anchor">
          <FaqBlock faqs={practical} heading="Practical questions" />
        </div>
        <p className="yv-allq">
          <Link href="/faqs/">
            All questions <span aria-hidden="true">→</span>
          </Link>
        </p>

        <div style={{ paddingBottom: 64 }}>
          <CtaBand />
        </div>
      </div>
    </main>
  );
}
