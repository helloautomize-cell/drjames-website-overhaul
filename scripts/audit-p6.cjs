/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Phase 6 design-polish audit.
 * Sweeps every page at 390/768/1024/1440 and reports:
 *   overflow, clipped elements, orphan headings, tiny text, tap targets,
 *   duplicate adjacent chips, footer gap, stretched images, NAP/hours
 *   consistency, card-height spread, focus outline, console errors.
 * Usage: node scripts/audit-p6.cjs [--page=/about-dr-james/] [--shots]
 */
const { chromium } = require("playwright");

const BASE = process.env.BASE || "http://localhost:4811";
const WIDTHS = [390, 768, 1024, 1440];

const CONDS = "allergies anaemia asthma-and-breathing care-for-older-adults chest-infections-and-pneumonia diabetes-and-prediabetes digestive-problems fatty-liver fevers-and-infections heart-risk-assessment high-blood-pressure high-cholesterol joint-pain-and-arthritis kidney-problems preventive-check-ups sleep-apnea thyroid-disorders weight-management".split(" ");

const PAGES = [
  "/", "/about-dr-james/", "/contact/", "/thank-you/", "/your-visit/", "/faqs/",
  "/conditions/", ...CONDS.map((s) => `/conditions/${s}/`),
  "/health-library/",
  "/health-library/heart-disease-warning-signs/",
  "/health-library/sleep-disorders/",
  "/health-library/common-digestive-problems/",
  "/privacy-policy/", "/terms-of-use/", "/medical-disclaimer/",
  "/editorial-policy/", "/patient-rights/", "/appointments-and-cancellations/",
  "/accessibility/", "/nonexistent-page-404/", "/styleguide/",
];

const ONLY = process.argv.find((a) => a.startsWith("--page="))?.split("=")[1];
const pages = ONLY ? PAGES.filter((p) => p === ONLY || p.startsWith(ONLY)) : PAGES;
const SHOTS = process.argv.includes("--shots");

const results = [];

