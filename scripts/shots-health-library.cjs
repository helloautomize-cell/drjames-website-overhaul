/*
 * Health Library redesign screenshots (index, guide, topic, home section).
 *   node scripts/shots-health-library.cjs [baseUrl]
 * Output: shots/health/*.png
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
  await page.waitForTimeout(700);
};

const decline = (page) =>
  page
    .getByRole("button", { name: "Decline" })
    .click({ timeout: 3000 })
    .catch(() => {});

(async () => {
  const b = await chromium.launch();
  for (const [w, h, tag] of [
    [1440, 900, "d"],
    [390, 844, "m"],
  ]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    const shot = (n) => page.screenshot({ path: `${OUT}/${tag}-${n}.png` });

    // ---------- Index ----------
    await page.goto(`${BASE}/health-library/`, { waitUntil: "networkidle" });
    await decline(page);
    await page.waitForTimeout(500);
    await shot("01-masthead");

    // sticky tabs (scroll past masthead)
    await scrollTo(page, ".hl-tabs", 300);
    await shot("02-tabs-stuck");

    // featured + list
    await scrollTo(page, ".hl-feat", 120);
    await shot("03-featured");
    await scrollTo(page, ".hl-all", 140);
    await shot("04-list");

    // search: result
    await scrollTo(page, ".hl-hero", 60);
    await page.locator(".hl-search input").fill("sleep");
    await page.waitForTimeout(600);
    await scrollTo(page, ".hl-all", 140);
    await shot("05-search-result");

    // search: no result
    await page.locator(".hl-search input").fill("zzzzz");
    await page.waitForTimeout(600);
    await scrollTo(page, ".hl-all", 140);
    await shot("06-search-empty");
    await page.locator(".hl-search input").fill("");
    await page.waitForTimeout(400);

    // closing band
    await scrollTo(page, ".hl-bandwrap", 200);
    await shot("07-closing");

    // ---------- Topic page ----------
    await page.goto(`${BASE}/health-library/topic/heart-blood-pressure/`, {
      waitUntil: "networkidle",
    });
    await decline(page);
    await page.waitForTimeout(400);
    await shot("08-topic");

    // ---------- Guide page ----------
    await page.goto(`${BASE}/health-library/heart-disease-warning-signs/`, {
      waitUntil: "networkidle",
    });
    await decline(page);
    await page.waitForTimeout(500);
    await shot("10-guide-header");

    await scrollTo(page, ".gd-quick", 170);
    await shot("11-quick-answer");

    // three-col body + margin note + active toc (scroll mid-article)
    await scrollTo(page, ".gd-note", 260);
    await shot("12-margin-note");

    await scrollTo(page, ".gd-em", 200);
    await shot("13-emergency");

    await scrollTo(page, ".gd-local", 160);
    await shot("14-local");

    await scrollTo(page, ".gd-ask", 160);
    await shot("15-questions");

    await scrollTo(page, ".gd-takeaways", 160);
    await shot("16-takeaways");

    await scrollTo(page, 'section[aria-label="Common questions"]', 160);
    const faq = page
      .locator('section[aria-label="Common questions"] details')
      .first();
    if (await faq.count()) {
      await faq.locator("summary").click();
      await page.waitForTimeout(400);
    }
    await shot("17-faq-open");

    await scrollTo(page, ".gd-sources", 160);
    await shot("18-sources");

    await scrollTo(page, ".revbox", 200);
    await shot("19-review");

    // condition card sits in the sidebar — grab it before leaving the article
    await scrollTo(page, ".gd-condcard", 300);
    await shot("19b-condcard");

    await scrollTo(page, ".gd-keep", 170);
    await shot("20-keep-reading");

    await scrollTo(page, ".gd-close", 180);
    await shot("21-guide-closing");

    // ---------- Home section ----------
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await decline(page);
    await page.waitForTimeout(400);
    await scrollTo(page, ".hl-home-sec", 120);
    await shot("30-home-library");

    await ctx.close();
  }
  await b.close();
  console.log("done");
})();
