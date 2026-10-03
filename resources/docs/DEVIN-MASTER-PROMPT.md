# Build drjamesp.com: master prompt for the coding agent

Project: a premium personal website for **Dr. James Kumar Pallivathukkal**, Specialist in Internal Medicine and Diabetes, Head of Internal Medicine and Head of Quality Control at Badr Al Samaa Royal Hospital, Muscat, Oman.
Agency: Automize Media. Repository: `helloautomize-cell/drjames-website-overhaul`.
Stack: Next.js (App Router, latest stable), TypeScript strict, Tailwind CSS v4, deployed on Vercel.

You are a senior front-end engineer and a senior product designer in one person. **Design quality and UX are the most important outcome of this project.** A patient who opens the site must feel, within three seconds, that this is a senior, trustworthy physician, and must be able to book in two taps. Code quality matters, but a correct site that looks like a template is a failed project.

Read this whole file before you write any code. It is long on purpose. Every rule here came from an approved design or a client answer.

---

## 0. How you work

### 0.1 Ground rules

1. **The kit is the source of truth.** Everything you need is in `resources/` (section 1). Never invent facts about Dr. James: no qualifications, years, awards, hospital services, prices or quotes that are not in `resources/docs/`. Where a fact is missing, write `[CONFIRM: what is missing]` and keep going.
2. **The style guide wins for visuals.** `resources/reference/dr-james-styleguide.html` is the client-approved visual reference. Open it in a browser and study every section, including hover, tap and motion states. Match it. Where this prompt and the style guide disagree on a visual detail, the style guide wins. Where they disagree on a rule (compliance, accessibility, content), this prompt wins.
3. **Work in phases** (section 9). One branch and one pull request per phase. Each PR has a Vercel preview, screenshots at 390, 768, 1024 and 1440 px wide, and the phase report (section 9.9). **Stop after each phase and wait for the reviewer to comment "approved" on the PR.** Do not start the next phase before that. Do not merge to `main` yourself.
4. **Never ask the client for treatment details** (protocols, drug names, machine models). Use the generic true lines in section 6.4.
5. **When unsure, choose the more restrained, more premium option**, write down the choice in the PR description, and keep going. Ask only when a choice changes a fact, a legal point or an approved design.
6. **No em dashes or en dashes anywhere** in UI copy, metadata or JSON-LD. Use "to" for ranges ("8:30 am to 9 pm") and commas or full stops elsewhere. A build check enforces this (section 8.4).
7. Commit messages and code comments are plain and neutral. Never mention AI tools, prompts or agents in code, comments, commits, the README or anything served to the public.

### 0.2 Start-of-project checklist (do this first, report it in PR #1)

