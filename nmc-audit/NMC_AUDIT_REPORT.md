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

### HIGH (5)

#### NMC-001 - Synthetic doctor and consultation photographs are presented as real practice scenes

- Severity: **HIGH**

- **Applicable Checks:** C11; C4; M4

- **Clause / Control:** 7.2(a)-(c); 8.1(ii)

- **Evidence Status:** Confirmed AI provenance and deployed use; NMC jurisdiction conditional

- **Preview URL(s):** https://drjames.vercel.app/about-dr-james/; https://drjames.vercel.app/contact/; https://drjames.vercel.app/conditions/thyroid-disorders/; https://drjames.vercel.app/

- **File:Line Evidence:** design/handoff/IMAGE-MAP.md:9-18; app/about-dr-james/page.tsx:74-80; components/home/HowHeWorks.tsx:99-111; app/contact/page.tsx:49-56; lib/conditions.ts:227-259; app/conditions/[slug]/page.tsx:89-96; app/your-visit/page.tsx:130-131; app/conditions/page.tsx:65-66; app/health-library/page.tsx:95-96

- **Quoted Evidence:** Image map: 'd03-consultation.jpg ... AI ... Dr. James explaining a care plan to a patient during a consultation'; 'd01-hero.jpg ... AI'; deployed alt text: 'Dr. James showing a patient a blood glucose reading'; home caption: 'In clinic ... Badr Al Samaa Royal Hospital'.

- **Why It Is A Problem:** Documented synthetic depictions of the actual RMP and patient interactions, described as real clinical scenes, risk the misleading representation prohibited by 7.2; merely adding an AI label does not cure a prohibited representation.

- **Compliant Alternative / Exact Change:** Remove the rendered d01-hero, d03-consultation, d05-results, d06-corridor, d07-welcome, d08-blood-sugar, d09-blood-pressure and d10-lungs image families from their existing page slots, including the Your Visit stepper and condition-group panels; remove associated clinical-scene captions and alt text. Leave the existing factual text and navigation. Do not replace them with generated people. Do not classify the currently imported d02-hero-cutout as AI solely from the older image map's d01-cutout entry: the current hero uses a different asset. For any independently confirmed AI-generated non-person educational illustrations that are retained, show 'AI-generated illustration; not a patient image.' This last instruction is conditional, not a finding that every library cover is AI.

- **SEO/AEO Impact:** Preserve the condition text, headings, internal links and genuine reviewer credentials; removing synthetic clinical scenes need not remove the page or its search intent. Update image metadata rather than leaving false clinical alt text.

- **Client Input Needed:** Confirm asset provenance and approve removal of the documented synthetic scenes. Approval of an image by the doctor is not an exception to the prohibition.

- **Effort (S/M/L):** M

#### NMC-002 - Doctor imagery is used in promotional hero, biography and share-card placements

- Severity: **HIGH**

- **Applicable Checks:** C5; C10

- **Clause / Control:** 9.2; 8.1(ii)

- **Evidence Status:** JUDGEMENT on promotional context; not a blanket ban on identification photos

- **Preview URL(s):** https://drjames.vercel.app/; https://drjames.vercel.app/about-dr-james/; https://drjames.vercel.app/opengraph-image

- **File:Line Evidence:** components/home/Hero.tsx:54-95; components/home/MeetDrJames.tsx:82-84,128-137,279-280; app/about-dr-james/page.tsx:72-115,126-139; app/opengraph-image.tsx:14-19,48-80; lib/seo.tsx:29-38

- **Quoted Evidence:** Hero: 'A physician who sees the whole picture.'; 'Book a consultation'; portrait alt: 'Dr. James Kumar Pallivathukkal, Specialist Internist, in a white coat with arms crossed'. OG source: 'd04-headshot-800sq.jpg', followed by the doctor's name and role.

- **Why It Is A Problem:** The combination of dominant portraits, personal positioning, credential/stat panels and booking prompts is materially different from a plain identification photograph and raises self-publicity risk under 9.2.

- **Compliant Alternative / Exact Change:** Low-risk option: remove doctor photographs from home hero, promotional home biography panel, inner-page banners and default OG/Twitter share card; keep one genuine plain identification photograph on About beside verified credentials and registration. Replace the hero slogan with 'Internal Medicine and Diabetes consultations in Muscat.' Follow with 'Badr Al Samaa Royal Hospital, Al Ghubrah Street. Saturday to Thursday, 9 am to 1 pm and 5 pm to 9 pm. Appointments: +968 9751 0975.' Keep the share card text-only, with the page title, doctor name and location. Small reviewer-identification headshots are lower-risk JUDGEMENT, not separately counted prohibited photographs. NMC-001 separately addresses synthetic imagery; do not duplicate removal work.

