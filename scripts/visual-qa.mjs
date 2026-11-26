// Screenshot and geometry comparison between the reference site and a local build.
//   npm run build && npx next start -p 3100
//   npm run visual-qa            (all viewports)
//   npm run visual-qa -- 1440    (selected widths)
//   VISUAL_QA_PAGE=pricing npm run visual-qa    (a page other than the homepage)
// Both pages are loaded with identical viewport, DPR 1 and reduced motion, with
// third-party consent/analytics requests blocked. Needs an installed Chrome.
import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const PAGE = process.env.VISUAL_QA_PAGE || "";
const NAME = PAGE || "home";
const REFERENCE = `https://hcompany.ai/${PAGE}`;
const LOCAL = (process.env.VISUAL_QA_URL || "http://localhost:3100/") + PAGE;
const OUT = ".visual-qa";
const THRESHOLD = 0.1; // pixelmatch per-pixel colour tolerance; anti-aliased pixels are not counted
const VIEWPORTS = [[1920, 1080], [1440, 900], [1280, 800], [1024, 768], [768, 1024], [390, 844]];
const BLOCKED = /axept|googletagmanager|google-analytics|posthog|hubspot|segment|clarity|px\.ads|\/api\/visits/;

const selected = process.argv.slice(2).map(Number).filter(Boolean);
for (const dir of ["reference", "implementation", "differences", "reports"]) mkdirSync(`${OUT}/${dir}/compare`, { recursive: true });

async function capture(browser, url, [width, height]) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  context.setDefaultTimeout(60000);
  await context.route(BLOCKED, (route) => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error" && !/ERR_FAILED/.test(message.text())) errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  // Scroll through once so lazy images and entrance states settle, then return to the top.
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += Math.round(height / 2)) { await page.evaluate((v) => scrollTo(0, v), y); await page.waitForTimeout(120); }
  // State alignment: with reduced motion the reference keeps whichever platform tab the
  // scroll-through ended on, so select the first tab on both pages before capturing.
  const firstTab = page.locator("#builder button:visible").first();
  if (await firstTab.count()) await firstTab.click();
  await page.mouse.move(0, 0);
  await page.evaluate(() => scrollTo(0, 0));
  await page.evaluate(async () => {
    await document.fonts.ready;
    // decode() can stay pending for lazy images that never enter the viewport, so cap the wait.
    for (const image of document.images) image.loading = "eager";
    const decoded = Promise.all([...document.images].filter((i) => i.offsetParent).map((i) => i.decode().catch(() => {})));
    await Promise.race([decoded, new Promise((resolve) => setTimeout(resolve, 8000))]);
  });
  await page.waitForTimeout(1500);

  const info = await page.evaluate(() => {
    const box = (element) => { const r = element.getBoundingClientRect(); return [r.x, r.y + scrollY, r.width, r.height].map(Math.round); };
    const sections = [...document.querySelectorAll("header, main section, footer")].map(box);
    const seen = {};
    const text = {};
    for (const element of document.querySelectorAll("body *")) {
      const own = [...element.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").replace(/\s+/g, " ").trim();
      if (!own || !element.getBoundingClientRect().width || element.closest("script,style")) continue;
      seen[own] = (seen[own] || 0) + 1;
      const s = getComputedStyle(element);
      text[`${own} #${seen[own]}`] = { box: box(element), type: `${s.fontSize}/${s.lineHeight} ${s.fontWeight} ${s.color}` };
    }
    return { height: document.documentElement.scrollHeight, overflow: document.documentElement.scrollWidth - innerWidth, sections, text };
  });
  const full = PNG.sync.read(await page.screenshot({ fullPage: true, animations: "disabled" }));
  // Second pass with the nondeterministic hero canvas hidden on both sides.
  await page.addStyleTag({ content: "canvas,video,iframe{visibility:hidden!important}" });
  const still = PNG.sync.read(await page.screenshot({ fullPage: true, animations: "disabled" }));
  await context.close();
  return { info, full, still, errors };
}

