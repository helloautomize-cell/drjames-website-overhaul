// Pixel-diff shots/before vs shots/<dir>. Usage: node tmp-diff.mjs <afterdir>
import sharp from "sharp";
import { readdirSync, existsSync } from "node:fs";

const BEFORE = process.argv[2] || "shots/before";
const AFTER = process.argv[3] || "shots/after";
const THRESH = 16; // per-channel delta that counts as a real pixel change

const files = readdirSync(BEFORE).filter((f) => f.endsWith(".png"));
const rows = [];
let worst = 0, worstName = "";

for (const f of files) {
  const a = `${BEFORE}/${f}`, b = `${AFTER}/${f}`;
  if (!existsSync(b)) { rows.push([f, "MISSING", "MISSING"]); continue; }
  const ia = await sharp(a).raw().toBuffer({ resolveWithObject: true });
  const ib = await sharp(b).raw().toBuffer({ resolveWithObject: true });
  const { width: wa, height: ha } = ia.info, { width: wb, height: hb } = ib.info;
  if (wa !== wb || ha !== hb) {
    rows.push([f, `SIZE ${wa}x${ha}->${wb}x${hb}`, ""]);
    continue;
  }
  const px = ia.data, qx = ib.data;
  let changed = 0;
  const n = Math.min(px.length, qx.length);
  for (let i = 0; i < n; i += 4) {
    if (Math.abs(px[i]-qx[i])>THRESH || Math.abs(px[i+1]-qx[i+1])>THRESH ||
        Math.abs(px[i+2]-qx[i+2])>THRESH || Math.abs(px[i+3]-qx[i+3])>THRESH) changed++;
  }
  const pct = (changed / (wa * ha)) * 100;
  rows.push([f, pct.toFixed(3) + "%", changed]);
  if (pct > worst) { worst = pct; worstName = f; }
}
const bad = rows.filter((r) => r[1] !== "0.000%");
console.log(`checked ${files.length} pairs — ${bad.length} with diffs`);
for (const r of bad) console.log(`  ${r[0]}  ${r[1]}  (${r[2]} px)`);
if (!bad.length) console.log("all routes: 0 diff");
else console.log(`worst: ${worstName} ${worst.toFixed(3)}%`);
