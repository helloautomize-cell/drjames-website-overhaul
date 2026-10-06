# Windsurf prompt — implement the redesign (copy everything below the line)

---

You are upgrading the Dr. James Kumar Pallivathukkal website (this repo, Next.js 16 App Router, Tailwind v4 + `app/v2.css`). You already audited it into `site-audit/`. **Time limit: about 90 minutes, then a client preview.** Ship a clearly better site fast. Do not chase perfection, and do not break anything.

## Inputs (in `_handoff/` at the repo root)
- `_handoff/drjames-styleguide.html` is the **design source of truth**. Open it and read the build notes and every section. It has the tokens, components, motion rules and the "beyond icons" rules.
- `_handoff/images/doctor/*`: 13 approved doctor photos.
- `_handoff/IMAGE-MAP.md`: which photo goes on which page and section, with alt text. Follow it exactly.

## Rules
- **Refine, don't rebuild.** Keep every route, all content, metadata, JSON-LD, analytics, the cookie consent logic and the booking form logic.
- Use the style guide `:root` tokens. Map them into the existing token layer in `app/v2.css`; do not add colours. Small gold text uses gold-dark `#7A5C2C`. Never fade text with opacity.
- **No photo frames.** Remove the arch/window frames around photos. Photos bleed to the section edge and fade into the surface with a CSS mask, as shown in the style guide sections "How he works" and "Meet your doctor".
- All motion must respect `prefers-reduced-motion`.
- Commit after each phase, with clear messages. Run `npm run build` before each commit, and fix any errors before moving on.

## Step 0: Image pre-treatment (10 min)
Write `scripts/prepare-images.mjs` using `sharp` (add it as a devDependency if it's missing) and run it:
1. Read `_handoff/images/doctor/*` and write to `public/images/doctor/`.
2. **Upscale** any image narrower than 2400px (landscape) or shorter than 2000px (portrait) by 2× with `kernel: lanczos3`, then apply a light `sharpen({ sigma: 0.6 })`.
3. Output **AVIF and WebP** for every image, plus the original format as a fallback. Keep the file names (`d03-consultation.avif`, and so on).
4. **Clean the cut-out** `d01-hero-cutout.png`. Using raw pixel access, find pixels with alpha below 250 that sit next to transparent pixels (the 2px edge band). Desaturate them to the average of their opaque neighbours to remove the red and white fringe. Then erode the alpha by 1px and feather it by 0.5px. Save it as PNG and WebP with alpha.
5. Log each file's before and after size.

Use the images through `next/image` with real `width` and `height`, `sizes`, and the alt text from IMAGE-MAP.md. Only the home hero gets `priority`.

## Phase 1: Home page (40 min, highest priority)
Match the style guide sections, in this order:
1. **Header and utility bar:** a solid paper header (96% with blur), so nothing shows through on scroll. Use the same "·" separator in the header and the footer. On mobile, add the bottom action bar (Book · Call · WhatsApp).
2. **Hero:** the style guide "Hero — the whole picture" section.
   - Navy background with a teal glow and a dot grid.
   - Headline words rise in one by one.
   - Use `d01-hero-cutout` in place of the circular crop. He stands in front of the system orbit, with the rings passing behind his shoulders.
   - 8 condition badges orbit him. Each badge is a link, and the orbit pauses on hover.
   - Show the two floating credential chips.
   - Add a glass credentials band at the bottom with count-up numbers.
   - Move the cookie banner to a compact card at the bottom right (max 340px), so it never covers the CTAs.
3. **Conditions mosaic:** keep it, but make every card a link with a hover lift and arrow. Use the animated navy coin badges with the inline SVG glyphs from the style guide JS (`I` map). Fix the lab tags to HbA1c, BP, eGFR, SpO₂, ALT, TSH, Ferritin and Vit D. Cut the scroll pin to at most 1 viewport. Connector lines go behind the cards.
4. **Right doctor:** heading in the left column, list on the right, arrows next to the text. Replace the 12 icons with check chips, as in the style guide.
5. **How he works:** the style guide "cinematic band". Use `d03-consultation` full-bleed on the left 52% with a navy gradient. Put the quote in white serif, filling word by word as you scroll. Place the 4 principle cards so they overlap the band bottom by about 100px, each with a navy coin badge.
6. **First-visit stepper:** the pinned scroll journey from the style guide. One step per about 100vh. Rail fill, badge coin flip, a big ghost numeral, panels that slide, and chips with practical details. The rail stays clickable. Under reduced motion it becomes a plain list.
7. **Meet Dr. James:** the editorial profile from the style guide.
   - `d02-portrait` sticky on the left, bleeding to the edge.
   - Four chapters scroll past on the right:
     - Profile: name, signature placeholder and count-up stats.
     - Training: the map India → UK → Oman with the dotted arc.
     - Career: a scroll-fill timeline with the 2022 role marked "Today".
     - Leadership: a list, then the "Consult Dr. James" CTA card.
8. **Visit band and FAQ:** fill the empty left column of the FAQ with its heading and a WhatsApp prompt.

## Phase 2: Inner pages (25 min)
- **Condition template (×18):** put the hero image from IMAGE-MAP (by body-system group, d08, d09 or d10) on the right with an edge fade, and the navy coin badge beside the H1. Use `d04-headshot` in the reviewer box. Make related-conditions rows use 28px mini badges.
- **About:** `d01-hero` full-bleed hero, `d12-candid` beside the in-his-own-words quote, `d11-leadership` in the leadership section. Remove the arch photo frames.
- **Your visit:** `d06-corridor` as the hero, and `d07-welcome` and `d03-consultation` on stepper steps 2 and 3.
- **Contact:** `d07-welcome` as the hero, `d04-headshot` in the contact card.
- **Conditions index and Health Library index:** `d05-results` as the hero. The conditions group panels use d08, d09 and d10.
- **Guides:** `d04-headshot` in the reviewer box.

## Phase 3: Quick fixes (10 min)
- Remove the `/styleguide/` route from production. Return a 404, or delete it if nothing imports it.
- Give the 404 page its own title ("Page not found").
- Add `aria-label`s to the ~20 icon-only or stretched links listed in `site-audit/content-gaps.md`.
- Give the certificate photo a real alt text.
- Generate OG images for all pages with `next/og`: navy background, `d04-headshot` and the page title in serif.
- If the Health Library has 0 live guides, hide the home "Library highlights" section and the empty library list rather than showing "All 0 guides".

## Done means
- `npm run build` passes with no type errors.
- Check home, about, your-visit, contact, conditions index and one condition page at **1440×900 and 390×844**. There is no horizontal scroll, no overlapping elements, and the cookie card never covers a CTA.
- Save Playwright screenshots to `site-audit/after/` with the same names as `site-audit/screenshots/`.
- Reply with a short list of what changed, anything you skipped, and the before/after screenshot paths.