/** Pads to a shared size so that any height difference counts as differing pixels. */
function compare(a, b) {
  const width = Math.max(a.width, b.width), height = Math.max(a.height, b.height);
  const pad = (image, fill) => {
    const out = new PNG({ width, height });
    for (let i = 0; i < out.data.length; i += 4) out.data.set(fill, i);
    PNG.bitblt(image, out, 0, 0, image.width, image.height, 0, 0);
    return out;
  };
  const left = pad(a, [255, 0, 0, 255]), right = pad(b, [0, 255, 0, 255]), diff = new PNG({ width, height });
  const different = pixelmatch(left.data, right.data, diff.data, width, height, { threshold: THRESHOLD });
  return { match: +(100 * (1 - different / (width * height))).toFixed(3), diff };
}

function crop(image, y, height) {
  const h = Math.max(1, Math.min(height, image.height - y));
  const out = new PNG({ width: image.width, height: h });
  PNG.bitblt(image, out, 0, y, image.width, h, 0, 0);
  return out;
}

const browser = await chromium.launch({ channel: "chrome" });
const report = { date: new Date().toISOString(), threshold: THRESHOLD, reference: REFERENCE, local: LOCAL, viewports: {} };
for (const viewport of VIEWPORTS.filter(([w]) => !selected.length || selected.includes(w))) {
  const [width] = viewport;
  const ref = await capture(browser, REFERENCE, viewport);
  const own = await capture(browser, LOCAL, viewport);
  const full = compare(ref.full, own.full);
  const still = compare(ref.still, own.still);
  writeFileSync(`${OUT}/reference/compare/${NAME}-${width}.png`, PNG.sync.write(ref.full));
  writeFileSync(`${OUT}/implementation/compare/${NAME}-${width}.png`, PNG.sync.write(own.full));
  writeFileSync(`${OUT}/differences/compare/${NAME}-${width}.png`, PNG.sync.write(full.diff));
  writeFileSync(`${OUT}/differences/compare/${NAME}-${width}-no-canvas.png`, PNG.sync.write(still.diff));

  const names = ["header", "hero", "capabilities", "platform", "results", "research", "news", "closing", "footer"];
  // Each section is aligned to its own top, so one height error does not cascade.
  const sections = ref.info.sections.length === own.info.sections.length ? ref.info.sections.map((r, i) => {
    const o = own.info.sections[i];
    const part = compare(crop(ref.still, r[1], r[3]), crop(own.still, o[1], o[3]));
    return { name: PAGE ? i : names[i] ?? i, reference: r, local: o, match: part.match };
  }) : `section count differs: ${ref.info.sections.length} vs ${own.info.sections.length}`;

  const geometry = [];
  for (const [key, r] of Object.entries(ref.info.text)) {
    const o = own.info.text[key];
    if (!o) { geometry.push({ key, missing: true }); continue; }
    if (r.box.some((v, i) => Math.abs(v - o.box[i]) > 1) || r.type !== o.type) geometry.push({ key, reference: `${r.box} ${r.type}`, local: `${o.box} ${o.type}` });
  }
  const textCount = Object.keys(ref.info.text).length;
  report.viewports[width] = {
    match: full.match, matchWithoutCanvas: still.match,
    height: { reference: ref.info.height, local: own.info.height },
    horizontalOverflow: own.info.overflow, consoleErrors: own.errors,
    textElements: { total: textCount, within1px: textCount - geometry.length }, sections, geometry,
  };
  console.log(`${NAME} ${width}px  full ${full.match}%  without canvas ${still.match}%  height ${ref.info.height}/${own.info.height}  text ${textCount - geometry.length}/${textCount}  errors ${own.errors.length}`);
  if (Array.isArray(sections)) console.log("   " + sections.map((s) => `${s.name} ${s.match}% (h ${s.reference[3]}/${s.local[3]})`).join(" | "));
}
await browser.close();
writeFileSync(`${OUT}/reports/compare${PAGE ? "-" + PAGE : ""}${selected.length ? "-" + selected.join("-") : ""}.json`, JSON.stringify(report, null, 1));
