import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { BookButton } from "@/components/BookButton";

/** Night CTA band used as the closer on the Your visit page. */
export function CtaBand() {
  return (
    <div className="ctaband">
      <h3>
        Ready to talk to an <em className="acc">internist</em>?
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
