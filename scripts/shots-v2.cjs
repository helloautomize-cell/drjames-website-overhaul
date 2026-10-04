/* eslint-disable @typescript-eslint/no-require-imports */
// Home v2 acceptance screenshots: hero, Conditions at 40% / 100%, tablet, mobile, menu sheet.
// Usage: BASE=http://localhost:4811 node scripts/shots-v2.cjs [prefix]
const { chromium } = require("playwright");

const BASE = process.env.BASE || "http://localhost:4811";
const PRE = process.argv[2] || "v2";

async function scrollToSection(page, frac) {
  await page.evaluate((f) => {
    const cx = document.querySelector(".x-cx");
    const top = cx.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (cx.offsetHeight - window.innerHeight) * f, behavior: "instant" });
  }, frac);
  await page.waitForTimeout(500);
}

(async () => {
  const browser = await chromium.launch();
  const sizes = [
    { w: 1440, h: 900, name: "1440" },
    { w: 1024, h: 768, name: "1024" },
    { w: 390, h: 844, name: "390" },
  ];
  for (const s of sizes) {
    const ctx = await browser.newContext({ viewport: { width: s.w, height: s.h } });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      localStorage.setItem("dj-consent-v1", JSON.stringify({ analytics: false, v: 1, t: Date.now() }));
    });
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    await page.screenshot({ path: `screenshots/${PRE}-top-${s.name}.png` });
    for (const f of [0.4, 1]) {
      await scrollToSection(page, f);
      await page.screenshot({ path: `screenshots/${PRE}-conditions-${Math.round(f * 100)}-${s.name}.png` });
    }
    if (s.w === 390) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForTimeout(300);
      await page.click(".x-menu-btn");
      await page.waitForTimeout(900);
      await page.screenshot({ path: `screenshots/${PRE}-sheet-390.png` });
    }
    if (s.w === 1440) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForTimeout(300);
      await page.hover(".x-nav button");
      await page.waitForTimeout(900);
      await page.screenshot({ path: `screenshots/${PRE}-curtain-1440.png` });
      await page.evaluate(() => window.scrollTo({ top: 500, behavior: "instant" }));
      await page.waitForTimeout(500);
      await page.hover(".x-nav button");
      await page.waitForTimeout(900);
      await page.screenshot({ path: `screenshots/${PRE}-curtain-scrolled-1440.png` });
    }
    await ctx.close();
  }
  await browser.close();
  console.log("done");
})();
