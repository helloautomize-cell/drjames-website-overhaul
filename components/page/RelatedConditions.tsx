import Link from "next/link";
import { allConditions, conditionUrl } from "@/lib/conditions";
import { Icon } from "@/lib/icons";

/** Related-conditions card row; slugs resolve against lib/conditions. */
export function RelatedConditions({ slugs }: { slugs: string[] }) {
  const items = slugs
    .map((s) => allConditions.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  if (items.length === 0) return null;
  return (
    <section className="rel-grid" aria-label="Related conditions">
      <h2>Related conditions</h2>
      <div className="rel-cards">
        {items.map((c) => (
          <Link className="rel-card" key={c.slug} href={conditionUrl(c.slug)}>
            <Icon name={c.icon} size={26} />
            <b>{c.title}</b>
            <span>{c.line}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
