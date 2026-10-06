#!/usr/bin/env node
/**
 * Step 0 + aesthetic pass: read design/source-images/doctor/*, grade everything
 * to one palette-matched look, then emit art-directed crops in AVIF + WebP + JPG
 * into public/images/doctor/. Also builds _graded-contact-sheet.jpg for review.
 *
 *   node scripts/prepare-images.mjs
 *
 * Grade (same for every photo, tuned to navy #0F1E30 / paper #F3F1EB /
 * gold #C9A66B / teal #2D6A6B):
 *   1. auto-levels, clip 0.5% shadows/highlights        (normalise)
 *   2. midtone normalisation — mean luma driven to the set median
 *   3. warm highlights (+3.5% R, +1% G, -3% B via recomb)
 *   4. navy-tinted shadows — #0F1E30 soft-light @ ~6%
 *   5. S-curve contrast +8%, saturation -5%
 *   6. sharpen sigma 0.6 — applied AFTER each resize
 * d01-hero-cutout.png skips the grade (warm tone only) and gets the
 * fringe-clean + 1px alpha erode + 0.5px feather instead.
 */
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, "design/source-images/doctor");
const OUT = path.join(ROOT, "public/images/doctor");
const SHEET = path.join(ROOT, "design/source-images/_graded-contact-sheet.jpg");
const MANIFEST = path.join(ROOT, "design/image-manifest.json");
const NAVY = { r: 15, g: 30, b: 48 }; // #0F1E30
const WARM = [
  [1.035, 0.0, 0.0],
  [0.0, 1.01, 0.0],
  [0.0, 0.0, 0.97],
];

/* placement plan (IMAGE-MAP.md): which crops each file needs */
const PLAN = {
  "d01-hero": { kind: "bleed" }, // 16:9 2400w + 1600w
  "d06-corridor": { kind: "bleed" },
  "d02-portrait": { kind: "portrait" }, // 2:3 @1600h + @1000h
  "d12-candid": { kind: "portrait" },
  "d04-headshot": { kind: "head" }, // squares + circle-safe
  "d03-consultation": { kind: "card" }, // 3:2 1800w + 1200w + 4:5 mobile
  "d05-results": { kind: "card" },
  "d07-welcome": { kind: "card" },
  "d08-blood-sugar": { kind: "card" },
  "d09-blood-pressure": { kind: "card" },
  "d10-lungs": { kind: "card" },
  "d11-leadership": { kind: "card" },
};
const CROPS = {
  bleed: [
    { tag: "2400w", w: 2400, h: 1350 },
    { tag: "1600w", w: 1600, h: 900 },
  ],
  card: [
    { tag: "1800w", w: 1800, h: 1200 },
    { tag: "1200w", w: 1200, h: 800 },
    { tag: "4x5-1000w", w: 1000, h: 1250 },
  ],
  portrait: [
    { tag: "1600h", w: 1067, h: 1600 },
    { tag: "1000h", w: 667, h: 1000 },
  ],
  head: [
    { tag: "800sq", w: 800, h: 800 },
    { tag: "400sq", w: 400, h: 400 },
    { tag: "160sq", w: 160, h: 160 },
    { tag: "800sq-circle", w: 800, h: 800, circle: true },
  ],
};

const log = [];
const kb = (b) => `${(b / 1024).toFixed(0)}kB`;

/* ---------- grade helpers ---------- */
const luma = (stats) =>
  0.2126 * stats.channels[0].mean + 0.7152 * stats.channels[1].mean + 0.0722 * stats.channels[2].mean;

function grade(img, { brightness = 1, width, height } = {}) {
  let g = img
    .normalise({ lower: 0.5, upper: 99.5 }) // auto-levels
    .modulate({ brightness, saturation: 0.95 })
    .recomb(WARM); // warm highlights
  // navy-tinted shadows, ~6% soft-light — overlay must match output size
  g = g.composite([
    {
      input: { create: { width, height, channels: 4, background: { ...NAVY, alpha: 0.06 } } },
      blend: "soft-light",
    },
  ]);
  // S-curve contrast +8% about the midpoint
  return g.linear(1.08, -10.2);
}
/* ---------- emit one resize in 3 formats ---------- */
const manifest = {};
async function emit(img, base, tag, w, h, note = "") {
  const name = tag ? `${base}-${tag}` : base;
  const pipe = img.clone().resize({ width: w, height: h, fit: "cover", position: "attention" }).sharpen({ sigma: 0.6 });
  const meta = {};
  for (const [ext, fn] of [
    ["avif", (p) => p.avif({ quality: 62, effort: 5 })],
    ["webp", (p) => p.webp({ quality: 80 })],
    ["jpg", (p) => p.jpeg({ quality: 82, mozjpeg: true })],
  ]) {
    const file = `${name}.${ext}`;
    const buf = await fn(pipe.clone()).toBuffer();
    writeFileSync(path.join(OUT, file), buf);
    meta[ext] = { file: `images/doctor/${file}`, bytes: buf.length };
  }
  (manifest[base] ||= { outputs: [] }).outputs.push({ name, w, h, note, ...meta });
}

/* ---------- main ---------- */
mkdirSync(OUT, { recursive: true });
const files = readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f) && !f.startsWith("_"));
if (!files.length) { console.error(`no source images in ${SRC}`); process.exit(1); }

/* pass 1: normalised luminance per photo -> set median drives midtone match */
const lumas = {};
for (const f of files) {
  if (f.endsWith("cutout.png")) continue;
  const stats = await sharp(path.join(SRC, f)).normalise({ lower: 0.5, upper: 99.5 }).stats();
  lumas[f] = luma(stats);
}
const vals = Object.values(lumas).sort((a, b) => a - b);
const target = vals[Math.floor(vals.length / 2)];

