import Link from "next/link";
import { concerns, conditionUrl } from "@/lib/conditions";
import { Icon } from "@/lib/icons";

/** Plain-language entry pills under the hero; swipe sideways on mobile. */
export function ConcernPills() {
  return (
    <div className="concern">
      {concerns.map((c) => (
        <Link key={c.slug} href={conditionUrl(c.slug)}>
          <Icon name={c.icon} size={18} strokeWidth={1.6} />
          {c.label}
        </Link>
      ))}
    </div>
  );
}