- **SEO/AEO Impact:** Keep textual identity, qualifications, location and Physician schema. A genuine profile identification image can retain entity association without promotional portrait banners.

- **Client Input Needed:** Approval of the conservative photo-placement policy; qualified local advice if the practice wants to retain borderline placements.

- **Effort (S/M/L):** M

#### NMC-003 - Three public surfaces explicitly describe third-party medical marketing

- Severity: **HIGH**

- **Applicable Checks:** C13

- **Clause / Control:** 8.1(ii), (vii), (viii), (xi); 4.4

- **Evidence Status:** Confirmed public marketing credit; payment model not established

- **Preview URL(s):** https://drjames.vercel.app/; https://drjames.vercel.app/llms.txt; https://drjames.vercel.app/humans.txt

- **File:Line Evidence:** components/sections/SiteFooter.tsx:53-61; app/llms.txt/route.ts:51; public/humans.txt:2-3

- **Quoted Evidence:** 'Built & Marketed by Automize Media Labs'; 'Website built and marketed by Automize Media Labs'; 'Built & marketed by: Automize Media Labs'.

- **Why It Is A Problem:** These credits expressly describe the third-party marketing engagement barred by 8.1(ii), rather than merely identifying a website developer.

- **Compliant Alternative / Exact Change:** Remove the marketing credits from all three surfaces. A neutral 'Website: Automize Media Labs' credit is appropriate only if it truthfully describes lawful technical website work. Review and stop any prohibited medical-service promotion or patient-procurement arrangement itself; changing or concealing the credit while continuing prohibited marketing is not a compliant fix. Do not infer a referral-fee arrangement from generic analytics event names alone.

- **SEO/AEO Impact:** The practice's medical entity, citations and clinical content do not depend on the agency credit. Remove the marketing statement from the machine-readable text as well as the visible footer.

- **Client Input Needed:** Agency statement of work, confirmation of whether services are limited to technical/informational work, and whether any payment depends on leads or patients.

- **Effort (S/M/L):** S

#### NMC-004 - The named physician has no published registration number, council or registration status

- Severity: **HIGH**

- **Applicable Checks:** M1

- **Clause / Control:** 3.2 Explanation III/IV; audit brief M1

- **Evidence Status:** MISSING against requested benchmark; Indian RMP applicability must be confirmed

- **Preview URL(s):** https://drjames.vercel.app/about-dr-james/; https://drjames.vercel.app/contact/; https://drjames.vercel.app/

- **File:Line Evidence:** lib/site-config.ts:83-108,163; app/about-dr-james/page.tsx:159-176; components/sections/SiteFooter.tsx:7-63; components/page/ReviewerBox.tsx:21-35; lib/seo.tsx:73-135

- **Quoted Evidence:** Site name: 'Dr. James Kumar Pallivathukkal'; qualifications include 'MBBS', 'MD', 'PG Dip'; source value: mohLicence: '[CONFIRM: number]'. The rendered profile, footer and Physician graph disclose no council/registration number or status.

- **Why It Is A Problem:** For an RMP subject to the NMC framework, identity and qualifications without registration status and SMR/NMR number do not meet Explanation III; the practice's Indian registration and jurisdiction are not established by this site.

- **Compliant Alternative / Exact Change:** Obtain verified registration evidence first. If Indian registration applies, use: 'Dr. James Kumar Pallivathukkal, MBBS, MD (Internal Medicine), PG Diploma in Diabetes. Registered with [verified council name]; SMR/NMR Registration No. [verified number]; status: [verified current status].' Also show the verified Oman Ministry of Health professional licence where applicable, clearly distinguished from Indian registration. Use the verified disclosure in the profile, footer and medical bylines; mirror it as an appropriate identifier/credential in schema. The bracketed fields are a controlled client-input template, not publishable copy; never invent values or infer the council from where he studied. If he has no applicable Indian registration, do not invent one or label him an Indian RMP; obtain a documented jurisdiction decision and publish the applicable verified Oman licensing information.

- **SEO/AEO Impact:** Verified identifiers strengthen entity disambiguation and credential trust. Do not fabricate structured-data identifiers or imply that an Oman licence is an SMR/NMR number.

