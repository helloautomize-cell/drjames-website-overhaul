import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { Badge } from "@/components/Badge";
import { Icon } from "@/lib/icons";
import { conditionGroups, conditionUrl } from "@/lib/conditions";
import { pageMeta, JsonLd, breadcrumbNode, medicalWebPageNode, physicianNode, websiteNode } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Conditions Dr. James looks after",
  "The conditions an internist manages: diabetes, blood pressure, cholesterol, thyroid, lungs, sleep, kidneys, liver, gut and care for older adults in Muscat.",
  "/conditions/",
);

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Conditions" },
];

export default function ConditionsPage() {
  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          medicalWebPageNode("/conditions/", "Conditions Dr. James looks after", undefined, "[CONFIRM]"),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        title="Conditions Dr. James looks after"
        intro="An internist looks after the whole picture: sugar, pressure, lungs, kidneys, liver, gut and the way they interact. Find your concern below, or book a consultation and we will work it out together."
      />
      <div className="container">
        {conditionGroups.map((g) => (
          <section className="cond-group" key={g.id} aria-labelledby={`g-${g.id}`}>
            <h2 id={`g-${g.id}`}>{g.label}</h2>
            <p>{g.intro}</p>
            <div className="cond-cards">
              {g.conditions.map((c) => (
                <Link className="cond-card" key={c.slug} href={conditionUrl(c.slug)}>
                  <Badge icon={c.icon} size={56} />
                  <span>
                    <b>{c.title}</b>
                    <span>{c.line}</span>
                  </span>
                  <span className="go" aria-hidden="true">
                    <Icon name="arrow" size={18} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
        <div style={{ padding: "24px 0 64px" }}>
          <CtaBand />
        </div>
      </div>
    </main>
  );
}
