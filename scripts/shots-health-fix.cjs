/*
 * Re-shoot fixed areas + measure sticky offsets.
 *   node scripts/shots-health-fix.cjs [baseUrl]
 */
const { chromium } = require("playwright");
const fs = require("fs");
const BASE = process.argv[2] || "http://localhost:3000";
const OUT = "shots/health";
fs.mkdirSync(OUT, { recursive: true });

const scrollTo = async (page, sel, offset = 160) => {
  await page.evaluate(
    ([s, o]) => {
      const el = document.querySelector(s);
      if (el)
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - o,
          behavior: "instant",
        });
    },
    [sel, offset],
  );
  await page.waitForTimeout(600);
};

(async () => {
  const b = await chromium.launch();
  for (const [w, h, tag] of [
    [1440, 900, "d"],
    [390, 844, "m"],
  ]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    const shot = (n) => page.screenshot({ path: `${OUT}/${tag}-${n}.png` });
    await page.goto(`${BASE}/health-library/heart-disease-warning-signs/`, {
      waitUntil: "networkidle",
    });
    await page
      .getByRole("button", { name: "Decline" })
      .click({ timeout: 3000 })
      .catch(() => {});
    await page.waitForTimeout(400);

    // TOC active + condcard fix: scroll so section 3 is at the top
    await page.evaluate(() => {
      const hs = document.querySelectorAll(".gd-main h2[id]");
      if (hs[2]) hs[2].scrollIntoView({ block: "start" });
      window.scrollBy(0, -140);
    });
    await page.waitForTimeout(800);
    await shot("fix-toc-active");

    // measure: sticky tabs on index + toc clearance
    await page.goto(`${BASE}/health-library/`, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo({ top: 1400, behavior: "instant" }));
    await page.waitForTimeout(600);
    const gap = await page.evaluate(() => {
      const bar = document.querySelector(".x-hdr .x-bar");
      const tabs = document.querySelector(".hl-tabs");
      if (!bar || !tabs) return null;
      return Math.round(tabs.getBoundingClientRect().top - bar.getBoundingClientRect().bottom);
    });
    console.log(`${tag} tabs gap under capsule: ${gap}px`);
    await shot("fix-tabs-stuck");

    // home section, framed on content
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page
      .getByRole("button", { name: "Decline" })
      .click({ timeout: 3000 })
      .catch(() => {});
    await scrollTo(page, ".hl-home", 200);
    await shot("fix-home-library");
    await ctx.close();
  }
  await b.close();
  console.log("done");
})();
