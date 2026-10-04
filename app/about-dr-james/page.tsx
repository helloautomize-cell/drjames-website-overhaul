import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { Confirm } from "@/components/Confirm";
import { Credentials } from "@/components/sections/Credentials";
import { Testimonials } from "@/components/sections/Testimonials";
import { site } from "@/lib/site-config";
import { conditionGroups, conditionUrl } from "@/lib/conditions";
import Link from "next/link";
import {
  pageMeta,
  JsonLd,
  breadcrumbNode,
  medicalWebPageNode,
  physicianNode,
  websiteNode,
} from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "About Dr. James",
  "Specialist in Internal Medicine and Diabetes, Head of Internal Medicine and Head of Quality Control at Badr Al Samaa Royal Hospital, Muscat. 23 years in medicine, 15 in Oman.",
  "/about-dr-james/",
);

const crumbs = [{ label: "Home", href: "/" }, { label: "About Dr. James" }];

export default function AboutPage() {
  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          medicalWebPageNode("/about-dr-james/", "About Dr. James", undefined, "[CONFIRM]"),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        title="Dr. James Kumar Pallivathukkal"
        intro={`${site.title}. ${site.role}. ${site.yearsInMedicine}+ years in medicine, ${site.yearsInOman} years in Oman.`}
      />
      <div className="container">
        <div className="ab-hero">
          <div className="fact-card">
            <div className="row">
              <b>Qualifications</b>
              <span>
                MD Internal Medicine (Manipal, 2007), Postgraduate Diploma in Diabetes
                (Cardiff, 2012), MSc Diabetes (University of South Wales{" "}
                <Confirm>[year]</Confirm>), MBA Hospital Management{" "}
                <Confirm>[year]</Confirm>, DBA <Confirm>[CONFIRM]</Confirm>
              </span>
            </div>
            <div className="row">
              <b>Experience</b>
              <span>
                {site.yearsInMedicine}+ years in medicine since {site.sinceYear},{" "}
                {site.yearsInOman} years in Oman
              </span>
            </div>
            <div className="row">
              <b>Languages</b>
              <span>
                <Confirm>[CONFIRM: languages]</Confirm>
              </span>
            </div>
            <div className="row">
              <b>MOH licence</b>
              <span>
                <Confirm>{site.mohLicence}</Confirm>
              </span>
            </div>
            <div className="row">
              <b>Clinic</b>
              <span>
                {site.address.hospital}, {site.address.street}, {site.address.city}
              </span>
            </div>
          </div>
          <div className="arch-wrap">
            <div className="arch-frame">
              <Image
                src="/images/doctor/dr-james-portrait.jpg"
                alt="Dr. James standing in the lobby of Badr Al Samaa Royal Hospital"
                width={717}
                height={896}
                priority
              />
            </div>
          </div>
        </div>

        <section className="page-sec">
          <h2>About Dr. James</h2>
          <p className="sec-sub">
            Dr. James Kumar Pallivathukkal is an Internal Medicine Specialist with{" "}
            {site.yearsInMedicine}+ years of medical experience, including {site.yearsInOman}{" "}
            years in Oman. Since 2022 he has served as Head of the Internal Medicine
            Department and Head of Quality Control at {site.hospital} in Muscat, where he
            oversees OPD services and contributes to inpatient care, emergency and ICU
            services, clinical governance, patient safety and quality improvement.
          </p>
          <blockquote className="pull">{site.quote}</blockquote>
        </section>

        <section className="page-sec">
          <h2>Education and career</h2>
          <p className="sec-sub">
            Qualification seals and the dated career timeline. Unconfirmed years stay
            marked until the client confirms them.
          </p>
          <Credentials />
        </section>

        <section className="page-sec">
          <h2>Roles and committees</h2>
          <p className="sec-sub">
            Beyond the clinic, Dr. James contributes to hospital governance and patient
            safety at {site.hospital}.
          </p>
          <div className="info-cards">
            {site.committees.map((c) => (
              <div className="info-card" key={c}>
                <b>{c}</b>
                <p>{site.hospital}</p>
              </div>
            ))}
            <div className="info-card">
              <b>Guinness World Records, 2025</b>
              <p>{site.award}</p>
            </div>
          </div>
        </section>

        <section className="page-sec">
          <h2>How Dr. James works</h2>
          <p className="sec-sub">
            His own summary is short: &ldquo;empower patients through knowledge,
            prevention, and personalized care.&rdquo; In practice, that looks like
            three habits:
          </p>
          <div className="info-cards">
            <div className="info-card">
              <b>One plan for all your conditions</b>
              <p>
                Sugar, pressure, kidneys and the rest are read together, so treatment for
                one problem never quietly worsens another.
              </p>
            </div>
            <div className="info-card">
              <b>Every report explained</b>
              <p>
                You leave knowing what your numbers mean and why each step of the plan
                exists.
              </p>
            </div>
            <div className="info-card">
              <b>Prevention before prescription</b>
              <p>
                The consultation finds your actual risks first, so tests and medicines
                answer real questions.
              </p>
            </div>
          </div>
        </section>

        <section className="page-sec">
          <h2>What patients say</h2>
          <p className="sec-sub">
            Comments shared by patients after their visits.
          </p>
          <Testimonials />
        </section>

        <section className="page-sec">
          <h2>Conditions Dr. James looks after</h2>
          <p className="sec-sub">
            The conditions an internist manages, grouped the way patients think about them.
          </p>
          {conditionGroups.map((g) => (
            <div key={g.id} style={{ marginBottom: 22 }}>
              <h3 style={{ fontSize: 18, marginBottom: 12 }}>{g.label}</h3>
              <div className="cond-chips">
                {g.conditions.map((c) => (
                  <Link key={c.slug} href={conditionUrl(c.slug)}>
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div style={{ padding: "10px 0 64px" }}>
          <CtaBand />
        </div>
      </div>
    </main>
  );
}
