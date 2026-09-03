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
// Filenames are versioned (v2, v3, …) so the URL changes on a portrait swap
// and every CDN / browser cache refetches instead of serving the previous
// bytes. Bump the suffix here and in the two <Image src=…> references.
await emit("founder-v2.webp", 1200, "webp", { quality: 78, effort: 6 });
await emit("founder-v2-sm.webp", 640, "webp", { quality: 74, effort: 6 });
await emit("founder-v2.jpg", 1200, "jpeg", { quality: 78, mozjpeg: true, progressive: true });