- **Client Input Needed:** Oman licence and current status; whether he retains Indian registration; exact council, SMR/NMR number and status if applicable; confirmation of the applicable professional regulator.

- **Effort (S/M/L):** S

#### NMC-005 - Absolute wording promises diagnostic completeness and error-free testing

- Severity: **HIGH**

- **Applicable Checks:** C1

- **Clause / Control:** 8.1(iii), (vi)

- **Evidence Status:** Confirmed absolute diagnostic/service claims; not a finding of a guaranteed cure

- **Preview URL(s):** https://drjames.vercel.app/conditions/anaemia/; https://drjames.vercel.app/conditions/thyroid-disorders/; https://drjames.vercel.app/

- **File:Line Evidence:** resources/content/conditions/anaemia.md:7,36,46; resources/content/conditions/thyroid-disorders.md:7; resources/content/conditions/care-for-older-adults.md:12; resources/content/conditions/diabetes-and-prediabetes.md:48; resources/content/conditions/preventive-check-ups.md:7; components/home/HowHeWorks.tsx:28-30; components/home/RightDoctor.tsx:25,37

- **Quoted Evidence:** 'Dr. James always finds the cause before treating'; 'hidden blood loss is ruled out'; 'A simple blood test gives the answer'; 'no wasted tests'; 'nothing doubled up and nothing missed'; 'so nothing is added that clashes with something else'.

- **Why It Is A Problem:** These unqualified assurances of diagnostic certainty and omission-free care create expectations that cannot be guaranteed for an individual consultation.

- **Compliant Alternative / Exact Change:** Anaemia intro: 'Anaemia means the blood carries less oxygen than usual. Assessment looks for possible causes and guides treatment; further investigation or referral may be needed.' Anaemia assessment: replace 'hidden blood loss is ruled out when the pattern demands it' with 'possible hidden blood loss is investigated when indicated'; after-visit paragraph: 'The findings, likely causes, treatment options and follow-up plan are discussed. Further tests or referral may be needed if the cause remains uncertain.' Thyroid intro: replace the final sentence with 'Blood tests help assess thyroid function; interpretation depends on symptoms, medicines and other findings.' Home testing principle: 'Tests are selected according to the clinical assessment.' Home medicines line: 'A medicines review checks for duplication, interactions and suitability.' Home check-up line: 'Tests are selected after a consultation, based on your history.' Older-adult FAQ: replace the final sentence with 'A medicines review helps assess possible interactions and duplication across the treatment plan.' Diabetes follow-up: replace the final sentence with 'Kidney, eye and cholesterol checks are arranged according to your clinical needs.' Preventive-check-up intro: 'A check-up starts with a consultation. Tests are selected according to your age, family history, symptoms and other risk factors.' Apply the revised strings to their FAQ schema/metadata derivatives rather than leaving older promises there.

- **SEO/AEO Impact:** Keep condition names and answer-first explanations. Qualified factual language remains useful for snippets and avoids promising a guaranteed clinical outcome.

- **Client Input Needed:** Doctor approval of the replacement clinical wording.

- **Effort (S/M/L):** M

### MEDIUM (8)

#### NMC-006 - Several short treatment descriptions give benefits or reassurance without balanced treatment risks

- Severity: **MEDIUM**

- **Applicable Checks:** M3; C1; C9

- **Clause / Control:** 8.1(vi); audit brief M3

- **Evidence Status:** MISSING balanced risk/limitations information in the listed existing treatment descriptions

- **Preview URL(s):** https://drjames.vercel.app/conditions/thyroid-disorders/; https://drjames.vercel.app/conditions/asthma-and-breathing/; https://drjames.vercel.app/conditions/sleep-apnea/; https://drjames.vercel.app/conditions/weight-management/; https://drjames.vercel.app/conditions/diabetes-and-prediabetes/; https://drjames.vercel.app/conditions/anaemia/

- **File:Line Evidence:** resources/content/conditions/thyroid-disorders.md:13-20; resources/content/conditions/asthma-and-breathing.md:17-18; resources/content/conditions/sleep-apnea.md:17-18; resources/content/conditions/weight-management.md:15-16; resources/content/conditions/diabetes-and-prediabetes.md:13-16; resources/content/conditions/anaemia.md:15-20

