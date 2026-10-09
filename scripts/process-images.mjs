/**
 * Image pipeline (master prompt 5.2).
 * Reads resources/images/_source/ and writes web-ready files to
 * public/images/{doctor,clinic,awards}. Never upscales. JPEG q85, PNG alpha.
 * Strips EXIF/GPS metadata by default (sharp removes it unless asked to keep).
 * Writes internal docs (alt-text.json, _todo.md) to resources/images/ —
 * not public/, so they are not served to visitors.
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("resources/images/_source");
const OUT = path.resolve("public/images");
const DOCS = path.resolve("resources/images");

const JPEG = { quality: 85, mozjpeg: true };

/** @type {Record<string, {w:number,h:number,alt:string}>} */
const meta = {};
const todo = [];

async function save(buf, rel, alt) {
  const dest = path.join(OUT, rel);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  const info = await sharp(buf).metadata();
  meta[rel] = { w: info.width, h: info.height, alt };
  console.log(`${rel}  ${info.width}x${info.height}`);
  return dest;
}

async function main() {
  // --- Doctor set ---
  // White-coat cutout: trim transparent edges, keep alpha, never upscale.
  const hero = await sharp(path.join(SRC, "dr-james-whitecoat-cutout.png"))
    .trim()
    .png()
    .toBuffer();
  await save(hero, "doctor/dr-james-hero.png", "Dr. James Kumar Pallivathukkal in a white coat");

  // Avatar: top square of the trimmed cutout (head and shoulders), on white.
  const trimmed = sharp(hero);
  const { width: tw, height: th } = await trimmed.metadata();
  const side = Math.min(tw, th);
  const avatar = await sharp(hero)
    .extract({ left: Math.max(0, Math.floor((tw - side) / 2)), top: 0, width: side, height: side })
    .flatten({ background: "#ffffff" })
    .jpeg(JPEG)
    .toBuffer();
  await save(avatar, "doctor/dr-james-avatar.jpg", "Portrait of Dr. James Kumar Pallivathukkal");

  // Lobby portrait: 4:5 card crop, eyes on the upper third (attention position).
  const portrait = await sharp(path.join(SRC, "dr-james-hospital-lobby.jpg"))
    .resize({ width: 717, height: 896, fit: "cover", position: "attention" })
    .jpeg(JPEG)
    .toBuffer();
  await save(
    portrait,
    "doctor/dr-james-portrait.jpg",
    "Dr. James standing in the lobby of Badr Al Samaa Royal Hospital",
  );

  // Certificate photo, light pass only.
  const cert = await sharp(path.join(SRC, "dr-james-certificate.webp")).jpeg(JPEG).toBuffer();
  await save(
    cert,
    "doctor/dr-james-certificate.jpg",
    "Dr. James holding his Guinness World Records certificate",
  );

  // Consultation (already cropped so no patient is in frame).
  const consult = await sharp(path.join(SRC, "dr-james-at-desk-cropped.jpg"))
    .jpeg(JPEG)
    .toBuffer();
  await save(
    consult,
    "clinic/dr-james-consultation.jpg",
    "Dr. James at his desk during a consultation",
  );

  // Guinness photo: 4:5 crop.
  const gwr = await sharp(path.join(SRC, "dr-james-guinness-world-records.jpg"))
    .resize({ width: 720, height: 900, fit: "cover", position: "attention", withoutEnlargement: true })
    .jpeg(JPEG)
    .toBuffer();
  await save(
    gwr,
    "awards/guinness-world-records-2025.jpg",
    "Dr. James at the Guinness World Records diabetes screening event, 2025",
  );

  // Alternate cutout (green shirt), trimmed.
  const alt = await sharp(path.join(SRC, "dr-james-green-shirt-cutout.png"))
    .trim()
    .png()
    .toBuffer();
  await save(alt, "doctor/dr-james-alt.png", "Dr. James Kumar Pallivathukkal");

  // --- Held back (logged, not produced) ---
  todo.push(
    "- [ ] camera originals (2000px+ tall) of the white-coat and lobby portraits (client item 36)",
    "- [ ] white-coat portrait in a hospital corridor, 4:5",
    "- [ ] candid consultation photo, no patient in frame",
    "- [ ] team photo (needs written staff consent: hospital-team-HOLD-needs-consent.jpg)",
    "- [ ] hospital exterior for the visit band",
    "- [ ] 18 illustrated service badges (badge prompt on /styleguide)",
    "",
    "Not produced on purpose: certificate-scans-evidence-only.webp (evidence only, never shown).",
    "",
    "Low-resolution warnings: all source photos are small web copies. dr-james-hero.png is 556px wide; replace by dropping a larger file into resources/images/_source/ with the same name and re-running this script.",
  );

  await mkdir(DOCS, { recursive: true });
  await writeFile(path.join(DOCS, "alt-text.json"), JSON.stringify(meta, null, 2) + "\n");
  await writeFile(
    path.join(DOCS, "_todo.md"),
    "# Images still needed\n\n" + todo.join("\n") + "\n",
  );
  console.log("\nWrote alt-text.json and _todo.md to resources/images/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
