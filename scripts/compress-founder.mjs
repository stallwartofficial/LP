// One-off image compression for the founder portrait. Reads the raw upload,
// emits a small mobile-first WebP and a larger desktop WebP plus a JPG
// fallback. Kept in scripts/ so we can re-run if the source is swapped.
import sharp from "sharp";
import { writeFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const SRC = resolve("Founders photo.png");
const OUT = resolve("public/images");

async function emit(name, width, format, opts) {
  const buf = await sharp(SRC)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .toFormat(format, opts)
    .toBuffer();
  const path = `${OUT}/${name}`;
  writeFileSync(path, buf);
  const kb = (statSync(path).size / 1024).toFixed(1);
  console.log(`${name.padEnd(28)} ${width}w  ${kb} KB`);
}

// 4:5 crop is done by CSS (object-cover); source can stay tall.
// 1200w covers the largest desktop render (~18rem @ 2x DPR ~= 576 CSS px x2).
// 640w is the mobile size (90vw on ~420px screens x2 DPR ~= 800). Both webp.
// JPG fallback matches the desktop file for browsers ignoring the <picture>.
await emit("founder.webp", 1200, "webp", { quality: 78, effort: 6 });
await emit("founder-sm.webp", 640, "webp", { quality: 74, effort: 6 });
await emit("founder.jpg", 1200, "jpeg", { quality: 78, mozjpeg: true, progressive: true });
