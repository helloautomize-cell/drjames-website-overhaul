## Off-Site Checklist (C16)

No linked account was opened or audited. The team should manually inspect only the following accounts/location links that actually appear in this preview.

| Linked destination | Evidence | Manual checks |
|---|---|---|
| WhatsApp contact/business account, `https://wa.me/96897510975` | `lib/site-config.ts:146`; preview contact and site controls | Business profile, catalogue/status and any existing broadcast templates: no prohibited testimonial/review requests, clinical before/after promotion, offers, superlatives or synthetic doctor/patient endorsements; use verified registration information where applicable. Distinguish ordinary replies to appointment enquiries from marketing broadcasts. Check access and retention for existing conversations; do not export patient chats for this audit. |
| Map/possible Google Business Profile location, `https://maps.app.goo.gl/dNKkw9XcfZngPQG26` | `lib/site-config.ts:143`; preview location links | Verify destination owner, address, qualifications/licensing disclosure where applicable, existing owner photos/posts, any review-request links/incentives, offers, rankings and AI content. Do not assume independently posted Google reviews are doctor-authored promotional testimonials, and do not recommend manipulating or mass-removing third-party reviews. Do not embed or republish reviews for promotion. |

No Facebook, Instagram, LinkedIn, YouTube, Practo or Justdial profile is added to this checklist without a link in the scoped site. This is not a recommendation to create any social account.

## Client Inputs Needed

1. Current Oman professional licence and registration status; Indian RMP status, council and SMR/NMR details if any; a jurisdiction decision for an Oman-based practice.
2. Approval to remove documented synthetic clinical scenes and reduce promotional portrait placements.
3. Agency engagement scope and confirmation that no payment depends on leads/patients; confirmation that prohibited marketing will not simply be hidden behind a neutral credit.
4. Doctor approval of revised diagnostic wording, treatment-specific risks and medical review records for the existing condition/guide content.
5. Verified site operator, retention/deletion arrangements, privacy grievance owner and processor/cross-border safeguards.
6. Official record-holder/event/role evidence if the existing Guinness association is to be retained; identity of the photographed certificate.
7. Deployment owner's confirmation of optional GA, enhanced measurement, advertising linkage, email delivery configuration, logging access/retention and redaction. Do not send secret values.

## Evidence And Verification

- Repository coverage: active `app/`, `components/`, `lib/`, all 18 condition documents, 62 guide documents and seven legal documents. Historical/internal descriptions are used only to establish provenance or client-input status, not as evidence that removed features appear in the preview.
- Network coverage: 24 public Vercel preview responses, including principal routes, five condition pages, three guides, privacy/editorial/medical/legal pages, llms.txt, humans.txt, robots.txt and sitemap.xml. All returned 200 after redirect to HTTPS. Detailed route/timestamp/status/hash/text/link/image/form/schema records: `evidence/preview-pages.json`.
- Rendered desktop checks: seven routes in fresh browser contexts, scrolling to reveal content; full-page screenshots and `evidence/preview-browser-observations.json`. The contact form's consent input was unchecked initially, with a linked policy and no-health-details instruction. No booking or contact form was submitted, no WhatsApp message sent, and map profiles were not opened.
- Optional GA: no matching GA tracking request appeared before consent on those seven visits. This is a limited observation, not proof that all vendors or future configurations are disabled. Vercel Speed Insights is conditionally present in root layout source; consent/vendor classification and deployment configuration need verification before launch. No unsupported finding of an active ad pixel or session recorder is made.
- Source regression check: TypeScript `lib/analytics.ts` was transpiled into an isolated VM with synthetic inputs and a stubbed document; no real measurement request was made. After a synthetic withdrawal, the event queue grew from four to six entries. An unrestricted synthetic UTM value remained in page_location, while a non-UTM query parameter was removed. Results: `evidence/analytics-source-test.json`.
- The booking logging issue was established by source inspection only. No real patient data, inbox, production logs, submission export or secret environment values were inspected.
- Primary legal verification: official NMC listing and notice PDF plus selected rendered scan pages; searchable secondary notice reproduction and the official DPDP commencement notification in `evidence/legal-sources.json`. Official PDF has no useful embedded text; its empty extraction is not treated as an authoritative transcription.
- No external-source claim or screenshot from the excluded domain is retained as NMC audit evidence. Residual production-origin links inside the preview's own canonical/schema output are preserved only as part of the scoped preview response.
- Limits: not every guide was individually rendered; all guide source documents were searched/read as an active content corpus. No off-site account, medical register, contractual arrangement, review approval archive, consent ledger or processor dashboard was audited. The supplied site's corporate ownership, licence status, consent provenance and legal territorial nexus remain client verification matters.

## Final Self-Check

- Findings contain existing-content/source evidence, not absent optional features.
- Missing items are confined to applicable M1-M4 controls; M5 is present.
- No new testimonials, cases, before/after photos, media pages, awards, social accounts or growth features are recommended.
- Removal is recommended where rewording/consent/AI labels would not cure a prohibited practice.
- Uncertainty, JUDGEMENT, dormant configuration and Indian jurisdiction are explicit rather than counted as proven patient harm or statutory violations.
- `nmc-findings.csv` contains one row per grouped finding, with all report finding fields.
- Website code and content remain unchanged. All new audit artifacts are under `nmc-audit/`; no branch, commit or push was created.
