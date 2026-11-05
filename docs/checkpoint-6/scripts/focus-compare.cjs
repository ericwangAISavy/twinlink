/* eslint-disable @typescript-eslint/no-require-imports -- Reproducible visual evidence. */
const fs = require('fs');
const sharp = require('sharp');
const out = 'docs/checkpoint-6/evidence';
const sourceDir = 'docs/checkpoint-1/evidence';
const sources = fs.readdirSync(sourceDir);
const source = (id, mode) => `${sourceDir}/${sources.find(f => f.startsWith(id.slice(1) + '-') && f.endsWith(`-${mode}-full.png`))}`;
(async () => {
  const dimensions = [];
  for (let n = 2; n <= 15; n++) {
    const id = `T${String(n).padStart(2, '0')}`;
    for (const mode of ['desktop', 'mobile']) {
      const a = await sharp(source(id, mode)).metadata();
      const b = await sharp(`${out}/${id}-${mode}.png`).metadata();
      dimensions.push({id, mode, cssViewport: mode === 'desktop' ? [1440, 900] : [390, 844], deviceScaleFactor: 1, sourcePixels: [a.width, a.height], renderPixels: [b.width, b.height], sourceOverflow: a.width > (mode === 'desktop' ? 1440 : 390), kind: id === 'T03' ? 'integrated-section' : 'full-page'});
    }
  }
  fs.writeFileSync(`${out}/image-dimensions.json`, JSON.stringify(dimensions, null, 2) + '\n');
  // Same pixel scale per pair; crop offsets are explicit and never stretch text.
  for (const [name, id, mode, top, height] of [
    ['about', 'T02', 'desktop', 560, 650],
    ['privacy', 'T05', 'desktop', 500, 550],
    ['contact', 'T06', 'desktop', 570, 800],
    ['service', 'T07', 'mobile', 400, 1200],
    ['careers-desktop', 'T04', 'desktop', 300, 500],
    ['careers-mobile', 'T04', 'mobile', 330, 650],
  ]) {
    const images = [];
    let width = 0;
    for (const file of [source(id, mode), `${out}/${id}-${mode}.png`]) {
      const m = await sharp(file).metadata();
      const input = await sharp(file).extract({left: 0, top, width: m.width, height: Math.min(height, m.height - top)}).toBuffer();
      images.push({input, left: width, top: 0});
      width += m.width;
    }
    await sharp({create: {width, height, channels: 3, background: '#ddd'}}).composite(images).jpeg({quality: 90}).toFile(`${out}/focus-${name}.jpg`);
  }
})().catch(e => {console.error(e); process.exitCode = 1;});
