import Link from "next/link";
import { site } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shell/Breadcrumbs";
import { BookButton } from "@/components/BookButton";

export default function NotFound() {
  return (
    <div className="container">
      <div className="empty-page">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Page not found" }]} />
        <h1>Page not found</h1>
        <p>
          The page you are looking for may have moved or no longer exists. Try the
          conditions list, the Health Library, or book a consultation directly.
        </p>
        <div className="btns">
          <BookButton />
          <Link className="btn btn-s" href="/conditions/">
            All conditions
          </Link>
          <a className="btn wa-btn" href={site.phoneTel}>
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