- Confirm that every path in section 1 exists and list them. If any is missing, **stop and say which**. Do not substitute another file.
- Open the style guide at 1440 px and 390 px and write a short list of every component you see. This list becomes the checklist for `/styleguide` (Phase 1).
- Read `resources/docs/client-answers.md` (the client's answers, including the Answers log) and `resources/docs/site-content.md` (facts and live-site problems).

---

## 1. The kit (already in the repository)

```
resources/
  docs/
    DEVIN-MASTER-PROMPT.md       this file
    client-answers.md            intake questions, client answers and the open list
    site-content.md              verified facts, NAP, timeline, problems on the old site
    old-site-text.md             full text of the 9 old pages, including the 3 blog posts
    old-urls.txt                 every old URL, for redirects
  reference/
    dr-james-styleguide.html     approved visual reference (self-contained, open in a browser)
  brand/logo/
    dr-james-logo-horizontal.svg         header, documents
    dr-james-logo-horizontal-white.svg   footer, navy surfaces
    dr-james-logo-stacked.svg            About page, print, OG images
    dr-james-logo-stacked-white.svg
    dr-james-mark.svg                    app icon, small uses
    dr-james-mark-white.svg              hero cube top face
  images/_source/
    IMAGE-GUIDE.md                       what each photo is for, and what is not allowed
    (the photos listed in IMAGE-GUIDE.md)
```

Never edit anything inside `resources/`. The app lives next to it.

---

## 2. Facts you may use (single source: `lib/site-config.ts`)

Put every fact below in `lib/site-config.ts` and read it from there everywhere. Never hard-code a phone number, address or year in a component.

| Field | Value |
|---|---|
| Full name | Dr. James Kumar Pallivathukkal |
| Short name | Dr. James (logo: "Dr. James Pallivathukkal") |
| Title line | Specialist in Internal Medicine and Diabetes |
| Role | Head of Internal Medicine and Head of Quality Control, Badr Al Samaa Royal Hospital, Muscat |
| Committees | Ethics Committee, Infection Control Committee, Pharmacy Council (hospital) |
| Experience | 23 years in medicine (since 2002), 15 years in Oman. Compute years from 2002 and 2011 at build time so the numbers never go stale. |
| Training | Medical degree, Vinayaka Missions Kirupananda Variyar Medical College, Salem, 2002 (`[CONFIRM: MBBS wording]`); MD Internal Medicine, Manipal, 2007; Postgraduate Diploma in Diabetes, Cardiff University, 2012; MSc Diabetes, University of South Wales (`[CONFIRM: year]`); MBA Hospital Management, Vinayaka Missions University (`[CONFIRM: year]`); DBA (`[CONFIRM: university, year]`) |
| Career | 2007 to 2012 Specialist Physician, MBBM Hospital, Kothamangalam, Kerala (clinical lead, ICU and ER). 2012 to 2022 Internal Medicine Specialist, Atlas-NMC Hospital, Muscat (led ICU and COVID-19 operations across three hospitals). 2022 to now, Head of Internal Medicine and Head of Quality Control, Badr Al Samaa Royal Hospital. |
| Award | "Associated with a Guinness World Records achievement for maximum diabetes patient screening at Badr Al Samaa Royal Hospital, 2025." Use this exact wording. Never "holds a world record". |
| His words | "Every patient deserves not only the right treatment but also the right understanding of their health. My goal is to empower patients through knowledge, prevention, and personalized care so they can live healthier and more fulfilling lives." (keep the quote verbatim, it is his) |
| Address | Badr Al Samaa Royal Hospital, Al Ghubrah Street, Muscat 133, Oman. Plus code HCP6+M8F. |
| Google Maps | https://maps.app.goo.gl/buQWhCo2fTABnAGT9 |
| Phone and WhatsApp | +968 9751 0975 (`tel:+96897510975`, `https://wa.me/96897510975`) |
| Email | omanjamesp@gmail.com (show obfuscated; forms do not send from this address, see 7.3) |
| Emergency | Oman emergency number **9999** |
| Consultation hours | `[CONFIRM]` The old site conflicts. Use "Saturday to Thursday, 8:30 am to 9 pm; Friday closed" as the placeholder, with the chip. |
| MOH licence | `[CONFIRM: number]` |
| Languages | `[CONFIRM]` |
| Time zone | Asia/Muscat (UTC+4) |

The old site contains demo leftovers (a New York address, `(000) 000-000-0000`, `medizco@gmail.com`, an Indian `tel:` link, lorem ipsum, stranger testimonials, partner logos that are not his, "200K+ patients" counters, AI service images). **None of it may appear on the new site.**

---

## 3. Design system

### 3.1 The feeling

Calm, senior, precise, warm. Think of a top private physician's practice in the Gulf: white space, deep navy and teal from his logo, one warm note of frankincense sand, crisp type, real photographs of the real doctor, and motion that feels engineered rather than decorative. Nothing loud, nothing cute, nothing that looks like a theme.

**The premium bar.** Every screen must pass all of these:
- Generous, consistent spacing on an 8 px grid. Nothing touches anything it should not touch.
- One clear focal point per viewport and one primary action.
- Type with real hierarchy: big confident headings, quiet readable body, small uppercase eyebrows.
- Real photography of Dr. James, carefully cropped, never stretched, never with text on a face.
- Hairline details (1 px sand or line-colour rules, inset frames) instead of heavy borders and heavy shadows.
- Motion that is short, eased, purposeful and stops. Nothing loops forever except the slow marquee and the hero cube, both pausable.
- Every interactive element has hover, focus-visible, active and disabled states that look designed.
- Mobile is designed, not squeezed: thumb-reachable actions, swipe rows, nothing wider than the screen.

**Anti-patterns that fail review:** stock or AI medical imagery, line icons inside empty arch "windows", testimonials or star ratings, gradient overload (more than one gradient surface per viewport), drop shadows darker than the tokens, centred paragraphs longer than 2 lines, Title Case headings, emojis, exclamation marks, carousels with no pause control, layout shift, text below 17 px for body copy.

### 3.2 Colour tokens (copy exactly into `app/globals.css` and the Tailwind theme)

```css
:root{
  --primary:#1D6B72;      /* logo teal: buttons, active tab, links. 6.18:1 with white */
  --secondary:#0E2F52;    /* logo navy: Book label, footer, gradient end. 13.57:1 */
  --primary-500:#1A646B;  /* text-safe teal on tints: eyebrows, icons, focus ring */
  --primary-700:#14545A;  /* pressed state */
  --primary-100:#DCEDEE;  /* tabs, chips, icon tiles */
  --primary-50:#F2F8F8;   /* card washes, section tints, info callouts */
  --mist:#A3BBBF;         /* logo silver. DECORATIVE ONLY, never text */
  --sand:#C9A46A;         /* frankincense sand. DECORATIVE ONLY: hairlines, seal rings, sparkles */
  --sand-50:#FBF7F0;      /* warm wash behind credentials only */
  --ink:#10243A;          /* headings and body, 15.72:1. Never pure black */
  --ink-2:#4A5F72;        /* secondary text, 6.62:1 */
  --line:#DFE8EA;         /* hairlines, borders, inactive dots */
  --bg:#FFFFFF;           /* page background, always white */
  --alert:#B8322B;        /* emergency notices only */
  --success:#2F7D5B;      /* form success */
  --wa:#1F8F55;           /* WhatsApp button only */
  --confirm-bg:#FFF3B0; --confirm-fg:#5C4A00; --confirm-b:#C9A800;
  --em-bg:#FCF1F0; --em-b:#EBC0BD; --warn-bg:#FFF8EC; --warn-b:#F1DDB5; --warn-fg:#8A5A00;
  --night:#0B2340;        /* hero ground only */
  --sand-light:#E3C994;   /* accent word and name line on --night only, 9.82:1 */
  --on-dark:#FFFFFF; --on-dark-2:#C8D6DE;
  --grad-brand:linear-gradient(90deg,#1D6B72 0%,#0E2F52 100%);
  --grad-btn:linear-gradient(90deg,#1D6B72,#0E2F52,#1D6B72);
  --grad-bar:linear-gradient(90deg,rgba(29,107,114,.92),rgba(14,47,82,.92));
  --shadow-card:0 1px 2px rgba(16,36,58,.04),0 12px 32px -12px rgba(14,47,82,.18);
  --shadow-hover:0 20px 48px -16px rgba(14,47,82,.28);
  --glass:rgba(255,255,255,.62); --glass-b:rgba(255,255,255,.6);
  --ease:cubic-bezier(.22,1,.36,1);
  color-scheme:light;
}
```

Rules:
- White page everywhere. Tints only for chips, tabs, washes and glows. The navy hero is the **only** dark section on the home page (plus the footer).
- `--grad-brand` only on: primary buttons, the active tab, the Book button and the mobile action bar. At most one gradient surface per viewport.
- Sand and mist are never used for text on white. `--alert` only for emergency notices.
- Light theme only. Do not build a dark mode.
- Add a contrast table to `/styleguide`; every text colour must pass 4.5:1 on its real background, including inside glass.

### 3.3 Typography (locked)

- **Figtree** for everything; **Instrument Serif italic** for at most one accent word per heading (`<em class="accent">`). Load both with `next/font/google`, self-hosted, `display: swap`. Preload only Figtree.
- Do not load an Arabic font yet. An Arabic version is not approved (client answer pending).

| Style | Desktop | Mobile | Weight |
|---|---|---|---|
| Display (hero H1) | 64/68 | 34/40 | 700, letter-spacing -0.02em |
| H1 | 52/58 | 34/40 | 700 |
| H2 | 40/48 | 28/34 | 650 |
| H3 | 22/30 | 20/28 | 600 |
| Eyebrow | 13/16 | 12/16 | 600, uppercase, 0.14em, e.g. "01 / WHY DR. JAMES" |
| Body large | 19/30 | 18/28 | 400 |
| Body | 17/28 | 17/27 | 400 (never smaller) |
| Small | 14/20 | 14/20 | 500 |

Headings `text-wrap: balance`; paragraphs `text-wrap: pretty`; text measure 68ch; sentence case headings.

### 3.4 Space, radius, shadow, glass

- 8 px grid; container 1240 px with 24 px side padding (16 px under 400 px).
- Section padding 96 px desktop, 56 px mobile; 40 px from section heading to content.
- Radius: cards 20, buttons 12, chips pill, dropdown 16, arch `999px 999px 24px 24px`.
- Shadows: only `--shadow-card` and `--shadow-hover`.
- Glass: `background: var(--glass); backdrop-filter: blur(18px) saturate(140%); border: 1px solid var(--glass-b); box-shadow: var(--shadow-card), inset 0 1px 0 rgba(255,255,255,.6)`, with an `@supports not (backdrop-filter: blur(1px))` fallback at 0.94 opacity. Glass only over glows, tints or photos, never over flat white. At most about 12 blurred elements per viewport.

### 3.5 Signature shapes

- **The Omani arch** from the logo: the portrait face of the hero cube, sand hairlines, the doctor card photo frame.
- **The medallion bezel** with sand ticks: service badges and credential seals.
- **The 8-point star** from the logo medallion, used sparingly as a tiny ornament (section dividers, the cube top face). Always 8 points, never 6.

### 3.6 Logo

- Use only the SVGs in `resources/brand/logo/`. Never the old PNG.
- Inline the SVGs as React components (`components/brand/Logo.tsx`) so the wordmark renders in Figtree from `next/font`. Replace the `font-family` attribute with the Figtree CSS variable.
- The white cut-outs in the mark use `var(--logo-ground, #fff)` (colour version) or `var(--logo-ground, #0E2F52)` (white version). Set `--logo-ground` to the surface colour behind the logo.
- Header: horizontal logo, 54 px tall desktop, 44 px mobile. Footer: white horizontal, max 330 px wide. Clear space on every side equal to the medallion height. Never stretch, recolour, add effects or put the colour logo on navy.
- Favicon and app icons: generate from `dr-james-mark.svg` (512, 192, 180, 32). For 32 px and 16 px, make a simplified mark (arch, star and rod only) and show it on `/styleguide` for approval.

### 3.7 Motion (all of it respects `prefers-reduced-motion`)

- **Reveal:** fade up 16 px, 500 ms, `var(--ease)`, once, 60 ms stagger. Content is visible without JS (no-JS and screenshots safe). Never on the LCP element.
- **Card hover:** lift 4 to 6 px, `--shadow-hover`, arrow slides 3 to 4 px, 200 ms. On touch, `:active`.
- **Buttons:** gradient `background-size: 200%` position shift plus a 1 px lift; pressed scale .98.
- **Carousels:** Embla. Drag, snap, momentum, arrows on desktop, pill dots (active dot widens to 26 px) or a progress bar for more than 5 items, keyboard arrows, auto-play every 4.5 s, loop, pause on hover, focus, touch and hidden tab, resume 6 s after the last interaction, a visible pause/play button (WCAG 2.2.2), off under reduced motion. Edge fade 8% via `mask-image`, never on the side at the start or end.
- **Marquee:** CSS translate loop, two rows in opposite directions, paused on hover, focus and touch; static and wrapped under reduced motion; one row on mobile.
- **Sticky sections:** `position: sticky`, never `background-attachment: fixed`.
- No Framer Motion unless the JS budget allows it (section 8.3). CSS transitions plus a small IntersectionObserver hook are enough.

---

## 4. Components (build all of them on `/styleguide` first)

Every component below is in the style guide HTML. Match it, then make it production-grade: typed props, accessible, responsive, no layout shift.

### 4.1 BookButton (the main action)
Two-part button: 56 px teal icon block (calendar icon) plus navy label "Book Appointment", 52 px tall, single line, radius 12, `--shadow-card`. Hover: gradient shift and lift. Mobile label "Book now". Links to `/contact/#book`.

### 4.2 Hero: the credential cube (approved, the signature of the site)
- **Ground:** full-width `--night`, two faint arches behind the cube, and the logo's ECG line in sand drawn once on load (SVG stroke-dashoffset, 1.6 s).
- **Left column (desktop):** name signature line in `--sand-light` ("Dr. James Kumar Pallivathukkal"), eyebrow "Internal Medicine and Diabetes · Muscat, Oman", H1 "Many conditions. One *clear* plan." (accent word in Instrument Serif italic, `--sand-light`), sub "Head of Internal Medicine at Badr Al Samaa Royal Hospital. Diabetes, blood pressure, heart risk, lungs, kidneys and liver, looked after together by one senior physician.", then BookButton + "Call +968 9751 0975" ghost button + WhatsApp icon button, then three fact figures ("23+ years in medicine", "15 years in Oman", "2 UK diabetes qualifications"), then a doctor chip ("Physician-led care", his avatar, "Dr. James Kumar Pallivathukkal, MD (Internal Medicine)").
- **The cube (right):** CSS 3D (`transform-style: preserve-3d`, faces at `translateZ(var(--h))`), 360 px desktop, 248 px tablet, 210 px mobile. Four designed faces, not raw photos:
  1. **Portrait** (first, and the LCP image): his white-coat cutout inside the Omani arch with a sand hairline, name and "Head of Internal Medicine" plate.
  2. **Training:** MD Internal Medicine, Manipal, 2007; MSc Diabetes, University of South Wales; PG Dip Diabetes, Cardiff University; MBA Hospital Management.
  3. **Experience:** "23+ years in medicine, since 2002"; "15 yrs caring for patients in Oman"; "ICU and ER lead, MBBM Hospital, Kerala"; "COVID-19 ICU operations lead, Muscat".
  4. **Leadership:** "Head of Internal Medicine", "Head of Quality Control", "Badr Al Samaa Royal Hospital, Muscat", "Ethics, Infection Control and Pharmacy committees".
  Top face: white logo mark on a teal-to-navy gradient. Faces have frosted navy glass, a sand hairline inset frame, light edges, a sheen sweep as each face arrives, and a slow sand orbit ring on the floor with a soft reflection.
- **Behaviour:** a quarter turn every 4 s with a 1.2 s ease and a 6 px idle float. Pauses on hover, focus, drag and hidden tab. Pointer drag and arrow keys turn it. Four tabs below the cube ("Portrait", "Training", "Experience", "Leadership") with a sliding indicator jump to a face; they are the accessible control (`role="tablist"`), and all face text is real HTML in the initial render (good for search and screen readers). Under reduced motion: no auto-turn, tabs switch faces instantly.
- **Mobile (390 x 844, everything above the fold):** eyebrow, H1 at 34 px, cube at 210 px with its tabs, then ONE row with "Book now" + call icon + WhatsApp icon, then one short line ("Internal medicine and diabetes care at Badr Al Samaa Royal Hospital, Muscat."). Name line, doctor chip and long sub are hidden on mobile; the facts follow below the fold.
- Preload only the portrait image. The hero must not shift layout (CLS 0).

### 4.3 Find care by concern
One row of plain-language pills under the hero, each with a small line icon, linking to the matching condition page: "High sugar or diabetes", "Blood pressure or heart", "Cough or breathlessness", "Snoring or tiredness", "Weight concerns", "A full check-up", "Care for a parent". Horizontal scroll on mobile.

### 4.4 Glass "Why" cards
Six glass cards over a teal tint with a sand glow (so the blur reads): icon tile, title, two lines. Facts only, each one verifiable from section 2. Mobile: self-moving swipe carousel.

### 4.5 ServiceGlassCard and service badges (signature component)
- Arch-topped glass card (240 px desktop, 200 px mobile), title and one line below the arch, a 40 px gradient arrow button overlapping the arch bottom by half.
- Inside the arch: two blurred blobs (teal 22%, sand 30%, `blur(28px)`) drifting in opposite directions (translate about 12 px, scale 1 to 1.08, 9 s alternate), animated only while on screen. A different blob pair per service group.
- The **illustrated badge** (112 px) sits free on the glow. **Never put a line icon inside an empty arch "window".** That look was rejected by the client.
- Hover: orbit ring (2 px conic gradient teal, sand, navy, masked to a ring) fades in and rotates once over 1.2 s; badge scales 1.06 and lifts 3 px; coin turn `rotateY(360deg)` once over .9 s with `perspective: 600px`; a diagonal sheen sweeps once in 600 ms; card lifts 6 px and blobs gain 10% opacity. Touch: the ring spins once on first scroll into view. Reduced motion: ring fade and glow only. Never loop.
- Badges: until the client supplies the 18 illustrated PNG badges, use the placeholder medallion badges from the style guide (teal-to-navy line art in a medallion bezel with sand ticks). Keep them in `components/badges/` behind one `ServiceBadge` component so the PNGs can drop in later. `lib/service-badges.ts` maps service slug to badge slug; never show the same badge on two adjacent cards.
- Badge prompt for the image tool (for the client, also shown on `/styleguide`): "Circular medical service badge, clean line-art illustration of [SUBJECT], gradient strokes from deep teal #1D6B72 to navy #0E2F52, with small soft sand-gold #C9A46A plus-sign sparkles, centred on a plain off-white background #F6FAFA, no text, no logos, no brand names, no red cross, flat premium style, 1024x1024."
- Badge pre-treatment script (section 5.2): off-white knockout to transparency, trim, square with 4% padding, 512 and 256 px PNG and WebP.

### 4.6 Service tabs + ServiceCarousel
Five tabs (single scrollable row on mobile), an intro line per tab, then a carousel of ServiceGlassCards, plus "View all conditions". Groups and copy:

| Tab | Intro | Cards (title, one line) |
|---|---|---|
| Diabetes and metabolism | From a first high sugar report to long-term care, with checks that protect your heart, kidneys and eyes. | Diabetes and prediabetes (Early diagnosis and steady control); High cholesterol (Lower your heart risk); Weight management (A medical plan for weight); Thyroid disorders (Under and overactive thyroid) |
| Heart and blood pressure | For high blood pressure and for people who want to know their heart risk. | High blood pressure (Monitoring and a plan to reach target); Heart risk assessment (Find and reduce risk early) |
| Lungs, sleep and infections | Breathing problems, chest infections, fevers and sleep, assessed and treated by a physician. | Asthma and breathing (Wheeze, cough and breathlessness); Chest infections and pneumonia (Timely diagnosis and treatment); Sleep apnea and sleep problems (Snoring, insomnia, daytime tiredness); Allergies (Find the trigger, ease symptoms); Fevers and infections (Find the cause, treat it right) |
| Kidney, liver and gut | Common problems of the kidneys, liver and gut, found early and managed well. | Kidney problems (Early checks and protection); Fatty liver (Find the cause, protect the liver); Digestive problems (Acidity, bloating, bowel changes) |
| Whole-person care | Care for older adults with several conditions, and check-ups planned by the doctor. | Care for older adults (Several conditions, one plan); Preventive check-ups (Planned after a consultation); Joint pain and arthritis (Ease pain, keep moving); Anaemia (Why is haemoglobin low) |

Do not use specialty labels such as "Cardiology", "Neurology", "Endocrinology" or "Rheumatology". He is an internist; these imply qualifications he does not formally hold.

### 4.7 StepTracker: "Your first visit, step by step"
Six steps: Book; Arrive and register; Consultation; Tests if needed; Your plan; Follow-up. Copy is in the style guide (reuse it; the "Book" step keeps `Reply time: [CONFIRM]`). Desktop: sticky left column with the big step number, the current step name and a vertical rail (done = `--primary-500`, current = `--primary` with a halo ring, future = `--line`); right column steps with hairline dividers, inactive steps at 72% opacity (still 4.5:1). Driven by IntersectionObserver and click, with a sticky photo per step where a usable photo exists. Mobile: swipe slides (16:10 image or designed tint, "Step n of 6", title, one line, progress bar).

### 4.8 Doctor feature card ("Meet Dr. James")
One doctor, so one wide feature card: lobby photo (`dr-james-lobby`) in the arch frame, name, qualifications on at most two lines, role, experience chip, language chips (`[CONFIRM]`), "Book with Dr. James" + "View profile". His quote as a pull quote on the profile page. **No star ratings.**

### 4.9 Conditions marquee
Two rows of condition pills (small line icon + name, linked) scrolling slowly in opposite directions. Reduced motion: static, wrapped. Mobile: one row.

### 4.10 Health Library cards and centred carousel
Three cards with **designed covers** (soft teal or sand gradient plus the post's badge; never photos with text, never video thumbnails), category chip, title, "Written by Dr. James · date · n min read" (nowrap). Centred carousel: side cards `scale(.92) rotate(-1deg)` at 0.5 opacity.

### 4.11 FAQ accordion
Native `<details>`/`<summary>` styled as in the style guide, FAQPage JSON-LD only where the FAQs are visible. Home FAQs (copy from the style guide): where he sees patients; fasting before the visit; what to bring; several conditions at once.

### 4.12 Callouts
Emergency (`--em-bg`, alert icon): "When to get help straight away. Call 9999 or go to the nearest emergency department if you have chest pain or pressure, sudden breathlessness, fainting, weakness on one side of the body, slurred speech, confusion, a seizure, or very high or very low sugar with drowsiness." Info (`--primary-50`). Warning (`--warn-bg`). Reviewer box: "Medically reviewed by Dr. James Kumar Pallivathukkal, MD (Internal Medicine) · Oman MOH licence [CONFIRM] · Last reviewed [date]".

### 4.13 `[CONFIRM]` chip
`<Confirm>` component: a yellow chip (`--confirm-*` tokens) shown in development and preview builds, **hidden in production**, and every occurrence is listed by `npm run launch-check`, which fails while any remain.

---

## 5. Images

### 5.1 What you have
Read `resources/images/_source/IMAGE-GUIDE.md`. In short:
- **Use:** white-coat cutout (hero portrait), hospital lobby portrait (doctor card, profile hero), certificate photo (training section), desk photo (already cropped so no patient is in frame; consultation step), Guinness World Records photo (awards, About page).
- **Use only after written consent:** the hospital team photo (staff faces).
- **Evidence only, never decoration:** the certificate scans.
- **Never use:** the old site's AI service images and AI posters, the theme demo images and logos, the consultation photo with a patient in frame (only the cropped version is in the kit), family photos, drug-brand banners.
- All online copies are small (the white-coat cutout is 556 x 770). The client has been asked for camera originals. Build so a higher-resolution file can replace each image with no code change.

### 5.2 `scripts/process-images.mjs` (sharp)
- Read `resources/images/_source/`, write `public/images/{brand,doctor,clinic,awards,blog,badges}/` with kebab-case names. Never upscale. JPEG q85 or PNG with alpha. `next/image` serves AVIF and WebP (`images.formats: ['image/avif','image/webp']`).
- Treatments only where IMAGE-GUIDE.md says: crop, light exposure or contrast, colour cast fix. Never "beautify" or change his face. No AI enhancement.
- Strip EXIF, GPS and camera metadata; keep sRGB.
- Doctor set: `dr-james-hero.png` (cutout, transparent, trimmed), `dr-james-portrait.jpg` (4:5 card crop), `dr-james-avatar.jpg` (square, circle-safe).
- Write `public/images/alt-text.json` (factual alt text for every image) and `public/images/_todo.md` (images still needed, low-resolution warnings).

### 5.3 Art direction
- Photos are cropped with intent: eyes on the upper third line, consistent headroom across all portrait crops, never cropped at a joint.
- No text over faces. Labels sit beside or below photos, or on glass placed off the face.
- Where no real photo exists (most condition pages), use designed surfaces: tints, glows, the badge, the arch. Never stock photos of strangers.

---

## 6. Content

### 6.1 Voice
Plain, warm, precise. Write for a 60-year-old patient and a worried adult child at once. Short sentences, "we" for the practice and "you" for the patient, explain each medical term the first time. Answer first, then detail. British spelling (diagnose, anaemia, organise), because that is what patients in Oman read in English.

### 6.2 Never write (AI-tone and compliance blacklist)
- delve, navigate (as a metaphor), embark, realm, tapestry, testament, seamless, comprehensive, holistic, robust, leverage, empower (except inside his verbatim quote), elevate, unlock, tailored, cutting-edge, state-of-the-art, world-class, top-notch, game-changer, peace of mind, rest assured, one-stop solution
- "it's important to note", "in today's fast-paced world", "whether you're … or …", "not just … but …", "look no further"
- Sentences starting with furthermore, moreover, additionally
- Rhetorical-question headings, exclamation marks, emojis, Title Case headings, em or en dashes
- best, No. 1, leading, top, guaranteed, cure, permanent, 100%, miracle, reverse diabetes, insulin-free

### 6.3 Compliance (Oman, medical), built in from day one
- Health advertising in Oman is regulated by the Ministry of Health. The client confirmed (3 Oct 2026) that no hospital or ministry approval is needed for this site, but every rule below still applies, because it is what keeps the site safe.
- **Always:** factual information only (name, qualifications, role, services, hours, address); the emergency line 9999 in the utility bar, footer, booking form, thank-you page and every symptom-related page; a reviewer box and last-reviewed date on every medical page; unticked consent boxes; analytics only after cookie consent.
- **Never:** testimonials, review quotes, star ratings, patient counts as boasts, before/after, price offers, discounts, drug or device brand names, cure claims, comparisons with other doctors, specialty claims he does not hold, partner or award logos that are not his, `AggregateRating` or `Review` schema, naming other hospitals as referral partners.
- **Personal data:** Oman's Personal Data Protection Law (Royal Decree 6/2022) and its Executive Regulations apply; health data is a special category. Check the current requirements at project start and note them in the PR. Design rule that follows from it: **the booking form must not collect medical details.** The "reason for visit" field is a short neutral list (New consultation, Follow-up, Check-up, Second opinion, Other), and the form says "Please do not include medical details here. Dr. James will ask about your health at your visit."
- The old WordPress site holds old form submissions. **Do not migrate any form data.** This site has no database.

### 6.4 Generic true lines (use instead of treatment details)
- "Dr. James decides the right tests and treatment for you after examining you."
- Check-ups: "Each check-up is planned by Dr. James after a consultation, based on your conditions and symptoms, so no test is repeated or wasted."
- Hospital services: "Tests, imaging and pharmacy are available at Badr Al Samaa Royal Hospital" only with `[CONFIRM: which facilities]` until the client confirms them.

### 6.5 Site map and URLs (`trailingSlash: true`)

| Group | Pages |
|---|---|
| Core | `/` · `/about-dr-james/` (doctor profile) · `/contact/` (with `#book`) · `/your-visit/` · `/faqs/` |
| Conditions | `/conditions/` hub, plus 18 pages: `/conditions/diabetes-and-prediabetes/`, `high-cholesterol`, `weight-management`, `thyroid-disorders`, `high-blood-pressure`, `heart-risk-assessment`, `asthma-and-breathing`, `chest-infections-and-pneumonia`, `sleep-apnea`, `allergies`, `fevers-and-infections`, `kidney-problems`, `fatty-liver`, `digestive-problems`, `care-for-older-adults`, `preventive-check-ups`, `joint-pain-and-arthritis`, `anaemia` |
| Health Library | `/health-library/` plus the 3 rewritten old posts: `heart-disease-warning-signs`, `sleep-disorders`, `common-digestive-problems` |
| Legal (7) | `/privacy-policy/`, `/terms-of-use/`, `/medical-disclaimer/`, `/editorial-policy/` (editorial and medical review, including how AI-assisted drafting is reviewed by the doctor), `/patient-rights/`, `/appointments-and-cancellations/`, `/accessibility/` |
| Utility | `/thank-you/` (noindex), branded 404, `/styleguide/` (noindex, removed or protected at launch) |

### 6.6 Page templates
- **Condition page:** breadcrumb; compact hero with the badge, H1, a 2 to 3 sentence answer-first intro in real HTML, Book + Call; "Who should see a physician about this" (bullets); "What happens at your visit"; "How to prepare"; "After your visit"; "When to get help straight away" emergency callout where relevant; 4 to 6 FAQs (40 to 80 word answers); reviewer box; related conditions carousel; 1 related post; CTA band. Desktop: optional sticky table of contents with a small Book card. Frontmatter: title (max 60 characters), description (max 155), badge, reviewer, lastReviewed, faqs, related.
- **Doctor profile (`/about-dr-james/`):** split hero (lobby portrait in the arch + key-facts glass card: qualifications, experience, languages, MOH licence); About; education and career timeline (vertical, with sand medallion dots); "Roles and committees"; awards (Guinness photo and exact wording); "How Dr. James works" with his quote as a pull quote and `[CONFIRM: 3 to 5 principles in his words]`; non-clickable chip groups of the conditions he looks after (desktop: all; mobile: 6 per group + "Show all (n)"); Book CTA. Physician JSON-LD.
- **Contact / Book:** the form (section 7.3) beside a glass info card stack (address, phone and WhatsApp, hours, emergency) over a soft photo or tint; "Show map" click-to-load Google Map; Get directions link.
- **Your visit:** where to go inside the hospital (`[CONFIRM: floor, OPD room]`), what to bring, fasting guidance, parking and access (`[CONFIRM]`, only what is true), follow-ups.
- **Health Library list:** category chips, newest first, designed covers, author avatar, date, reading time. **Post:** title, author chip, "Published · Updated", an "In brief" box, body at 68ch, callouts, FAQs, reviewer box, related conditions. The old posts carry theme demo dates (2019), so publish the rewritten posts with the launch date and `[CONFIRM: publish date]`. The old sleep post repeats the heart post at the top; remove that duplicate. Remove unsourced statistics.
- **Legal:** left table of contents, last-updated date from `site-config.ts` (`legalLastUpdated`, `[CONFIRM]`), print styles. Write them for Oman: site operator `[CONFIRM: Dr James personally or a company]`, privacy contact `[CONFIRM]`, retention of enquiries 12 months by default.
- **Thank-you:** confirmation, "We will reply by WhatsApp or phone. Reply time: [CONFIRM]", the emergency line, links back.
- **404:** on brand, with the search for a condition and links to the main pages.

### 6.7 Where the words come from
- Home, components and FAQs: reuse the exact copy in the style guide.
- Doctor facts: section 2 only.
- Condition pages and legal pages: draft them yourself in `resources/content/` (one Markdown file per page, Zod-validated frontmatter), strictly following 6.1 to 6.4, general and educational, with no treatment protocols or drug names. Every medical page is marked `status: draft-for-doctor-review` in frontmatter and shows the reviewer box with `Last reviewed [CONFIRM]`. Dr. James must approve each one before launch.

---

## 7. Site shell, forms and integrations

### 7.1 Shell
- **Utility bar (desktop):** thin white bar with a hairline. Left: "Plan your visit · Health Library". Centre: clock icon + consultation hours with `[CONFIRM]`. Right: phone link, then "Medical emergency? Call 9999" in `--alert`.
- **Header:** sticky white, becomes glass on scroll, 88 px to 68 px. Logo left; menus "Conditions", "Your visit", "About Dr. James", "Health Library"; BookButton right.
- **Desktop dropdowns:** compact, solid white (98%), radius 16, light shadow, explicit CSS grid per panel (Conditions: five columns of the tab groups plus a 220 px doctor mini card with 48 px photo, name, one line and "View profile"). Hover intent 120 ms; keyboard and Esc work. Build with Radix NavigationMenu, but set the panel widths explicitly (the Radix viewport width bug).
- **Mobile menu:** full-screen white sheet, accordion groups all collapsed, 48 px rows at 17 px, a fixed footer with Book and Call and one hours line.
- **Mobile action bar (below 1024 px, every page):** `--grad-bar` under glass, top corners 16 px, safe-area padding. Three buttons (20 px icon over a 13 px / 600 label): **Book now**, **Call** (opens a sheet with the number and, when confirmed, the hospital line), **WhatsApp** (pre-filled message built from the page title, `lib/whatsapp.ts`). Pressed: scale .97, opacity .85. Hidden while typing in a form and on the thank-you page. `main` gets 80 px bottom padding.
- **Floating WhatsApp (desktop only):** 56 px `--wa` circle, bottom right.
- **Footer:** navy (`--secondary`), white horizontal logo, address, hours, phone and WhatsApp, obfuscated email, Get directions, "Medical emergency? Call 9999", link columns (Conditions, Patients, Legal 7), "Cookie settings", and "© [year] Dr. James Kumar Pallivathukkal. Health information on this site is for education and does not replace a consultation." Mobile: link columns as accordions, contact block open.
- **Cookie banner:** small glass card bottom-left (above the mobile bar): essential vs analytics, Accept / Decline / Settings.
- **Breadcrumbs** on every inner page, with BreadcrumbList JSON-LD.

### 7.2 Single sources
`lib/site-config.ts` (NAP, hours, phones, email, years, Maps URL, service area, `legalLastUpdated`, the confirm list), `lib/nav.ts`, `lib/conditions.ts` (groups, slugs, short lines, badges), `lib/service-badges.ts`, `lib/booking-context.ts` (page to reason prefill), `lib/whatsapp.ts`, `lib/consent.ts`.

### 7.3 Appointment form (Server Action, no database)
- Fields: patient name; mobile (normalise to +968 and 8 digits; also accept international numbers with a country code for visitors); age + Years/Months; reason (the neutral list in 6.3, prefilled from the page); preferred date (today to +60 days, Friday marked closed `[CONFIRM]`) and time of day (Morning, Afternoon, Evening, derived from the hours in `site-config.ts`); under-18 checkbox (guardian name required, guardian consent text, blocks submit if age under 18 and the box is unticked); consent checkbox (unticked) with the exact consent text; the line "Please do not include medical details here."
- Spam: honeypot + 3 s minimum fill time + Cloudflare Turnstile when keys exist.
- Email: Resend, from a verified address on the clinic domain (`[CONFIRM: domain DNS access]`; never Gmail as sender; add SPF, DKIM and DMARC records, never touch MX). To: the inbox in `site-config.ts`. Body: a field table, `tel:` and `wa.me` links, source page, Muscat time, the exact consent text and timestamp.
- States: an error summary with focus and ARIA; on failure, Call and WhatsApp buttons and the data kept; on success, `/thank-you/` (noindex). Works without JavaScript.

### 7.4 Analytics and consent
GA4 via gtag injected only after Accept, Consent Mode v2 with ad signals always denied. Events: `book_click`, `call_click`, `whatsapp_click`, `directions_click`, `map_load`, `generate_lead` (form_type only). No personal or health data in events; strip query strings except `utm_*`. Vercel Speed Insights (cookieless). Google Maps and any video load only after a click.

---

## 8. Engineering standards

### 8.1 Stack and structure
Next.js App Router (latest stable), TypeScript strict, Tailwind v4 with tokens as CSS variables, Radix primitives (NavigationMenu, Dialog for sheets), Embla Carousel, `next/font`, `next/image`, sharp, Zod, remark and rehype for Markdown. Vercel, functions region `dxb1` (Dubai, nearest to Muscat). ESLint + Prettier. Node LTS.

### 8.2 Accessibility (WCAG 2.2 AA, target Lighthouse 100)
Body at least 17 px; tap targets at least 48 px; visible focus ring (2 px `--primary-500`, 2 px offset); skip link; one H1 per page; landmarks; every carousel and the cube have pause controls and keyboard support; no information by colour alone; `lang="en-OM"`; forms with labels, descriptions and error links.

### 8.3 Performance budgets
Lighthouse mobile (median of 3 runs on the deployed preview): Performance at least 90, Accessibility 100, Best Practices 100, SEO 100 after launch (lower before launch because of noindex). CLS under 0.1, target 0. Home first-load JS at most 230 KB gzipped. Only the hero portrait preloaded. Fonts self-hosted. Maps and video on click. Never `content-visibility: auto` above the fold.

### 8.4 Build checks (fail the build)
- No em or en dashes in rendered HTML or JSON-LD.
- No `lorem`, `TODO`, `medizco`, `example.com`, `New York`, `000-000` in output.
- `npm run launch-check`: lists every `[CONFIRM]`, fails while any remain or while `SITE_INDEXABLE` is false.

### 8.5 Tests (Playwright)
- No nested interactive elements (`a a`, `a button`, `button a` = 0 on every route); cards use the stretched-link pattern.
- No horizontal overflow at 390, 768, 1024 and 1440.
- No non-hero section taller than 1.3 x the viewport on mobile.
- Hero at 390 x 844: H1, cube, Book row and the short line all visible without scrolling.
- Carousels and cube pause on hover and focus and stop under reduced motion.
- Forms: validation, under-18 guardian rule, honeypot, success and failure states, works without JS.
- Consent: zero GA, Maps or YouTube requests before consent or click.
- Mega menu: no overlapping links, panel inside the viewport.

### 8.6 SEO, schema and AI search
- Unique titles and descriptions; self-canonicals; sitemap with `lastModified`; `robots.txt`; OG images per page via `opengraph-image` (stacked logo + navy ground + page title).
- **`SITE_INDEXABLE` switch:** until launch, `X-Robots-Tag: noindex`, meta noindex and `robots.txt Disallow: /` on every host. The vercel.app URL must never be indexed.
- JSON-LD as one `@graph` per page with stable ids: `Physician` (`#dr-james`: medicalSpecialty InternalMedicine, knowsAbout, alumniOf, hasCredential, memberOf, affiliation, knowsLanguage `[CONFIRM]`, address, telephone, openingHoursSpecification), `Hospital` for Badr Al Samaa as `workLocation`/affiliation (name and address only), `WebSite`, `MedicalWebPage` (about, reviewedBy, lastReviewed), `MedicalCondition` on condition pages, `BlogPosting`, `FAQPage` (visible FAQs only), `BreadcrumbList`. **No `AggregateRating` or `Review`.**
- Redirects: 301 every old URL in `resources/docs/old-urls.txt` (`/about/` to `/about-dr-james/`, `/services/` to `/conditions/`, `/appointment/` to `/contact/`, `/blog/` to `/health-library/`, each old post to its new URL, `/category/uncategorized/` and `/author/...` to `/health-library/`); 410 for `/elements/` and `/elements/blog/`. No chains.
- Security headers: HSTS, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options, and a CSP that allows only Google Maps (after click), GA (after consent), Turnstile and Vercel Speed Insights. `poweredByHeader: false`, no production source maps.
- AI search: `/llms.txt` and `/llms-full.txt` generated from content at build time; answer-first intros in real HTML; all tab, FAQ, carousel and cube text present in the initial HTML (check with curl). At launch, `robots.txt` allows Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended and Applebot-Extended.
- `entity-facts.md` in the repo root with the identical NAP, hours and credentials to use on Google Business Profile and other listings.

---

## 9. Phases (one PR each, stop after each)

### 9.1 Phase 1: foundation and `/styleguide`
1. Create the Next.js app at the repo root next to `resources/` without touching it.
2. Tokens (3.2) as CSS variables and Tailwind theme; fonts (3.3); base styles; reduced-motion handling.
3. Logo components (3.6), favicons and the simplified small mark.
4. `scripts/process-images.mjs` (5.2): run it, commit `public/images/`, `alt-text.json`, `_todo.md`.
5. Build `/styleguide` (noindex) with every component in section 4 using real copy: swatches with the contrast table, type scale, all buttons, glass Why cards, service tabs + carousel of ServiceGlassCards with all hover effects, the hero cube (full, working), StepTracker, doctor card, marquee, Health Library carousel, FAQ, callouts, `[CONFIRM]` chip, badge grid (sm 64, md 112, lg 160), line-icon grid, form fields, mobile action bar and menu sheet in a phone frame.
**Acceptance:** screenshots of `/styleguide` and the style guide HTML side by side at 390 and 1440; the cube works by auto-turn, drag, keys and tabs; Lighthouse Accessibility 100 on `/styleguide`; no console errors.

### 9.2 Phase 2: site shell
Utility bar, header with dropdowns, mobile menu sheet, mobile action bar, floating WhatsApp, footer, cookie banner and consent store, breadcrumbs, 404, thank-you shell.
**Acceptance:** keyboard walk-through of the menus (video or step list); mega menu tests; no overflow at all widths; action bar hides while typing.

### 9.3 Phase 3: content pipeline and every page rendering
Markdown content with Zod frontmatter; all routes in 6.5 render with their template (6.6) and drafted copy (6.7); `[CONFIRM]` system and `launch-check`; redirects and 410s; sitemap, robots, `SITE_INDEXABLE`, metadata, JSON-LD.
**Acceptance:** route list with word counts; the launch-check output; curl proof that FAQ and cube text are in the HTML; redirect test table.

### 9.4 Phase 4: home page and templates at full design quality
Home, top to bottom: hero cube (4.2); Find care by concern (4.3); 01 / Why Dr. James (4.4); 02 / Training and career (certificate photo, timeline highlights, sand-wash credential seals); 03 / How Dr. James can help (4.6); 04 / Your first visit (4.7); a visit band (desktop: sticky photo or designed arch panel with a frosted "Visit Dr. James in Al Ghubrah" card and Get directions; mobile: compact card only); 05 / Meet Dr. James (4.8); 07 / Conditions marquee (4.9); 08 / From the Health Library (4.10); 09 / Quick answers (4.11); contact block; CTA band "Ready to talk to a *physician*?" with Book, Call and WhatsApp. Then polish every template (condition, profile, contact, your visit, library, post, legal) to the same level.
**Acceptance:** full-page screenshots at 390 and 1440 for home, one condition page, the profile and contact; mobile home length about 9,000 to 10,000 px at 390 wide; the premium bar (3.1) self-review with a sentence per item.

### 9.5 Phase 5: forms, email and analytics
Form (7.3) end to end on the preview with Resend test keys, Turnstile, consent-gated GA4, Speed Insights, Maps click-to-load.
**Acceptance:** form test matrix (valid, invalid, under 18 with and without guardian, honeypot, JS off, server failure); network log proving no GA or Maps before consent or click.

### 9.6 Phase 6: design polish pass
Go through every page at 390, 768, 1024 and 1440, top to bottom, and fix: alignment to the container, equal card heights, spacing rhythm, orphans and widows, overlaps (labels on faces), clipped text, inactive-state contrast, repeated adjacent badges, carousel motion, hero above the fold, CTA reachability, hours and NAP consistency, stray separators, gaps before the footer, focus states, hover states, loading states.
**Acceptance:** a before/after table of every fix with screenshots.

### 9.7 Phase 7: SEO, performance and launch readiness
Section 8.6 checklist, Lighthouse medians of 3 runs on the preview, the tone sweep (6.2) logged to `tone-cleanup.md`, AI-fingerprint clean-up (no AI mentions, no console logs, no `data-testid` in production, image metadata stripped), `client-inputs-needed.md` generated from the launch-check.
**Acceptance:** all budgets met or explained; launch-check output listing only client inputs.

### 9.8 Launch (only when the reviewer says so)
Domain on Vercel (`[CONFIRM: www or apex; DNS access]`), `SITE_INDEXABLE=true`, robots open to the listed crawlers, sitemap submitted to Google Search Console and Bing, remove or protect `/styleguide`, smoke test every redirect on the live domain.

### 9.9 Report format (end of every phase PR)
```
## Report
- What was built, by section of this prompt; any deviation and why
- Screenshots: [list with widths]
- Tests run and results; Lighthouse medians where relevant
- [CONFIRM] items added or resolved in this phase
- Open issues
STOPPED. Waiting for approval before Phase [n+1].
```

---

## 10. Open items you will meet (keep them as `[CONFIRM]`, do not guess)

Consultation days and hours; reply time for bookings; MOH licence number; languages; MSc, MBA and medical-degree wording and years; DBA university and year; floor or OPD room; parking and access; hospital facilities to mention; whether the phone is answered by him or the clinic, and a hospital line; insurance wording; site operator and privacy contact; legal last-updated date; domain and DNS access; the 18 illustrated badges; camera originals of the portraits; consent for staff photos; social media URLs (show none until given); Arabic version (not now).

*End of prompt. Start with section 0.2 and Phase 1.*
