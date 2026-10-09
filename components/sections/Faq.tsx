import Link from "next/link";
import { Confirm } from "@/components/Confirm";
import { site } from "@/lib/site-config";

/** The five home questions. `confirm` answers stay out of the FAQPage JSON-LD until signed off. */
export const HOME_FAQS: { q: string; a: string; confirm?: string }[] = [
  {
    q: "Do I need an appointment, or can I walk in?",
    a: "Best to book so a time is held for you. WhatsApp or call +968 9751 0975, or use the form on this site.",
    confirm: "[CONFIRM: whether walk-ins are accepted]",
  },
  {
    q: "Is my insurance accepted?",
    a: "Send a photo of your insurance card on WhatsApp and the team will confirm your cover before the visit.",
    confirm: "[CONFIRM with client]",
  },
  {
    q: "Do I need to fast before my visit?",
    a: "Not for the consultation. Some blood tests, such as fasting sugar or cholesterol, need 8 to 10 hours without food. We tell you when you book if your tests need fasting. Water is fine.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Your old prescriptions, recent reports, the medicines you take (or photos of the packs), and your sugar diary or meter if you have diabetes.",
  },
  {
    q: "Can I follow up on WhatsApp after my visit?",
    a: "For appointments and reports, yes. For new or urgent symptoms, book a visit, or go to the nearest emergency department.",
    confirm: "[CONFIRM with client]",
  },
];

/** Native accordions; all answer text is in the HTML for search. */
export function Faq() {
  return (
    <div className="faq hfaq">
      {HOME_FAQS.map((f, i) => (
        <details key={f.q} name="hfaq" open={i === 0}>
          <summary>
            {f.q}
            <span className="hfaq-plus" aria-hidden="true" />
          </summary>
          <p>
            {f.a} {f.confirm ? <Confirm>{f.confirm}</Confirm> : null}
          </p>
        </details>
      ))}
      <Link className="faq-all" href={site.faqsUrl}>
        See all FAQs
      </Link>
    </div>
  );
}
