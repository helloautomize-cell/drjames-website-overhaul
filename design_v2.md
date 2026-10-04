# Review of your build: header, hero, training, conditions (4 Oct 2026)

Based on the six screenshots at about 1920 px wide. The build is already a big step up: the type, the pearl and night palette, the portrait panel and the Conditions mosaic all read as premium. What holds it back now is a handful of bugs and leaks, plus a few places where the layout still falls back to template patterns.

The Devin prompt that fixes everything is at the bottom.

---

## A. Must fix (bugs, leaks, compliance)

1. **The concierge rail is missing.** There is no dark line at the top with the location, the live "Consulting today" status and **Medical emergency? Call 9999**. The 9999 line is a compliance item, so this is the most important fix.
2. **Internal note leaking into the page.** The certificate photo caption reads "Certificate photo · real, keep". That is an image-guide note, not copy. Replace it with "Certificate in Diabetes, Cardiff University" or remove the caption.
3. **The experience numbers disagree.** The hero says "24 years in medicine, 15 of them in Oman". Counting from 2002 and 2012 gives 24 and 14; the old site said 23 and 15. Calculate both from one source (`lib/site-config.ts`: graduation 2002, Oman since 2012), or hard-code both from the client. Never mix the two.
4. **The confirmation box is visible in the hero.** The yellow box "[CONFIRM: MSc university…]" shows in the proof strip. Meanwhile the training section already states "University of South Wales" for the MSc and "Cardiff University, 2012" for the PG Dip. Pick one answer:
   - If you have confirmed it, the strip reads "MSc Diabetes, University of South Wales, and PG Diploma, Cardiff University".
   - If not, keep the marker in both places, but render it only in preview builds (`process.env.VERCEL_ENV !== 'production'`).
   - The same applies to every `[year]` and `[CONFIRM]` chip.
5. **Conditions menu, selected group is invisible.** In "02 Heart and blood pressure", the words "Heart and blood" render in dark ink on the night panel. Only "pressure" shows. Selected and hovered tabs need white text.
6. **Conditions menu, stray gold diamond.** The nav's active-marker style is leaking into the group tabs, which puts a diamond under "02". Scope the marker to the top-level nav only, for example `.nav > a::after`.
7. **Conditions menu, wrong icon.** The preview card for Heart and blood pressure shows a camera-like icon. Use the heart badge for this group and the matching badge for each of the others.
8. **"COVID-19" breaks across two lines** in the pillar card ("COVID-" / "19"). Use a non-breaking hyphen (COVID‑19, U+2011) everywhere it appears.
9. **Seam under the header at the top.** The bar has its own background, so a flat band sits above the hero's tint. At the top of the page the bar should be fully transparent, with the hero background running under it.
10. **The hero is taller than the screen.** At 1920 x 870 (a laptop with browser chrome) the panel is cut off at the bottom, and "At Badr Al Samaa Royal Hospital" falls below the fold. The whole composition should fit inside the first screen.
11. **No breathing room in the training section.** The timeline and the photo start right against the bottom of the credential cards, and the photo touches the MBA and DBA cards. Leave a 72 px gap.

## B. Make it 10x more premium

Ranked by impact for the effort.

1. **A header that changes with the section underneath.** On the night Conditions section, the pearl capsule turns into flat grey glass. Make the capsule switch to a night variant there:
   - Background: rgba(10,28,46,.78) with a blur.
   - White wordmark and nav, and the white logo mark.
   - The finder and WhatsApp buttons switch to outline style.
   - Any section with `data-header="dark"` triggers it. It feels like the page is aware of itself, which is the single biggest "expensive" signal.
2. **A more solid capsule.** At 84% opacity the H1, the pillar card and the credential circles show through it and make it noisy. Use 92% opacity, blur 20px, saturate 160%.
3. **Training: drop the five circle cards.** Five equal cards with a ring icon is the most template-looking pattern left on the page. Replace them with a **credential ledger**:
   - One white card with hairline rows.
   - Each row has the qualification abbreviation in large serif gold (MD, MSc, PG Dip, MBA, DBA) on the left, the subject in bold beside it, and the institution and year on the right.
   - It reads like a diploma register.
   - Put the certificate photo next to it in a thin gold mount: a 1px gold border, 10px of pearl inside, then the photo.
4. **A timeline that fills as you read.**
   - The vertical line starts as a pale hairline. A gold line grows down it as you scroll.
   - Each dot fills when the line reaches it.
   - The years switch from bold petrol sans to Instrument Serif italic in gold-dk, 28px.
   - The current role (2022) gets a small "Now" label.
5. **A headline that rises line by line.** On load, each line of the H1 rises from behind a mask: overflow hidden per line, translateY 100% to 0, 900ms, 120ms stagger. Then the contour lines in the panel draw in. It runs once and is gone under reduced motion. Editorial sites use this, clinic templates don't.
6. **Paper texture on pearl.** Add a 3% noise texture (a tiny tiled SVG or PNG) over the pearl sections. Flat CSS colour looks digital; the faint grain makes it feel printed. Night sections stay clean.
7. **Calmer Conditions copy column.**
   - Remove the big empty gap between the step text and "See all 18 conditions" by reserving less height.
   - Fade the left link out at step 3, because the join plate already carries "See all 18 →". Two identical links side by side look unfinished.
