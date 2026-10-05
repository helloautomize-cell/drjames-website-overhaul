/*
 * Your visit page redesign screenshots.
 *   node scripts/shots-visit.cjs [baseUrl]
 * Output: shots/visit/*.png
 */
const { chromium } = require("playwright");
const fs = require("fs");

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = "shots/visit";
fs.mkdirSync(OUT, { recursive: true });

const scrollTo = async (page, sel, offset = 160) => {
  await page.evaluate(
    ([s, o]) => {
      const el = document.querySelector(s);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - o, behavior: "instant" });
    },
    [sel, offset],
  );
  await page.waitForTimeout(700);
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

    await page.goto(`${BASE}/your-visit/`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Decline" }).click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(500);
    await shot("1-hero");

    // step tracker: scroll so step 3 becomes active, chips row should be stuck under header
    await scrollTo(page, ".step:nth-child(3)", 500);
    await page.waitForTimeout(800);
    await shot("2-steps-chips-stuck");

    await scrollTo(page, "#where", 150);
    await shot("3-where");

    await scrollTo(page, "#bring", 150);
    // tick two items
    const boxes = page.locator(".yv-panel input[type=checkbox]");
    await boxes.nth(0).check();
    await boxes.nth(4).check();
    await page.waitForTimeout(300);
    await shot("4-bring-ticked");

    await scrollTo(page, "#after", 150);
    await shot("5-after");

    await scrollTo(page, "#questions", 150);
    await page.locator("#questions .faq details").nth(0).locator("summary").click();
    await page.waitForTimeout(400);
    await shot("6-questions-open");

    await scrollTo(page, ".ctaband", 220);
    await shot("7-closing");

    // home tracker check
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: "Decline" }).click({ timeout: 3000 }).catch(() => {});
    await scrollTo(page, ".tracker", 140);
    await shot("8-home-tracker");
    await ctx.close();
  }
  await b.close();
  console.log("done");
})();
