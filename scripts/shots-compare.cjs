/* Compare: guide vs condition page, library index vs conditions index */
const { chromium } = require("playwright");
const fs = require("fs");
const BASE = process.argv[2] || "http://localhost:3000";
fs.mkdirSync("shots/health", { recursive: true });
(async () => {
  const b = await chromium.launch();
  for (const [w, h, tag] of [
    [1440, 900, "d"],
    [390, 844, "m"],
  ]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/conditions/`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Decline" }).click({ timeout: 2500 }).catch(() => {});
    await page.waitForTimeout(400);
    await page.screenshot({ path: `shots/health/${tag}-cmp-conditions-index.png` });
    await page.goto(`${BASE}/conditions/high-blood-pressure/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `shots/health/${tag}-cmp-condition.png` });
    // mid-article for callout/body comparison
    await page.evaluate(() => window.scrollTo({ top: 1600, behavior: "instant" }));
    await page.waitForTimeout(500);
    await page.screenshot({ path: `shots/health/${tag}-cmp-condition-body.png` });
    await ctx.close();
  }
  await b.close();
  console.log("done");
})();
