import { testimonials } from "@/lib/testimonials";

export function Testimonials() {
  return (
    <div className="testi-grid">
      {testimonials.map((t) => (
        <figure className="testi-card" key={t.name}>
          <span className="testi-mark" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote>{t.quote}</blockquote>
          <figcaption>{t.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}
