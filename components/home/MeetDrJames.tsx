"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Confirm } from "@/components/Confirm";
import { Reveal } from "@/components/site/Reveal";
import { LiveStatus } from "@/components/site/LiveStatus";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";

const MILESTONES: { yr: string; now?: boolean; title: string; line: string }[] = [
  { yr: "2002", title: "Medical graduation", line: "Vinayaka Missions, Salem" },
  {
    yr: "2007",
    title: "MD, then Specialist Physician",
    line: "MBBM Hospital, Kerala · led ICU and emergency",
  },
  {
    yr: "2012",
    title: "Internal Medicine Specialist",
    line: "Atlas-NMC, Muscat · ICU and COVID-19 care",
  },
  {
    yr: "2022",
    now: true,
    title: "Head of Internal Medicine & Head of Quality",
    line: "Badr Al Samaa Royal Hospital, Muscat",
  },
  {
    yr: "2025",
    title: "Diabetes screening record",
    line: "Associated with a Guinness World Records achievement",
  },
];

/**
 * Editorial profile: portrait pinned on the left fading into navy, story told
 * in four chapters on the right (profile + signature + stats, training map,
 * scroll-filling career line, typographic leadership list).
 */
export function MeetDrJames() {
  const ctlRef = useRef<HTMLOListElement>(null);

  // career line: fill + light up rows as they pass 65% of the viewport
  useEffect(() => {
    const ol = ctlRef.current;
    if (!ol) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ol.querySelectorAll("li").forEach((li) => li.classList.add("lit"));
      ol.style.setProperty("--p", "1");
      return;
    }
    const items = [...ol.querySelectorAll("li")];
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const r = ol.getBoundingClientRect();
        const p = Math.min(
          1,
          Math.max(0, (window.innerHeight * 0.65 - r.top) / Math.max(1, r.height)),
        );
        ol.style.setProperty("--p", p.toFixed(3));
        items.forEach((li) => {
          const ir = li.getBoundingClientRect();
          li.classList.toggle("lit", ir.top + 20 < r.top + r.height * p);
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="x-night dp-sec" data-header="dark" aria-labelledby="mj-h">
      <div className="dp">
        <div className="dp-media">
          <div className="dp-photo">
            <Image
              src="/images/doctor/d02-portrait-1600h.jpg"
              alt="Dr. James in front of gold Omani fort wall art at Badr Al Samaa Royal Hospital"
              width={1067}
              height={1600}
              sizes="(max-width: 900px) 100vw, 42vw"
            />
            <div className="dp-tag">
              <span className="live-chip">
                <LiveStatus />
              </span>
              <b>{site.hospital}</b>
              <span>Al Ghubrah, Muscat</span>
            </div>
          </div>
        </div>
        <div className="dp-story">
          <div className="chap">
            <span className="chn">
              01 <i aria-hidden="true" /> Profile
            </span>
            <h2 id="mj-h" className="dp-name">
              Dr. James Kumar <em className="acc">Pallivathukkal</em>
            </h2>
            <p className="dr-role">
              MD Internal Medicine · Head of Internal Medicine &amp; Head of Quality
            </p>
            <p className="dp-bio">
              A specialist internist for adults whose health has more than one moving part: diabetes
              alongside blood pressure, kidneys, heart or lungs, many medicines, or symptoms that
              don&rsquo;t yet have a name.
            </p>
            <p className="dp-bio">
              He has practised in Muscat since 2012 and leads internal medicine and quality at{" "}
              {site.hospital}.
            </p>
            <div className="sig">
              <span className="sig-s" aria-hidden="true">
                James Pallivathukkal
              </span>
              <span className="sig-n">
                Dr. James Kumar Pallivathukkal <Confirm>[use real signature scan]</Confirm>
              </span>
            </div>
            <div className="dp-stats">
              <div>
                <b>{site.yearsInMedicine}</b>
                <span>years in medicine</span>
              </div>
              <div>
                <b>{site.yearsInOman}</b>
                <span>years in Oman</span>
              </div>
              <div>
                <b>3</b>
                <span>countries of training</span>
              </div>
              <div>
                <b>6</b>
                <span>degrees &amp; diplomas</span>
              </div>
            </div>
          </div>

          <div className="chap">
            <span className="chn">
              02 <i aria-hidden="true" /> Training
            </span>
            <h3 className="ch-h">
              Trained across <em className="acc">three countries.</em>
            </h3>
            <Reveal as="div" className="tmap" threshold={0.4}>
              <svg className="tm-arc" viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true">
                <path d="M50 40 Q100 0 150 40 Q200 0 250 40" />
                <circle cx="50" cy="40" r="4" />
                <circle cx="150" cy="40" r="4" />
                <circle cx="250" cy="40" r="4" />
              </svg>
              <div className="tm-cols">
                <div>
                  <h4>India</h4>
                  <small>Tamil Nadu · Manipal · Kerala</small>
                  <div className="dg">
                    <b>MBBS</b>
                    <span>Medicine · Vinayaka Missions, 2002</span>
                  </div>
                  <div className="dg">
                    <b>MD</b>
                    <span>Internal Medicine · Manipal, 2007</span>
                  </div>
                  <div className="dg l">
                    <b>MBA</b>
                    <span>Hospital management · Vinayaka Missions University, 2012</span>
                  </div>
                </div>
                <div>
                  <h4>United Kingdom</h4>
                  <small>Cardiff · Coventry</small>
                  <div className="dg">
                    <b>PG Dip</b>
                    <span>Diabetes · Cardiff University, 2012</span>
                  </div>
                  <div className="dg">
                    <b>MSc</b>
                    <span>
                      Diabetes, 2014 <Confirm>[CONFIRM]</Confirm>
                    </span>
                  </div>
                  <div className="dg l">
                    <b>DBA</b>
                    <span>Business administration · Coventry University, 2024</span>
                  </div>
                </div>
                <div>
                  <h4>Oman</h4>
                  <small>Muscat</small>
                  <div className="dg p">
                    <b>2012</b>
                    <span>Internal Medicine Specialist · Atlas-NMC</span>
                  </div>
                  <div className="dg p">
                    <b>2022</b>
                    <span>Head of Internal Medicine &amp; Quality · Badr Al Samaa</span>
                  </div>
                </div>
              </div>
              <div className="tm-key">
                <span>
                  <i />Clinical
                </span>
                <span>
                  <i className="l" />Leadership
                </span>
                <span>
                  <i className="p" />Practice
                </span>
              </div>
            </Reveal>
          </div>

          <div className="chap">
            <span className="chn">
              03 <i aria-hidden="true" /> Career
            </span>
            <h3 className="ch-h">
              From the ICU to <em className="acc">head of department.</em>
            </h3>
            <ol className="ctl" ref={ctlRef}>
              <span className="ctl-fill" aria-hidden="true" />
              {MILESTONES.map((m) => (
                <li key={m.title} className={m.now ? "now" : ""}>
                  <span className="y">{m.yr}</span>
                  <div>
                    <b>
                      {m.title} {m.now ? <em className="today">Today</em> : null}
                    </b>
                    <span>
                      {m.line}
                      {m.yr === "2025" ? <Confirm>[CONFIRM source]</Confirm> : null}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="chap">
            <span className="chn">
              04 <i aria-hidden="true" /> Leadership
            </span>
            <h3 className="ch-h">
              Beyond the <em className="acc">consulting room.</em>
            </h3>
            <dl className="lead-list">
              <div>
                <dt>Head of Quality</dt>
                <dd>Patient safety and clinical standards across the hospital</dd>
              </div>
              {site.committees.map((c) => (
                <div key={c}>
                  <dt>{c}</dt>
                  <dd>Member</dd>
                </div>
              ))}
              <div>
                <dt>Languages</dt>
                <dd>
                  English <Confirm>· Malayalam · Hindi · Arabic [CONFIRM]</Confirm>
                </dd>
              </div>
            </dl>
            <div className="dp-cta">
              <div>
                <b>Consult Dr. James</b>
                <span>
                  {site.hoursShort} · {site.hospital}
                </span>
              </div>
              <div className="btnrow">
                <Link className="btn btn-p" href={site.bookUrl}>
                  Book a consultation
                </Link>
                <a
                  className="btn btn-gh"
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
