import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { Confirm } from "@/components/Confirm";
import { StepTracker } from "@/components/StepTracker";
import { site } from "@/lib/site-config";
import { Icon } from "@/lib/icons";
import {
  pageMeta,
  JsonLd,
  breadcrumbNode,
  medicalWebPageNode,
  physicianNode,
  websiteNode,
} from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Plan your visit",
  "What to bring, how to prepare, where to go inside Badr Al Samaa Royal Hospital, and how follow-ups work with Dr. James in Muscat.",
  "/your-visit/",
);

const crumbs = [{ label: "Home", href: "/" }, { label: "Plan your visit" }];

export default function VisitPage() {
  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          medicalWebPageNode("/your-visit/", "Plan your visit", undefined, "[CONFIRM]"),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        title="Plan your visit"
        intro="Everything you need before you come: where to go, what to bring, how to prepare, and what happens after."
      />
      <div className="container">
        <section className="page-sec">
          <h2>Your first visit, step by step</h2>
          <p className="sec-sub">
            From booking to the plan you take home, this is what a first consultation with
            Dr. James looks like.
          </p>
          <StepTracker />
        </section>

        <section className="page-sec">
          <h2>Where to go</h2>
          <p className="sec-sub">
            Dr. James sees patients at {site.address.hospital} on {site.address.street},{" "}
            {site.address.city}.
          </p>
          <div className="info-cards">
            <div className="info-card">
              <span className="ic">
                <Icon name="pin" size={22} />
              </span>
              <b>Address</b>
              <p>
                {site.address.hospital}
                <br />
                {site.address.street}, {site.address.city}, {site.address.country}
                <br />
                Plus code {site.address.plusCode}
              </p>
              <a className="link" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                Get directions
              </a>
            </div>
            <div className="info-card">
              <span className="ic">
                <Icon name="book" size={22} />
              </span>
              <b>Inside the hospital</b>
              <p>
                Ask for the Internal Medicine clinic at reception. Floor and OPD room{" "}
                <Confirm>[CONFIRM: floor, OPD room]</Confirm>
              </p>
            </div>
            <div className="info-card">
              <span className="ic">
                <Icon name="check" size={22} />
              </span>
              <b>Parking and access</b>
              <p>
                <Confirm>[CONFIRM: parking, lift and wheelchair access]</Confirm>
              </p>
            </div>
          </div>
        </section>

        <section className="page-sec">
          <h2>What to bring</h2>
          <div className="info-cards">
            <div className="info-card">
              <b>Documents and reports</b>
              <ul>
                <li>All your medicines, or a clear photo of the boxes</li>
                <li>Older lab reports, scans and discharge summaries</li>
                <li>Home readings: sugar or blood pressure diaries if you keep them</li>
                <li>Insurance card if you plan to use it</li>
              </ul>
            </div>
            <div className="info-card">
              <b>If you may need blood tests</b>
              <ul>
                <li>Ask when you book whether you should come fasting</li>
                <li>Fasting usually means water only for 8 to 12 hours</li>
                <li>Take your usual morning medicines unless we say otherwise</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="page-sec">
          <h2>After your visit and follow-ups</h2>
          <p className="sec-sub">
            You leave with a written plan: what was found, what changes, which tests and
            when to come back. Test results are explained at a review visit or, when
            suitable, by message. Small questions between visits are welcome on WhatsApp or
            by phone on <Link href={site.phoneTel}>{site.phoneDisplay}</Link>.
          </p>
          <p className="em-line">Medical emergency? Call {site.emergency}</p>
        </section>

        <div style={{ padding: "10px 0 64px" }}>
          <CtaBand />
        </div>
      </div>
    </main>
  );
}
