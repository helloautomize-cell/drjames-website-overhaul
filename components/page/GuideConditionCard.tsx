import Link from "next/link";
import { allConditions, conditionUrl } from "@/lib/conditions";
import { bookingUrl, reasonForSlug } from "@/lib/booking-context";
import { BookButton } from "@/components/BookButton";
import { Icon } from "@/lib/icons";

/** Sidebar card for the guide's main condition (related[0]). */
export function GuideConditionCard({ slug, className = "" }: { slug: string; className?: string }) {
  const c = allConditions.find((x) => x.slug === slug);
  if (!c) return null;
  return (
    <div className={`gd-condcard${className ? ` ${className}` : ""}`}>
      <Icon name={c.icon} size={28} className="gd-condcard-ic" />
      <b>{c.title}</b>
      <p>{c.line}</p>
      <BookButton label="Book about this" href={bookingUrl(reasonForSlug(slug))} />
      <Link className="gd-condcard-link" href={conditionUrl(slug)}>
        Read about {c.short.toLowerCase()}
      </Link>
    </div>
  );
}