8. **Focus the Conditions menu.** While the menu is open, dim the page behind it with a night scrim (rgba(10,28,46,.45) and a 4px blur). That stops the page heading from showing around its edges.
   - Groups with only two conditions leave a big empty middle. Show each condition with its one-line description, plus a "Common questions" line or a related Health Library post, so the column never looks empty.
9. **Sharper photos.** The hero cutout is 419 x 718 and is shown about 650 px tall, so it goes soft on retina screens. Ask the client for the camera original (at least 1600 px tall) of the white-coat photo, and of the certificate photo. Nothing else will lift the hero as much as a crisp portrait.
10. **Numbers that line up.** Use `font-variant-numeric: lining-nums tabular-nums` on the proof strip and the timeline years, so the figures align.

(The round "N" at the bottom left is the Next.js dev indicator. It will not appear in production.)

---

## C. Prompt for Devin

```
# Home polish, round 2: fixes and premium upgrades
Branch: redesign/home-polish-2. One PR with a Vercel preview. Do not change copy except where stated. Stop after acceptance.

## Must fix
1. Restore the concierge rail above the header (34px, --night): left 8-point gold star + "Badr Al Samaa Royal Hospital · Al Ghubrah, Muscat"; centre live status in Asia/Muscat time (lagoon pulse dot); right "Medical emergency? Call 9999" in --alert-n, tel:9999. It collapses to 0 when scrolled > 40px.
2. Remove the caption "Certificate photo · real, keep". Use "Certificate in Diabetes, Cardiff University" or no caption.
3. Experience numbers: compute years in medicine and years in Oman from lib/site-config.ts (graduationYear: 2002, omanSince: 2012) with one helper, used everywhere (hero strip, About, JSON-LD). [CONFIRM with client whether to show computed values or fixed 23 / 15.]
4. [CONFIRM] and [year] chips render only when process.env.VERCEL_ENV !== 'production'. Hero strip MSc line must match the training section: "MSc Diabetes, University of South Wales, and PG Diploma, Cardiff University" once confirmed.
5. Conditions curtain: selected/hovered group text is white (the em word stays --gold-lt). Scope the gold diamond marker to top-level nav items only (.nav > a::after, .nav > button::after).
6. Curtain preview card uses the group's own badge (heart for Heart and blood pressure, etc.).
7. Replace every "COVID-19" with "COVID‑19" (U+2011 non-breaking hyphen).
8. Top state of the header: bar background transparent; the hero section starts at y=0 with padding-top equal to rail + bar height, so its background runs under the header with no seam.
9. Hero fits the first screen: .hero min-height 100svh minus nothing (header overlays it); panel height clamp(480px, calc(100svh - 260px), 660px); the CTAs and the location line must be visible at 1440 x 900 and 1920 x 1080. The proof strip may sit below the fold.
10. Training section: 72px gap between the credential row and the timeline; the photo never touches the cards.

## Premium upgrades
11. Header theme by section: sections carry data-header="dark" (Conditions, footer, any night band). An IntersectionObserver on a 1px line at the capsule's vertical centre switches .hdr to .on-dark: capsule background rgba(10,28,46,.78) + blur(20px) saturate(160%), border 1px rgba(217,183,126,.28), white wordmark, white mark (crossfade 300ms), nav rgba(255,255,255,.86), finder and WhatsApp outline rgba(255,255,255,.22), Book unchanged, progress line --gold-lt.
12. Light capsule: background rgba(246,248,245,.92), backdrop-filter blur(20px) saturate(160%).
13. Credentials: replace the five circle cards with one "credential ledger" card (white, radius 22, 1px --line): five rows, hairline between rows, each row grid 140px | 1fr | auto: abbreviation in Instrument Serif 40px --gold-dk (MD, MSc, PG Dip, MBA, DBA), subject 17px/600 --ink, institution and year 15px --ink-2 right aligned. Certificate photo beside it in a gold mount: 1px --gold border, 10px pearl padding, radius 22 outer / 14 inner.
14. Timeline: track 1px --line; a 2px --gold fill line grows with scroll progress through the section (scaleY, transform-origin top); each dot fills --gold when the fill passes it. Years in Instrument Serif italic 28px --gold-dk with tabular lining numerals. The 2022 row gets a small "Now" pill (--petrol text, 1px --petrol border). Photo column sticky top 120px.
15. Hero H1 line reveal on load: wrap each line in a mask (overflow hidden), inner translateY(100%) to 0, 900ms cubic-bezier(.22,1,.36,1), 120ms stagger, then the contour lines draw. Once only; none under prefers-reduced-motion.
16. Paper grain on pearl sections: a 160px tiled noise PNG (generated once, ~3 KB) at 3% opacity via ::before, pointer-events none. Not on night sections.
17. Conditions copy column: reserve only the tallest caption's height (measure, no fixed min-height); fade out the left "See all 18 conditions" link from p 0.86 (the join plate carries it).
18. Curtain focus: while open, a fixed scrim rgba(10,28,46,.45) + blur(4px) under the header and over the page; click closes. Middle column: each condition shows title + one line; if a group has fewer than 4 conditions, add a "Read next" row linking one Health Library post for that group.
19. Numerals: font-variant-numeric: lining-nums tabular-nums on the proof strip and timeline years.
20. Hero portrait: when the client sends the camera original, export dr-james-hero.png at 1600px tall (transparent, trimmed) and serve via next/image with sizes="(max-width: 760px) 90vw, 40vw".

## Acceptance
Lighthouse mobile accessibility 100, CLS 0. Report and STOP.
```