- **Quoted Evidence:** Thyroid: 'a daily hormone tablet long-term, which is safe and works well'; asthma: 'untreated asthma is far riskier than the medicine'; sleep apnea: 'usually needs a CPAP machine, which keeps the airway open'; weight: 'whether a medicine suits your situation'; diabetes: 'Insulin is added only when the body needs it'; anaemia: 'tablets help'.

- **Why It Is A Problem:** These existing treatment explanations are insufficiently balanced under the brief's M3 standard; a footer disclaimer does not explain treatment-specific adverse effects or variable response.

- **Compliant Alternative / Exact Change:** Doctor-review-ready text for the existing sections: Thyroid: 'Underactive thyroid is often treated with thyroid hormone replacement. The dose needs monitoring: too much can cause palpitations and other problems, while too little may leave symptoms unresolved. The need for treatment and response vary. Overactive thyroid has different treatment options and risks, which should be discussed individually.' Asthma: 'Preventer inhalers help many people control asthma when used as prescribed. Depending on the inhaler, side effects can include a sore mouth, hoarseness or tremor. Technique, dose and monitoring matter, and control varies. Do not change treatment without medical advice.' CPAP: 'CPAP helps keep the airway open during sleep. Mask discomfort, nasal dryness, skin irritation or air leakage can occur. Suitability, comfort and response vary, and follow-up may be needed.' Weight management: 'Weight-loss medicines are suitable for some people, not everyone. Benefits, contraindications and side effects depend on the medicine; gastrointestinal symptoms and other adverse effects can occur. Results vary and monitoring is needed.' Diabetes: 'Treatment may include lifestyle measures, tablets or insulin, depending on assessment. Some diabetes medicines, including insulin, can cause low blood sugar; other risks depend on the medicine. Targets and response vary, and doses need monitoring.' Iron treatment: 'Iron tablets may help when iron deficiency is confirmed. They can cause nausea, abdominal discomfort, constipation or dark stools, and can interact with other medicines. Response varies; follow-up blood tests check progress and investigation of the cause may still be needed.' Place the relevant text next to the treatment discussion and update corresponding FAQ answers. These are edits to existing treatments, not recommendations to add services. The longer weight-loss-injection guide already discusses risks and varying outcomes and is not reported as missing them.

- **SEO/AEO Impact:** Retain the treatment questions and improve balanced answers. Do not blanket-delete educational treatment content or duplicate a generic risk paragraph across unrelated pages.

- **Client Input Needed:** Doctor review of each risk statement and confirmation that it matches the treatment actually discussed.

- **Effort (S/M/L):** M

#### NMC-007 - The privacy notice hides an unresolved operator identity

- Severity: **MEDIUM**

- **Applicable Checks:** M2; C12

- **Clause / Control:** 7.6 to the extent applicable/in force; audit brief M2

- **Evidence Status:** Confirmed incomplete privacy-notice identity; consent checkbox and policy link already exist

- **Preview URL(s):** https://drjames.vercel.app/privacy-policy/; https://drjames.vercel.app/contact/

- **File:Line Evidence:** resources/content/legal/privacy-policy.md:9,35,39,50,66; lib/content.ts:261-264; components/BookingForm.tsx:199-211

- **Quoted Evidence:** Rendered policy: 'This website is operated by ("we", "us").' Source: 'This website is operated by [CONFIRM: Dr James personally or a company]'; retention: 'kept for 12 months by default ... [CONFIRM: retention agreed with client]'.

- **Why It Is A Problem:** The existing notice names no operator after its placeholder is stripped, so a visitor cannot clearly identify who is responsible for the appointment data despite the other notice and consent controls being present.

- **Compliant Alternative / Exact Change:** After verifying the actual operator, replace the first sentence with 'This website is operated by [verified legal operator name], responsible for the personal information collected through this website. Privacy enquiries and complaints: omanjamesp@gmail.com, +968 9751 0975.' If Dr. James personally is confirmed as the operator, the complete name is 'Dr. James Kumar Pallivathukkal'; otherwise use the actual legal entity, not an assumed name. Keep the existing unticked consent checkbox and privacy-policy link. Retain the 12-month retention statement only after the client confirms the actual deletion process, including inbox/provider copies; if it is not true, replace it with the verified retention period and exceptions. Do not publish bracketed fields. Do not remove or change data-processing safeguards silently as a copy fix.

- **SEO/AEO Impact:** Completing the existing policy preserves its URL and trust function; no new marketing feature or structured-data expansion is needed.

