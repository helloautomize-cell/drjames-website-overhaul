import Image from "next/image";
import { site } from "@/lib/site-config";
import { BookButton } from "@/components/BookButton";
import { Confirm } from "@/components/Confirm";

/** Wide doctor feature card: photo left, credentials and actions right. */
export function DoctorCard() {
  return (
    <article className="doc">
      <Image
        src="/images/doctor/dr-james-portrait.jpg"
        alt="Dr. James Kumar Pallivathukkal in the lobby of Badr Al Samaa Royal Hospital"
        width={717}
        height={896}
      />
      <div className="b">
        <h3>{site.name}</h3>
        <div className="q">
          MD (Internal Medicine), Manipal · MSc Diabetes, University of South Wales · PG
          Diploma in Diabetes, Cardiff University
        </div>
        <div className="role">{site.role}</div>
        <div className="q">
          Former Internal Medicine Specialist at Atlas-NMC Hospital, Muscat (2012 to
          2022). Member of the hospital&apos;s Ethics, Infection Control and Pharmacy
          committees. Oman MOH licence <Confirm>[CONFIRM: number]</Confirm>
        </div>
        <div className="chips">
          <span className="chip xp">{site.yearsInMedicine}+ years</span>
          <span className="chip">English</span>
          <span className="chip">
            Malayalam <Confirm>?</Confirm>
          </span>
          <span className="chip">
            Arabic <Confirm>?</Confirm>
          </span>
        </div>
        <div className="acts">
          <BookButton label="Book with Dr. James" />
          <a className="btn btn-s" href={site.profileUrl}>
            View profile
          </a>
        </div>
      </div>
    </article>
  );
}
