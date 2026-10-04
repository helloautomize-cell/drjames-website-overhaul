#!/usr/bin/env node
/**
 * Launch readiness check (master prompt section 8.4).
 * Lists every [CONFIRM] marker left in source and content, and fails
 * while any remain or while SITE_INDEXABLE is not "true".
 * Run: npm run launch-check
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["app", "components", "lib", "resources/content"];
const SCAN_EXT = new Set([".ts", ".tsx", ".md", ".css"]);
const SKIP = /node_modules|\.next|launch-check\.mjs/;

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (SKIP.test(p)) continue;
    if (e.isDirectory()) yield* walk(p);
    else if (SCAN_EXT.has(path.extname(e.name))) yield p;
  }
}

const hits = [];
for (const d of SCAN_DIRS) {
  const abs = path.join(ROOT, d);
  if (!fs.existsSync(abs)) continue;
  for (const file of walk(abs)) {
    const rel = path.relative(ROOT, file).replaceAll("\\", "/");
    fs.readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, i) => {
        const t = line.trim();
        // Skip code comments/docstrings and regex literals that only
        // describe the marker, not occurrences of it.
        if (/^(\/\/|\*|\/\*|\{\/\*)/.test(t)) return;
        if (/\[CONFIRM\[\^/.test(t)) return;
        const re = /\[CONFIRM[^\]]*\]/g;
        let m;
        while ((m = re.exec(line))) {
          hits.push({ file: rel, line: i + 1, marker: m[0], text: line.trim().slice(0, 110) });
        }
      });
  }
}

console.log("Launch check — Dr. James website\n");
console.log(`SITE_INDEXABLE = ${process.env.SITE_INDEXABLE ?? "(unset)"}\n`);

if (hits.length === 0) {
  console.log("No [CONFIRM] markers found.\n");
} else {
  console.log(`${hits.length} open [CONFIRM] item(s):\n`);
  const byFile = new Map();
  for (const h of hits) {
    if (!byFile.has(h.file)) byFile.set(h.file, []);
    byFile.get(h.file).push(h);
  }
  for (const [file, items] of [...byFile.entries()].sort()) {
    console.log(`  ${file}`);
    for (const h of items) console.log(`    L${h.line}: ${h.marker}`);
  }
  console.log("");
}

let fail = false;
if (hits.length > 0) {
  console.log("FAIL: open [CONFIRM] items remain (client inputs needed).");
  fail = true;
}
if (process.env.SITE_INDEXABLE !== "true") {
  console.log("FAIL: SITE_INDEXABLE is not true (site must stay noindex until launch).");
  fail = true;
}
if (!fail) console.log("PASS: ready to launch.");
process.exit(fail ? 1 : 0);