- **Client Input Needed:** Legal operator, actual retention/deletion practice, privacy grievance owner, email/hosting processor arrangements and cross-border safeguards. This is not a finding that retention or a contact address is absent.

- **Effort (S/M/L):** S

#### NMC-008 - Condition pages publish without recorded sign-off but still emit reviewedBy schema

- Severity: **MEDIUM**

- **Applicable Checks:** C11; C9; M4

- **Clause / Control:** 7.2(a), (c); 5.1; audit brief M4

- **Evidence Status:** Confirmed publication/review-claim mismatch; actual off-repository sign-off unknown

- **Preview URL(s):** https://drjames.vercel.app/conditions/thyroid-disorders/; https://drjames.vercel.app/conditions/anaemia/; https://drjames.vercel.app/editorial-policy/

- **File:Line Evidence:** resources/content/legal/editorial-policy.md:13,24; lib/content.ts:35-40,305-315; app/conditions/[slug]/page.tsx:60-83,96-103; lib/seo.tsx:182-196; resources/content/conditions/thyroid-disorders.md:1-22

- **Quoted Evidence:** Policy: 'AI-assisted drafting is never published without human medical review'; condition route comment: 'the page still ships either way'; schema helper: reviewedBy: { '@id': ... '#dr-james' }. All 18 condition files lack recorded status/reviewedBy/reviewedOn values; sampled deployed condition graphs still assert reviewedBy.

- **Why It Is A Problem:** The declared AI/editorial safeguard is not enforced for condition publication, while machine-readable review attribution is emitted independently of the recorded approval state.

- **Compliant Alternative / Exact Change:** Obtain and record genuine doctor sign-off for each existing condition page before public release. Until then, keep the affected pages restricted as drafts rather than merely hiding their review warning in a production-mode preview. Gate condition publication and reviewedBy/lastReviewed output on the same verified approval state used for guides; never set status or dates merely to pass a check. Keep the factual AI-assisted drafting disclosure. Change the llms.txt guide description from 'plain-language guides written and reviewed by Dr. James' to 'plain-language health guides medically reviewed by Dr. James', but only for guides with verified approval. The source for that phrase is app/llms.txt/route.ts:32. Existing frontmatter claims on the 62 guides still require genuine sign-off records; this audit does not prove those claims false.

- **SEO/AEO Impact:** Only verified review attribution should be supplied to search and AI systems. A temporary draft restriction is preferable to unsupported E-E-A-T claims; retain the same URLs when approved.

- **Client Input Needed:** Doctor approval records/dates for the 18 condition pages and confirmation of the guide-review records; confirmation of actual AI assistance.

- **Effort (S/M/L):** M

#### NMC-009 - A personal record/achievement presentation is not independently substantiated by the displayed certificate

- Severity: **MEDIUM**

- **Applicable Checks:** C6; C1

- **Clause / Control:** 8.1(iii), (ix)

- **Evidence Status:** JUDGEMENT: record association and certificate caption need substantiation

- **Preview URL(s):** https://drjames.vercel.app/about-dr-james/; https://drjames.vercel.app/

- **File:Line Evidence:** lib/site-config.ts:96-97; components/home/MeetDrJames.tsx:30-34; app/about-dr-james/page.tsx:51-54,181-188; public/images/doctor/dr-james-certificate.jpg

- **Quoted Evidence:** 'Associated with a Guinness World Records achievement for maximum diabetes patient screening at Badr Al Samaa Royal Hospital, 2025'; image alt: 'Dr. James holding his Guinness World Records certificate'.

- **Why It Is A Problem:** The record association is used as personal promotional proof, but the displayed certificate photograph does not establish the claimed Guinness record, holder, event date or the doctor's precise role.

- **Compliant Alternative / Exact Change:** Low-risk exact change: remove the 'Diabetes screening record' milestone on Home and About and the certificate photograph/caption used to substantiate it; retain the existing factual employment and training chronology. Do not relabel another certificate as Guinness evidence. If the client later supplies an independently verifiable record and exact role, have the proposed factual attribution reviewed under 8.1(iii)/(ix) before retaining anything; do not convert an institutional record into an individual clinical-success claim. No recommendation to add an awards section.

- **SEO/AEO Impact:** Existing verified qualifications and employment retain the expertise signal. Avoid search/AI amplification of an ambiguous award-holder association.

