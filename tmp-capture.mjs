// Deterministic full-page screenshots of every route, desktop + mobile.
// Usage: node tmp-capture.mjs <outdir> [base]
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const OUT = process.argv[2] || "shots/before";
const BASE = process.argv[3] || "http://localhost:3111";

const CONDITIONS = [
  "diabetes-and-prediabetes","high-cholesterol","weight-management","thyroid-disorders",
  "high-blood-pressure","heart-risk-assessment","asthma-and-breathing",
  "chest-infections-and-pneumonia","sleep-apnea","allergies","fevers-and-infections",
  "kidney-problems","fatty-liver","digestive-problems","care-for-older-adults",
  "preventive-check-ups","joint-pain-and-arthritis","anaemia",
];
const ROUTES = [
  "/", "/about-dr-james/", "/contact/", "/your-visit/", "/faqs/", "/conditions/",
  "/health-library/", "/thank-you/", "/does-not-exist-404/",
  ...CONDITIONS.map((s) => `/conditions/${s}/`),
  "/health-library/common-digestive-problems/",
  "/health-library/heart-disease-warning-signs/",
  "/health-library/sleep-disorders/",
  "/health-library/topic/heart-blood-pressure/",
  "/health-library/topic/lungs-sleep-infections/",
  "/health-library/topic/kidney-liver-gut/",
  "/accessibility/", "/appointments-and-cancellations/", "/editorial-policy/",
  "/medical-disclaimer/", "/patient-rights/", "/privacy-policy/", "/terms-of-use/",
];
const VIEWPORTS = [
  ["d", 1440, 900],
  ["m", 390, 844],
];
const slug = (r) => (r === "/" ? "home" : r.replace(/^\/|\/$/g, "").replace(/\//g, "_"));

const browser = await chromium.launch({
  args: [
    "--disable-lcd-text",
    "--font-render-hinting=none",
    "--force-color-profile=srgb",
    "--force-device-scale-factor=1",
    "--disable-gpu",
  ],
});
await mkdir(OUT, { recursive: true });

for (const route of ROUTES) {
  for (const [tag, w, h] of VIEWPORTS) {
    const shot = `${OUT}/${slug(route)}-${tag}.png`;
    try {
      await capture(browser, route, w, h, shot);
    } catch (e) {
      console.log(`FAIL ${route} ${tag}: ${String(e).slice(0, 160)}`);
    }
  }
  console.log(`${route}`);
}
await browser.close();
console.log("done ->", OUT);

async function capture(browser, route, w, h, shot) {
  {
    const ctx = await browser.newContext({
      viewport: { width: w, height: h },
      // freeze anything else that varies run to run
      reducedMotion: "reduce",
    });
    const p = await ctx.newPage();
    await p.addInitScript(() => {
      try { localStorage.setItem("dj-consent-v1", JSON.stringify({ analytics: false, ts: 1 })); } catch {}
      // Every IntersectionObserver target reports as intersecting immediately,
      // so all .on reveal gates latch at mount — no scroll timing involved.
      window.IntersectionObserver = class {
        constructor(cb) { this.cb = cb; }
        observe(t) {
          this.cb([{ isIntersecting: true, target: t, intersectionRatio: 1,
                     boundingClientRect: t.getBoundingClientRect(),
                     intersectionRect: t.getBoundingClientRect() }], this);
        }
        unobserve() {} disconnect() {} takeRecords() { return []; }
      };
    });
    await p.goto(`${BASE}${route}`, { waitUntil: "load" });
    // freeze motion + let lazy sections lay out fully
    await p.addStyleTag({ content:
      "*{content-visibility:visible!important;contain-intrinsic-size:auto!important}" +
      "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}" });
    // sweep the page once so lazy <img> + lazily-used fonts below the fold
    // actually fetch+decode before we wait on them
    await p.evaluate(async () => {
      await new Promise((res) => {
        let y = 0; const step = () => {
          y += innerHeight * 0.8; scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 50);
          else { scrollTo(0, 0); setTimeout(res, 250); }
        }; step();
      });
    });
    // images all decoded
    await p.evaluate(() => Promise.race([
      Promise.all(Array.from(document.images).map((i) =>
        i.complete ? i.decode().catch(() => 0) : new Promise((r) => { i.onload = i.onerror = r; }))),
      new Promise((r) => setTimeout(r, 8000)),
    ]));
    // network quiet, then force-load every font face and wait for zero pending
    await p.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    await p.evaluate(async () => {
      await Promise.all(Array.from(document.fonts).map((f) => f.load().catch(() => f)));
      await document.fonts.ready;
      for (let i = 0; i < 20 && document.fonts.status !== "loaded"; i++)
        await new Promise((r) => setTimeout(r, 150));
    });
    await p.waitForTimeout(600);
    await p.screenshot({ path: shot, fullPage: true });
    await ctx.close();
  }
}
