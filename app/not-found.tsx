import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shell/Breadcrumbs";
import { BookButton } from "@/components/BookButton";
import { ConditionSearch } from "@/components/ConditionSearch";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="container">
      <div className="empty-page">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Page not found" }]} />
        <h1>Page not found</h1>
        <p>
          The page you are looking for may have moved or no longer exists. Search a
          condition below, or use the links to the main pages.
        </p>
        <ConditionSearch />
        <div className="btns">
          <BookButton />
          <Link className="btn btn-s" href="/conditions/">
            All conditions
          </Link>
          <Link className="btn btn-s" href="/health-library/">
            Health Library
          </Link>
          <a className="btn wa-btn" href={site.phoneTel}>
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </main>
  );
}
