/**
 * Genera public/open-graph-image.jpg (1200x630) a partir de src/assets/open-graph-source.webp
 * y el logotipo src/assets/nelu-name.svg. Ejecutar con: pnpm og
 */
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const W = 1200, H = 630;
const BG = "#17120e", AMBER = "#e0a35a", CREAM = "#f1e7d6";

const photo = await sharp("src/assets/open-graph-source.webp")
  .resize({ width: 560, height: H, fit: "cover", position: "attention" })
  .toBuffer();

// Logotipo (paths, sin fuentes) coloreado en crema.
const nameSvg = (await readFile("src/assets/nelu-name.svg", "utf8"))
  .replace("<svg ", `<svg fill="${CREAM}" `);
const name = await sharp(Buffer.from(nameSvg)).resize({ width: 380 }).png().toBuffer();

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="fade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="${BG}" stop-opacity="1"/>
      <stop offset="1" stop-color="${BG}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="${W - 560}" y="0" width="140" height="${H}" fill="url(#fade)"/>
  <rect x="80" y="372" width="56" height="3" fill="${AMBER}"/>
  <text x="80" y="420" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="600"
        letter-spacing="6" fill="${AMBER}">CANTAUTORA Y SAXOFONISTA</text>
  <text x="80" y="462" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="${CREAM}" fill-opacity="0.8">Colima, México · nelu.me</text>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
  .composite([
    { input: photo, left: W - 560, top: 0 },
    { input: overlay, left: 0, top: 0 },
    { input: name, left: 80, top: 190 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile("public/open-graph-image.jpg");

console.log("public/open-graph-image.jpg generado (1200x630)");
