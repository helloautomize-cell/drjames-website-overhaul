# SEO / AEO / GEO Audit Report — drjamesp.com

**Date:** 24 Oct 2026 · **Scope:** full site, 99 URLs (production build `eac1455`, origin/main)
**Method:** `npm run build && next start` locally with `SITE_INDEXABLE=true`, raw-HTML fetches (no JavaScript) using Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Applebot; static analysis of all 63 posts, 18 conditions, 7 legal pages, and the full component/schema layer.

> Site context note: the audit checklist was written for an Indian clinic (en-IN, INR, NMC). This site serves **Muscat, Oman** (en-OM, Badr Al Samaa Royal Hospital). India-specific items were applied in spirit (local context, local costs, local regulator) rather than literally.

---

## 1. Scores

| Area | Score /100 |
|---|---|
| Crawling & AI-bot access | 82 |
| Technical (indexing, canonicals, sitemap, status codes) | 78 |
| Schema | 82 |
| E-E-A-T | 62 |
| Pillar linking | 88 |
| FAQs | 84 |
| Entities & semantics | 90 |
| Keywords | 76 |
| Content humanness | 88 |
| AEO/GEO readiness | 84 |
| **Overall** | **81 / 100** |

The content engine is genuinely strong — real review gating on posts, entity-first headings, quotable quick answers, clean pillar clusters, authoritative sources. The losses concentrate in a few systematic defects (title template, sitemap lastmod, byline links, review claims on unreviewed condition pages, stale llms.txt) and a small set of client-supplied facts that are still `[CONFIRM]` placeholders.

