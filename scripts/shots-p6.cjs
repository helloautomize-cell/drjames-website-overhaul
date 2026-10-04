/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Phase 6 evidence screenshots.
 * - "after": current build at required widths.
 * - "before": same pages with the pre-fix CSS values re-injected,
 *   so each fix has an honest visual comparison.
 * Usage: node scripts/shots-p6.cjs
 */
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:4811";

// pre-fix values, re-injected for the "before" captures
const BEFORE_CSS = `
  h1,h2,h3 { text-wrap: wrap !important; }
  .pg-hero-row { gap: 26px !important; }
  .pg-hero .badge-col svg { width: 92px !important; height: 92px !important; }
  .pg-hero h1 { font-size: 32px !important; }
  .dots button { width: 8px !important; height: 8px !important; padding: 0 !important;
    border-radius: 99px !important; background: var(--line) !important; }
  .dots button::after { content: none !important; }
  .dots button.on { width: 26px !important; background: var(--primary) !important; }
  .f0 .plate b { font-size: 11px !important; }
  .f0 .plate span { font-size: 10.5px !important; }
  .crumbs a, .fcol a, .bform .chk a { padding-block: 0 !important; }
  .ubar a, .revbox .link { min-height: 0 !important; }
`;

const PAIRS = [
  { url: "/conditions/asthma-and-breathing/", w: 390, name: "asthma-hero", clip: { y: 0, height: 700 } },
  { url: "/", w: 390, name: "home-hero", clip: { y: 0, height: 900 } },
  { url: "/", w: 1440, name: "home-dots", sel: ".carnav" },
  { url: "/", w: 1440, name: "home-carousel", sel: ".library-carousel, .lcar, .carnav" },
];

const AFTERS = [
  { url: "/", w: [390, 768, 1024, 1440] },
  { url: "/about-dr-james/", w: [390, 1440] },
  { url: "/conditions/asthma-and-breathing/", w: [390, 1440] },
  { url: "/health-library/", w: [768, 1440] },
  { url: "/your-visit/", w: [768] },
  { url: "/contact/", w: [390, 1440] },
];

(async () => {
  const browser = await chromium.launch();
  // before/after pairs
  for (const t of PAIRS) {
    for (const [tag, css] of [["before", BEFORE_CSS], ["after", null]]) {
      const ctx = await browser.newContext({ viewport: { width: t.w, height: 900 } });
      const p = await ctx.newPage();
      await p.goto(BASE + t.url, { waitUntil: "networkidle" });
      if (css) await p.addStyleTag({ content: css });
      await p.waitForTimeout(500);
      if (t.sel) {
        const el = p.locator(t.sel).first();
        await el.scrollIntoViewIfNeeded();
        await el.screenshot({ path: `screenshots/p6-${tag}-${t.name}-${t.w}.png` });
      } else {
        await p.screenshot({ path: `screenshots/p6-${tag}-${t.name}-${t.w}.png`, clip: t.clip ? { x: 0, y: t.clip.y, width: t.w, height: t.clip.height } : undefined, fullPage: !t.clip });
      }
      await ctx.close();
    }
  }
  // after set (full page)
  for (const t of AFTERS) {
    for (const w of t.w) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
      const p = await ctx.newPage();
      await p.goto(BASE + t.url, { waitUntil: "networkidle" });
      await p.waitForTimeout(400);
      const slug = t.url.replace(/\//g, "_").replace(/^_+|_+$/g, "") || "home";
      await p.screenshot({ path: `screenshots/p6-after-${slug}-${w}.png`, fullPage: true });
      await ctx.close();
    }
  }
  await browser.close();
  console.log("done");
})();
