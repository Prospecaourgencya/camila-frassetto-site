/**
 * Pipeline de otimização de imagens (sharp).
 * Lê as imagens originais extraídas do HTML monolítico e gera:
 *  - hero desktop/mobile em AVIF + WebP (art-direction)
 *  - fotos Sobre/Manifesto em AVIF + WebP
 *  - imagem Open Graph (1200x630 JPG)
 *  - favicons/ícones PWA a partir de um monograma SVG
 * Uso: npm run images
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.resolve(ROOT, 'assets-src');
const OUT = path.resolve(ROOT, 'public', 'img');
const PUB = path.resolve(ROOT, 'public');
fs.mkdirSync(OUT, { recursive: true });

const AVIF = { quality: 52, effort: 6 };
const WEBP = { quality: 74, effort: 6 };
const kb = (p) => (fs.statSync(p).size / 1024).toFixed(0) + ' KB';
const report = [];

async function variants(srcFile, base, width) {
  const input = path.join(SRC, srcFile);
  const pipe = sharp(input).resize({ width, withoutEnlargement: true });
  const avif = path.join(OUT, `${base}.avif`);
  const webp = path.join(OUT, `${base}.webp`);
  await pipe.clone().avif(AVIF).toFile(avif);
  await pipe.clone().webp(WEBP).toFile(webp);
  report.push([`${base}.avif`, kb(avif)]);
  report.push([`${base}.webp`, kb(webp)]);
}

// Monograma SVG "cf" — dark green sobre creme (identidade da marca)
const monogram = (size) => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="#0E2C20"/>
  <text x="50%" y="52%" dy=".08em" text-anchor="middle" dominant-baseline="middle"
    font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-weight="600"
    font-size="248" fill="#EEE9E8" letter-spacing="-8">cf</text>
</svg>`);

async function run() {
  // Hero art-directed
  await variants('hero-desktop-original.png', 'hero-desktop', 1600); // landscape
  await variants('hero-mobile-original.png', 'hero-mobile', 860); // portrait
  // Conteúdo
  await variants('sobre-original.webp', 'sobre', 680);
  await variants('manifesto-original.webp', 'manifesto', 680);

  // Open Graph 1200x630 (a partir do hero landscape)
  const og = path.join(OUT, 'og.jpg');
  await sharp(path.join(SRC, 'hero-desktop-original.png'))
    .resize(1200, 630, { fit: 'cover', position: 'right top' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(og);
  report.push(['og.jpg', kb(og)]);

  // Favicons / ícones PWA
  const icons = [
    ['favicon-32.png', 32, OUT],
    ['favicon-192.png', 192, OUT],
    ['favicon-512.png', 512, OUT],
    ['apple-touch-icon.png', 180, PUB],
  ];
  for (const [name, s, dir] of icons) {
    const f = path.join(dir, name);
    await sharp(monogram(s)).resize(s, s).png().toFile(f);
    report.push([name, kb(f)]);
  }
  // favicon.svg (vetorial)
  fs.writeFileSync(path.join(PUB, 'favicon.svg'), monogram(512));
  report.push(['favicon.svg', kb(path.join(PUB, 'favicon.svg'))]);

  console.log('Imagens otimizadas:');
  for (const [n, s] of report) console.log(`  ${n.padEnd(22)} ${s}`);
}
run().catch((e) => { console.error(e); process.exit(1); });
