import Link from "next/link";
import { site } from "@/lib/site-config";
import { Icon } from "@/lib/icons";

/**
 * The two-part Book button: teal calendar icon block + navy label.
 * `adaptive` renders the desktop "Book Appointment" / mobile "Book now" labels.
 */
export function BookButton({
  label = "Book Appointment",
  onDark = false,
  adaptive = false,
  href = site.bookUrl,
  className = "",
}: {
  label?: string;
  onDark?: boolean;
  adaptive?: boolean;
  href?: string;
  className?: string;
}) {
  return (
    <Link className={`book${onDark ? " on-dark" : ""}${className ? ` ${className}` : ""}`} href={href}>
      <span className="ic">
        <Icon name="calendar" size={22} strokeWidth={1.8} />
      </span>
      <span className="lb">
        {adaptive ? (
          <>
            <span className="full">{label}</span>
            <span className="short">Book now</span>
          </>
        ) : (
          label
        )}
      </span>
    </Link>
  );
}
