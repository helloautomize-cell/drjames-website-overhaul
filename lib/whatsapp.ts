import { site } from "./site-config";

/**
 * Builds the pre-filled WhatsApp link for a page.
 * Message pattern: "Hello Dr. James, I would like to book a consultation
 * about <page>. My name is ".
 */
export function whatsappLink(about?: string): string {
  const message = about
    ? `Hello Dr. James, I would like to book a consultation about ${about}. My name is `
    : "Hello Dr. James, I would like to book a consultation. My name is ";
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
