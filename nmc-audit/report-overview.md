# NMC Hygiene Audit - Pre-Launch Vercel Preview

Audit date: 26 October 2026. Investigation only; no website implementation or content edits.

## Practice Profile

| Field | Evidence-based assessment |
|---|---|
| Practice type | **P6 - individual non-surgical physician's website, with hospital-based outpatient, inpatient, emergency and ICU work.** It is not described as an OPD-only clinic (P1), a surgeon's practice (P2), a multi-doctor directory (P3) or the hospital's own corporate website (P4). |
| Practice location | Badr Al Samaa Royal Hospital, Al Ghubrah Street, Muscat 133, **Oman**. `lib/site-config.ts:136-154`; `/contact/`. |
| Indian state and State Medical Council | **Not established / not applicable to the displayed Oman address.** Do not infer an Indian council from graduation in Tamil Nadu, postgraduate study in Manipal or previous work in Kerala. Indian registration and any continuing Indian professional jurisdiction require client confirmation. |
| Named doctor | Dr. James Kumar Pallivathukkal; also shortened to Dr. James Pallivathukkal / Dr. James. One clinician, not three different doctors. |
| Displayed qualifications | MBBS, 2002; MD Internal Medicine, 2007; PG Diploma in Diabetes, Cardiff, 2012; MBA, 2012; MSc Diabetes, 2014; DBA, Coventry, 2024. The MSc awarding institution remains unresolved in source. The business qualifications are not specialist medical registrations. `lib/site-config.ts:99-123`; `/about-dr-james/`. |
| Registration disclosed? | No SMR/NMR/council/status disclosure found in the inspected preview profile, footer or Physician schema. Oman MOH licence remains `[CONFIRM: number]` in `lib/site-config.ts:163`. This is a disclosure gap, not proof that the doctor is unlicensed. |
| Does the doctor perform surgery/procedures? | **No surgery or interventional procedure performed by him is established.** The site describes medical treatment, prescribing, examinations, tests, CPAP and hospital investigations. M3 applies because treatments are described, not because this is a surgical practice. |
| Hospital affiliation | Head of Internal Medicine and Head of Quality Control. Inpatient/emergency/ICU responsibilities: `app/about-dr-james/page.tsx:139-148`. Hospital/MedicalClinic schema nodes do not by themselves turn a one-doctor website into a hospital directory. |

## Scope And Legal Basis

