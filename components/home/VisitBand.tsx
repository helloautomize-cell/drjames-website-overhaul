import Link from "next/link";
import { site } from "@/lib/site-config";
import { Icon } from "@/lib/icons";
import { Confirm } from "@/components/Confirm";
import { LiveStatus } from "@/components/site/LiveStatus";
import { VisitMap } from "@/components/home/VisitMap";

/** Visit and book: map card beside address, hours, phone and actions. */
export function VisitBand() {
  return (
    <section className="sec vb-sec" aria-labelledby="vb-h">
      <div className="container">
        <div className="vb-grid">
          <VisitMap />
          <div className="vb-copy">
            <span className="eyebrow">Visit and book</span>
            <h2 id="vb-h">
              Badr Al Samaa Royal Hospital, <em className="acc">Al Ghubrah</em>
            </h2>
            <ul className="vb-facts">
              <li>
                <Icon name="pin" size={18} strokeWidth={1.75} />
                <span>
                  {site.address.street}, {site.address.city}, {site.address.country}
                  <small>Plus code {site.address.plusCode}</small>
                </span>
              </li>
              <li>
                <Icon name="clock" size={18} strokeWidth={1.75} />
                <span>
                  {site.hours}
                  <small>Friday closed</small>
                  <small className="vb-live">
                    <LiveStatus />
                  </small>
                </span>
              </li>
              <li>
                <Icon name="phone" size={18} strokeWidth={1.75} />
                <span>
                  {site.phoneDisplay}
                  <small>Call or WhatsApp</small>
                </span>
              </li>
              <li>
                <Icon name="check" size={18} strokeWidth={1.75} />
                <span>
                  Tests, imaging and pharmacy at the hospital{" "}
                  <Confirm>[CONFIRM: which facilities]</Confirm>
                </span>
              </li>
            </ul>
            <div className="btns">
              <Link className="btn btn-p" href={site.bookUrl}>
                Book a consultation
              </Link>
              <a className="btn btn-s" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={18} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
