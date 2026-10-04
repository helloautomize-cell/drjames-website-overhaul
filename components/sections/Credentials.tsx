import Image from "next/image";
import type { ReactNode } from "react";
import { Confirm } from "@/components/Confirm";
import { TimelineFill } from "@/components/sections/TimelineFill";

const LEDGER: { abbr: string; subject: string; inst: ReactNode }[] = [
  { abbr: "MD", subject: "Internal Medicine", inst: "Manipal, 2007" },
  {
    abbr: "MSc",
    subject: "Diabetes",
    inst: (
      <>
        University of South Wales <Confirm>[year]</Confirm>
      </>
    ),
  },
  { abbr: "PG Dip", subject: "Diabetes", inst: "Cardiff University, 2012" },
  {
    abbr: "MBA",
    subject: "Hospital management",
    inst: (
      <>
        Vinayaka Missions University <Confirm>[year]</Confirm>
      </>
    ),
  },
  {
    abbr: "DBA",
    subject: "Business administration",
    inst: <Confirm>[CONFIRM: university, year]</Confirm>,
  },
];

const TIMELINE: { yr: string; now?: boolean; title: string; body: string }[] = [
  {
    yr: "2002",
    title: "Medical graduation",
    body: "Vinayaka Missions Kirupananda Variyar Medical College, Salem, Tamil Nadu.",
  },
  { yr: "2007", title: "MD in Internal Medicine", body: "Manipal, Karnataka." },
  {
    yr: "2007",
    title: "Specialist Physician, MBBM Hospital",
    body: "Kothamangalam, Kerala, 2007 to 2012. Clinical lead for the ICU and emergency room; health education programmes.",
  },
  {
    yr: "2012",
    title: "Internal Medicine Specialist, Atlas-NMC Hospital",
    body: "Muscat, 2012 to 2022. Led intensive care operations and COVID\u201119 operations across three hospitals in Muscat during the pandemic.",
  },
  {
    yr: "2022",
    now: true,
    title: "Head of Internal Medicine and Head of Quality Control",
    body: "Badr Al Samaa Royal Hospital, Muscat, since 2022. OPD, inpatient, emergency and ICU care; clinical governance and patient safety.",
  },
  {
    yr: "2025",
    title: "Diabetes screening record",
    body: "Associated with a Guinness World Records achievement for maximum diabetes patient screening at Badr Al Samaa Royal Hospital, 2025.",
  },
];

/** Credential ledger, dated career timeline and the certificate photo in a gold mount. */
export function Credentials() {
  return (
    <div className="cl">
      <ul className="cl-ledger" aria-label="Qualifications">
        {LEDGER.map((r) => (
          <li className="cl-row" key={r.abbr}>
            <span className="cl-abbr">{r.abbr}</span>
            <b className="cl-sub">{r.subject}</b>
            <span className="cl-inst">{r.inst}</span>
          </li>
        ))}
      </ul>

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

      <figure className="cl-mount">
        <Image
          src="/images/doctor/dr-james-certificate.jpg"
          alt="Dr. James holding a framed certificate in his office"
          width={1037}
          height={767}
          sizes="(max-width: 900px) 92vw, 380px"
        />
      </figure>
    </div>
  );
}
