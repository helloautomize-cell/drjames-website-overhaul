#!/usr/bin/env node
/**
 * design/source-icons/badge-<name>.png (1024², transparent)
 *   -> public/icons/badges/badge-<name>.png / .webp      (256px)
 *   -> public/icons/badges/badge-<name>-128.png / .webp  (128px)
 * Trim transparent padding, re-centre on a square canvas with ~8% padding.
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, "design/source-icons");
const OUT = path.join(ROOT, "public/icons/badges");

mkdirSync(OUT, { recursive: true });
const files = readdirSync(SRC).filter((f) => /^badge-[\w-]+\.png$/i.test(f));
if (!files.length) { console.error(`no badge-*.png in ${SRC}`); process.exit(1); }

for (const f of files) {
  const name = f.replace(/\.png$/i, "");
  // trim transparent edge, then sit the artwork on a square canvas with 8% padding
  const trimmed = await sharp(path.join(SRC, f)).trim({ threshold: 8 }).png().toBuffer();
  const tm = await sharp(trimmed).metadata();
  const inner = Math.ceil(Math.max(tm.width, tm.height) / 0.84); // 8% padding each side
  const squared = await sharp({
    create: { width: inner, height: inner, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: trimmed, gravity: "centre" }])
    .png()
    .toBuffer();

  for (const size of [256, 128]) {
    const tag = size === 256 ? "" : "-128";
    const resized = sharp(squared).resize(size, size, { kernel: "lanczos3" });
    const png = await resized.clone().png({ compressionLevel: 9 }).toBuffer();
    const webp = await resized.webp({ quality: 90 }).toBuffer();
    writeFileSync(path.join(OUT, `${name}${tag}.png`), png);
    writeFileSync(path.join(OUT, `${name}${tag}.webp`), webp);
  }
  console.log(`${name}: ${tm.width}x${tm.height} art -> 256/128 png+webp`);
}
console.log(`done: ${files.length} badges -> ${path.relative(ROOT, OUT)}`);
