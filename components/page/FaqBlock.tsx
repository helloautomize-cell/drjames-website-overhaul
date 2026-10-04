import type { Faq } from "@/lib/content";
import { ConfirmText } from "@/components/ConfirmText";

/** FAQ accordions using the shared .faq styles. */
export function FaqBlock({ faqs, heading = "Common questions" }: { faqs: Faq[]; heading?: string }) {
  if (faqs.length === 0) return null;
  return (
    <section className="page-sec" aria-label={heading}>
      <h2>{heading}</h2>
      <div className="faq">
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>
              <ConfirmText text={f.a} />
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
