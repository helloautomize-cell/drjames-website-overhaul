import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/shell/Breadcrumbs";
import { BookButton } from "@/components/BookButton";
import { bookingUrl } from "@/lib/booking-context";
import { site } from "@/lib/site-config";
import { Icon, type IconName } from "@/lib/icons";
import { Badge } from "@/components/Badge";
import type { BadgeName } from "@/lib/badge-glyphs";
import { Confirm } from "@/components/Confirm";
import Image from "next/image";

/**
 * Compact inner-page hero: breadcrumbs, optional condition badge,
 * H1, answer-first intro and the Book/Call row.
 */
export function PageHero({
  crumbs,
  title,
  intro,
  badge,
  coin,
  img,
  meta,
  reason,
  reviewed,
}: {
  crumbs: Crumb[];
  title: string;
  intro?: ReactNode;
  badge?: IconName;
  /** Navy coin badge beside the H1 (takes precedence over `badge`). */
  coin?: BadgeName;
  /** Approved photo bleeding off the right edge with a CSS fade. */
  img?: { src: string; alt: string; width: number; height: number };
  meta?: ReactNode;
  /** Neutral booking reason to prefill when visitors tap Book. */
  reason?: Parameters<typeof bookingUrl>[0];
  /** Condition pages: shows the reviewed-by line under the buttons. */
  reviewed?: { lastReviewed: string };
}) {
  return (
    <div className={`pg-hero${img ? " has-img" : ""}`}>
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <div className="pg-hero-row">
          {coin ? (
            <span className="badge-col" aria-hidden="true">
              <Badge name={coin} size="lg" />
            </span>
          ) : badge ? (
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
        {reviewed ? (
          <p className="pg-rev">
            <Image src="/images/doctor/d04-headshot-160sq.jpg" alt="" width={28} height={28} />
            <span>Reviewed by {site.name}, Specialist Internist</span>
            {reviewed.lastReviewed.includes("[CONFIRM]") ? (
              <Confirm>{reviewed.lastReviewed}</Confirm>
            ) : (
              <span className="num">{reviewed.lastReviewed}</span>
            )}
          </p>
        ) : null}
      </div>
      {img ? (
        <div className="pgh-img">
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            sizes="(max-width: 900px) 100vw, 40vw"
            priority
          />
        </div>
      ) : null}
    </div>
  );
}
