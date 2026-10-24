import { site } from "@/lib/site-config";
import { SITE_URL } from "@/lib/seo";
import { conditionMeta, legalMeta, publishedPostMeta } from "@/lib/content";
import { conditionGroups } from "@/lib/conditions";
import { sortNewest } from "@/lib/library";

/**
 * llms.txt generated from the same content sources as the site so it can never
 * drift from real hours, pages or guides (previously a stale static file).
 */
export function GET() {
  const guides = sortNewest(publishedPostMeta());
  const topics = conditionGroups
    .map((g) => ({ g, items: guides.filter((p) => p.topic === g.id) }))
    .filter((s) => s.items.length);

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.title} at ${site.hospital}, ${site.address.street}, ${site.address.city}, ${site.address.country}.`,
    `> Consultations: ${site.hours}; ${site.hoursClosed}. Appointments by phone (${site.phoneDisplay}) or WhatsApp (${site.whatsapp}).`,
    "",
    `${site.name} provides internal medicine for adults in Muscat: diabetes and metabolic health, heart and blood pressure risk, kidneys, lungs, liver and gut, thyroid, sleep and energy, joints and care for older adults — looked after together by one senior physician.`,
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}/): overview of Dr. James's practice and how to book`,
    `- [About Dr. James](${SITE_URL}/about-dr-james/): training, credentials, career timeline`,
    `- [Conditions](${SITE_URL}/conditions/): the ${conditionMeta().length} conditions he treats`,
    `- [Plan your visit](${SITE_URL}/your-visit/): what to bring, directions, first-visit steps`,
    `- [FAQs](${SITE_URL}/faqs/): practical questions about appointments`,
    `- [Health Library](${SITE_URL}/health-library/): plain-language guides written and reviewed by Dr. James`,
    `- [Contact & booking](${SITE_URL}/contact/): appointment request form`,
    "",
    "## Conditions treated",
    "",
    ...conditionMeta().map((c) => `- [${c.heading}](${SITE_URL}/conditions/${c.slug}/)`),
    "",
    "## Health Library guides",
    "",
    ...topics.flatMap(({ g, items }) => [
      `### ${g.label}`,
      "",
      ...items.map((p) => `- [${p.heading}](${SITE_URL}/health-library/${p.slug}/)`),
      "",
    ]),
    "## Policies",
    "",
    ...legalMeta().map((l) => `- [${l.title}](${SITE_URL}/${l.slug}/)`),
    "",
    `Website built and marketed by Automize Media Labs (https://www.automizemedialabs.com/)`,
  ];

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
