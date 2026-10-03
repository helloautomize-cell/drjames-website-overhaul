import Image from "next/image";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { Icon } from "@/lib/icons";
import { Confirm } from "@/components/Confirm";
import { BookButton } from "@/components/BookButton";

/** Contact block: one address everywhere, hours, click-to-load map, CTA band. */
export function ContactBlock() {
  return (
    <>
      <div className="contact">
        <div className="cinfo">
          <div className="crow">
            <Icon name="pin" size={22} />
            <div>
              <b>{site.address.hospital}</b>
              <span>
                {site.address.street},<br />
                {site.address.city}, {site.address.country}
              </span>
            </div>
          </div>
          <div className="crow">
            <Icon name="clock" size={22} />
            <div>
              <b>Consultations</b>
              <span>
                {site.hoursShort} <Confirm />
              </span>
            </div>
          </div>
          <div className="crow">
            <Icon name="phone" size={22} />
            <div>
              <b>Phone and WhatsApp</b>
              <span>{site.phoneDisplay}</span>
            </div>
          </div>
          <div className="crow">
            <Icon name="mail" size={22} />
            <div>
              <b>Email</b>
              <span>{site.emailDisplay}</span>
            </div>
          </div>
          <p className="em-line">Medical emergency? Call {site.emergency}</p>
          <div className="btns">
            <a className="btn btn-p" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
              Get directions
            </a>
            <a className="gchip" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="pin" size={18} />
              See us on Google Maps
            </a>
          </div>
        </div>
        <figure className="cmap">
          <Image
            src="/images/doctor/dr-james-portrait.jpg"
            alt="Badr Al Samaa Royal Hospital lobby"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <figcaption>
            <span>{site.address.hospital}</span>
            <button type="button" className="btn btn-s">
              Show map
            </button>
          </figcaption>
        </figure>
      </div>
      <div className="ctaband">
        <h3>
          Ready to talk to a <em className="acc">physician</em>?
        </h3>
        <p>Book a consultation with Dr. James at Badr Al Samaa Royal Hospital.</p>
        <div className="btns">
          <BookButton onDark />
          <a className="btn ghost-dark" href={site.phoneTel}>
            Call {site.phoneDisplay}
          </a>
          <a className="btn wa-btn" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
