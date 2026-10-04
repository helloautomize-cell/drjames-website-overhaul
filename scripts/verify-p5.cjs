/* eslint-disable @typescript-eslint/no-require-imports */
// Phase 5 verification: booking form matrix, consent-gated GA4,
// click-to-load map, overflow. Run against `next start` on :4811.
const { chromium } = require("playwright");

const BASE = "http://localhost:4811";
// GA-dependent assertions only run when the build has a GA id:
// GA_TEST=1 node scripts/verify-p5.cjs
const GA_TEST = !!process.env.GA_TEST;
const L = [];
const ok = (name, pass, extra = "") =>
  L.push((pass ? "PASS" : "FAIL") + " " + name + (extra ? " — " + extra : ""));

// html{scroll-behavior:smooth} breaks Playwright actionability —
// force instant scrolling in every test context.
const noSmooth = (p) =>
  p.addInitScript(() => {
    document.addEventListener("DOMContentLoaded", () => {
      document.documentElement.style.scrollBehavior = "auto";
    });
  });

const FUTURE = (() => {
  const d = new Date(Date.now() + 10 * 86400000);
  return d.toISOString().slice(0, 10); // today + 10d, inside the 60d window
})();

async function fillValid(p, { u18 = false, guardian = "" } = {}) {
  await p.fill("#b-name", "Aisha Al Balushi");
  await p.fill("#b-mob", "91234567");
  await p.fill("#b-age", u18 ? "10" : "45");
  await p.selectOption("#b-ageu", "Years");
  await p.fill("#b-date", FUTURE);
  await p.selectOption("#b-time", "Morning");
  const tick = (id) =>
    p.evaluate(
      (i) => {
        const el = document.getElementById(i);
        el.checked = true;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      },
      id,
    );
  if (u18) {
    await tick("b-u18");
    if (guardian) await p.fill("#b-guardian", guardian);
  }
  await tick("b-consent");
}

async function dismissBanner(p) {
  const d = p.locator("text=Decline").first();
  if (await d.count()) await d.click({ timeout: 2000 }).catch(() => {});
}

