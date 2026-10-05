/*
 * Sticky-element clearance: every element that sticks below the floating
 * header must keep its top edge at least 16px below the bottom of .x-bar
 * once the header is in its scrolled state.
 *
 *   node scripts/check-sticky-nav.cjs [baseUrl]
 *
 * Exits non-zero on any violation. Elements that do not exist on a page
 * are skipped; .x-stage (full-height conditions stage) is intentionally
 * not checked.
 */
const { chromium } = require("playwright");

const BASE = process.argv[2] || "http://localhost:3000";
const SIZES = [
  [1280, 720],
  [1440, 900],
  [1920, 1080],
];
const GAP = 16;
// page -> sticky selectors to probe (scroll into the element's section first)
const PAGES = [
  ["/", [".trk-side", ".rd-intro"]],
  ["/about-dr-james/", [".cl-photos"]],
  ["/conditions/diabetes-and-prediabetes/", [".pg-aside"]],
  ["/contact/", [".pg-aside"]],
];

(async () => {
  const b = await chromium.launch();
  let fail = 0;
  for (const [w, h] of SIZES) {
    for (const [path, sels] of PAGES) {
      const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
      await p.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
      await p.waitForTimeout(1200);
      for (const sel of sels) {
        const r = await p.evaluate(async (s) => {
          const el = document.querySelector(s);
          if (!el) return null;
          const host = el.closest("section, .tracker, .pg-grid, .rd-grid, .cl") || el.parentElement;
          const hostTop = host.getBoundingClientRect().top + scrollY;
          const hostH = host.offsetHeight;
          // sweep the section; keep only samples where the element is stuck
          // or approaching (its bottom still has room inside the host).
          // Released samples (element sliding out at the section end) are
          // normal in-flow content, not a header violation.
          // Sample the element's viewport top while scrolling through the
          // section. A stuck element holds a constant top across consecutive
          // samples (the plateau); approaching/released values keep moving.
          const tops = [];
          for (let f = 0.02; f <= 1; f += 0.045) {
            scrollTo(0, Math.max(0, hostTop + hostH * f - innerHeight * 0.5));
            await new Promise((r) => setTimeout(r, 240));
            tops.push(el.getBoundingClientRect().top);
          }
          // longest run of (nearly) equal tops = the parked offset
          let parked = null,
            best = 0,
            run = 1;
          for (let i = 1; i < tops.length; i++) {
            if (Math.abs(tops[i] - tops[i - 1]) < 3) {
              run++;
              if (run > best) {
                best = run;
                parked = tops[i];
              }
            } else run = 1;
          }
          if (parked === null) return { skipped: true };
          const bar = document.querySelector(".x-bar")?.getBoundingClientRect();
          return bar ? { gap: Math.round(parked - bar.bottom), elTop: Math.round(parked), barBottom: Math.round(bar.bottom) } : null;
        }, sel);
        if (!r || r.skipped) {
          console.log(`${w}x${h} ${path} ${sel}: not found / never sticks — skipped`);
          continue;
        }
        const ok = r.gap >= GAP;
        if (!ok) fail++;
        console.log(
          `${w}x${h} ${path} ${sel}: bar bottom ${r.barBottom}px, parked top ${r.elTop}px, gap ${r.gap}px ${ok ? "OK" : "FAIL"}`,
        );
      }
      await p.close();
    }
  }
  await b.close();
  if (fail) {
    console.error(`\n${fail} violation(s): sticky content enters the header zone.`);
    process.exit(1);
  }
  console.log("\nAll clear: sticky elements stay below the capsule at every checked size.");
})();
