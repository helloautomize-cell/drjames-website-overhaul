import { whatsappLink } from "@/lib/whatsapp";
import { Icon } from "@/lib/icons";

/** Floating WhatsApp button, desktop only (the action bar covers mobile). */
export function FloatingWhatsApp() {
  return (
    <a
      className="wa"
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <Icon name="whatsapp" size={26} />
    </a>
  );
}
