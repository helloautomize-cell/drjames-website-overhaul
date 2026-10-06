#!/usr/bin/env node
/**
 * Scans public/icons/badges/ for badge-<name>.png and writes lib/badge-pngs.json.
 * Runs via `predev`/`prebuild` so <Badge name="..."/> automatically picks the
 * final PNG artwork once the files are dropped in — no code change needed.
 */
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIR = path.join(ROOT, "public/icons/badges");
const OUT = path.join(ROOT, "lib/badge-pngs.json");

const manifest = {};
if (existsSync(DIR)) {
  for (const f of readdirSync(DIR).sort()) {
    const m = /^badge-(.+)\.png$/i.exec(f);
    if (m && /-128$/.test(m[1])) continue; // size variant of the same badge
    if (m) manifest[m[1]] = true;
  }
}
writeFileSync(OUT, JSON.stringify(manifest, null, 2) + "\n");
console.log(`badge manifest: ${Object.keys(manifest).length} png(s) -> ${path.relative(ROOT, OUT)}`);
