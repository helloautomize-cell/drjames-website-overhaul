import { site } from "@/lib/site-config";
import { BookButton } from "@/components/BookButton";
import { Icon } from "@/lib/icons";

/** Sticky table of contents. */
export function Toc({ items }: { items: { id: string; text: string }[] }) {
  if (items.length === 0) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <b>On this page</b>
      {items.map((h) => (
        <a key={h.id} href={`#${h.id}`}>
          {h.text}
        </a>
      ))}
    </nav>
  );
}

/** Small navy booking card used in page asides. */
export function BookCard() {
  return (
    <div className="book-card">
      <b>Ready to see Dr. James?</b>
      <p>Book by WhatsApp, phone or the form. {site.hoursShort}.</p>
      <div className="row">
        <BookButton label="Book" />
        <a className="btn ghost-dark" href={site.phoneTel}>
          <Icon name="phone" size={16} /> Call
        </a>
      </div>
    </div>
  );
}