for (const f of files) {
  const src = path.join(SRC, f);
  const base = f.replace(/\.(jpe?g|png)$/i, "");
  const before = statSync(src).size;
  const meta0 = await sharp(src).metadata();
  const isCutout = f.endsWith("cutout.png");

  if (isCutout) {
    /* transparent PNG: no grade, no raw-pixel surgery — a gentle warm modulate
       only (recomb on RGBA corrupts the channel layout). */
    const wpng = await sharp(src).modulate({ hue: -3, saturation: 1.02 }).png().toBuffer();
    const wwebp = await sharp(src).modulate({ hue: -3, saturation: 1.02 }).webp({ quality: 90 }).toBuffer();
    writeFileSync(path.join(OUT, `${base}.png`), wpng);
    writeFileSync(path.join(OUT, `${base}.webp`), wwebp);
    manifest[base] = { outputs: [{ name: base, w: meta0.width, h: meta0.height, note: "cutout, warm tone only", png: { file: `images/doctor/${base}.png`, bytes: wpng.length }, webp: { file: `images/doctor/${base}.webp`, bytes: wwebp.length } }] };
    log.push(`${f}: ${kb(before)} -> png ${kb(wpng.length)} webp ${kb(wwebp.length)}`);
    continue;
  }

  /* upscale: landscape <2400w / portrait <2000h -> 2x lanczos3 */
  let img = sharp(src);
  const portrait = meta0.height >= meta0.width;
  const tooSmall = portrait ? meta0.height < 2000 : meta0.width < 2400;
  if (tooSmall) img = img.resize({ width: meta0.width * 2, height: meta0.height * 2, kernel: "lanczos3" });

  const bright = Math.min(1.1, Math.max(0.9, target / lumas[f]));
  /* bake the grade (incl. navy-shadow composite) to a real buffer so later
     crop resizes never conflict with the overlay dimensions */
  const gradedBuf = await grade(img, {
    brightness: bright,
    width: tooSmall ? meta0.width * 2 : meta0.width,
    height: tooSmall ? meta0.height * 2 : meta0.height,
  }).png().toBuffer();
  const graded = sharp(gradedBuf);
  const gMeta = await graded.metadata();
  const gW = gMeta.width, gH = gMeta.height;

  /* base export = graded + upscaled, native aspect, full detail */
  await emitBase(graded, base, gW, gH, portrait);

  /* art-directed crops */
  for (const c of CROPS[PLAN[base].kind]) {
    if (c.w > gW || c.h > gH) { log.push(`  ! skip ${base}-${c.tag} (source ${gW}x${gH} too small)`); continue; }
    await emit(graded, base, c.tag, c.w, c.h, c.circle ? "circle-safe (attention crop)" : "");
  }
  const outs = manifest[base].outputs.map((o) => `${o.name}(${o.w}x${o.h})`).join(" ");
  log.push(`${f}: ${kb(before)} ${meta0.width}x${meta0.height}${tooSmall ? " ->2x" : ""} brightness x${bright.toFixed(2)}\n   ${outs}`);
}

async function emitBase(img, base, w, h, portrait) {
  const pipe = img.clone().sharpen({ sigma: 0.6 });
  const meta = {};
  for (const [ext, fn] of [
    ["avif", (p) => p.avif({ quality: 62, effort: 5 })],
    ["webp", (p) => p.webp({ quality: 80 })],
    ["jpg", (p) => p.jpeg({ quality: 82, mozjpeg: true })],
  ]) {
    const file = `${base}.${ext}`;
    const buf = await fn(pipe.clone()).toBuffer();
    writeFileSync(path.join(OUT, file), buf);
    meta[ext] = { file: `images/doctor/${file}`, bytes: buf.length };
  }
  (manifest[base] ||= { outputs: [] }).outputs.push({ name: base, w, h, note: `graded base, native aspect${portrait ? " (portrait)" : ""}`, ...meta });
}

/* ---------- contact sheet ---------- */
const THUMB = 360, COLS = 4, LABEL = 44;
const sheetFiles = files.filter((f) => !f.endsWith("cutout.png"));
const rows = Math.ceil(sheetFiles.length / COLS);
const cells = [];
for (let i = 0; i < sheetFiles.length; i++) {
  const f = sheetFiles[i];
  const base = f.replace(/\.(jpe?g|png)$/i, "");
  const x = (i % COLS) * THUMB, y = Math.floor(i / COLS) * (THUMB + LABEL);
  const thumb = await sharp(path.join(OUT, `${base}.jpg`))
    .resize({ width: THUMB - 16, height: THUMB - 16, fit: "cover", position: "attention" })
    .jpeg({ quality: 80 })
    .toBuffer();
  const label = Buffer.from(
    `<svg width="${THUMB}" height="${LABEL}"><rect width="100%" height="100%" fill="#F3F1EB"/><text x="8" y="28" font-family="Menlo,monospace" font-size="17" fill="#0F1E30">${base}</text></svg>`
  );
  cells.push({ input: thumb, left: x + 8, top: y + 8 }, { input: label, left: x, top: y + THUMB });
}
const sheet = await sharp({
  create: { width: COLS * THUMB, height: rows * (THUMB + LABEL), channels: 3, background: "#F3F1EB" },
})
  .composite(cells)
  .jpeg({ quality: 85, mozjpeg: true })
  .toBuffer();
writeFileSync(SHEET, sheet);

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(log.join("\n"));
console.log(`\ncontact sheet -> ${path.relative(ROOT, SHEET)} (${kb(sheet.length)})`);
console.log(`manifest -> ${path.relative(ROOT, MANIFEST)}`);
