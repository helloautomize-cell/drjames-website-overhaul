import Link from "next/link";
import { conditionUrl, type Condition } from "@/lib/conditions";
import { Icon } from "@/lib/icons";

/** Ledger row shared by the Conditions index and Related conditions. */
export function ConditionRow({ condition: c, index = 0 }: { condition: Condition; index?: number }) {
  return (
    <Link className="cx-row" href={conditionUrl(c.slug)} style={{ "--i": index } as React.CSSProperties}>
      <span className="cx-row-ic" aria-hidden="true">
        <Icon name={c.icon} size={24} />
      </span>
      <b>{c.title}</b>
      <span className="cx-row-d">{c.line}</span>
      <span className="cx-row-go" aria-hidden="true">
        <Icon name="arrow" size={18} />
      </span>
    </Link>
  );
}
