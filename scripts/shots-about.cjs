/*
 * About page rebuild screenshots.
 *   node scripts/shots-about.cjs [baseUrl]
 * Output: shots/about/*.png
 */
const { chromium } = require("playwright");
const fs = require("fs");

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = "shots/about";
fs.mkdirSync(OUT, { recursive: true });

const scrollTo = async (page, sel, offset = 120) => {
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

    await page.goto(`${BASE}/about-dr-james/`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Decline" }).click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(500);
    await shot("1-hero");
    await scrollTo(page, ".ab-quote", 140);
    await shot("2-words");
    await scrollTo(page, ".ab-panel", 110);
    await shot("3-training-closed");
    await page.locator(".ab-ft summary").click();
    await page.waitForTimeout(400);
    await shot("4-training-open");
    await page.evaluate(() => document.querySelector(".ab-ft")?.removeAttribute("open"));
    await scrollTo(page, "#ab-career-h", 300);
    await shot("5-career");
    await scrollTo(page, "#ab-lead-h", 140);
    await shot("6-leadership");
    await scrollTo(page, "#ab-visit-h", 140);
    await shot("7-visit");

    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await shot("8-home-hero");
    await scrollTo(page, ".mj-sec", 100);
    await page.waitForTimeout(600);
    await shot("9-home-mj-ledger");
    await ctx.close();
  }
  await b.close();
  console.log("done");
})();
