import Link from "next/link";
import { site } from "@/lib/site-config";

/** Flat petrol Book pill with a round arrow chip (spec 4). */
export function BookPill({
  label = "Book a consultation",
  href = site.bookUrl,
  large = false,
  className = "",
}: {
  label?: string;
  href?: string;
  large?: boolean;
  className?: string;
}) {
  return (
    <Link className={`x-book${large ? " x-lg" : ""}${className ? ` ${className}` : ""}`} href={href}>
      {label}
      <span className="x-arr">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
