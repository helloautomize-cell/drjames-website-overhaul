import Link from "next/link";
import { site } from "@/lib/site-config";
import { Icon } from "@/lib/icons";
import { Confirm } from "@/components/Confirm";
import { LiveStatus } from "@/components/site/LiveStatus";

/** Stylised Al Ghubrah map card — replaced by a hospital entrance photo when one arrives. */
function MapCard() {
  return (
    <a
      className="vb-map"
      href={site.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Badr Al Samaa Royal Hospital in Google Maps"
    >
      <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="500" height="400" fill="var(--night)" />
        {/* sea */}
        <path d="M0 0 H500 V86 Q390 108 320 92 Q230 72 150 96 Q70 118 0 100 Z" fill="rgba(29,107,114,.28)" />
        <path d="M0 96 Q70 114 150 92 Q230 68 320 88 Q390 104 500 82" fill="none" stroke="rgba(217,183,126,.35)" strokeWidth="1.2" />
        {/* faint contours */}
        <path d="M-20 340 Q120 300 240 330 T520 310" fill="none" stroke="rgba(194,154,91,.12)" strokeWidth="1" />
        <path d="M-20 370 Q140 340 260 365 T520 345" fill="none" stroke="rgba(194,154,91,.12)" strokeWidth="1" />
        <path d="M60 400 Q90 260 210 240 Q330 222 360 130" fill="none" stroke="rgba(194,154,91,.12)" strokeWidth="1" />
        {/* dot grid */}
        {Array.from({ length: 7 }, (_, r) =>
          Array.from({ length: 9 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={36 + c * 54} cy={140 + r * 40} r="1.4" fill="rgba(255,255,255,.07)" />
          )),
        )}
        {/* roads */}
        <path d="M0 190 Q160 175 300 195 T500 180" fill="none" stroke="rgba(217,183,126,.35)" strokeWidth="1.4" />
        <path d="M0 258 Q180 240 330 262 T500 250" fill="none" stroke="rgba(217,183,126,.35)" strokeWidth="1.4" />
        <path d="M120 400 Q140 300 210 250 Q280 200 290 100" fill="none" stroke="rgba(217,183,126,.35)" strokeWidth="3.2" />
        <path d="M340 400 Q330 310 370 250 Q410 190 405 120" fill="none" stroke="rgba(217,183,126,.35)" strokeWidth="1.4" />
        <path d="M500 330 Q420 320 340 340 Q240 368 140 350" fill="none" stroke="rgba(217,183,126,.35)" strokeWidth="1.4" />
      </svg>
      <span className="vb-sea">Gulf of Oman</span>
      <span className="vb-loc">Al Ghubrah · Muscat</span>
      <span className="vb-pin" aria-hidden="true">
        <span className="vb-halo" />
        <span className="vb-halo vb-halo2" />
        <span className="vb-pt" />
      </span>
      <span className="vb-tag" aria-hidden="true">
        <b>Badr Al Samaa</b>
        <span>Royal Hospital, Al Ghubrah</span>
      </span>
      <span className="vb-open">
        Open in Google Maps <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}

/** Visit and book: designed map card beside address, hours, phone and actions. */
export function VisitBand() {
  return (
    <section className="sec vb-sec" aria-labelledby="vb-h">
      <div className="container">
        <div className="vb-grid">
          <MapCard />
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
