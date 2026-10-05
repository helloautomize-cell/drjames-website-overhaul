/*
 * Hero clearance check: the pillar card (.x-pill) must never cover the
 * name plate (.x-plate) — its top edge stays at least 24px below the
 * plate's bottom edge at the four desktop viewports.
 *
 *   node scripts/check-hero-plate.cjs [baseUrl]
 *
 * Exits non-zero on any violation. Below 1100px the card is static under
 * the panel by design, so only the desktop sizes are checked.
 */
const { chromium } = require("playwright");

const BASE = process.argv[2] || "http://localhost:3000";
const SIZES = [
  [1280, 720],
  [1440, 900],
  [1920, 1080],
  [2560, 1440],
];
const GAP = 24;

(async () => {
  const b = await chromium.launch();
  let fail = 0;
  for (const [w, h] of SIZES) {
    const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
    await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
    // let the reveal animations settle and try each pillar state
    await p.waitForTimeout(1500);
    for (let i = 0; i < 4; i++) {
      await p.locator(".x-prow").nth(i).click();
      await p.waitForTimeout(350);
      const m = await p.evaluate(() => {
        const plate = document.querySelector(".x-plate").getBoundingClientRect();
        const pill = document.querySelector(".x-pill").getBoundingClientRect();
        return { plateBottom: plate.bottom, cardTop: pill.top, gap: pill.top - plate.bottom };
      });
      const ok = m.gap >= GAP;
      if (!ok) fail++;
      console.log(
        `${w}x${h} pillar ${i + 1}: plate bottom ${m.plateBottom.toFixed(0)}px, card top ${m.cardTop.toFixed(0)}px, gap ${m.gap.toFixed(0)}px ${ok ? "OK" : "FAIL"}`,
      );
    }
    await p.close();
  }
  await b.close();
  if (fail) {
    console.error(`\n${fail} viewport/pillar combos violate the ${GAP}px clearance rule`);
    process.exit(1);
  }
  console.log(`\nAll clear: card stays >=${GAP}px below the name plate at every checked size.`);
})();
