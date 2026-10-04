import Link from "next/link";
import { site } from "@/lib/site-config";
import { Icon } from "@/lib/icons";

/** Closing night band: petrol glow, centred invitation, emergency line. */
export function CtaBand() {
  return (
    <section className="sec cta-sec x-night" data-header="dark" aria-labelledby="cta-h">
      <div className="container">
        <div className="cta-inner">
          <span className="eyebrow">{site.address.hospital} · Muscat</span>
          <h2 id="cta-h">
            Ready to talk to a <em>physician</em>?
          </h2>
          <p className="cta-line">
            One consultation to look at everything together, and a plan you can follow.
          </p>
          <div className="cta-btns">
            <Link className="btn btn-p" href={site.bookUrl}>
              Book a consultation
            </Link>
            <a className="btn btn-g" href={site.phoneTel}>
              Call {site.phoneDisplay}
            </a>
            <a className="btn btn-g" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} /> WhatsApp
            </a>
          </div>
          <p className="cta-emg">
            Medical emergency? Call <b>{site.emergency}</b>
          </p>
        </div>
      </div>
    </section>
  );
}
