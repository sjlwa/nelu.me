/**
 * Genera public/open-graph-image.jpg (800x420) a partir de src/assets/open-graph-source.webp
 * y el logotipo src/assets/nelu-name.svg, con los colores de la paleta activa
 * (src/data/site.ts → palette; valores en src/styles/global.css). Ejecutar con: pnpm og
 */
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { palette, site } from "../src/data/site.ts";

const W = 800, H = 420;
/** Escala de las medidas de diseño, definidas para un lienzo de 1200 px de ancho. */
const px = (v) => Math.round(v * (W / 1200));

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
  .resize({ width: px(560), height: H, fit: "cover", position: "attention" })
  .toBuffer();

// Logotipo (paths, sin fuentes) coloreado con el texto de la paleta.
const nameSvg = (await readFile("src/assets/nelu-name.svg", "utf8"))
  .replace("<svg ", `<svg fill="${TEXT}" `);
const name = await sharp(Buffer.from(nameSvg)).resize({ width: px(380) }).png().toBuffer();

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="fade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="${BG}" stop-opacity="1"/>
      <stop offset="1" stop-color="${BG}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="${W - px(560)}" y="0" width="${px(140)}" height="${H}" fill="url(#fade)"/>
  <rect x="${px(80)}" y="${px(372)}" width="${px(56)}" height="${px(3)}" fill="${ACCENT}"/>
  <text x="${px(80)}" y="${px(420)}" font-family="Helvetica, Arial, sans-serif" font-size="${px(30)}" font-weight="600"
        letter-spacing="${px(6)}" fill="${ACCENT}">${site.tagline.toUpperCase()}</text>
  <text x="${px(80)}" y="${px(462)}" font-family="Helvetica, Arial, sans-serif" font-size="${px(26)}" fill="${TEXT}" fill-opacity="0.8">${site.origin} · ${site.url.replace(/^https?:\/\//, "")}</text>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
  .composite([
    { input: photo, left: W - px(560), top: 0 },
    { input: overlay, left: 0, top: 0 },
    { input: name, left: px(80), top: px(190) },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile("public/open-graph-image.jpg");

console.log(`public/open-graph-image.jpg generado (${W}x${H}, paleta "${palette}")`);
