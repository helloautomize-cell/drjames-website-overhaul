// Capture full-page screenshots of every route, desktop + mobile.
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

const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });

for (const route of ROUTES) {
  for (const [tag, w, h] of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    await p.addInitScript(() => {
      try { localStorage.setItem("dj-consent-v1", JSON.stringify({ analytics: false, ts: 1 })); } catch {}
    });
    await p.goto(`${BASE}${route}`, { waitUntil: "load" });
    await p.evaluate(() => document.fonts.ready);
    // content-visibility:auto skips IO delivery on fast scrolls — disable it
    // so every section lays out and the .on gates can fire
    await p.addStyleTag({ content: "*{content-visibility:visible!important}" });
    await p.evaluate(async () => {
      await new Promise((res) => {
        let y = 0; const step = () => {
          y += innerHeight; scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 60);
          else { scrollTo(0, 0); setTimeout(res, 400); }
        }; step();
      });
    });
    await p.addStyleTag({ content:
      "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}" });
    await p.waitForTimeout(500);
    await p.screenshot({ path: `${OUT}/${slug(route)}-${tag}.png`, fullPage: true });
    await ctx.close();
  }
  console.log(`${route}`);
}
await browser.close();
console.log("done ->", OUT);