## 2. Checklist

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | robots.txt exists, sitemap ref, no blocking | PARTIAL | `app/robots.ts` correct when indexable; `Disallow: /` for all bots when `SITE_INDEXABLE` unset → SEO-001 |
| 2 | AI bots allowed | PASS | Wildcard `Allow: /` + explicit GPTBot/ClaudeBot/PerplexityBot/Google-Extended; OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Perplexity-User, Applebot-Extended ride the wildcard |
| 3 | No middleware/firewall bot blocks | PASS | All 9 UAs → 200 on the production build; host-level rules unverifiable locally (SEO-019) |
| 4 | Sitemap: indexable URLs, real lastmod | FAIL | Guides have real lastmod; core/conditions/topics/legal emit build timestamp → SEO-007 |
| 5 | llms.txt | PARTIAL | Exists but stale — no guides/conditions, wrong hours → SEO-005 |
| 6 | No accidental noindex; previews noindex | PARTIAL | Deliberate env gate; note that **dynamic** routes (e.g. /contact/) evaluate `SITE_INDEXABLE` at request time, so the env var must exist at runtime, not only at build |
| 7 | metadataBase + absolute self-canonical | PASS | `app/layout.tsx:25`; every page emits its absolute canonical |
| 8 | One version, permanent redirects | PARTIAL | `trailingSlash` 308s; legacy WP paths 301; www/apex pending at host → SEO-019 |
| 9 | Real 404s | PASS | `/does-not-exist/` → 404; `/elements/*` → 410 by design |
| 10 | Content/headings/FAQs/byline/dates/schema in raw HTML | PASS | Verified on curl'd guide, condition, home HTML for 4 bot UAs |
| 11 | No client-only content | PASS | FAQs are native `<details>`; no useEffect-fetched content found |
| 12 | Internal links are real `<a href>` | PASS | All body links render as hrefs; footer uses plain `<a>` (still crawlable) |
| 13 | Unique titles 50–60, descriptions 140–160 | FAIL | Title template pushes every page to 63–95 chars (SEO-002); ~26 descriptions out of range (SEO-006) |
| 14 | One H1, clean hierarchy | PASS | Exactly 1 `<h1>` on every tested page |
| 15 | Clean descriptive URLs | PASS | `/conditions/<slug>/`, `/health-library/<slug>/`, `/health-library/topic/<id>/` |
| 16 | Image alt, dimensions, next/image | PASS | All images via `next/image`; post schema hard-requires imageAlt |
| 17 | OG + Twitter on every page | PASS | Present site-wide; guides get per-page og:image but a generic twitter:image → SEO-009 |
| 18 | Visible breadcrumbs on inner pages | PARTIAL | Present, but guide crumbs omit the article itself → SEO-008 |
| 19 | Core Web Vitals | PARTIAL | Not lab-tested; HTML payloads heavy (home 203KB, library index 784KB) → SEO-016 |
| 20 | No broken links / links to redirects | PASS | 0 broken internal links in all 63 post bodies |
| 21 | One @graph, stable @ids | PARTIAL | Single @graph; guide BreadcrumbList @ids collide with the topic page's → SEO-008 |
| 22 | Article schema complete | PASS | BlogPosting + MedicalWebPage with author, reviewedBy, real dates, about→MedicalCondition, publisher |
| 23 | Physician schema complete | PARTIAL | Credentials/specialty/affiliation/image present; no licence number, no sameAs, url→home not profile → SEO-017 |
| 24 | Service/condition schema | PASS | MedicalCondition on all 18 condition pages |
| 25 | BreadcrumbList + FAQPage | PASS | Both emitted from the same data that renders the page |
| 26 | Schema matches content, no dupes | PASS | Single script, `[CONFIRM]` values filtered, valid JSON |
| 27 | Doctor profile page linked from articles | PARTIAL | Rich profile page exists; zero article→profile links (SEO-004) |
| 28 | Written by + reviewed by + dates near top | PARTIAL | Guides: combined byline with dates, unlinked; conditions: "Reviewed by" claim with no dates and no completed review → SEO-003 |
| 29 | Trust pages in footer | PASS | All present incl. Editorial Policy, Medical Disclaimer, Patient Rights |
| 30 | Authoritative citations, working | PASS | NHS/NIDDK/CDC/WHO/ADA/NHLBI/Mayo per-article Sources sections |
| 31 | No risky claims | PASS | Every "guarantee/cure" occurrence is a disclaimer, not a promise |
| 32 | "When to see a doctor" guidance | PASS | All 18 conditions + every guide's local section |
| 33 | First-hand experience, local context | PASS | Muscat/Oman/Badr Al Samaa specifics throughout; GLP-1 cost content included |
| 34 | NAP consistent across site & schema | PARTIAL | Consistent except stale llms.txt hours → SEO-005 |
| 35 | Every pillar has 5 supports | PASS | 10 pillars, 5–8 supports each (see cluster table) |
| 36 | Pillar links supports in body | PASS | All 10 |
| 37 | Supports link pillar early + 2 siblings | PARTIAL | 3 legacy guides link to no pillar; 9 supports have <2 siblings → SEO-011 |
| 38 | Articles link service + doctor page | PARTIAL | Conditions linked everywhere; doctor page linked nowhere → SEO-004 |
| 39 | Descriptive anchors | PASS | No "click here"/"read more" |
| 40 | No orphans, ≤3 clicks | PASS | Every guide has incoming links; hubs + mega menu + footer |
| 41 | 4–8 unique FAQs per page | PASS | Guides 4–6, conditions 4–6 (enforced by Zod schema) |
| 42 | FAQ answers direct, 40–60 words | PARTIAL | 209/328 answers <35 words → SEO-013 |
| 43 | FAQs in HTML, match schema | PASS | `<details>` SSR + same-source FAQPage |
| 44 | Entity coverage | PASS | Pillars cover symptoms/causes/tests/treatment/cost/specialist |
| 45 | Entity defined in first 100 words | PASS | `quickAnswer` (120–420 chars) is the quotable definition |
| 46 | H2 = question naming entity | PASS | Verified across pillars |
| 47 | Medical + plain term on first mention | PASS | e.g. "NAFLD (fatty liver)", "hypertension (high blood pressure)" |
| 48 | Keyword placement | PASS | Title/H1/URL/intro/H2/description verified on samples |
| 49 | No cannibalisation | FAIL | Thyroid pair → SEO-010 |
| 50 | Quotable specifics | PASS | Numbers, GLP-1 costs, timelines, vs-comparisons |
| 51 | ChatGPT tells | PASS | Zero hits on the banned list |
| 52 | Claude tells | PARTIAL | Zero em-dashes; minor: "straightforward" ×8, "genuinely" ×5, "that said" ×2; "Final Thoughts"/"Myth vs Fact" boilerplate H2s on pillars |
| 53 | General AI tells | PARTIAL | Identical guide skeleton (by design); US-spelling leaks → SEO-015 |
| 54 | Agent fingerprints | PARTIAL | Anthropic C2PA manifest inside `app/icon.svg` + `public/icons/mark-source.svg` → SEO-014; 1 TODO at `lib/seo.tsx:101` |
| 55 | lang, favicon, manifest, HTTPS | PARTIAL | `en-OM` correct; favicons present; no manifest; HTTPS host-level |
| 56 | Unique service/location pages, GBP match | PARTIAL | Pages genuinely unique; GBP match pending (SEO-019) |
| 57 | Entity sameAs + consistent terms | PARTIAL | No Wikipedia/Wikidata/MeSH sameAs; anemia/anaemia inconsistency |
| 58 | PAA/cost/vs coverage | PASS | Multiple vs-posts + GLP-1 cost posts + specialist-choice posts |
| 59 | Reading level / outdated facts | PASS | Plain register; nothing obviously outdated — flagged for doctor's pass anyway |
| 60 | No self-serving review schema | PASS | `lib/seo.tsx:250` explicitly never emits AggregateRating/Review |
| 61 | No regulator-violating claims | PASS | No cure/guarantee/superiority claims |
| 62 | External link rel attributes | PASS | `noopener noreferrer` on sources; `nofollow` on agency credit |
| 63 | Top-5 AI-query readiness | PARTIAL | See §5 |

