import { Icon } from "@/lib/icons";

/**
 * "Questions to ask at your visit" panel. "Send to my WhatsApp" opens the
 * chat picker (wa.me/?text=, no number) so it goes to whatever chat the
 * patient chooses — nothing is sent to the clinic and no data leaves the page.
 */
export function QuestionsToAsk({ items, heading }: { items: string[]; heading: string }) {
  if (items.length === 0) return null;
  const text = `${heading}:\n${items.map((q) => `- ${q}`).join("\n")}`;
  const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;
  return (
    <section className="gd-block gd-ask" aria-labelledby="gd-ask-h">
      <h2 id="gd-ask-h">Questions to ask at your visit</h2>
      <div className="gd-ask-panel">
        <ol>
          {items.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
        <a className="cx-btn cx-btn-o" href={wa} target="_blank" rel="noopener noreferrer">
          <Icon name="whatsapp" size={18} />
          Send to my WhatsApp
        </a>
      </div>
    </section>
  );
}
