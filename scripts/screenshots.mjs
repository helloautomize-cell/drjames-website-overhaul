/**
 * Screenshots of key pages at the required breakpoints (390, 768, 1024, 1440).
 * Uses the system Chrome via playwright; saves to screenshots/.
 * Usage: node scripts/screenshots.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.argv[2] || "http://localhost:4811";
const OUT = "screenshots";
const PAGES = ["/", "/styleguide"];
const SIZES = [
  [390, 844],
  [768, 1024],
  [1024, 768],
  [1440, 900],
];

const browser = await chromium.launch({ channel: "chrome" });
await mkdir(OUT, { recursive: true });

for (const page of PAGES) {
  for (const [w, h] of SIZES) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    const errors = [];
    p.on("pageerror", (e) => errors.push(String(e)));
    p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await p.goto(`${BASE}${page}`, { waitUntil: "load" });
    await p.waitForLoadState("domcontentloaded");
    await p.waitForTimeout(2500);
    const overflow = await p.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    const name = `${OUT}/${page === "/" ? "home" : page.replace(/\//g, "_").slice(1)}-${w}.png`;
    await p.screenshot({ path: name, fullPage: page === "/" });
    console.log(
      `${name}  overflow-x: ${overflow}px${errors.length ? `  console errors: ${errors.join(" | ")}` : ""}`,
    );
    await ctx.close();
  }
}
await browser.close();
console.log("done");