## 3. Issues

Priorities: **P0** critical (launch blocker) · **P1** high · **P2** medium · **P3** low / client input.

| ID | Pri | Issue | Where | Fix |
|---|---|---|---|---|
| SEO-001 | P0 | Whole site ships `noindex,nofollow` + robots Disallow-all until `SITE_INDEXABLE=true` is in the production env | lib/seo.tsx:12, next.config.ts headers, app/robots.ts | Set `SITE_INDEXABLE=true`, `SITE_URL=https://drjamesp.com` in production env (build **and** runtime — dynamic routes evaluate at request time) and re-verify before launch. Intended gate; the risk is forgetting it |
| SEO-002 | P1 | Title template appends 32 chars → every rendered title 63–95 chars | app/layout.tsx:28; e.g. rendered guide title = 94 chars | Shorten template to ` | Dr. James` or drop the suffix where the front-matter title already works standalone |
| SEO-003 | P1 | 18 condition pages bypass the review gate but claim "Reviewed by Dr. James" with no date | resources/content/conditions/*.md (no status/reviewedOn), app/conditions/[slug]/page.tsx (no isPublished check) | Add `status: published`, `reviewedBy`, `reviewedOn` to all 18 after the doctor's pass, or gate rendering like posts |
| SEO-004 | P1 | Doctor's name never links to /about-dr-james/ — 0 article→profile links | app/health-library/[slug]/page.tsx:160-164, components/page/ReviewerBox.tsx | Link the byline + ReviewerBox name; add a first-mention profile link in article copy |
| SEO-005 | P1 | llms.txt stale: no guides/conditions/topics; hours contradict site-config | public/llms.txt ("8:30 am–9 pm") vs lib/site-config.ts (9–13, 17–21) | Render llms.txt from site data like the sitemap; list topics, pillars, key supports, policies |
| SEO-006 | P1 | Descriptions out of range: home 238ch; core pages <140; 19 guides <120; pagination boilerplate 35ch | Rendered HTML + front-matter scan | Rewrite to 140–160; noindex or properly describe /health-library/page/N |
| SEO-007 | P2 | sitemap lastmod = build time on non-guide URLs | app/sitemap.ts | Real `updated` front-matter or file mtime for conditions/legal; sensible fixed date for core |
| SEO-008 | P2 | Guide breadcrumbs end at topic; BreadcrumbList @id collides with topic page's | app/health-library/[slug]/page.tsx:94-98 | Append the article crumb (`{label: doc.heading}`) to visible trail + schema |
| SEO-009 | P2 | Guide twitter:image = generic card; `if (meta.twitter)` guard never true | app/health-library/[slug]/page.tsx:68 | Set `meta.twitter` explicitly with the per-guide card |
| SEO-010 | P2 | Cannibalisation: two thyroid-vs pages target one query | /health-library/hypothyroidism-vs-hyperthyroidism/ vs …-symptoms/ | Merge + 308, or retarget the short page to test-results intent |
| SEO-011 | P2 | 3 legacy guides link to no pillar/sibling/condition; 9 supports <2 sibling links | common-digestive-problems, heart-disease-warning-signs, sleep-disorders + 9 more | Add "For the wider picture…" pillar link + 2 contextual sibling links |
| SEO-012 | P2 | Condition-page `about` uses relative @id; condition schema has no dates | app/conditions/[slug]/page.tsx | Use absolute `${SITE_URL}${url}#condition`; add date fields via SEO-003 |
| SEO-013 | P2 | 64% of FAQ answers <35 words | all front-matter FAQs | Expand thinnest answers to 40–60 words (entity + one concrete detail) |
| SEO-014 | P2 | Anthropic C2PA manifest embedded in shipped SVGs | app/icon.svg, public/icons/mark-source.svg | Strip `<metadata>/<c2pa:manifest>` blocks |
| SEO-015 | P2 | US spellings leak (anemia/fiber/center/behavior) | 6 posts vs /conditions/anaemia/ slug | Normalise to UK spellings |
| SEO-016 | P2 | CWV unverified; heavy HTML payloads (lib index 784KB) | rendered sizes | Lighthouse mobile on home/pillar/support/condition before launch |
| SEO-017 | P3 | MOH licence number missing (site + Physician schema) | site-config.ts:163 `[CONFIRM: number]` | Client supplies; add to About + physicianNode |
| SEO-018 | P3 | Unconfirmed facts: MSc university, languages, experience count | site-config.ts:99-122, 164 | Client confirms; update site-config (single source propagates everywhere) |
| SEO-019 | P3 | Host-level pending: www/apex redirect, GBP NAP match, production bot firewall | n/a | Verify at deploy |
| SEO-020 | P3 | Misc: no PWA manifest; 3 npm audit vulns (1 critical); footer uses `<a>`; dead 'whole-person' topic | site-wide | Optional manifest; `npm audit fix`; next/link in footer; drop/populate topic |

## 4. Page-by-page table

Titles/descriptions measured from front-matter (rendered titles add ~32 chars of template suffix — see SEO-002). "Byline yes (unlinked)" = name rendered but not linked to the profile. AI score is a heuristic 0–100 from banned-phrase hits, boilerplate headings and Title-Case headings — lower is more human.

| URL | Type | Cluster | Title ch | Desc ch | Byline | Dates | FAQs | Body links out | AI score |
|---|---|---|---|---|---|---|---|---|---|
| /conditions/allergies/ | condition/service | conditions | 39 | 136 | partial | no | 5 | 0 | 12 |
| /conditions/anaemia/ | condition/service | conditions | 37 | 116 | partial | no | 5 | 0 | 12 |
| /conditions/asthma-and-breathing/ | condition/service | conditions | 39 | 135 | partial | no | 5 | 0 | 12 |
| /conditions/care-for-older-adults/ | condition/service | conditions | 31 | 145 | partial | no | 5 | 0 | 12 |
| /conditions/chest-infections-and-pneumonia/ | condition/service | conditions | 40 | 127 | partial | no | 5 | 0 | 12 |
| /conditions/diabetes-and-prediabetes/ | condition/service | conditions | 39 | 139 | partial | no | 5 | 0 | 12 |
| /conditions/digestive-problems/ | condition/service | conditions | 43 | 139 | partial | no | 5 | 0 | 12 |
| /conditions/fatty-liver/ | condition/service | conditions | 29 | 138 | partial | no | 5 | 0 | 12 |
| /conditions/fevers-and-infections/ | condition/service | conditions | 30 | 138 | partial | no | 5 | 0 | 16 |
| /conditions/heart-risk-assessment/ | condition/service | conditions | 31 | 145 | partial | no | 5 | 0 | 12 |
| /conditions/high-blood-pressure/ | condition/service | conditions | 34 | 136 | partial | no | 5 | 0 | 12 |
| /conditions/high-cholesterol/ | condition/service | conditions | 47 | 130 | partial | no | 5 | 0 | 12 |
| /conditions/joint-pain-and-arthritis/ | condition/service | conditions | 39 | 131 | partial | no | 5 | 0 | 12 |
| /conditions/kidney-problems/ | condition/service | conditions | 36 | 142 | partial | no | 5 | 0 | 12 |
| /conditions/preventive-check-ups/ | condition/service | conditions | 37 | 139 | partial | no | 5 | 0 | 12 |
| /conditions/sleep-apnea/ | condition/service | conditions | 40 | 135 | partial | no | 5 | 0 | 12 |
| /conditions/thyroid-disorders/ | condition/service | conditions | 46 | 133 | partial | no | 5 | 0 | 12 |
| /conditions/weight-management/ | condition/service | conditions | 35 | 149 | partial | no | 5 | 0 | 12 |
| /health-library/abdominal-pain-causes-gastritis-treatment/ | pillar | kidney-liver-gut | 57 | 129 | yes (unlinked) | yes | 6 | 8 | 52 |
| /health-library/anxiety-or-thyroid-when-to-test/ | supporting | diabetes-metabolism | 51 | 81 | yes (unlinked) | yes | 5 | 6 | 36 |
| /health-library/are-weight-loss-injections-safe/ | supporting | diabetes-metabolism | 32 | 134 | yes (unlinked) | yes | 5 | 6 | 36 |
| /health-library/ashwagandha-thyroid-medication-safety/ | supporting | diabetes-metabolism | 47 | 80 | yes (unlinked) | yes | 5 | 6 | 32 |
| /health-library/asthma-symptoms-early-signs-common-triggers/ | supporting | lungs-sleep-infections | 32 | 153 | yes (unlinked) | yes | 5 | 6 | 40 |
| /health-library/asthma-symptoms-triggers-relief/ | pillar | lungs-sleep-infections | 56 | 154 | yes (unlinked) | yes | 6 | 7 | 48 |
| /health-library/asthma-vs-copd-difference-symptoms/ | supporting | lungs-sleep-infections | 60 | 115 | yes (unlinked) | yes | 5 | 6 | 36 |
| /health-library/can-fatty-liver-disease-be-reversed/ | supporting | kidney-liver-gut | 36 | 106 | yes (unlinked) | yes | 5 | 6 | 36 |
| /health-library/can-prediabetes-be-reversed-step-by-step-guide/ | supporting | diabetes-metabolism | 49 | 153 | yes (unlinked) | yes | 6 | 3 | 36 |
| /health-library/cgm-vs-a1c-prediabetes-early-detection/ | supporting | diabetes-metabolism | 58 | 133 | yes (unlinked) | yes | 5 | 6 | 27 |
| /health-library/common-digestive-problems/ | supporting | kidney-liver-gut | 35 | 129 | yes (unlinked) | yes | 4 | 0 | 15 |
| /health-library/common-sleep-disorders-symptoms-health-effects/ | pillar | lungs-sleep-infections | 57 | 154 | yes (unlinked) | yes | 6 | 8 | 24 |
| /health-library/diabetes-and-prediabetes-early-warning-signs-you-shouldnt-ignore/ | pillar | diabetes-metabolism | 43 | 145 | yes (unlinked) | yes | 6 | 7 | 49 |
| /health-library/do-kidney-cleanses-work/ | supporting | kidney-liver-gut | 33 | 149 | yes (unlinked) | yes | 5 | 6 | 32 |
| /health-library/early-signs-of-kidney-disease-foamy-urine-fatigue/ | supporting | kidney-liver-gut | 29 | 150 | yes (unlinked) | yes | 6 | 6 | 32 |
| /health-library/elevated-liver-enzymes-alt-ast-meaning/ | supporting | kidney-liver-gut | 46 | 89 | yes (unlinked) | yes | 5 | 6 | 32 |
| /health-library/fatty-liver-disease-causes-symptoms-and-how-to-reverse-it/ | pillar | kidney-liver-gut | 57 | 153 | yes (unlinked) | yes | 6 | 7 | 25 |
| /health-library/feel-fine-with-prediabetes-myths-warning-signs/ | supporting | diabetes-metabolism | 53 | 155 | yes (unlinked) | yes | 5 | 3 | 30 |
| /health-library/gastritis-symptoms-what-does-gastritis-pain-feel-like/ | supporting | kidney-liver-gut | 44 | 105 | yes (unlinked) | yes | 5 | 6 | 36 |
| /health-library/gastritis-vs-acid-reflux-symptoms/ | supporting | kidney-liver-gut | 49 | 106 | yes (unlinked) | yes | 5 | 6 | 36 |
| /health-library/glp-1-diabetes-weight-loss-results-cost-side-effects/ | pillar | diabetes-metabolism | 32 | 145 | yes (unlinked) | yes | 6 | 10 | 55 |
| /health-library/glp-1-medicines-more-affordable-accessible/ | supporting | diabetes-metabolism | 54 | 147 | yes (unlinked) | yes | 5 | 6 | 30 |
| /health-library/glp-1-side-effects-how-to-manage/ | supporting | diabetes-metabolism | 41 | 151 | yes (unlinked) | yes | 5 | 6 | 34 |
| /health-library/heart-disease-warning-signs/ | supporting | heart-blood-pressure | 35 | 132 | yes (unlinked) | yes | 4 | 0 | 15 |
| /health-library/how-does-obesity-affect-your-health/ | supporting | diabetes-metabolism | 36 | 147 | yes (unlinked) | yes | 5 | 6 | 38 |
| /health-library/how-is-gastritis-treated/ | supporting | kidney-liver-gut | 50 | 82 | yes (unlinked) | yes | 5 | 6 | 36 |
| /health-library/how-much-weight-lose-glp-1-medicines/ | supporting | diabetes-metabolism | 48 | 151 | yes (unlinked) | yes | 5 | 6 | 32 |
| /health-library/how-to-choose-asthma-breathing-specialist-muscat/ | supporting | lungs-sleep-infections | 58 | 147 | yes (unlinked) | yes | 5 | 6 | 38 |
| /health-library/how-to-lower-blood-pressure-naturally-step-by-step/ | supporting | heart-blood-pressure | 59 | 151 | yes (unlinked) | yes | 5 | 3 | 28 |
| /health-library/hypothyroidism-vs-hyperthyroidism-symptoms/ | pillar | diabetes-metabolism | 53 | 139 | yes (unlinked) | yes | 6 | 7 | 52 |
| /health-library/hypothyroidism-vs-hyperthyroidism/ | supporting | diabetes-metabolism | 57 | 153 | yes (unlinked) | yes | 5 | 6 | 34 |
| /health-library/ibuprofen-naproxen-acetaminophen-kidney-safety/ | supporting | kidney-liver-gut | 52 | 147 | yes (unlinked) | yes | 6 | 6 | 30 |
| /health-library/internist-or-endocrinologist-choosing-diabetes-specialist/ | supporting | diabetes-metabolism | 60 | 152 | yes (unlinked) | yes | 6 | 3 | 30 |
| /health-library/is-glp-1-medicine-worth-the-cost/ | supporting | diabetes-metabolism | 35 | 97 | yes (unlinked) | yes | 5 | 6 | 30 |
| /health-library/is-melatonin-safe-to-take-every-night/ | supporting | lungs-sleep-infections | 38 | 96 | yes (unlinked) | yes | 5 | 6 | 34 |
| /health-library/kidney-health-101-warning-signs-you-shouldnt-overlook/ | pillar | kidney-liver-gut | 55 | 152 | yes (unlinked) | yes | 6 | 7 | 54 |
| /health-library/lifestyle-changes-vs-weight-loss-medication-obesity/ | supporting | diabetes-metabolism | 43 | 139 | yes (unlinked) | yes | 5 | 6 | 36 |
| /health-library/nafld-masld-mash-fatty-liver-disease-names/ | supporting | kidney-liver-gut | 45 | 154 | yes (unlinked) | yes | 5 | 6 | 34 |
| /health-library/nephrologist-referral-what-it-means-for-your-kidneys/ | supporting | kidney-liver-gut | 36 | 92 | yes (unlinked) | yes | 5 | 6 | 32 |
| /health-library/new-medication-options-advanced-fatty-liver-disease/ | supporting | kidney-liver-gut | 55 | 101 | yes (unlinked) | yes | 5 | 6 | 34 |
| /health-library/new-medication-options-for-sleep-apnea/ | supporting | lungs-sleep-infections | 38 | 103 | yes (unlinked) | yes | 5 | 6 | 34 |
| /health-library/normal-thyroid-test-still-feel-unwell/ | supporting | diabetes-metabolism | 54 | 152 | yes (unlinked) | yes | 5 | 5 | 32 |
| /health-library/obesity-weight-management/ | pillar | diabetes-metabolism | 29 | 150 | yes (unlinked) | yes | 6 | 7 | 55 |
| /health-library/primary-care-doctor-or-cardiologist-blood-pressure/ | supporting | heart-blood-pressure | 55 | 147 | yes (unlinked) | yes | 6 | 3 | 28 |
| /health-library/primary-care-doctor-or-liver-specialist-fatty-liver/ | supporting | kidney-liver-gut | 55 | 92 | yes (unlinked) | yes | 5 | 6 | 36 |
| /health-library/primary-care-doctor-or-nephrologist-kidney-health/ | supporting | kidney-liver-gut | 36 | 150 | yes (unlinked) | yes | 5 | 6 | 38 |
| /health-library/primary-care-doctor-or-sleep-specialist-sleep-problem/ | supporting | lungs-sleep-infections | 40 | 101 | yes (unlinked) | yes | 5 | 6 | 38 |
| /health-library/primary-care-or-endocrinologist-thyroid/ | supporting | diabetes-metabolism | 51 | 85 | yes (unlinked) | yes | 5 | 6 | 36 |
| /health-library/sleep-apnea-vs-insomnia-symptoms/ | supporting | lungs-sleep-infections | 47 | 121 | yes (unlinked) | yes | 5 | 6 | 38 |
| /health-library/sleep-disorders/ | supporting | lungs-sleep-infections | 31 | 131 | yes (unlinked) | yes | 4 | 0 | 15 |
| /health-library/smartwatch-vs-cuff-blood-pressure-accuracy/ | supporting | heart-blood-pressure | 44 | 109 | yes (unlinked) | yes | 5 | 3 | 34 |
| /health-library/still-short-of-breath-with-inhaler/ | supporting | lungs-sleep-infections | 52 | 147 | yes (unlinked) | yes | 5 | 6 | 36 |
| /health-library/think-you-have-sleep-apnea-evaluation-guide/ | supporting | lungs-sleep-infections | 33 | 105 | yes (unlinked) | yes | 5 | 6 | 36 |
| /health-library/understanding-high-blood-pressure-causes-risks-and-management/ | pillar | heart-blood-pressure | 51 | 153 | yes (unlinked) | yes | 6 | 8 | 28 |
| /health-library/what-causes-abdominal-pain/ | supporting | kidney-liver-gut | 53 | 145 | yes (unlinked) | yes | 5 | 6 | 38 |
| /health-library/what-causes-blood-sugar-rise-without-eating/ | supporting | diabetes-metabolism | 55 | 151 | yes (unlinked) | yes | 5 | 6 | 30 |
| /health-library/what-happens-when-you-stop-glp-1/ | supporting | diabetes-metabolism | 44 | 155 | yes (unlinked) | yes | 5 | 6 | 32 |
| /health-library/when-is-abdominal-pain-serious-warning-signs/ | supporting | kidney-liver-gut | 45 | 110 | yes (unlinked) | yes | 5 | 6 | 40 |
| /health-library/when-to-see-doctor-about-your-weight/ | supporting | diabetes-metabolism | 47 | 155 | yes (unlinked) | yes | 5 | 6 | 34 |
| /health-library/when-to-see-doctor-for-shortness-of-breath/ | supporting | lungs-sleep-infections | 44 | 138 | yes (unlinked) | yes | 5 | 6 | 34 |
| /health-library/why-high-blood-pressure-has-no-symptoms-silent-killer/ | supporting | heart-blood-pressure | 58 | 137 | yes (unlinked) | yes | 5 | 6 | 32 |
| /health-library/why-is-it-hard-to-lose-weight-medical-lifestyle-factors/ | supporting | diabetes-metabolism | 33 | 150 | yes (unlinked) | yes | 5 | 6 | 40 |
| /health-library/why-is-my-blood-pressure-different-at-home-than-doctor/ | supporting | heart-blood-pressure | 43 | 151 | yes (unlinked) | yes | 6 | 6 | 34 |

## 5. Cluster table

| Pillar | Supports | Missing links |
|---|---|---|
| /health-library/abdominal-pain-causes-gastritis-treatment/ | common-digestive-problems · what-causes-abdominal-pain · gastritis-symptoms · gastritis-vs-acid-reflux · how-is-gastritis-treated · when-is-abdominal-pain-serious | common-digestive-problems never links back |
| /health-library/asthma-symptoms-triggers-relief/ | asthma-symptoms-early-signs · asthma-vs-copd · when-to-see-doctor-for-shortness-of-breath · still-short-of-breath-with-inhaler · how-to-choose-asthma-breathing-specialist-muscat | — |
| /health-library/common-sleep-disorders-symptoms-health-effects/ | sleep-disorders · sleep-apnea-vs-insomnia · is-melatonin-safe · think-you-have-sleep-apnea · new-medication-options-for-sleep-apnea · primary-care-or-sleep-specialist | sleep-disorders never links back |
| /health-library/diabetes-and-prediabetes-early-warning-signs-you-shouldnt-ignore/ | cgm-vs-a1c · can-prediabetes-be-reversed · feel-fine-with-prediabetes · internist-or-endocrinologist · what-causes-blood-sugar-rise | — |
| /health-library/fatty-liver-disease-causes-symptoms-and-how-to-reverse-it/ | nafld-masld-mash-names · elevated-liver-enzymes · can-fatty-liver-be-reversed · new-medication-options-advanced-fatty-liver · primary-care-or-liver-specialist | — |
| /health-library/glp-1-diabetes-weight-loss-results-cost-side-effects/ | why-is-it-hard-to-lose-weight · lifestyle-changes-vs-medication · are-weight-loss-injections-safe · glp-1-more-affordable · how-much-weight-lose-glp-1 · glp-1-side-effects · is-glp-1-worth-the-cost · what-happens-when-you-stop-glp-1 | — |
| /health-library/hypothyroidism-vs-hyperthyroidism-symptoms/ | hypothyroidism-vs-hyperthyroidism · ashwagandha-thyroid-safety · normal-thyroid-test-still-unwell · anxiety-or-thyroid · primary-care-or-endocrinologist | cannibalisation pair (SEO-010) |
| /health-library/kidney-health-101-warning-signs-you-shouldnt-overlook/ | early-signs-of-kidney-disease · ibuprofen-naproxen-acetaminophen-kidney-safety · do-kidney-cleanses-work · nephrologist-referral · primary-care-or-nephrologist | — |
| /health-library/obesity-weight-management/ | why-is-it-hard-to-lose-weight · lifestyle-changes-vs-medication · when-to-see-doctor-about-weight · are-weight-loss-injections-safe · how-does-obesity-affect-health | — |
| /health-library/understanding-high-blood-pressure-causes-risks-and-management/ | heart-disease-warning-signs · why-hbp-no-symptoms · smartwatch-vs-cuff · how-to-lower-blood-pressure · why-is-my-bp-different · primary-care-or-cardiologist | heart-disease-warning-signs never links back |

## 6. Item 63 — AI-answer readiness for the 5 most important queries

| Query | What an engine needs to quote this site | Status |
|---|---|---|
| "fatty liver disease causes and reversal" | Quotable definition + risk numbers + specialist line | READY: quickAnswer + 30 question-H2s + NIDDK sources. Blocked only by the noindex gate |
| "high blood pressure symptoms / when to worry" | Warning-sign list + measurement numbers | READY: pillar covers it; condition page adds local consult path |
| "GLP-1 / weight-loss injection cost" | Real pricing, candid side-effect framing | READY: dedicated cost post; distinctive content few clinics publish |
| "which doctor for thyroid in Muscat" | Entity clarity + local answer | WEAK: support post exists but no GBP-verified NAP and no linked doctor entity from the byline (SEO-004/019) |
| "sleep apnea test / new treatments" | Direct answer + evaluation steps | READY: evaluation guide + tirzepatide post; would be quoted if indexable |

## 7. Needs from client (P3, non-blocking)

1. **Oman MOH licence / registration number** for Dr. James — for the About page and Physician schema (SEO-017).
2. **MSc awarding university** — Cardiff or University of South Wales (site-config.ts:114).
3. **Languages spoken** — schema currently claims English only (site-config.ts:164).
4. **Canonical experience numbers** — computed 24y vs old site 23 vs hospital profile 19 (site-config.ts:10-16).
5. **Confirmation that all 18 condition pages have been medically reviewed** — they currently assert review with no review on record (SEO-003).
6. **Google Business Profile name/address/phone** — to verify NAP match (SEO-019).

## Files

- Machine-readable copy of this audit: `/seo-audit/audit.json`
- Raw HTML snapshots used as evidence: `/tmp-html/` (delete before launch or add to .gitignore)
