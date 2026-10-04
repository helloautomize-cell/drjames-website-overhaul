import Link from "next/link";
import { Fragment } from "react";

export interface Crumb {
  label: string;
  href?: string;
}

/** Breadcrumb trail; the current page renders as bold text, not a link. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((c, i) => (
        <Fragment key={i}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {c.href ? <Link href={c.href}>{c.label}</Link> : <b>{c.label}</b>}
        </Fragment>
      ))}
    </nav>
  );
}
