import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shell/Breadcrumbs";
import { BookButton } from "@/components/BookButton";
import { Confirm } from "@/components/Confirm";
import { Reveal } from "@/components/site/Reveal";
import { TimelineFill } from "@/components/sections/TimelineFill";
import { Icon } from "@/lib/icons";
import { site, experience } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { conditionGroups } from "@/lib/conditions";
import {
  pageMeta,
  JsonLd,
  breadcrumbNode,
  medicalWebPageNode,
  physicianNode,
  hospitalNode,
  medicalClinicNode,
  websiteNode,
} from "@/lib/seo";

const exp = experience();

export const metadata: Metadata = pageMeta(
  "About Dr. James",
  `Specialist Internist, Head of Internal Medicine and Head of Quality Control at Badr Al Samaa Royal Hospital, Muscat. ${exp.inMedicine} years in medicine, ${exp.inOman} in Oman.`,
  "/about-dr-james/",
);

const crumbs = [{ label: "Home", href: "/" }, { label: "About Dr. James" }];

const TIMELINE: { yr: string; now?: boolean; title: string; body: string }[] = [
  {
    yr: "2007",
    title: "Specialist Physician, MBBM Hospital",
    body: "Kothamangalam, Kerala, 2007 to 2012. Clinical lead for the ICU and emergency room; health education programmes.",
  },
  {
    yr: "2012",
    title: "Internal Medicine Specialist, Atlas-NMC Hospital",
    body: "Muscat, 2012 to 2022. Led intensive care operations, and served as Director of COVID‑19 operations across three hospitals during the pandemic.",
  },
  {
    yr: "2022",
    now: true,
    title: "Head of Internal Medicine and Head of Quality Control",
    body: "Badr Al Samaa Royal Hospital, Muscat, since 2022.",
  },
  {
    yr: "2025",
    title: "Diabetes screening record",
    body: "Associated with a Guinness World Records achievement for maximum diabetes patient screening at Badr Al Samaa Royal Hospital, 2025.",
  },
];

