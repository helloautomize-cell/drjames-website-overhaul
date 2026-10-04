import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/shell/Breadcrumbs";
import { BookButton } from "@/components/BookButton";
import { bookingUrl } from "@/lib/booking-context";
import { site } from "@/lib/site-config";
import { Icon, type IconName } from "@/lib/icons";
import { Badge } from "@/components/Badge";

/**
 * Compact inner-page hero: breadcrumbs, optional condition badge,
 * H1, answer-first intro and the Book/Call row.
 */
export function PageHero({
  crumbs,
  title,
  intro,
  badge,
  meta,
  reason,
}: {
  crumbs: Crumb[];
  title: string;
  intro?: ReactNode;
  badge?: IconName;
  meta?: ReactNode;
  /** Neutral booking reason to prefill when visitors tap Book. */
  reason?: Parameters<typeof bookingUrl>[0];
}) {
  return (
    <div className="pg-hero">
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <div className="pg-hero-row">
          {badge ? (
            <span className="badge-col" aria-hidden="true">
              <Badge icon={badge} size={92} />
            </span>
          ) : null}
          <div>
            <h1>{title}</h1>
            {intro ? <p className="intro">{intro}</p> : null}
          </div>
        </div>
        {meta ? <div className="pg-meta">{meta}</div> : null}
        <div className="pg-cta">
          <BookButton href={bookingUrl(reason)} />
          <a className="btn btn-s" href={site.phoneTel}>
            <Icon name="phone" size={18} /> Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