- **Only the repository and `http://drjames.vercel.app/` are in scope.** The supplied HTTP preview redirects to `https://drjames.vercel.app/`; report URLs use that final origin.
- The user confirmed the replacement has not gone live. Excluded-domain captures collected before that clarification were deleted from this audit's evidence directory, and none of their observations contributes to the findings or counts.
- A production-domain string can still occur inside this repository's canonical/schema/llms output. Such strings in the preview's own output are not evidence of inspecting that other domain. No conclusions about that domain are made.
- This is a **pre-launch gap assessment against the requested NMC benchmark**, not a conclusion that Indian law automatically governs an Oman practice. Confirm Indian RMP status, relevant regulator, establishment/operator and territorial nexus with qualified counsel. Oman's health-advertising and data-protection rules also need local professional review; this is not a complete Omani legal opinion.
- The NMC notice is real and verified: official [notice listing](https://nmc.org.in/whats-new), [download 1874](https://nmc.org.in/whats-new/download/1874), No. R-13014/01/2024-Ethics, 6 October 2026, immediate effect. Saved primary PDF: `evidence/nmc-2026-10-06.pdf`. It is scanned; rendered pages 1, 7, 8 and 9 were inspected. Searchable secondary reproductions are retained in `evidence/legal-sources.json` and are not labelled primary law.
- **DPDP is phased, not wholly enforceable on this audit date.** The official [G.S.R. 843(E) commencement notification](https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf), published in November 2025, places core sections 3-17 (with specified exceptions) on an 18-month commencement schedule. That period has not elapsed on 26 October 2026. NMC 7.6 itself says "to the extent applicable and in force from time to time." Privacy findings therefore distinguish actual implementation/notice issues from future-readiness or conditional Indian legal obligations.
- The brief's unticked checkbox, per-treatment risk balance and short medical-disclaimer requirements are applied as its conservative **M1-M5 audit controls**. They are not represented as verbatim universal duties stated in those exact terms by every cited statute.
- No standalone DMR Act, Clinical Establishments Act or IT Act violation is asserted without a demonstrated statutory trigger. No inspection of private logs, inboxes, patient submissions, provider dashboards or secret configuration occurred.

## Executive Summary

1. **Risk level: High against the requested pre-launch NMC benchmark; not a finding of established Indian jurisdiction or actual patient harm.**
2. **13 findings: 0 Critical, 5 High, 8 Medium, 0 Low.** Counts are grouped root causes, not page-occurrence counts.
3. Ten concern existing public content/controls; three (NMC-011 to NMC-013) are source-confirmed implementation risks whose activating deployment conditions were not established.
4. First fix: remove documented AI-generated depictions of the actual doctor and patient consultations; labelling alone is not a cure.
5. Second fix: remove explicit third-party marketing credits and review the underlying engagement, not just its wording.
6. Third fix: obtain verified registration/licensing disclosures and a jurisdiction decision; fourth: restrict doctor photographs to low-risk identification contexts.
7. Fifth fix: remove absolute diagnostic/testing promises and balance existing treatment explanations with specific risks and variable outcomes.
8. Before launch, also resolve privacy operator identity, genuine review sign-off, ambiguous record/certificate presentation, educational sales framing and dormant analytics/logging defects.

## Feature Inventory

"No" means no occurrence found in the inspected active code/content and sampled preview responses, not a warranty about uninspected external services. Historical source notes about excluded/removed content are not treated as present features.

| ID | Exists? | Evidence and boundary |
|---|---|---|
| F1 Testimonials/reviews/ratings | **No** | No rendered testimonial/review component found. `resources/content/legal/editorial-policy.md:30-35` expressly excludes them; `/` has no patient praise widget. |
| F2 Review/rating schema | **No** | `lib/seo.tsx:250-256`; sampled preview JSON-LD contains no Review or AggregateRating nodes. |
| F3 Cases/patient/success stories | **No** | No actual patient-case or success-story section found in active routes/content. Generic clinical explanations are not automatically patient case studies. |
| F4 Before/after or clinical patient images/scans | **Yes, synthetic consultation/patient depictions only** | d03, d08, d09 and d10 are documented AI consultation scenes: `design/handoff/IMAGE-MAP.md:11,16-18`; used by Home, Your Visit and condition templates. No real patient scan, identifiable real clinical record, or before/after pair established. NMC-001 addresses these depictions without falsely declaring a real-patient data breach. |
| F5 Patient/surgery videos | **No** | No patient video, live surgery stream or surgery-video embed found in active routes. |
| F6 Doctor photographs | **Yes** | Hero, home profile, About, condition/library/visit/contact banners, bylines/reviewer boxes, thank-you and OG images. Placement inventory below; NMC-001/002 distinguish synthetic images from promotional use of real portraits. |
| F7 Numbers/counters | **Yes** | Home displays 24 years in medicine, 14 in Oman, 3 countries and 6 degrees/diplomas. `components/home/MeetDrJames.tsx:128-137`; `lib/site-config.ts:7-22`. No patient/surgery count or success-rate boast found. Plain verified experience is not prohibited just because it is numeric. |
| F8 Awards/rankings/media | **Yes, record association** | Guinness screening-record milestone and certificate photo on About/Home: `app/about-dr-james/page.tsx:51-54,181-188`; `components/home/MeetDrJames.tsx:30-34`. No media-logo wall, paid ranking or media/news page found. |
| F9 Equipment/technology/facilities | **Yes** | Blood tests, ECG, imaging and pharmacy at hospital; sleep study/CPAP and CGM educational material. `/your-visit/`, `resources/content/conditions/sleep-apnea.md:17-18`, relevant library guides. Not proof the doctor owns a diagnostic centre. |
| F10 Fees/packages/costs | **Yes, informational only** | Fee enquiry wording in `lib/faqs.ts:33-34`; existing GLP-1 cost guides under `resources/content/posts/`. No priced practice package or promotional tariff found. |
| F11 Offers/incentives | **No** | No discount, free consultation/camp offer, coupon, EMI promotion, referral reward or contest found in active content. |
| F12 Educational content | **Yes** | 18 condition documents and 62 non-template guide documents in repository; `/conditions/`, `/health-library/`, `/faqs/`. |
| F13 Forms/contact/WhatsApp/widgets | **Yes** | `components/BookingForm.tsx:80-214`; `/contact/`; click-initiated WhatsApp, contact controls, symptom-navigation finder and cookie settings. No diagnostic chatbot, countdown, exit-intent or automatic WhatsApp launch established. |
| F14 AI content | **Yes** | Explicit AI image provenance in `design/handoff/IMAGE-MAP.md:9-18`; AI-assisted text workflow disclosed by `/editorial-policy/`. Library-cover provenance is not independently settled merely by appearance; do not assume every cover is AI or a real patient. |
| F15 Analytics/tracking/cookies | **Yes, implementation exists** | Consent banner/local storage, optional GA code, Vercel-conditioned Speed Insights: `lib/analytics.ts`, `lib/consent.ts`, `app/layout.tsx:54-56`. No GA request observed before consent on seven fresh-context preview visits; optional GA activation was not established. No ad pixel/session recorder found in active implementation. |
| F16 Third-party credits/links/brands | **Yes** | Agency credit in footer, llms.txt and humans.txt. Google Maps/WhatsApp links and editorial source links also exist. Generic medicine/device names in education are not automatically commercial endorsements. |
| F17 Announcements/greetings | **No** | No current clinic-opening/address-change/holiday greeting campaign found. A historical career timeline is not counted as a festival or announcement feed. |
| F18 Doctor directory | **No** | One doctor and hospital affiliation, not a directory of multiple doctors. |
| F19 Social profiles | **Yes, WhatsApp and Maps only** | `lib/site-config.ts:143-146`; rendered links to `https://wa.me/96897510975` and `https://maps.app.goo.gl/dNKkw9XcfZngPQG26`. No linked Facebook/Instagram/LinkedIn/YouTube/Practo/Justdial account found in the inspected preview. Do not import profiles from the excluded domain. |

### Existing Photo Placements

| Asset family | Current use and source |
|---|---|
| d02 hero cutout / d02 portrait | Home hero and Meet Dr. James; `components/home/Hero.tsx:3,86-95`; `components/home/MeetDrJames.tsx:82-84`. d02 portrait is marked REAL in the handoff; do not confuse the current d02 cutout with its older unused d01 AI-cutout entry. |
| d01 hero | About full-width banner; `app/about-dr-james/page.tsx:74-80`; AI provenance in handoff. |
| d03 consultation | Home How He Works and Your Visit consultation step; `components/home/HowHeWorks.tsx:99-111`; `components/StepTracker.tsx:25-27`; AI. |
| d04 real headshot | Guide byline/reviewer boxes, library introduction, contact card, thank-you, Physician/MedicalClinic image and default OG/Twitter share card. `components/page/ReviewerBox.tsx:14-19`; `app/health-library/[slug]/page.tsx:160-165`; `app/health-library/page.tsx:124-125`; `app/contact/page.tsx:83-84`; `app/thank-you/page.tsx:23`; `lib/seo.tsx:85,157`; `app/opengraph-image.tsx:17-19`. Conditional condition-page reviewer thumbnail: `components/page/PageHero.tsx:67-73`. |
| d05 results | Conditions and library index banners; condition fallback; `app/conditions/page.tsx:65-66`; `app/health-library/page.tsx:95-96`; `lib/conditions.ts:253-259`; AI. |
| d06 corridor / d07 welcome | Your Visit banner / arrival step and Contact banner; `app/your-visit/page.tsx:130-131`; `components/StepTracker.tsx:17-19`; `app/contact/page.tsx:49-56`; AI. |
| d08/d09/d10 | Condition-group panels and condition heroes through shared image map; `lib/conditions.ts:227-259`; `app/conditions/[slug]/page.tsx:89-96`; AI. |
| d11 leadership / d12 candid / certificate photograph | About sections; `app/about-dr-james/page.tsx:127-133,181-188,249-255`. d11/d12 marked REAL. Certificate image was visually checked; its Guinness caption is not substantiated by the visible certificate. |

## Applicability

"Applies" means this audit module runs under the requested benchmark. It does not settle Indian territorial or professional jurisdiction.

| Check | Applies / N/A | Reason / result |
|---|---|---|
| M1 Registration | Applies, legal applicability conditional | One named physician; incomplete number/council/status disclosure: NMC-004. |
| M2 Privacy/consent | Applies | Appointment form and analytics infrastructure; checkbox initially unticked and linked policy present; incomplete policy identity: NMC-007; accuracy/controls: NMC-011/012. |
| M3 Risks/limitations | Applies | Existing treatment descriptions; specific gaps NMC-006, not every educational page. |
| M4 AI disclosure/review | Applies | Documented synthetic images and AI-assisted editorial workflow; NMC-001/008. Existing text-assistance disclosure is present, not missing. |
| M5 Medical disclaimer | Applies - present | Shared footer education/consultation note and linked medical disclaimer; guides also contain individual disclaimer text. No missing-disclaimer finding. `components/sections/SiteFooter.tsx:51-52`; `app/health-library/[slug]/page.tsx:291-295`. |
| C1 Claims | Applies | Existing absolute diagnostic/service claims: NMC-005; balance and award attribution: NMC-006/009. No independent cure-guarantee or secret-remedy finding. |
| C2 Testimonials/reviews | N/A | F1 and F2 absent. |
| C3 Cases/stories | N/A | F3 absent. |
| C4 Patient images/video | Applies, limited | Synthetic consultation depictions in F4; cross-reference NMC-001. No separate actual-patient confidentiality finding and no surgery-video module findings. |
| C5 Doctor photographs | Applies | F6; context-dependent NMC-002. Plain identification is lower-risk JUDGEMENT. |
| C6 Numbers/awards/media | Applies | F7/F8; experience/qualifications allowed when verified; record/certificate presentation NMC-009. No missing awards/media features. |
| C7 Equipment/facilities | Applies - no standalone finding | Factual testing/facility descriptions; no equipment superiority/accuracy guarantee established. |
| C8 Fees/offers | Applies - no finding | Existing cost/fee information only; no inducements found. No requirement to add a tariff. |
| C9 Educational content | Applies | F12; promotional framing JUDGEMENT NMC-010, clinical balance and review assurance NMC-006/008. |
| C10 Solicitation/CTAs | Applies | F13; NMC-002/010 on cumulative context. Ordinary factual contact and voluntary navigation are not prohibited automatically. |
| C11 AI | Applies | F14; NMC-001/008. No evidence of diagnostic chatbot or AI voice/video. |
| C12 Data protection | Applies | F13/F15; NMC-007/011/012/013 with explicit activation/legal caveats. |
| C13 Third parties | Applies | F16; NMC-003. No evidenced product endorsement or pay-per-patient arrangement. |
| C14 Announcements/greetings | N/A | F17 absent. |
| C15 Institution/directory rules | N/A | P6 individual physician site; no F18. Hospital affiliation/schema alone is not a multi-doctor/hospital practice classification. |
| C16 Off-site | Applies - list/manual checks only | F19; WhatsApp and linked map location. Profiles themselves were not audited. |

## Findings

Counts include explicit conditional and JUDGEMENT items. Severity is triage under the brief, not an imposed regulatory sanction. The following findings are generated from `findings.json`; `nmc-findings.csv` uses the same fields and IDs. File references are repository-relative and refer to source at the audit date. All URLs refer to the Vercel preview, not another live deployment.