- **Client Input Needed:** Official record/event reference, record holder, date and doctor's documented role if the claim is to be retained; identity of the certificate actually photographed.

- **Effort (S/M/L):** S

#### NMC-010 - Educational articles repeatedly shift into named-doctor promotion and booking

- Severity: **MEDIUM**

- **Applicable Checks:** C9; C10

- **Clause / Control:** 3.2 Explanation I; 5.1; 8.1(i), (ii)

- **Evidence Status:** JUDGEMENT on cumulative promotional framing, not a ban on factual appointments or emergency advice

- **Preview URL(s):** https://drjames.vercel.app/health-library/why-high-blood-pressure-has-no-symptoms-silent-killer/; https://drjames.vercel.app/health-library/how-much-weight-lose-glp-1-medicines/

- **File:Line Evidence:** resources/content/posts/why-high-blood-pressure-has-no-symptoms-silent-killer.md:110,116; resources/content/posts/how-much-weight-lose-glp-1-medicines.md:106; app/health-library/[slug]/page.tsx:230-260,329-343

- **Quoted Evidence:** 'Book an appointment ... Book one ... Book one'; 'If you live in Muscat and your readings have been worrying you, Dr. James Pallivathukkal can review them with you'; template: 'Book a consultation'; closer: 'Talk to Dr. James about ...'.

- **Why It Is A Problem:** Repeated named-doctor pitches and booking inserts within and after educational advice can turn an otherwise informational article into personal solicitation; contextual assessment is required.

- **Compliant Alternative / Exact Change:** Replace the blood-pressure appointment paragraph with 'If you have not had a recent blood pressure measurement, ask a healthcare professional when to check it. Repeated elevated readings should be assessed. Very high readings or symptoms such as chest pain, severe breathlessness or new neurological symptoms need urgent medical assessment rather than a routine booking.' Replace its promotional final sentence with 'Keep a record of readings and discuss the pattern with a qualified healthcare professional.' Replace the GLP-1 guide's named-doctor final paragraph with 'Response to GLP-1 treatment varies. Discuss expected benefits, risks, monitoring and what happens if treatment stops with a qualified healthcare professional.' Remove repeated personal promotional sign-offs and in-body booking sentences from existing guides while retaining their medical disclaimers. In the guide template, retain factual related-condition/visit links but remove the embedded booking row and the repeated doctor-promotion closing band. Keep one ordinary site navigation/contact route and the genuine reviewer attribution. Do not weaken appropriate emergency warnings.

- **SEO/AEO Impact:** Retain clinical headings, answers, sources, internal educational links and genuine bylines. Removing repeated sales inserts does not require removing local practice information from the contact/profile pages.

- **Client Input Needed:** Approval of the conservative educational/contact separation and doctor review of emergency advice.

- **Effort (S/M/L):** M

#### NMC-011 - Withdrawing analytics consent does not stop an already-loaded GA instance

- Severity: **MEDIUM**

- **Applicable Checks:** C12

- **Clause / Control:** 7.6 to the extent applicable/in force; existing privacy-policy consent promise

- **Evidence Status:** Confirmed source defect and isolated test; dormant unless GA is configured and previously accepted

- **Preview URL(s):** https://drjames.vercel.app/privacy-policy/; https://drjames.vercel.app/ (Cookie settings)

- **File:Line Evidence:** lib/analytics.ts:34-54,63-78; components/analytics/Analytics.tsx:19-25,30-36,40-48; lib/consent.ts:40-46; resources/content/legal/privacy-policy.md:48,54; nmc-audit/evidence/analytics-source-test.json

- **Quoted Evidence:** track(): 'if (!loaded && !loadGa()) return'; pageView(): 'if (!loaded || !window.gtag || !GA_ID) return'; consent handler only calls loadGa() when analytics is true. Policy: 'Withdraw consent for analytics at any time'.

- **Why It Is A Problem:** Consent is checked at initial loading but not at later event dispatch, so previously enabled analytics continues after the stored preference changes to declined.

- **Compliant Alternative / Exact Change:** Recheck analyticsAllowed() before every track() and pageView() dispatch. On withdrawal, stop further measurement, update the vendor consent state/disable analytics and clear applicable analytics cookies; on re-acceptance, restore measurement only after a fresh permission check. Do not rely only on removing a script element. Preserve default refusal and the existing settings link. Acceptance check: accept, withdraw, navigate and click ordinary contact links in a synthetic test; no further measurement requests should occur until re-acceptance.

