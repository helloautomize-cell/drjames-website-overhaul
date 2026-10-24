# SEO Fix Changelog — 24 Oct 2026

Working tree on `main` @ `eac1455` + this fix pass. **No branch/commits created** (project rule: user handles version control). Commit per category is easy from the groupings below.

## Crawling & AI-bot access

- `app/robots.ts` — AI crawler rule now names all 11 bots explicitly: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, Bingbot. (SEO-002-checklist#2)
- `app/llms.txt/route.ts` (new) + deleted `public/llms.txt` — llms.txt is now generated from site-config + content files: correct hours (was wrongly "8:30 am–9 pm"), all 18 conditions, all 63 guides grouped by topic, all policies. Can't drift stale again. (SEO-005)
- `app/sitemap.ts` — real lastmod everywhere: guides use front-matter `updated`/`date`, conditions + legal use a new `updated` front-matter field (populated from real git history: conditions 2026-10-16, legal 2026-10-04/09), core/topic pages use the freshest guide date. No more build-timestamp lastmod. (SEO-007)
- `lib/content.ts` — `updated` ISO date field added to shared front-matter schema (conditions, legal, posts).
- `app/manifest.ts` (new) — PWA manifest now served at /manifest.webmanifest.
- Redirect added in `next.config.ts`: `/health-library/hypothyroidism-vs-hyperthyroidism/` → `…-symptoms/` 308. (SEO-010)

⚠️ **Still required at deploy (SEO-001):** `SITE_INDEXABLE=true` + `SITE_URL=https://drjamesp.com` must be set in the production env at **build and runtime** — dynamic routes like `/contact/` evaluate it per request. Verified: without it, robots.txt is `Disallow: /` and every page emits `noindex, nofollow` + `X-Robots-Tag`.

## Metadata

- `app/layout.tsx` — title template `%s | Dr. James Kumar Pallivathukkal` → `%s | Dr. James`. Rendered titles now ~49–88 chars (was 63–95+). Longest remaining: guide titles ~88; all index/utility pages now ≤ ~65. (SEO-002)
- Descriptions rewritten to ~140–155 chars: 49 front-matter descriptions across posts/conditions/legal + home, your-visit, faqs, health-library, contact, conditions index, and paginated library pages (was a 35-char boilerplate). Verified rendered: home 151, visit 143, faqs 143, library 149, contact 143, conditions 147. (SEO-006)
- `app/health-library/[slug]/page.tsx` — explicit `meta.twitter` with the per-guide generated card (was dead code; twitter:image now matches og:image per guide). (SEO-009)

## Schema & structure

- Guide breadcrumbs now include the article itself (`{label: doc.heading}`) — visible trail + BreadcrumbList both 4 items, and each guide's breadcrumb `@id` is now unique (previously collided with the topic page's). (SEO-008)
- `app/conditions/[slug]/page.tsx` — `about` @id now absolute (`${SITE_URL}${url}#condition`, matching the MedicalCondition node). (SEO-012)
- `lib/seo.tsx` — Physician `url` → `/about-dr-james/` (was `/`).

## E-E-A-T

- Condition pages: "Reviewed by Dr. James" hero line and ReviewerBox now render **only when a real review exists** in front-matter (`isPublished()`); unreviewed conditions still ship but make no review claim, and show the draft bar in dev/preview. Once the client confirms review, set `status: published`, `reviewedBy`, `reviewedOn` per file to restore the claim + date. (SEO-003)
- Doctor's name in the guide byline and ReviewerBox now links to `/about-dr-james/`. (SEO-004)

## Internal linking

- 3 legacy guides (common-digestive-problems, heart-disease-warning-signs, sleep-disorders): added pillar link early ("For the wider picture…"), 2 sibling links, a condition link and a booking link.
- 6 supports with <2 sibling links (can-prediabetes, feel-fine-prediabetes, how-to-lower-bp, internist-or-endocrinologist, primary-care-or-cardiologist, smartwatch-vs-cuff): added 2 sibling links each. (SEO-011)
- Footer nav `<a>` → `next/link`. (SEO-020)
- Removed `/health-library/hypothyroidism-vs-hyperthyroidism/` (fully redundant vs the pillar, which already contains its comparison table); cleaned all 4 inbound links; 308 redirect in place. (SEO-010)

## Content clean-up

- 33 thinnest FAQ answers expanded toward 40–60 words (thyroid pillar's 6, diabetes pillar's 2, plus all sub-20-word answers site-wide). Remaining short answers are deliberately concise direct answers — good for AEO. (SEO-013)
- Stripped the embedded Anthropic C2PA manifest from `app/icon.svg` and `public/icons/mark-source.svg`. (SEO-014)
- UK-spelling normalisation: anemia→anaemia, hemoglobin→haemoglobin, diarrhea→diarrhoea, fiber→fibre, center→centre (kept "Drug Safety Center" — proper noun), behavior(al)→behaviour(al), specializes→specialises, pediatric→paediatric, recognize→recognise across ~10 posts. (SEO-015)
- Removed `<!-- Wording to be approved by Dr. James. -->` draft comments from heart-disease-warning-signs.md (rendered into raw HTML).
- Deleted orphaned cover `public/images/library/hypothyroidism-vs-hyperthyroidism.webp` (page merged).

## Not fixed (needs client / deploy action)

- **SEO-001** launch env vars (above).
- **SEO-017/018** MOH licence number, MSc university, languages spoken, experience-count — `[CONFIRM]` in site-config; nothing fake inserted.
- **SEO-019** host-level: www/apex redirect, GBP NAP match, production bot-firewall — verify on the live domain.
- **SEO-016** Lighthouse CWV — needs a lab run on the deployed site; payloads noted in the audit.
- npm audit: `npm audit fix` applied; 2 vulns remain (1 critical) needing `--force` — review before forcing.
- `whole-person` topic id defined but unused (harmless dead taxonomy).
- Condition pages: still need `status: published` + `reviewedBy` + `reviewedOn` after the doctor's review pass (then sitemap lastmod picks up `updated` automatically).