export default function AboutPage() {
  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          hospitalNode,
          medicalClinicNode,
          medicalWebPageNode("/about-dr-james/", "About Dr. James", undefined, "[CONFIRM]"),
          breadcrumbNode(crumbs),
        ]}
      />

      <header className="ab-hero">
        <div className="ab-hero-img">
          <Image
            src="/images/doctor/d01-hero-2400w.jpg"
            alt="Dr. James Kumar Pallivathukkal standing in a hospital lobby"
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <div className="ab-hero-grid">
            <div className="ab-hero-txt">
              <div className="ab-name-band">
                <p className="eyebrow">Specialist Internist</p>
                <h1>
                  Dr.&nbsp;James Kumar <br />
                  Pallivathukkal
                </h1>
              </div>
              <p className="ab-role">{site.role}.</p>
              <div className="ab-cta">
                <BookButton href={site.bookUrl} />
                <a className="cx-btn cx-btn-o" href={site.phoneTel}>
                  <Icon name="phone" size={18} /> Call +968&nbsp;9751&nbsp;0975
                </a>
                <span className="ab-cta-note">By appointment only</span>
              </div>
              <div className="ab-proof">
                <div>
                  <b>{site.yearsInMedicine} years</b>
                  <span>
                    in medicine since {site.sinceYear}, {site.yearsInOman} of them in Oman{" "}
                    <Confirm>[REVISIT before launch: hospital profile says 19 years]</Confirm>
                  </span>
                </div>
                <div>
                  <b>MD 2007</b>
                  <span>Internal Medicine, Manipal</span>
                </div>
                <div>
                  <b>UK diabetes training</b>
                  <span>PG Diploma 2012, MSc 2014</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Reveal as="section" className="ab-sec ab-words ab-fade" aria-labelledby="ab-words-h">
        <div className="container">
          <div className="ab-inner ab-words-grid">
            <figure className="ab-words-fig">
              <Image
                src="/images/doctor/d12-candid-1600h.jpg"
                alt="Dr. James smiling, stethoscope around his neck"
                width={1122}
                height={1402}
                sizes="(max-width: 900px) 100vw, 380px"
              />
            </figure>
            <div>
              <h2 id="ab-words-h" className="sr-only">
                In his words
              </h2>
              <blockquote className="ab-quote">{site.quote}</blockquote>
              <p>
                Dr.&nbsp;James is a specialist internist who leads the Internal Medicine
                department and Quality Control at Badr Al Samaa Royal Hospital in Muscat. He
                oversees outpatient services and contributes to inpatient care, emergency and
                ICU services, clinical governance and patient safety.
              </p>
              <p>
                He enjoys health education and teaching. He worked on health education
                programmes and likes patients to leave knowing what their results mean and why
                each step of the plan exists.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="container">
        <Reveal as="section" className="ab-panel ab-fade" aria-labelledby="ab-train-h" threshold={0.15}>
          <div className="ab-panel-h">
            <h2 id="ab-train-h">Training</h2>
            <p>Every line is a checkable fact.</p>
          </div>
          <div className="ab-train">
            <ul className="ab-ledger" aria-label="Qualifications">
              {site.training.map((r, i) => (
                <li className="ab-lrow" key={r.abbr} style={{ "--i": i } as React.CSSProperties}>
                  <span className="ab-abbr">{r.abbr}</span>
                  <span className="ab-ltx">
                    <b>{r.subject}</b>
                    <span className="ab-inst-m">
                      {r.inst}
                      {"confirm" in r && r.confirm ? <Confirm>{r.confirm}</Confirm> : null}
                    </span>
                  </span>
                  <span className="ab-inst">
                    {r.inst}
                    {"confirm" in r && r.confirm ? <Confirm>{r.confirm}</Confirm> : null}
                  </span>
                </li>
              ))}
            </ul>
            <figure className="ab-cert ab-photo">
              <Image
                src="/images/doctor/dr-james-certificate.jpg"
                alt="Dr. James holding his Guinness World Records certificate"
                width={1037}
                height={767}
                sizes="(max-width: 900px) 0px, 33vw"
              />
            </figure>
          </div>
          <details className="ab-ft">
            <summary>
              <Icon name="chevron" size={20} className="ab-ft-chev" />
              Further training <span className="ab-ft-n">({site.furtherTraining.length})</span>
            </summary>
            <ul>
              {site.furtherTraining.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="ab-member">
              <Confirm>Member, American College of Endocrinology (Gulf)</Confirm>
            </p>
          </details>
        </Reveal>
      </div>

      <Reveal as="section" className="ab-sec ab-fade" aria-labelledby="ab-career-h" threshold={0.15}>
        <div className="container">
          <div className="ab-inner">
            <h2 id="ab-career-h">Career</h2>
            <TimelineFill>
              {TIMELINE.map((t) => (
                <li key={t.title} className={`hit${t.now ? " now" : ""}`}>
                  <span className="yr">
                    {t.yr}
                    {t.now ? <em>Now</em> : null}
                  </span>
                  <span className="dot" />
                  <div>
                    <h3>{t.title}</h3>
                    <p>{t.body}</p>
                  </div>
                </li>
              ))}
            </TimelineFill>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="ab-sec ab-sec-t ab-fade" aria-labelledby="ab-lead-h" threshold={0.15}>
        <div className="container">
          <div className="ab-inner">
            <h2 id="ab-lead-h">Leadership and quality</h2>
            <p className="ab-sub">
              Beyond the clinic, Dr.&nbsp;James serves on hospital committees at{" "}
              {site.hospital}.
            </p>
            <div className="ab-lead-grid">
              <ul className="ab-com">
                {site.committees.map((c) => (
                  <li key={c}>
                    <b>{c}</b>
                    <span>{site.hospital}</span>
                  </li>
                ))}
              </ul>
              <figure className="ab-lead-fig">
                <Image
                  src="/images/doctor/d11-leadership-1200w.jpg"
                  alt="Dr. James in his office at Badr Al Samaa Royal Hospital"
                  width={1800}
                  height={1200}
                  sizes="(max-width: 900px) 100vw, 42vw"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="ab-sec ab-sec-t ab-fade" aria-labelledby="ab-looks-h" threshold={0.15}>
        <div className="container">
          <div className="ab-inner">
            <h2 id="ab-looks-h" className="ab-h-sm">
              What he looks after
            </h2>
            <p className="ab-groups">
              {conditionGroups.map((g, i) => (
                <span key={g.id}>
                  {i > 0 && (
                    <i className="ab-dia" aria-hidden="true" />
                  )}
                  {g.label}
                </span>
              ))}
            </p>
            <Link className="cx-btn cx-btn-p" href={site.conditionsUrl}>
              See all conditions
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="ab-sec ab-sec-t ab-fade" aria-labelledby="ab-visit-h" threshold={0.15}>
        <div className="container">
          <div className="ab-inner">
            <h2 id="ab-visit-h">Visit and book</h2>
            <div className="ab-visit">
              <ul>
                <li>
                  <Icon name="pin" size={20} />
                  <span>
                    {site.address.hospital}, {site.address.street}, {site.address.city}{" "}
                    <a className="ab-maps" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                      Open in Google Maps
                    </a>
                  </span>
                </li>
                <li>
                  <Icon name="phone" size={20} />
                  <span>
                    Calls and WhatsApp by appointment only: +968&nbsp;9751&nbsp;0975
                  </span>
                </li>
                <li>
                  <Icon name="check" size={20} />
                  <span>
                    Patients come from across Oman
                    <Confirm>, including Ibra, Ibri, Sohar, Nizwa, Sur and Rustaq</Confirm>.
                  </span>
                </li>
              </ul>
              <div className="ab-visit-btns">
                <BookButton label="Book" href={site.bookUrl} />
                <a className="cx-btn cx-btn-o" href={whatsappLink("a consultation")} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={18} /> WhatsApp
                </a>
              </div>
              <p className="ab-em">
                Medical emergency? <a href={`tel:${site.emergency}`}>Call {site.emergency}</a>
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="container">
        <div className="ab-inner" style={{ paddingBottom: 96 }} />
      </div>
    </main>
  );
}
