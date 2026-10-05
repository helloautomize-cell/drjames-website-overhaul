/*
 * Conditions redesign screenshots + layout checks.
 *   node scripts/shots-conditions.cjs [baseUrl]
 * Output: shots/conditions/*.png
 */
const { chromium } = require("playwright");
const fs = require("fs");

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = "shots/conditions";
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

    await page.goto(`${BASE}/conditions/`, { waitUntil: "networkidle" });
    await page.getByRole("button",{name:"Decline"}).click({timeout:3000}).catch(()=>{});
    await page.waitForTimeout(600);
    await shot("index-1-top");
    await scrollTo(page, "#g-diabetes-metabolism");
    await shot("index-2-diabetes");
    await scrollTo(page, "#g-lungs-sleep-infections");
    await shot("index-3-ledger");
    await scrollTo(page, ".cx-band", 200);
    await shot("index-4-band");

    await page.goto(`${BASE}/conditions/diabetes-and-prediabetes/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await shot("child-1-hero");
    await scrollTo(page, "#who-should-see-a-physician-about-this");
    await shot("child-2-checklist");
    await scrollTo(page, "#how-to-prepare", Math.round(h * 0.36));
    await page.waitForTimeout(300);
    await shot("child-3-toc");
    await scrollTo(page, ".faq-c");
    await page.locator(".faq-c summary").first().click();
    await page.waitForTimeout(400);
    await shot("child-4-faq");
    await scrollTo(page, ".revbox", 200);
    await shot("child-5-reviewer-related");

    await page.goto(`${BASE}/conditions/chest-infections-and-pneumonia/`, { waitUntil: "networkidle" });
    await scrollTo(page, ".em-block", 200);
    await shot("child-6-callout");
    await ctx.close();
  }

  // layout checks
  for (const w of [1280, 1440, 1920]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/conditions/`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.querySelectorAll(".cx-reveal").forEach((e) => e.classList.add("on")));
    await page.waitForTimeout(800);
    const r = await page.evaluate(() => {
      const rows = [...document.querySelectorAll(".cx-group .cx-row")];
      const bad = rows.filter((x) => Math.round(x.getBoundingClientRect().height) !== 72).length;
      const wrap = rows.filter((x) => x.querySelector("b").getBoundingClientRect().height > 30).length;
      const clip = rows.filter((x) => { const b = x.querySelector("b"); return b.scrollWidth > b.clientWidth + 1; }).length;
      const names = [...document.querySelectorAll(".cx-tile b")].map((n) => ({
        t: n.textContent, over: n.scrollWidth > n.clientWidth + 1, h: Math.round(n.getBoundingClientRect().height), fs: getComputedStyle(n).fontSize,
      }));
      return { rows: rows.length, badHeight: bad, wrapped: wrap, clip, names };
    });
    console.log(w, JSON.stringify(r));
    await ctx.close();
  }
  await b.close();
})();
