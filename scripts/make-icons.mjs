/**
 * Generates app icons from resources/brand/logo/dr-james-mark.svg.
 * Outputs: app/icon.svg (full mark), app/apple-icon.png (180, on white),
 * public/icons/icon-512.png, icon-192.png, icon-32.png, icon-16.png.
 * 32px and 16px use the simplified mark (arch, star and rod only).
 */
import sharp from "sharp";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const MARK = path.resolve("resources/brand/logo/dr-james-mark.svg");
const ICONS = path.resolve("public/icons");
const APP = path.resolve("app");

const SIMPLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 400">
<path d="M150,364 H44 V146 C44,92 100,52 170,30 C240,52 296,92 296,146 V364 H190" fill="none" stroke="#0E2F52" stroke-width="26" stroke-linejoin="round" stroke-linecap="round"/>
<g transform="translate(170,32)"><path d="M0,-28 24.2,-14 24.2,14 0,28 -24.2,14 -24.2,-14Z" fill="#0E2F52" stroke="#fff" stroke-width="6" paint-order="stroke"/><path d="M0.00,-14 3.17,-7.65 9.88,-9.88 7.65,-3.17 14,0.00 7.65,3.17 9.88,9.88 3.17,7.65 0.00,14 -3.17,7.65 -9.88,9.88 -7.65,3.17 -14,0.00 -7.65,-3.17 -9.88,-9.88 -3.17,-7.65Z" fill="#fff"/></g>
<path d="M170,126 V388" stroke="#1D6B72" stroke-width="22" stroke-linecap="round"/>
<circle cx="170" cy="118" r="16" fill="#1D6B72" stroke="#fff" stroke-width="5" paint-order="stroke"/>
</svg>`;

async function raster(svg, size, dest, flat = false) {
  let img = sharp(Buffer.isBuffer(svg) ? svg : Buffer.from(svg), { density: 384 }).resize(size);
  if (flat) img = img.flatten({ background: "#ffffff" });
  await img.png().toFile(dest);
  console.log(`${path.relative(process.cwd(), dest)}  ${size}px`);
}

async function main() {
  await mkdir(ICONS, { recursive: true });
  const mark = await readFile(MARK);

  await raster(mark, 512, path.join(ICONS, "icon-512.png"));
  await raster(mark, 192, path.join(ICONS, "icon-192.png"));
  await raster(mark, 180, path.join(APP, "apple-icon.png"), true);
  await raster(SIMPLE, 32, path.join(ICONS, "icon-32.png"));
  await raster(SIMPLE, 16, path.join(ICONS, "icon-16.png"));

  // Copy the mark as the scalable icon, stripped of its metadata block.
  const svgText = mark.toString("utf8").replace(/<metadata[\s\S]*?<\/metadata>/, "");
  await writeFile(path.join(APP, "icon.svg"), svgText);
  await copyFile(MARK, path.join(ICONS, "mark-source.svg"));
  console.log("app/icon.svg, public/icons/mark-source.svg");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
