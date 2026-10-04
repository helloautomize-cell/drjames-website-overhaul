import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { BookButton } from "@/components/BookButton";

/** Navy CTA band used at the foot of content pages. */
export function CtaBand() {
  return (
    <div className="ctaband">
      <h3>
        Ready to talk to a <em className="acc">physician</em>?
      </h3>
      <p>Book a consultation with Dr. James at {site.hospital}.</p>
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
  );
}
