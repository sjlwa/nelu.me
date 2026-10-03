/**
 * Genera public/open-graph-image.jpg (1200x630) a partir de src/assets/open-graph-source.webp
 * y el logotipo src/assets/nelu-name.svg, con los colores de la paleta activa
 * (src/data/site.ts → palette; valores en src/styles/global.css). Ejecutar con: pnpm og
 */
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { palette, site } from "../src/data/site.ts";

const W = 1200, H = 630;

/** Lee los tokens --p-* del bloque de la paleta indicada en global.css. */
async function paletteColors(name) {
  const css = await readFile("src/styles/global.css", "utf8");
  const selector = name === "calida" ? ":root {" : `:root[data-palette="${name}"] {`;
  const start = css.indexOf(selector);
  if (start === -1) throw new Error(`Paleta "${name}" no encontrada en global.css`);
  const block = css.slice(start, css.indexOf("}", start));
  const tokens = Object.fromEntries(
    [...block.matchAll(/--p-([a-z-]+):\s*([^;]+);/g)].map(([, k, v]) => [k, v.trim()])
  );
  return { bg: tokens.dark, accent: tokens.primary, text: tokens.light };
}

const { bg: BG, accent: ACCENT, text: TEXT } = await paletteColors(palette);

const photo = await sharp("src/assets/open-graph-source.webp")
  .resize({ width: 560, height: H, fit: "cover", position: "attention" })
  .toBuffer();

// Logotipo (paths, sin fuentes) coloreado con el texto de la paleta.
const nameSvg = (await readFile("src/assets/nelu-name.svg", "utf8"))
  .replace("<svg ", `<svg fill="${TEXT}" `);
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
  <rect x="80" y="372" width="56" height="3" fill="${ACCENT}"/>
  <text x="80" y="420" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="600"
        letter-spacing="6" fill="${ACCENT}">${site.tagline.toUpperCase()}</text>
  <text x="80" y="462" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="${TEXT}" fill-opacity="0.8">${site.origin} · ${site.url.replace(/^https?:\/\//, "")}</text>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
  .composite([
    { input: photo, left: W - 560, top: 0 },
    { input: overlay, left: 0, top: 0 },
    { input: name, left: 80, top: 190 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile("public/open-graph-image.jpg");

console.log(`public/open-graph-image.jpg generado (1200x630, paleta "${palette}")`);
