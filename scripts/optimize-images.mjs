/**
 * Converts every raster image under assets-src/img to a web-sized WebP in public/img.
 *
 * Originals live in assets-src/ (outside public/, so Vite never ships them).
 * Run after adding new photos:  bun run optimize:images
 */

import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src/img';
const OUT = 'public/img';

// Longest edge, in pixels. First matching rule wins.
const SIZE_RULES = [
    // Full-bleed hero backgrounds — need to cover a large viewport.
    { match: /_hero\.[^.]+$/i, maxEdge: 1920, quality: 78 },
    // Map popup photos — rendered small, inside a card.
    { match: /^map_imgs\//i, maxEdge: 1200, quality: 76 },
    // Everything else: gallery shots, cards, section images.
    { match: /./, maxEdge: 1400, quality: 80 },
];

const RASTER = /\.(png|jpe?g|webp)$/i;

async function* walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) yield* walk(full);
        else if (RASTER.test(entry.name)) yield full;
    }
}

const fmt = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

let totalBefore = 0;
let totalAfter = 0;
const rows = [];

for await (const file of walk(SRC)) {
    const rel = path.relative(SRC, file);
    const rule = SIZE_RULES.find((r) => r.match.test(rel));

    const dest = path.join(OUT, rel.replace(/\.[^.]+$/, '.webp'));
    await mkdir(path.dirname(dest), { recursive: true });

    const before = (await stat(file)).size;

    await sharp(file)
        .rotate() // honour EXIF orientation before we strip metadata
        .resize({
            width: rule.maxEdge,
            height: rule.maxEdge,
            fit: 'inside',
            withoutEnlargement: true,
        })
        .webp({ quality: rule.quality, effort: 6 })
        .toFile(dest);

    const after = (await stat(dest)).size;
    totalBefore += before;
    totalAfter += after;
    rows.push({ rel, before, after });
}

rows.sort((a, b) => b.before - a.before);
for (const { rel, before, after } of rows) {
    const saved = Math.round((1 - after / before) * 100);
    console.log(`${rel.padEnd(48)} ${fmt(before).padStart(9)} -> ${fmt(after).padStart(9)}  (-${saved}%)`);
}

console.log(
    `\n${rows.length} images: ${fmt(totalBefore)} -> ${fmt(totalAfter)} ` +
        `(-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`
);
