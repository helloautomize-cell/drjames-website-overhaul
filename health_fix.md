# Health Library redesign: index, article page and home section (ASCII proposal)

Concept only, no code. Same theme: palette v2, Newsreader + Inter Tight, gold hairlines, night panels, paper grain.
Sources: your 3 screenshots, the repo (app/health-library/*, lib/library-articles.tsx, components/LibraryCarousel, resources/content/posts/*.md).
Reference page: drmalathi.vercel.app/guides/anomaly-scan-tiffa-scan-pregnancy, read on 5 Oct 2026 for its content structure only (section 4b). Design is our own.
Windsurf prompt comes after you approve.

---------------------------------------------------------------------------------------------

## 1. Audit: why it feels off today

Index (/health-library/)
1. The hero intro ends with "Publish date [CONFIRM]", which makes no sense on a listing page.
2. The topic chips are plain labels; clicking them does nothing.
3. Each card says its category three times: on the dark cover, as the eyebrow, and in the chip row.
4. The "cover" is a dark box with a word in it. There is no image, so every card looks the same.
5. Three cards sit left with an empty right third and a large empty area below. As more posts arrive this grid will become a long, flat wall.
6. Descriptions cut mid-sentence ("Which gut..." / "by Dr....").
7. The hovered card jumps up and gains a border, so the row misaligns.

Article page (/health-library/[slug]/)
8. No image at all, so every article opens on a text-only hero, same as a condition page.
9. Structured data publishes a made-up date ("2026-01-01") when the real date is not set yet. Google would show that date. (app/health-library/[slug]/page.tsx: the fallback date, plus a flag named "published" that is true when the post is NOT dated.)
10. No sharing, no "keep reading", no closing call to action, no reading progress.

Home "From the Health Library"
11. Carousel with faded, cut-off side cards and autoplay: on a three-article site it hides two of three; as posts grow it hides the newest work. "[CONFIRM: launch date]" chips show in every card.
12. Card titles differ from the article headings ("Heart disease warning signs to know" vs "...you should not ignore").

---------------------------------------------------------------------------------------------

## 2. The idea: a physician's library, not a blog grid

Guides can go up on any date, in any number, so nothing in the design depends on a schedule.
- One strong image per guide, always in the same art direction (warm grade, paper grain, consistent crop), so the library looks curated even when photos come from different places.
- Topics are the same five groups as the Conditions page (Diabetes and metabolism, Heart and blood pressure, Lungs sleep and infections, Kidney liver and gut, Whole-person care). Every guide links straight to its condition page, so reading leads to booking.
- Every guide shows who wrote it, when it was published and when Dr. James last reviewed it (the reference site's "Reviewed <date>" line).
- Signature detail: margin notes. Inside a guide, Dr. James's short side remarks sit in the right margin in Newsreader italic with a gold rule, like notes written beside a text. On mobile they become inline asides. Optional per guide.
- Index structure follows the reference guides page (headline, topic tabs, search, cards with topic, title, summary, "Reviewed <date> . <n> min read", then a booking band), with our own layout: a featured guide and an editorial list instead of a plain card grid.

---------------------------------------------------------------------------------------------

## 3. Index page (desktop 1440)

```
 [ header ]
 +--------------------------------------------------------------------------------------------+
 | PEARL masthead                                                                             |
 | Home / Health Library                                                                      |
 |                                                                                            |
 | HEALTH LIBRARY                                                                             |
 | Understand your health,                                 Plain-language guides on the       |
 | *in plain words*.                                       conditions Dr. James sees most,    |
 |                                                         each written and reviewed by him.  |
 | ------------------------------------------------------- [ search guides...            / ] |
 +--------------------------------------------------------------------------------------------+

 FEATURED  (newest guide by default; any guide can be pinned with featured: true)
 +--------------------------------------------------------------------------------------------+
 | +-------------------------------------------------+   HEART AND BLOOD PRESSURE . NEW       |
 | |                                                 |   Heart and blood pressure             |
 | |           cover image 16:10                     |                                        |
 | |           (warm grade + grain, radius 24)       |   Heart disease warning signs          |
 | |                                                 |   you should not ignore                |
 | |                                                 |   (Newsreader 400, 46px)               |
 | |                                                 |                                        |
 | +-------------------------------------------------+   The early signs are quiet and easy   |
 |                                                       to dismiss. What feels urgent, what  |
 |                                                       is easy to miss, and when to act.    |
 |                                                       (o) Dr. James . Reviewed 12 Oct 2026 |
 |                                                       5 min read   [ Read the guide -> ]   |
 +--------------------------------------------------------------------------------------------+

 TOPICS  (real filters; also /health-library/topic/<group>/ pages for search engines)
  [ All 4 ] [ Diabetes and metabolism 1 ] [ Heart and blood pressure 1 ] [ Lungs, sleep 1 ] ...
  (sticky under the header while scrolling the list; counts update; empty topics hidden)

 ALL GUIDES  (newest first; an index, not a card wall; scales to hundreds of guides)
 +--------------------------------------------------------------------------------------------+
 |  5    +-----------+   Lungs, sleep and infections                                          |
 |  OCT  | 4:3 thumb |   Understanding sleep disorders and what they do to your health        |
 |  2026 |           |   Snoring, insomnia and sleep apnea. Why poor sleep raises blood       |
 |       +-----------+   pressure and sugar, and when to get assessed.       5 min read  ->   |
 |  ------------------------------------------------------------------------------------------|
 |  28   +-----------+   Kidney, liver and gut                                                |
 |  SEP  | 4:3 thumb |   Common digestive problems and how to look after your gut             |
 |       +-----------+   Acidity, bloating, reflux and IBS ...               5 min read  ->   |
 |  ------------------------------------------------------------------------------------------|
 |  (publish date as a calendar mark: day in Newsreader 32px gold-dk, month and year in caps;          |
 |   row is one link; hover: thumb zooms 1.03, underline grows; no jumping)                        |
 |                                                                                            |
 |                       [ Show more guides ]  (12 per page, then load more)                  |
 +--------------------------------------------------------------------------------------------+

 BY TOPIC  (appears only once there are 8+ guides; until then hidden so the page never looks empty)
 +--------------------------------------------------------------------------------------------+
 |  Diabetes and metabolism                                   See the condition page ->       |
 |  [ guide ] [ guide ] [ guide ] (3 latest per topic, compact cards with image)              |
 |  Heart and blood pressure ...                                                              |
 +--------------------------------------------------------------------------------------------+

 NIGHT BAND: "Have a question you want answered?"
 +--------------------------------------------------------------------------------------------+
 |  Many guides start from questions patients ask in clinic. Ask yours at your next visit.     |
 |  [ Book a consultation ]   [ WhatsApp ]        (no form: we never collect health details)  |
 +--------------------------------------------------------------------------------------------+
 [ footer ]
```

With only 3 guides today: "Featured" shows the newest, "All guides" shows the other two, "By topic" stays hidden. The page looks finished, not empty.
Mobile: masthead, search, featured image on top then text, topic chips scroll sideways, index rows become image on top + text below at full width.

---------------------------------------------------------------------------------------------

## 4. Article page (desktop 1440)

```
 [ header ]   + 2px gold reading-progress line under the header capsule
 +--------------------------------------------------------------------------------------------+
 | Home / Health Library / Heart and blood pressure                                           |
 |                                                                                            |
 | HEART AND BLOOD PRESSURE                                                                   |
 | Heart disease warning signs                                                                |
 | you should not ignore                       (Newsreader 400, 64px, max 18ch)               |
 |                                                                                            |
 | The early signs are quiet and easy to dismiss. What feels urgent, what is easy to miss,    |
 | and when to act.                            (standfirst, 21px, ink-2)                      |
 |                                                                                            |
 | (o) Written and reviewed by Dr. James Kumar Pallivathukkal, Specialist Internist           |
 |     Published 12 Oct 2026 . Reviewed 12 Oct 2026 . 5 min   [ WhatsApp ] [ Copy link ]   |
 +--------------------------------------------------------------------------------------------+
 +--------------------------------------------------------------------------------------------+
 |                         ONE COVER IMAGE, 21:9, full container width, radius 28             |
 |                         caption + credit under it, 13px ink-2                               |
 +--------------------------------------------------------------------------------------------+

 +---------------+  +------------------------------------------------+  +-------------------+
 | CONTENTS      |  |  IN BRIEF (white panel, gold diamond bullets)  |  |                   |
 | (sticky)      |  |  . Heart disease rarely announces itself...    |  |                   |
 |               |  |  . Chest pressure on effort ... deserves ...   |  |                   |
 | 1 The classic |  |  . Heavy chest pain ... call 9999              |  |                   |
 |   sign  <-act |  +------------------------------------------------+  |                   |
 | 2 Easy to miss|                                                      |                   |
 | 3 When to act |  ## The classic warning sign: chest discomfort      |  MARGIN NOTE      |
 | 4 Questions   |  Body text 19px / 1.75, max 66ch ...                 |  | "Most patients  |
 |               |                                                      |  | describe it as  |
 | ------------  |  ! WHEN TO CALL 9999  (alert callout)                |  | pressure, not   |
 | Talk to Dr.   |  | Heavy chest pain spreading to the arm, jaw...     |  | pain."          |
 | James about   |                                                      |  |  Dr. James      |
 | this  [Book]  |  ## Signs that are easy to miss                      |                   |
 +---------------+  ...                                                 +-------------------+

 +--------------------------------------------------------------------------------------------+
 |  WHEN TO SEE A PHYSICIAN   (pearl-2 panel, 3 short rows, links to Book)                    |
 |  QUESTIONS TO ASK AT YOUR VISIT  (3 to 5 prompts, "Send to my WhatsApp" like Your visit)   |
 |  COMMON QUESTIONS  (FAQ accordion, existing FaqBlock)                                      |
 |  REVIEWED BY  (portrait, name, role, last reviewed date)  + "How we write" -> editorial    |
 |  RELATED CONDITIONS  (ledger rows, same as Conditions index)                               |
 |  KEEP READING  (2 guides from the same topic, image + title; else the 2 newest)             |
 +--------------------------------------------------------------------------------------------+
 [ night CTA: "Talk to Dr. James about <topic>"  Book . WhatsApp (pre-filled with the topic) ]
 [ footer ]
```

Layout rules: three columns on wide screens (contents 220px, text 66ch, margin 240px). Below 1200px the margin notes move inline; below 900px contents becomes a "Contents" button that opens a sheet.

---------------------------------------------------------------------------------------------

## 4b. Content structure taken from the reference guide (structure only, our design)

Reference order, top to bottom:
1. Breadcrumb with category (Home / Patient guides / Pregnancy scans / title)
2. Long, search-friendly H1 ("Anomaly Scan in Pregnancy: Complete Guide to the 20-Week / TIFFA Scan")
3. One-paragraph description
4. Byline: author, date, read time
5. "In this guide" contents: collapsible on mobile, sticky on desktop
6. One hero image
7. "Quick answer" box: a 2 to 3 sentence direct answer before the article starts
8. Short intro that names the reader's real worry
9. Every H2 is a patient question ("When is it done?", "Can it detect everything?", "What happens after?"), with H3 sub-parts
10. "What should you ask after...?" list of questions to take to the doctor
11. A local section: "<topic> in <city>: when should you seek specialist guidance?"
12. Medical disclaimer plus a "Medical review: <name, degrees>" line
13. Key takeaways (bullets, at the END)
14. Common questions (FAQ)
15. Sources (named organisations with their domains)
16. Share: WhatsApp, copy link
17. Service card for the matching service with a Book button (sidebar on wide screens, after the article on mobile)
18. Related guides with "Reviewed <date> . <read time>"
19. Book appointment band; sticky Call / WhatsApp / Book bar on mobile

What we adopt in our article template (changes to section 4 above):
- ADD "Quick answer" box right under the cover image (new front-matter field quickAnswer, 2 to 3 sentences). It answers the title question in plain words. Good for readers and for Google and AI answer boxes.
- MOVE our "In brief" bullets to the END as "Key takeaways" (same field, renamed), so the top is the quick answer and the end is the summary, without saying the same thing twice in a row.
- RULE for authors: every H2 is written as a question a patient would ask. Contents list reads like an FAQ.
- ADD a local section near the end: "<Topic> in Muscat: when to see a physician" (replaces our generic "When to see a physician" panel; same content plus where Dr. James sees patients).
- KEEP "Questions to ask at your visit" (the reference has the same idea; ours adds Send to WhatsApp).
- ADD "Sources" list (organisation name + domain, e.g. "American Diabetes Association . diabetes.org") and a one-line disclaimer above it. Fits our editorial policy: no statistic without a named source.
- ADD a "Medical review" line next to the reviewer box: "Reviewed by Dr. James Kumar Pallivathukkal, Specialist Internist, on <date>".
- ADD a sidebar "condition card" for the guide's main condition (icon, one line, Book about this) under the contents on desktop; after the article on mobile. It replaces the generic Talk to Dr. James box.
- Related guides show "Reviewed <date> . <n> min read".
- Contents: collapsible "In this guide" on mobile (closed), sticky list on desktop.
- NOT adopted: the long SEO H1 with slashes (we keep a clean title and put the search phrase in the page title tag), the clinic address paragraph inside the article (the local section links to Your visit instead), and the 18-minute length (our guides target 5 to 8 minutes; occasional long guides use the same template).

Final article order: breadcrumb . topic . title . standfirst . byline + share . cover image . Quick answer . contents (sticky) . body with question H2s, margin notes and callouts . "<Topic> in Muscat: when to see a physician" . Questions to ask at your visit . Key takeaways . Common questions . Sources + disclaimer . Medical review . Related conditions . Keep reading . Talk to Dr. James band.

---------------------------------------------------------------------------------------------

## 5. Home section "From the Health Library"

```
 +--------------------------------------------------------------------------------------------+
 | HEALTH LIBRARY                                                       All guides ->        |
 | Understand your health, *in plain words*                                                      |
 |                                                                                            |
 | +----------------------------------------+   5 OCT 2026 . LUNGS                             |
 | |  featured image 4:3                   |   Understanding sleep disorders ...             |
 | |                                        |   ------------------------------------------    |
 | |                                        |   28 SEP 2026 . GUT                              |
 | +----------------------------------------+   Common digestive problems ...                 |
 |  Understanding sleep disorders and what      ------------------------------------------    |
 |  they do to your health                      21 SEP 2026 . HEART                            |
 |  Snoring, insomnia and sleep apnea...        Heart disease warning signs ...               |
 +--------------------------------------------------------------------------------------------+
```
Replaces the carousel: no autoplay, no hidden cards, always the featured guide plus the 2 newest others. Titles use the article heading.

---------------------------------------------------------------------------------------------

## 5b. Mobile (390px wide)

Index
```
 +--------------------------------+
 | [logo]            [o] [Book]   |  header capsule
 +--------------------------------+
 | Home / Health Library          |
 | HEALTH LIBRARY                 |
 | Understand your health,        |
 | *in plain words*.              |
 | Plain-language guides, each    |
 | reviewed by Dr. James.         |
 | [ search guides...          ]  |
 +--------------------------------+
 | [All 3][Diabetes 1][Heart 1]>> |  topic tabs: scroll sideways,
 +--------------------------------+  stick under the header
 | FEATURED                       |
 | +----------------------------+ |
 | |  cover image 4:3           | |
 | |  radius 20                 | |
 | +----------------------------+ |
 | HEART AND BLOOD PRESSURE . NEW |
 | Heart disease warning signs    |
 | you should not ignore          |  Newsreader 32px
 | The early signs are quiet...   |
 | Reviewed 12 Oct . 5 min read   |
 +--------------------------------+
 | ALL GUIDES                     |
 | +----------+  5 OCT 2026       |
 | | thumb    |  Lungs and sleep  |
 | | 1:1 96px |  Understanding    |
 | +----------+  sleep disorders  |
 |               and what they... |  title max 3 lines
 |               5 min read    -> |
 | ------------------------------ |
 | +----------+  28 SEP 2026      |
 | | thumb    |  Kidney, liver... |
 | +----------+  Common digest... |
 | ------------------------------ |
 | [   Show more guides        ]  |
 +--------------------------------+
 | NIGHT: Have a question?        |
 | [ Book ]  [ WhatsApp ]         |
 +--------------------------------+
 | [ Call ][ WhatsApp ][ Book ]   |  existing sticky bottom bar
 +--------------------------------+
```
- Rows on mobile are compact: square 96px thumb left, text right (date, topic, title, read time). Faster to scan than full-width cards.
- Search opens a full-screen sheet with results as you type.

Article
```
 +--------------------------------+
 | ====== gold reading line ===== |  progress under the header
 | Home / Health Library / Heart  |
 | HEART AND BLOOD PRESSURE       |
 | Heart disease warning          |
 | signs you should not           |
 | ignore                         |  Newsreader 36px
 | The early signs are quiet and  |
 | easy to dismiss...             |  standfirst 18px
 | (o) Dr. James . Reviewed       |
 |     12 Oct 2026 . 5 min        |
 +--------------------------------+
 | +----------------------------+ |
 | |  cover image 4:3           | |  full width, caption below
 | +----------------------------+ |
 +--------------------------------+
 | QUICK ANSWER                   |
 | Heart disease rarely starts    |
 | loudly. Chest pressure on      |
 | effort needs a check...        |
 +--------------------------------+
 | [ In this guide        v ]     |  collapsed; opens the list
 +--------------------------------+
 | ## When does chest discomfort  |
 |    need a check?               |
 | Body 18px / 1.7 ...            |
 | +--------------------------+   |
 | | " Most patients describe |   |  margin note becomes an
 | |   it as pressure, not    |   |  inline aside with a gold
 | |   pain."  Dr. James      |   |  left rule
 | +--------------------------+   |
 | ! WHEN TO CALL 9999            |  alert callout
 | ...                            |
 +--------------------------------+
 | Heart health in Muscat: when   |
 | to see a physician             |
 | Questions to ask at your visit |
 | [ Send to my WhatsApp ]        |
 | Key takeaways                  |
 | Common questions  (accordion)  |
 | Sources . disclaimer           |
 | Medical review (portrait)      |
 +--------------------------------+
 | CONDITION CARD                 |
 | (o) Heart risk assessment      |
 | Find and reduce risk early     |
 | [ Book about this ]            |
 +--------------------------------+
 | Keep reading: 2 compact rows   |
 +--------------------------------+
 | [ Share ] [ Call ][ WA ][Book] |  bottom bar gains a Share
 +--------------------------------+  button on article pages only
```

Home section
```
 +--------------------------------+
 | HEALTH LIBRARY                 |
 | Understand your health,        |
 | *in plain words*               |
 | +----------------------------+ |
 | |  featured image 4:3        | |
 | +----------------------------+ |
 | Heart disease warning signs    |
 | you should not ignore          |
 | ------------------------------ |
 | 5 OCT . Understanding sleep... |
 | 28 SEP . Common digestive...   |
 | [ All guides -> ]              |
 +--------------------------------+
```

Mobile rules: body text never below 17px; tap targets at least 44px; no horizontal scroll except the topic tabs; images use srcset so phones load small files; the sticky topic tabs and contents never sit under the header (they use --nav-clear).

---------------------------------------------------------------------------------------------

## 6. Built for posting at any time (each new guide is one file, no design work)

Each post stays a Markdown file in resources/content/posts/. New front-matter fields:
- featured: true (optional; pins a guide to the top of the index and the home section)
- topic: one of the 5 condition group ids (replaces free-text category)
- standfirst: one or two sentences (shown under the title and on cards; no more "..." cuts)
- image, imageAlt, imageCaption, imageCredit, imageFocus ("50% 30%" for cropping)
- date (real publish date; a post without a real date is a draft and does not appear in production)
- quickAnswer (2 to 3 sentences), keyTakeaways (was inBrief), sources (name + url list)
- updated, lastReviewed, related (condition slugs), questionsToAsk (list), faqs
- readingMinutes is calculated automatically.
In the text: `:::margin` blocks become margin notes, `:::emergency` becomes the 9999 callout, `:::seeadoctor` the "when to see a physician" panel.
Also: resources/content/posts/_template.md with every field and an authoring checklist (one image, alt text, reviewed by Dr. James, no statistics without a source, no brand names), an RSS feed, the sitemap, and an automatic share image built from the cover and title.

Image art direction (one image per guide): real photos of everyday context (a meal, a walk, a blood pressure cuff, a pharmacy shelf), no identifiable patients, no graphic medical images, no stock "smiling doctor" shots. The site applies the same warm grade and grain to every image. Until a guide has an image, it gets a designed fallback: night panel with gold contour lines and the topic icon.

---------------------------------------------------------------------------------------------

