/* TOC active-state + condcard re-shot */
const { chromium } = require("playwright");
const BASE = process.argv[2] || "http://localhost:3000";
(async () => {
  const b = await chromium.launch();
  for (const [w, h, tag] of [
    [1440, 900, "d"],
    [390, 844, "m"],
  ]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/health-library/heart-disease-warning-signs/`, {
      waitUntil: "networkidle",
    });
    await page
      .getByRole("button", { name: "Decline" })
      .click({ timeout: 3000 })
      .catch(() => {});
    await page.waitForTimeout(800);
    // scroll the 4th H2 ("What raises the odds") to ~30% viewport
    const ok = await page.evaluate(() => {
      const hs = [...document.querySelectorAll("h2[id]")];
      const t = hs.find((x) => x.textContent?.includes("raises the odds"));
      if (!t) return false;
      window.scrollTo({
        top: t.getBoundingClientRect().top + window.scrollY - 200,
        behavior: "instant",
      });
      return true;
    });
    await page.waitForTimeout(900);
    const active = await page.evaluate(
      () => document.querySelector(".gd-toc a.on")?.textContent?.trim(),
    );
    console.log(`${tag} scroll ok=${ok} active toc: ${active}`);
    await page.screenshot({ path: `shots/health/${tag}-fix-toc-active.png` });
    await ctx.close();
  }
  await b.close();
})();
