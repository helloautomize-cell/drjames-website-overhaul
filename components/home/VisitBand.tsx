import Link from "next/link";
import { site } from "@/lib/site-config";
import { Icon } from "@/lib/icons";
import { Confirm } from "@/components/Confirm";
import { LiveStatus } from "@/components/site/LiveStatus";

const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.4917790524355!2d58.408220574786995!3d23.58668969504272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91ff0015d4d2e3%3A0x95427a33e24d773b!2zQmFkciBBbCBTYW1hYSBSb3lhbCBIb3NwaXRhbCDZhdiz2KrYtNmB2Ykg2KjYr9ixINin2YTYs9mF2KfYoSDYp9mE2YXZhNmD2Yo!5e0!3m2!1sen!2sin!4v1791136832601!5m2!1sen!2sin";

/** Visit and book: Google Map beside address, hours, phone and actions. */
export function VisitBand() {
  return (
    <section className="sec vb-sec" aria-labelledby="vb-h">
      <div className="container">
        <div className="vb-grid">
          <figure className="vb-map">
            <iframe
              title={`Map: ${site.address.hospital}`}
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="vb-frame"
            />
            <a
              className="vb-open"
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps <span aria-hidden="true">↗</span>
            </a>
          </figure>
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
