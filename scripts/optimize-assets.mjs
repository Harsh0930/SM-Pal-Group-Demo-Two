import sharp from 'sharp';
import { readdir, readFile, writeFile, mkdir, stat, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

// Delivery derivatives only: originals, composition, and aspect ratios are retained.
const out = 'public/assets/optimized';
await mkdir(out, { recursive: true });
const frozzoOut = 'public/assets/frozzo-frames/optimized';
await mkdir(frozzoOut, { recursive: true });
const walk = async dir => (await Promise.all((await readdir(dir, { withFileTypes: true })).map(d => d.isDirectory() ? walk(path.join(dir, d.name)) : path.join(dir, d.name)))).flat();
const files = (await walk('public/assets')).filter(f => !f.includes(`${path.sep}optimized${path.sep}`) && /\.(webp|png|jpe?g)$/i.test(f));
const manifest = {};
let originalBytes = 0, deliveryBytes = 0, count = 0;
sharp.concurrency(2);
for (const file of files) {
  const source = '/' + file.replaceAll('\\', '/').replace(/^public\//, '');
  const info = await stat(file);
  const hash = createHash('sha256').update(`${source}:${info.size}:${info.mtimeMs}:v1`).digest('hex').slice(0, 12);
  const meta = await sharp(file).metadata();
  const frame = source.includes('/palam-view-frames/');
  const widths = [...new Set((frame ? [1280] : [480, 960, 1920]).map(w => Math.min(w, meta.width)))];
  const variants = [];
  for (const width of widths) {
    const name = `${hash}-${width}.webp`, dest = `${out}/${name}`;
    try { await stat(dest); } catch {
      await sharp(file).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: frame ? 82 : 84, effort: 4 }).toFile(dest);
    }
    const size = (await stat(dest)).size;
    variants.push({ width, src: `/assets/optimized/${name}` });
    if (width === widths.at(-1)) deliveryBytes += size;
  }
  originalBytes += info.size;
  manifest[source] = { width: meta.width, height: meta.height, variants };
  if (++count % 25 === 0) console.log(`Optimized ${count}/${files.length} images`);
}
const frozzoFrames = files.filter(file => file.replaceAll('\\', '/').includes('/frozzo-frames/') && /\.png$/i.test(file));
for (const file of frozzoFrames) {
  const name = `${path.basename(file, path.extname(file))}.webp`;
  const dest = `${frozzoOut}/${name}`;
  try { await stat(dest); } catch {
    await sharp(file).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 72, effort: 4 }).toFile(dest);
  }
}
await writeFile('src/data/imageManifest.json', JSON.stringify(manifest));
await writeFile(`${out}/manifest.json`, JSON.stringify(manifest));
await mkdir('public/fonts', { recursive: true });
let css = '/* Locally served original brand families. Font licenses are in /fonts/. */\n';
for (const [id, family] of [['montserrat', 'Montserrat'], ['playfair-display', 'Playfair Display']]) {
  const dir = `node_modules/@fontsource-variable/${id}`;
  const original = await readFile(`${dir}/index.css`, 'utf8');
  css += original.replaceAll(`${family} Variable`, family).replaceAll('./files/', '/fonts/');
  for (const [, name] of original.matchAll(/\.\/files\/([^)]*)/g)) await copyFile(`${dir}/files/${name}`, `public/fonts/${name}`);
  await copyFile(`${dir}/LICENSE`, `public/fonts/${id}-LICENSE.txt`);
}
await writeFile('src/styles/fonts.css', css);
console.log(JSON.stringify({ images: count, originalMB: +(originalBytes / 1e6).toFixed(1), largestVariantsMB: +(deliveryBytes / 1e6).toFixed(1) }));