(async () => {
  const browser = await chromium.launch();
  for (const url of pages) {
    for (const w of WIDTHS) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
      const page = await ctx.newPage();
      const consoleErrs = [];
      page.on("console", (m) => { if (m.type() === "error") consoleErrs.push(m.text().slice(0, 140)); });
      page.on("pageerror", (e) => consoleErrs.push("PAGEERROR: " + String(e).slice(0, 140)));
      const resp = await page.goto(BASE + url, { waitUntil: "networkidle", timeout: 30000 }).catch(() => null);
      if (!resp) { results.push({ url, w, findings: ["NAV-FAIL"] }); await ctx.close(); continue; }
      const status = resp.status();
      await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
      await page.waitForTimeout(400);

      const r = await page.evaluate(() => {
        const out = {};
        const doc = document.documentElement;
        out.overflow = doc.scrollWidth - doc.clientWidth;
        out.status = null;

        // --- clipped text elements (horizontal) ---
        const clipped = [];
        document.querySelectorAll("main *").forEach((el) => {
          if (!(el instanceof HTMLElement)) return;
          const cs = getComputedStyle(el);
          if (cs.display === "none" || cs.visibility === "hidden") return;
          if (["auto", "scroll"].includes(cs.overflowX)) return;
          if (el.classList.contains("sr-only")) return; // intentional 1px clip
          if (el.tagName === "SUMMARY") return; // Chromium keeps an invisible 9px internal marker box; verified no visual clip
          if (el.scrollWidth > el.clientWidth + 2 && el.textContent.trim().length > 0 && el.children.length === 0) {
            clipped.push(`${el.tagName.toLowerCase()}.${String(el.className).split(" ")[0]}`);
          }
        });
        out.clipped = [...new Set(clipped)].slice(0, 6);

        // --- orphan headings (single word on last line) ---
        const orphans = [];
        document.querySelectorAll("main h1, main h2, main h3").forEach((h) => {
          const text = h.textContent.replace(/\s+/g, " ").trim();
          if (text.split(" ").length < 4) return;
          const words = [];
          const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
          let n;
          while ((n = walker.nextNode())) {
            const parts = n.textContent.split(/\s+/).filter(Boolean);
            let off = 0;
            for (const p of parts) {
              const idx = n.textContent.indexOf(p, off);
              off = idx + p.length;
              const range = document.createRange();
              range.setStart(n, idx); range.setEnd(n, off);
              const r = range.getBoundingClientRect();
              if (r.width > 0) words.push({ w: p, top: Math.round(r.top) });
            }
          }
          if (!words.length) return;
          // cluster words into rendered lines (4px tolerance kills subpixel noise)
          const lineTops = [];
          for (const t of words.map((x) => x.top).sort((a, b) => a - b)) {
            if (!lineTops.length || t - lineTops[lineTops.length - 1] > 4) lineTops.push(t);
          }
          if (lineTops.length < 2) return;
          const lastTop = lineTops[lineTops.length - 1];
          const lastLine = words.filter((x) => Math.abs(x.top - lastTop) <= 4);
          if (lastLine.length === 1) {
            orphans.push(`"${text.slice(0, 60)}" last:"${lastLine[0].w}"`);
          }
        });
        out.orphans = orphans.slice(0, 5);

        // --- tiny text ---
        const tiny = [];
        document.querySelectorAll("main *").forEach((el) => {
          if (!(el instanceof HTMLElement)) return;
          if (!el.childNodes.length || !el.textContent.trim()) return;
          if (el.children.length) return;
          if (!el.getClientRects().length) return; // hidden (display:none subtree)
          const txt = el.textContent.trim();
          if (txt.startsWith("[")) return; // [CONFIRM] / [year] dev markers
          if (/(^|\s)(k|eyebrow|confirm|badge)(\s|$)/.test(String(el.className))) return; // small-caps metadata
          const fs = parseFloat(getComputedStyle(el).fontSize);
          if (fs > 0 && fs < 12) tiny.push(`${el.tagName.toLowerCase()} ${fs}px "${txt.slice(0, 40)}"`);
        });
        out.tiny = [...new Set(tiny)].slice(0, 5);

        // --- tap targets (links/buttons in main) ---
        const small = [];
        if (window.innerWidth <= 1024) {
          document.querySelectorAll("main a, main button, main summary").forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) return;
            if (r.height < 24 || r.width < 24) small.push(`${el.tagName.toLowerCase()} ${Math.round(r.width)}x${Math.round(r.height)} "${(el.textContent || "").trim().slice(0, 30)}"`);
          });
        }
        out.smallTargets = [...new Set(small)].slice(0, 6);

        // --- duplicate adjacent chips ---
        const dupes = [];
        document.querySelectorAll("main *").forEach((el) => {
          const kids = [...el.children];
          for (let i = 1; i < kids.length; i++) {
            const a = kids[i - 1].textContent.trim(), b = kids[i].textContent.trim();
            if (a && a === b && a.length < 60 && /chip|pill|badge|tag/i.test(String(kids[i].className))) dupes.push(a.slice(0, 40));
          }
        });
        out.dupes = [...new Set(dupes)].slice(0, 4);

        // --- footer gap ---
        const footer = document.querySelector("footer");
        const main = document.querySelector("main");
        if (footer && main) {
          const fr = footer.getBoundingClientRect();
          const kids = [...main.children].filter((c) => {
            const r = c.getBoundingClientRect(); return r.height > 4;
          });
          const last = kids[kids.length - 1];
          if (last) out.footerGap = Math.round(fr.top - last.getBoundingClientRect().bottom);
        }

        // --- stretched images ---
        const stretched = [];
        document.querySelectorAll("main img").forEach((img) => {
          if (!img.naturalWidth || !img.naturalHeight) return;
          // offsetW/H unaffected by 3D transforms (hero cube faces foreshorten getBoundingClientRect)
          const w = img.offsetWidth, h = img.offsetHeight;
          if (w < 40 || h < 40) return;
          const nat = img.naturalWidth / img.naturalHeight;
          const rend = w / h;
          if (Math.abs(rend / nat - 1) > 0.12 && getComputedStyle(img).objectFit === "fill") {
            stretched.push(`${img.src.split("/").pop()} nat:${nat.toFixed(2)} rend:${rend.toFixed(2)}`);
          }
        });
        out.stretched = stretched.slice(0, 5);

        // --- NAP / hours strings ---
        const body = document.body.innerText;
        out.phones = [...new Set(body.match(/\+968[\s\u00A0]*9\d{3}[\s\u00A0]*\d{4}/g) || [])];
        out.hours = [...new Set((body.match(/(Sat|Mon|Tue|Wed|Thu|Fri|Sun)[a-z]* (to|-) [A-Z][a-z]+[^\n]{0,40}/g) || []).map((s) => s.trim()))];
        out.closed = [...new Set((body.match(/[A-Z][a-z]+ (closed|Closed)[^\n]{0,30}/g) || []).map((s) => s.trim()))];

        // --- card-height spread within grids ---
        const spreads = [];
        document.querySelectorAll(".info-cards, .testi-grid, .glass-cards, [class*='cards']").forEach((g) => {
          const rows = {};
          [...g.children].forEach((c) => {
            const r = c.getBoundingClientRect();
            if (r.height < 10) return;
            const top = Math.round(r.top / 4) * 4;
            (rows[top] = rows[top] || []).push(r.height);
          });
          for (const hs of Object.values(rows)) {
            if (hs.length > 1 && Math.max(...hs) - Math.min(...hs) > 10) {
              spreads.push(`${String(g.className).split(" ")[0]} ${Math.min(...hs)}-${Math.max(...hs)}px`);
            }
          }
        });
        out.spreads = [...new Set(spreads)].slice(0, 5);

        // --- hero above fold (mobile) ---
        if (window.innerWidth <= 430) {
          const h1 = document.querySelector("main h1");
          if (h1) out.h1Top = Math.round(h1.getBoundingClientRect().top);
        }

        // --- book CTA visible in first 2 viewports on mobile ---
        if (window.innerWidth <= 430) {
          const links = [...document.querySelectorAll("a,button")];
          const cta = links.find((a) => /book|appointment/i.test(a.textContent || "") && a.getBoundingClientRect().height > 0);
          out.bookTop = cta ? Math.round(cta.getBoundingClientRect().top) : -1;
        }

        return out;
      });

      // focus outline probe on the first nav link
      const focus = await page.evaluate(() => {
        const a = document.querySelector("header a[href], .hdr a[href], a");
        if (!a) return null;
        a.focus();
        const cs = getComputedStyle(a);
        return { outline: cs.outlineStyle, width: cs.outlineWidth, shadow: cs.boxShadow !== "none" };
      });

      const findings = [];
      if (status >= 400 && !url.includes("nonexistent")) findings.push(`HTTP ${status}`);
      if (r.overflow > 0) findings.push(`overflow ${r.overflow}px`);
      r.clipped.forEach((c) => findings.push(`clip ${c}`));
      r.orphans.forEach((o) => findings.push(`orphan ${o}`));
      r.tiny.forEach((t) => findings.push(`tiny ${t}`));
      r.smallTargets.forEach((t) => findings.push(`tap ${t}`));
      r.dupes.forEach((d) => findings.push(`dupe "${d}"`));
      if (r.footerGap > 140) findings.push(`footerGap ${r.footerGap}px`);
      r.stretched.forEach((s) => findings.push(`stretch ${s}`));
      r.spreads.forEach((s) => findings.push(`cardSpread ${s}`));
      if (r.h1Top !== undefined && r.h1Top > 700) findings.push(`h1BelowFold ${r.h1Top}px`);
      if (r.bookTop !== undefined && (r.bookTop < 0 || r.bookTop > 1800)) findings.push(`ctaDeep ${r.bookTop}px`);
      if (focus && focus.outline === "none" && !focus.shadow) findings.push("focusOutline none");
      consoleErrs.forEach((e) => {
        if (url.includes("nonexistent") && /404|ERR_|Failed to load/i.test(e)) return; // expected 404
        findings.push(`console ${e}`);
      });
      const HOURS_OK = new Set(["Sat to Thu, 8:30 am to 9 pm", "Sat to Thu, 8:30 am to 9 pm.", "Saturday to Thursday, 8:30 am to 9 pm", "Saturday to Thursday, 8:30 am to 9 pm."]);
      const CLOSED_OK = new Set(["Friday closed", "Friday: Closed", "Friday closed."]);
      r.phones.forEach((p) => { if (p.replace(/\s/g, "") !== "+96897510975") findings.push(`phoneVar "${p}"`); });
      r.hours.forEach((h) => { if (!HOURS_OK.has(h.replace(/(?<=\d pm)\..*$/, "."))) findings.push(`hours "${h}"`); });
      r.closed.forEach((c) => { if (!CLOSED_OK.has(c)) findings.push(`closed "${c}"`); });

      results.push({ url, w, findings, phones: r.phones });
      if (SHOTS) await page.screenshot({ path: `screenshots/p6-${url.replace(/\//g, "_").replace(/^_+|_+$/g, "") || "home"}-${w}.png`, fullPage: true });
      await ctx.close();
    }
  }

  let any = 0;
  for (const r of results) {
    if (!r.findings.length) continue;
    any++;
    console.log(`\n${r.url} @${r.w}`);
    r.findings.forEach((f) => console.log("  " + f));
  }
  console.log(`\n=== ${any} page/width combos with findings (${results.length} scanned) ===`);
  await browser.close();
})();
