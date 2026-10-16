import { allConditions } from "@/lib/conditions";
import { ConditionRow } from "@/components/page/ConditionRow";

/** Related conditions as ledger rows; slugs resolve against lib/conditions. */
export function RelatedConditions({ slugs }: { slugs: string[] }) {
  const items = slugs
    .map((s) => allConditions.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  if (items.length === 0) return null;
  return (
    <section className="rel-grid" aria-label="Related areas of expertise">
      <h2>Related areas of expertise</h2>
      <div className="cx-rows">
        {items.map((c) => (
          <ConditionRow key={c.slug} condition={c} />
        ))}
      </div>
    </section>
  );
}
