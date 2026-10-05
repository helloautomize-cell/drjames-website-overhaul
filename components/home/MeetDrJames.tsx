import Image from "next/image";
import Link from "next/link";
import { Confirm } from "@/components/Confirm";
import { Reveal } from "@/components/site/Reveal";
import { site } from "@/lib/site-config";

const LEDGER = site.training;

const MILESTONES: { yr: string; now?: boolean; title: string; line: string }[] = [
  { yr: "2002", title: "Medical graduation", line: "Vinayaka Missions, Salem" },
  {
    yr: "2007",
    title: "MD, then Specialist Physician",
    line: "MBBM Hospital, Kerala. Clinical lead for ICU and emergency",
  },
  {
    yr: "2012",
    title: "Internal Medicine Specialist",
    line: "Atlas‑NMC, Muscat. Led ICU and COVID‑19 operations",
  },
  {
    yr: "2022",
    now: true,
    title: "Head of Internal Medicine and Quality",
    line: "Badr Al Samaa Royal Hospital",
  },
  {
    yr: "2025",
    title: "Diabetes screening record",
    line: "Associated with a Guinness World Records achievement",
  },
];

/** Night section: lobby portrait, bio, hairline ledger, animated milestone rail, contact row. */
export function MeetDrJames() {
  return (
    <section className="sec mj-sec x-night" data-header="dark" aria-labelledby="mj-h">
      <div className="container">
        <div className="mj-grid">
          <figure className="mj-photo">
            <Image
              src="/images/doctor/dr-james-portrait.jpg"
              alt="Dr. James Kumar Pallivathukkal in the lobby of Badr Al Samaa Royal Hospital"
              width={717}
              height={896}
              sizes="(max-width: 1100px) 92vw, 34vw"
            />
            <figcaption className="mj-cap">Badr Al Samaa Royal Hospital, Muscat</figcaption>
          </figure>
          <div className="mj-copy">
            <span className="eyebrow">Meet your doctor</span>
            <h2 id="mj-h">
              Dr. James Kumar <em>Pallivathukkal</em>
            </h2>
            <p className="mj-bio">
              Specialist internist and{" "}
              <b>Head of Internal Medicine and Head of Quality Control</b> at Badr Al Samaa Royal
              Hospital. He sits on the hospital&rsquo;s Ethics, Infection Control and Pharmacy
              committees, and has practised in Muscat since 2012.
            </p>
            <ul className="mj-ledger" aria-label="Qualifications">
              {LEDGER.map((r) => (
                <li className="mj-lrow" key={r.abbr}>
                  <span className="mj-abbr">{r.abbr}</span>
                  <span className="mj-ltx">
                    <b>{r.subject}</b>
                    <span className="mj-inst-m">
                      {r.inst} {"confirm" in r && r.confirm ? <Confirm>{r.confirm}</Confirm> : null}
                    </span>
                  </span>
                  <span className="mj-inst">
                    {r.inst} {"confirm" in r && r.confirm ? <Confirm>{r.confirm}</Confirm> : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal as="ol" className="mj-rail" threshold={0.4}>
          <span className="mj-track" aria-hidden="true" />
          <span className="mj-fill" aria-hidden="true" />
          {MILESTONES.map((m, i) => (
            <li key={m.title} className={m.now ? "now" : ""} style={{ ["--d" as string]: `${i * 350}ms` }}>
              <span className="mj-dot" aria-hidden="true" />
              <span className="mj-yr">
                {m.yr}
                {m.now ? <em className="mj-now">Now</em> : null}
              </span>
              <b>{m.title}</b>
              <span className="mj-line">{m.line}</span>
            </li>
          ))}
        </Reveal>

        <div className="mj-foot">
          <ul className="mj-chips" aria-label="Languages and licence">
            {site.languages.map((l) => (
              <li key={l}>{l}</li>
            ))}
            {process.env.NEXT_PUBLIC_SHOW_CONFIRM !== "0" ? (
              <li>
                <Confirm>MOH licence {site.mohLicence}</Confirm>
              </li>
            ) : null}
          </ul>
          <div className="mj-cta">
            <Link className="btn btn-p" href={site.bookUrl}>
              Book with Dr. James
            </Link>
            <Link className="btn btn-g" href={site.profileUrl}>
              Read his full profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
