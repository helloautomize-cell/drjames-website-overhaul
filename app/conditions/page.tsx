import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shell/Breadcrumbs";
import { BookButton } from "@/components/BookButton";
import { ConditionRow } from "@/components/page/ConditionRow";
import { ConditionsSearch, FinderButton, GroupIndex } from "@/components/page/ConditionsIndex";
import { Reveal } from "@/components/site/Reveal";
import { Icon } from "@/lib/icons";
import { CONTOURS } from "@/lib/contours";
import { bookingUrl } from "@/lib/booking-context";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { conditionGroups, conditionUrl, GROUP_PHOTO } from "@/lib/conditions";
import { pageMeta, JsonLd, breadcrumbNode, medicalWebPageNode, physicianNode, hospitalNode, medicalClinicNode, websiteNode } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Areas of Expertise",
  "The areas of expertise an internist covers — diabetes, blood pressure, cholesterol, thyroid, lungs, sleep, kidneys, liver and gut — in Muscat.",
  "/conditions/",
);

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Areas of Expertise" },
];

const countLabel = (n: number) => `${n} topic${n === 1 ? "" : "s"}`;

export default function ConditionsPage() {
  const [feature, ...ledger] = conditionGroups;
  const index = conditionGroups.map((g) => ({ id: g.id, label: g.label, count: g.conditions.length }));
  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          hospitalNode,
          medicalClinicNode,
          medicalWebPageNode("/conditions/", "Areas of Expertise", undefined, "[CONFIRM]"),
          breadcrumbNode(crumbs, "/conditions/"),
        ]}
      />
      <header className="cx-hero">
        <div className="container">
          <div className="cx-wrap">
            <Breadcrumbs items={crumbs} />
            <p className="eyebrow">Areas of expertise</p>
            <h1>
              Find your concern, or let us <em>work it out together</em>.
            </h1>
            <p className="cx-intro">
              An internist looks after the whole picture: sugar, pressure, lungs, kidneys, liver and gut.
            </p>
            <ConditionsSearch />
            <div className="cx-cta">
              <BookButton href={bookingUrl()} />
              <a className="cx-btn cx-btn-o" href={site.phoneTel}>
                <Icon name="phone" size={18} /> Call {site.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="ph-band">
            <Image
              src="/images/doctor/d05-results-1800w.jpg"
              alt="Dr. James reviewing a patient's lab report"
              width={1800}
              height={1200}
              sizes="100vw"
              preload
              fetchPriority="high"
            />
          </div>
        </div>
      </header>

      <div className="container">
        <div className="cx-wrap cx-body">
          <GroupIndex groups={index} />
          <div className="cx-main">
            <section className="cx-panel" id={`g-${feature.id}`} aria-labelledby={`g-${feature.id}-h`}>
              <svg className="cx-panel-bg" viewBox="0 0 600 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                {CONTOURS.map((c, i) => (
                  <path key={i} d={c.d} />
                ))}
              </svg>
              <div className="cx-panel-h">
                <div>
                  <span className="cx-gnum">01</span>
                  <h2 id={`g-${feature.id}-h`}>{feature.label}</h2>
                  <p>{feature.intro}</p>
                </div>
                <span className="cx-count">{countLabel(feature.conditions.length)}</span>
              </div>
              <div className="cx-tiles">
                {feature.conditions.map((c, i) =>
                  i === 0 ? (
                    <Link className="cx-tile lead" key={c.slug} href={conditionUrl(c.slug)}>
                      <span className="cx-tile-ph">
                        <Image
                          src={GROUP_PHOTO[feature.id].src}
                          alt={GROUP_PHOTO[feature.id].alt}
                          fill
                          sizes="(max-width: 760px) 100vw, 520px"
                          quality={85}
                          style={{ objectPosition: GROUP_PHOTO[feature.id].imagePosition }}
                        />
                      </span>
                      <span className="cx-tile-body">
                        <span className="cx-tile-ic" aria-hidden="true">
                          <Icon name={c.icon} size={28} />
                        </span>
                        <b>{c.title}</b>
                        <span className="cx-tile-d">{c.line}</span>
                        <span className="cx-tile-go" aria-hidden="true">
                          <Icon name="arrow" size={20} />
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <Link className="cx-tile" key={c.slug} href={conditionUrl(c.slug)}>
                      <span className="cx-tile-ic" aria-hidden="true">
                        <Icon name={c.icon} size={28} />
                      </span>
                      <b>{c.title}</b>
                      <span className="cx-tile-d">{c.line}</span>
                      <span className="cx-tile-go" aria-hidden="true">
                        <Icon name="arrow" size={20} />
                      </span>
                    </Link>
                  ),
                )}
              </div>
            </section>

            {ledger.map((g, gi) => (
              <section className="cx-group" id={`g-${g.id}`} key={g.id} aria-labelledby={`g-${g.id}-h`}>
                <span className="cx-gnum">0{gi + 2}</span>
                <div className="cx-group-h">
                  <h2 id={`g-${g.id}-h`}>{g.label}</h2>
                  <span className="cx-count">{countLabel(g.conditions.length)}</span>
                </div>
                <p>{g.intro}</p>
                <Reveal as="div" className="cx-rows cx-reveal" threshold={0.1}>
                  {g.conditions.map((c, i) => (
                    <ConditionRow key={c.slug} condition={c} index={i} />
                  ))}
                </Reveal>
              </section>
            ))}

            <section className="cx-band" aria-labelledby="cx-band-h">
              <h3 id="cx-band-h">Not sure which one is yours?</h3>
              <p>An internist&apos;s job is to work that out. Tell us what you notice, not what you think it is.</p>
              <div className="cx-band-btns">
                <FinderButton>Use the symptom finder</FinderButton>
                <Link className="cx-btn cx-btn-o" href={bookingUrl()} data-ga="appointment">
                  Book a consultation
                </Link>
                <a className="cx-btn cx-btn-o" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
              <p className="cx-safe">
                <Icon name="alert" size={20} />
                <span>
                  Chest pain, sudden breathlessness, fainting or signs of a stroke: do not wait.
                  Go to the nearest emergency department.
                </span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