- **SEO/AEO Impact:** No search-content loss; analytics totals may decrease to reflect actual permission. Consent enforcement is not an SEO ranking workaround.

- **Client Input Needed:** Whether GA will be enabled at launch, measurement/property configuration and cookie inventory. No GA requests were observed before consent on the inspected preview; this is not a claim of an actual user-data breach.

- **Effort (S/M/L):** M

#### NMC-012 - Analytics retains arbitrary UTM values and health-topic paths despite categorical anonymous/no-health-data copy

- Severity: **MEDIUM**

- **Applicable Checks:** C12; M2

- **Clause / Control:** 7.6 to the extent applicable/in force

- **Evidence Status:** Confirmed payload design and inaccurate assurance; no actual personal-data transmission established

- **Preview URL(s):** https://drjames.vercel.app/privacy-policy/; https://drjames.vercel.app/ (cookie notice)

- **File:Line Evidence:** lib/analytics.ts:24-31,43-48,69-72; resources/content/legal/privacy-policy.md:17; components/shell/CookieBanner.tsx:52-62; nmc-audit/evidence/analytics-source-test.json

- **Quoted Evidence:** URL cleaning: 'if (k.startsWith("utm_")) keep.set(k, v)'; payload: page_path: window.location.pathname; notice: 'No ads, no health data'; policy: 'This is anonymous and never includes health information'.

- **Why It Is A Problem:** Unrestricted campaign values can contain identifiers and condition-page paths reveal health-related browsing interests, so the implementation does not support an absolute promise of anonymous, health-information-free measurement.

- **Compliant Alternative / Exact Change:** Before enabling GA, remove arbitrary query values from measurement and use only a controlled set of non-personal campaign codes if needed; do not collect condition-specific paths/titles, full referrers, outbound WhatsApp messages or booking fields. Audit vendor automatic/enhanced measurement as well as custom events. Low-risk option: keep optional GA disabled until that configuration is verified. Replace cookie copy with 'We use essential storage to run the site. If you choose optional analytics, it helps us understand website use. You can decline or change your choice in Cookie settings.' Replace the anonymous claim with 'If enabled with your permission, optional analytics collects limited technical and usage information. It is not used for advertising. Appointment-form fields are not included in our custom analytics events.' Publish this only after confirming those operational statements. The fact of browsing a condition page is not proof that the visitor has that condition; no ad-platform disclosure is asserted here.

- **SEO/AEO Impact:** Searchable health content stays intact. Use aggregated, non-sensitive site reporting rather than individual health-topic attribution; do not sacrifice privacy for campaign granularity.

- **Client Input Needed:** GA enhanced-measurement settings, campaign naming rules, processor/retention settings and confirmation that no advertising linkage is enabled.

- **Effort (S/M/L):** M

#### NMC-013 - The missing-email-key fallback writes full appointment details into server logs

- Severity: **MEDIUM**

- **Applicable Checks:** C12

- **Clause / Control:** 7.6 to the extent applicable/in force

- **Evidence Status:** Confirmed reachable logging branch; actual activation/log contents not inspected

- **Preview URL(s):** https://drjames.vercel.app/contact/ (server action implementation)

- **File:Line Evidence:** app/actions/booking.ts:131-132,184-192; lib/booking.ts:100-116

- **Quoted Evidence:** console.warn('[booking] RESEND_API_KEY not set, request not emailed.\n' + mail.text); mail rows include 'Patient name', 'Mobile', 'Age', 'Guardian' and appointment details.

- **Why It Is A Problem:** The fallback has no development-only guard and serializes personal appointment data to logging infrastructure if the email key is absent, contrary to the requested no-personal-data-in-logs control.

- **Compliant Alternative / Exact Change:** Remove mail.text and all submitted values from log messages. If email delivery is not configured, return a neutral failure with the existing phone/WhatsApp options instead of logging personal information and showing success. Allow only a generic operational error code or random non-personal correlation identifier in logs. Confirm that error reporting also redacts request bodies/provider payloads. Do not submit real patient details to test this path; use isolated synthetic tests.

- **SEO/AEO Impact:** No impact on public search content. A truthful booking failure is preferable to a false successful submission and an unnecessary personal-data copy.

- **Client Input Needed:** Deployment owner confirms email configuration, logging access/retention and redaction. No secrets, inboxes, existing logs or submissions were accessed, and no real leak is claimed.

- **Effort (S/M/L):** S

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
