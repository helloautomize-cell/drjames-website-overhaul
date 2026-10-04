import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-config";
import { Icon } from "@/lib/icons";
import { Confirm } from "@/components/Confirm";

/**
 * Visit band: desktop shows a sticky Omani-arch photo beside a frosted
 * "Visit Dr. James in Al Ghubrah" card; mobile shows the compact card only.
 */
export function VisitBand() {
  return (
    <div className="vband">
      <div className="vband-photo">
        <Image
          src="/images/doctor/dr-james-portrait.jpg"
          alt="Dr. James Kumar Pallivathukkal in the lobby of Badr Al Samaa Royal Hospital"
          width={717}
          height={896}
        />
      </div>
      <div className="vband-card">
        <span className="eyebrow">Visit us</span>
        <h3>
          Visit Dr. James in <em className="acc">Al Ghubrah</em>
        </h3>
        <p>
          Consultations at {site.address.hospital}, {site.address.street}, Muscat. Tests,
          imaging and pharmacy are available at the hospital{" "}
          <Confirm>[CONFIRM: which facilities]</Confirm>.
        </p>
        <ul className="vband-facts">
          <li>
            <Icon name="pin" size={18} strokeWidth={1.75} />
            <span>
              {site.address.street}, {site.address.city}, {site.address.country} · Plus code{" "}
              {site.address.plusCode}
            </span>
          </li>
          <li>
            <Icon name="clock" size={18} strokeWidth={1.75} />
            <span>
              {site.hours} <Confirm />
            </span>
          </li>
          <li>
            <Icon name="phone" size={18} strokeWidth={1.75} />
            <span>{site.phoneDisplay}</span>
          </li>
        </ul>
        <div className="btns">
          <a className="btn btn-p" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="pin" size={18} /> Get directions
          </a>
          <Link className="btn btn-s" href={site.visitUrl}>
            Plan your visit
          </Link>
        </div>
      </div>
    </div>
  );
}