(async () => {
  const b = await chromium.launch({ channel: "chrome" });

  // ---------- 1-5. Form matrix, JS enabled ----------
  {
    const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await c.newPage();
    await noSmooth(p);

    // invalid: mobile that fails the normaliser
    await p.goto(BASE + "/contact/");
    await dismissBanner(p);
    await p.waitForTimeout(3400);
    await p.fill("#b-name", "Test Patient");
    await p.fill("#b-mob", "123");
    await p.fill("#b-age", "45");
    await p.evaluate(()=>{const el=document.getElementById("b-consent");el.checked=true;el.dispatchEvent(new Event("input",{bubbles:true}));});
    await p.click('button[type="submit"]');
    await p.waitForTimeout(1800);
    const errBox = p.locator(".bform-errors");
    ok(
      "invalid submit → error summary",
      (await errBox.count()) === 1 &&
        (await errBox.textContent()).includes("mobile number"),
    );
    ok(
      "error summary receives focus",
      (await p.evaluate(() => document.activeElement?.className)) ===
        "bform-errors",
    );
    ok(
      "values preserved after failure",
      (await p.inputValue("#b-name")) === "Test Patient",
    );

    // under-18: box unticked + no guardian → both errors
    await p.goto(BASE + "/contact/");
    await p.waitForTimeout(3400);
    await p.fill("#b-name", "Child Patient");
    await p.fill("#b-mob", "91234567");
    await p.fill("#b-age", "10");
    await p.fill("#b-date", FUTURE);
    await p.evaluate(()=>{const el=document.getElementById("b-consent");el.checked=true;el.dispatchEvent(new Event("input",{bubbles:true}));});
    await p.click('button[type="submit"]');
    await p.waitForTimeout(1800);
    const u18txt = (await p.locator(".bform-errors").count())
      ? await p.locator(".bform-errors").textContent()
      : "";
    ok(
      "u18 unticked → under-18 + guardian errors",
      /parent or guardian must fill/i.test(u18txt) &&
        /guardian's name/i.test(u18txt),
      u18txt.slice(0, 120).replace(/\n/g, " "),
    );

    // under-18 with guardian → success
    await p.goto(BASE + "/contact/");
    await p.waitForTimeout(3400);
    await fillValid(p, { u18: true, guardian: "Said Al Balushi" });
    await p.click('button[type="submit"]');
    await p.waitForURL(/thank-you/, { timeout: 8000 }).catch(() => {});
    ok("u18 + guardian → thank-you", /thank-you/.test(p.url()), p.url());

    // honeypot → silent fake-success (redirect, no email path)
    await p.goto(BASE + "/contact/");
    await p.waitForTimeout(3400);
    await fillValid(p);
    await p.evaluate(() => {
      document.getElementById("b-website").value = "http://spam.example";
    });
    await p.click('button[type="submit"]');
    await p.waitForURL(/thank-you/, { timeout: 8000 }).catch(() => {});
    ok("honeypot → silent redirect", /thank-you/.test(p.url()), p.url());

    // fully valid → thank-you
    await p.goto(BASE + "/contact/");
    await p.waitForTimeout(3400);
    await fillValid(p);
    await p.click('button[type="submit"]');
    await p.waitForURL(/thank-you/, { timeout: 8000 }).catch(() => {});
    ok("valid submit → thank-you", /thank-you/.test(p.url()), p.url());
    await c.close();
  }

  // ---------- 6. JS disabled: progressive enhancement ----------
  {
    // Tall viewport: JS is off so smooth-scroll can't be disabled —
    // keep the whole form in view instead of scrolling.
    const c = await b.newContext({
      viewport: { width: 1440, height: 4200 },
      javaScriptEnabled: false,
    });
    const p = await c.newPage();
    await noSmooth(p);
    await p.goto(BASE + "/contact/");
    await fillValid(p);
    await p.click('button[type="submit"]');
    await p.waitForURL(/thank-you/, { timeout: 10000 }).catch(() => {});
    ok("JS off valid submit → thank-you", /thank-you/.test(p.url()), p.url());
    await c.close();
  }

  // ---------- 7. Reason prefill from a condition page ----------
  {
    const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await c.newPage();
    await noSmooth(p);
    await p.goto(BASE + "/conditions/preventive-check-ups/");
    await dismissBanner(p);
    await p.click('.pg-cta .book');
    await p.waitForURL(/contact/, { timeout: 6000 }).catch(() => {});
    await p.waitForTimeout(800);
    ok(
      "condition Book → ?reason=Check-up prefilled",
      (await p.inputValue("#b-reason")) === "Check-up",
      "url=" + p.url() + " reason=" + (await p.inputValue("#b-reason")),
    );
    await c.close();
  }

  // ---------- 8. Consent gating + delegated events + map ----------
  {
    const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await c.newPage();
    await noSmooth(p);
    const net = { ga: 0, maps: 0, ts: 0 };
    p.on("request", (r) => {
      const u = r.url();
      if (/googletagmanager|google-analytics|analytics\.google/.test(u)) net.ga++;
      if (/google\.com\/maps|maps\.google|maps\.app/.test(u)) net.maps++;
      if (/challenges\.cloudflare/.test(u)) net.ts++;
    });
    await p.goto(BASE + "/contact/");
    await p.waitForTimeout(2500);
    ok("no GA request before consent", net.ga === 0, "ga=" + net.ga);
    ok("no Maps request before click", net.maps === 0, "maps=" + net.maps);

    // Accept → GA loads
    await p.click("text=Accept");
    await p.waitForTimeout(1500);
    if (GA_TEST) ok("GA loads after consent", net.ga > 0, "ga=" + net.ga);
    else L.push("SKIP GA loads after consent — build has no GA id");

    // delegated events in dataLayer
    const events = async () =>
      p.evaluate(() =>
        (window.dataLayer || [])
          .filter((a) => Array.isArray(a) && a[0] === "event")
          .map((a) => a[1]),
      );
    // tel link is in the aside — dispatch a cancelable bubbling click
    // with a local preventDefault so the tel: navigation can't start
    // (a pending external nav swallows later input in the page).
    await p.evaluate(() => {
      const a = document.querySelector('a[href^="tel:"]');
      if (!a) return;
      a.addEventListener("click", (e) => e.preventDefault(), { once: true });
      a.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    await p.waitForTimeout(300);
    let evs = await events();
    if (GA_TEST)
      ok("call_click fired", evs.includes("call_click"), JSON.stringify(evs));
    else L.push("SKIP call_click — no GA id");

    // map click → iframe request + map_load
    const mapsBefore = net.maps;
    await p.click("text=Show map");
    await p.waitForTimeout(1500);
    evs = await events();
    if (GA_TEST)
      ok("map_load fired", evs.includes("map_load"), JSON.stringify(evs));
    else L.push("SKIP map_load — no GA id");
    ok("Maps request only after click", net.maps > mapsBefore, "maps=" + net.maps);

    // valid submit → /thank-you → generate_lead
    await p.goto(BASE + "/contact/");
    await p.waitForTimeout(3400);
    await fillValid(p);
    await p.click('button[type="submit"]');
    await p.waitForURL(/thank-you/, { timeout: 8000 }).catch(() => {});
    await p.waitForTimeout(800);
    evs = await events();
    if (GA_TEST)
      ok(
        "generate_lead on thank-you",
        evs.includes("generate_lead"),
        JSON.stringify(evs),
      );
    else L.push("SKIP generate_lead — no GA id");
    ok("Turnstile absent without keys", net.ts === 0, "ts=" + net.ts);
    await c.close();
  }

  // ---------- 9. Overflow on form pages ----------
  for (const w of [390, 768, 1024, 1440]) {
    for (const route of ["/contact/", "/thank-you/"]) {
      const c = await b.newContext({ viewport: { width: w, height: 844 } });
      const p = await c.newPage();
      await p.goto(BASE + route);
      await p.waitForTimeout(1000);
      const so = await p.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      ok(`overflow ${route} @${w}`, so === 0, so + "px");
      await c.close();
    }
  }

  await b.close();
  console.log(L.join("\n"));
  const fails = L.filter((l) => l.startsWith("FAIL"));
  console.log(`\n${L.length - fails.length}/${L.length} passed`);
  process.exit(fails.length ? 1 : 0);
})();
