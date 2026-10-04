import Image from "next/image";
import type { ReactNode } from "react";
import { Confirm } from "@/components/Confirm";

const SEALS: { ring: string; title: string; note: ReactNode }[] = [
  { ring: "MD", title: "Internal Medicine", note: "Manipal, 2007" },
  {
    ring: "MSc",
    title: "Diabetes",
    note: (
      <>
        University of South Wales <Confirm>[year]</Confirm>
      </>
    ),
  },
  {
    ring: "PG Dip",
    title: "Diabetes",
    note: (
      <>
        Cardiff University, 2012
      </>
    ),
  },
  {
    ring: "MBA",
    title: "Hospital management",
    note: (
      <>
        Vinayaka Missions University <Confirm>[year]</Confirm>
      </>
    ),
  },
  {
    ring: "DBA",
    title: "Business administration",
    note: <Confirm>[CONFIRM: university, year]</Confirm>,
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
    body: "Muscat, 2012 to 2022. Led intensive care operations and COVID-19 operations across three hospitals in Muscat during the pandemic.",
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

/** Qualification seals, dated career timeline and the certificate photo card. */
export function Credentials() {
  return (
    <>
      <div className="creds">
        {SEALS.map((s) => (
          <div className="seal" key={`${s.ring}-${s.title}`}>
            <span className="ring">{s.ring}</span>
            <b>{s.title}</b>
            <small>{s.note}</small>
          </div>
        ))}
      </div>
      <div className="journey">
        <ol className="tl">
          {TIMELINE.map((t) => (
            <li key={t.title} className={t.now ? "now" : ""}>
              <span className="yr">{t.yr}</span>
              <span className="dot" />
              <div>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <figure className="photo-card">
          <Image
            src="/images/doctor/dr-james-certificate.jpg"
            alt="Dr. James holding a framed certificate in his office"
            width={1037}
            height={767}
          />
          <figcaption>Certificate photo · real, keep</figcaption>
        </figure>
      </div>
    </>
  );
}
