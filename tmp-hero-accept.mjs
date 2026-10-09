// Hero-cutout acceptance capture.
//   node tmp-hero-accept.mjs [base]
// Screenshots of the hero at the six spec viewports, two orbit angles each
// (2nd shot is hover-paused at a later angle), plus:
//  - .flt.f1 vs [data-face-box] intersection check (1280x720, 1920x1080)
//  - hair-top as % of .sys height, dock clearance on mobile
//  - /_next/image network log for the portrait at DPR 1 and 2
//  - 200% crop of the face box at 1440x900 DPR 2
//  - header data-theme + scrolled scrim/capsule check
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.argv[2] || "http://localhost:3111";
const OUT = "shots-hero";
await mkdir(OUT, { recursive: true });

const VIEWS = [
  ["1280x720", 1280, 720],
  ["1440x900", 1440, 900],
  ["1920x1080", 1920, 1080],
  ["768x1024", 768, 1024],
  ["390x844", 390, 844],
  ["360x740", 360, 740],
];

const rect = (el) => {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), top: +r.top.toFixed(1), right: +r.right.toFixed(1), bottom: +r.bottom.toFixed(1), left: +r.left.toFixed(1) };
};
const overlap = (a, b) => a && b && !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);

const browser = await chromium.launch();
const report = [];

const seedConsent = (ctx) => ctx.addInitScript(() => {
  try { localStorage.setItem("dj-consent-v1", JSON.stringify({ analytics: false, ts: 1 })); } catch {}
});

for (const [tag, w, h] of VIEWS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  await seedConsent(ctx);
  const p = await ctx.newPage();
  await p.goto(`${BASE}/`, { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}/hero-${tag}-a.png` });
  await p.waitForTimeout(9000); // keep orbiting -> second angle
  await p.hover(".sys");        // pauses .orbring rotation
  await p.waitForTimeout(350);
  await p.screenshot({ path: `${OUT}/hero-${tag}-b.png` });

  const m = await p.evaluate(() => {
    const r = (el) => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { top: b.top, right: b.right, bottom: b.bottom, left: b.left, w: b.width, h: b.height };
    };
    const sys = r(document.querySelector(".sys"));
    const core = r(document.querySelector(".core"));
    const img = document.querySelector(".core-img");
    const face = r(document.querySelector("[data-face-box]"));
    const f1 = r(document.querySelector(".flt.f1"));
    const f2 = r(document.querySelector(".flt.f2"));
    const f1vis = getComputedStyle(document.querySelector(".flt.f1")).display !== "none";
    const dockEl = document.querySelector(".x-dock");
    const dock = getComputedStyle(dockEl).display !== "none" ? r(dockEl) : null;
    const mchip = getComputedStyle(document.querySelector(".mchip") || document.body).display !== "none";
    const hdr = document.querySelector(".x-hdr");
    return {
      sys, core, face, f1: f1vis ? f1 : null, f2: f2 && f1vis ? f2 : null,
      dock, mchip,
      theme: hdr.dataset.theme,
      imgNatural: img ? `${img.naturalWidth}x${img.naturalHeight}` : null,
      imgSrc: img ? img.currentSrc.split("?")[1] : null,
      imgFetch: img ? img.getAttribute("fetchpriority") || img.fetchPriority : null,
      imgLoading: img ? img.getAttribute("loading") : null,
      h1Lines: null,
    };
  });
  m.viewport = tag;
  report.push(m);
  await ctx.close();
}

console.log("\n===== GEOMETRY =====");
let fail = 0;
for (const m of report) {
  const hairTop = m.sys && m.face ? (((m.face.top - m.sys.top) / m.sys.h) * 100).toFixed(1) : "n/a";
  const f1hit = m.f1 && m.face ? overlap(m.f1, m.face) : false;
  const dockClear = m.dock ? (m.sys.bottom <= m.dock.top + 1 ? "CLEAR" : `OVERLAP by ${(m.sys.bottom - m.dock.top).toFixed(0)}px`) : "no-dock";
  if (f1hit) fail++;
  console.log(`${m.viewport}: hairTop=${hairTop}% sys=${m.sys.w}x${m.sys.h}@${m.sys.left},${m.sys.top} core=${m.core.w}x${m.core.h} f1∩face=${f1hit} dock=${dockClear} mchip=${m.mchip} theme=${m.theme} img=${m.imgNatural} fetch=${m.imgFetch} loading=${m.imgLoading}`);
  console.log(`   src ?${m.imgSrc}`);
}

// scrolled-state check on mobile + desktop
for (const [tag, w, h] of [["390x844", 390, 844], ["1440x900", 1440, 900]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  await seedConsent(ctx);
  const p = await ctx.newPage();
  await p.goto(`${BASE}/`, { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(1200);
  await p.evaluate(() => scrollTo(0, 500));
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${OUT}/scrolled-${tag}.png` });
  const s = await p.evaluate(() => {
    const bar = getComputedStyle(document.querySelector(".x-bar"));
    const hdr = document.querySelector(".x-hdr");
    const scrim = getComputedStyle(hdr, "::before");
    return { theme: hdr.dataset.theme, barBg: bar.backgroundColor, barBlur: bar.backdropFilter || bar.webkitBackdropFilter, scrimOn: scrim.content !== "none" ? scrim.opacity : "no-scrim" };
  });
  console.log(`scrolled ${tag}: theme=${s.theme} barBg=${s.barBg} blur=${s.barBlur} scrim=${s.scrimOn}`);
  await ctx.close();
}

// 200% face crop at 1440x900, deviceScaleFactor 2
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await seedConsent(ctx);
  const p = await ctx.newPage();
  await p.goto(`${BASE}/`, { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(1500);
  const box = await p.locator("[data-face-box]").boundingBox();
  await p.screenshot({ path: `${OUT}/face-crop-1440x900@2x.png`, clip: box });
  await ctx.close();
}

// network: portrait requests at DPR1 and DPR2
for (const dpr of [1, 2]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: dpr });
  await seedConsent(ctx);
  const p = await ctx.newPage();
  const reqs = [];
  p.on("response", async (res) => {
    const u = res.url();
    if (!u.includes("/_next/image")) return;
    let len = 0;
    try { len = (await res.body()).length; } catch {}
    reqs.push({ url: decodeURIComponent(u.split("?")[1] || u), status: res.status(), type: res.headers()["content-type"], bytes: len });
  });
  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  console.log(`\n_next/image requests @1440x900 DPR${dpr}:`);
  reqs.forEach((r) => console.log(`  ${r.status} ${r.type} ${r.bytes}B  ?${r.url}`));
  await ctx.close();
}

if (fail) { console.error(`\n${fail} face/.flt.f1 overlaps`); process.exit(1); }
console.log("\ndone ->", OUT);
await browser.close();
