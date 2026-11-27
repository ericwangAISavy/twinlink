// Loads every public page of a running local build and checks status, console errors,
// horizontal overflow, broken images, links back to the reference site and internal links.
import { mkdirSync, readdirSync } from "node:fs";
import { chromium } from "playwright";

const LOCAL = process.env.VISUAL_QA_URL || "http://localhost:3000";
const OUT = ".visual-qa/implementation/pages";
const PAGES = ["/", "/coming-soon", ...readdirSync("src/content/reference").map((file) => "/" + file.replace(/\.json$/, "").replaceAll("__", "/"))];
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const links = new Set();
let failures = 0;

async function check(path, width, height) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce" });
  await context.route(/\/api\/visits/, (route) => route.abort());
  // Third-party embeds are outside this site and make results depend on the network.
  await context.route(/youtube|ytimg|googlevideo|vimeo/, (route) => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error" && !/ERR_FAILED/.test(m.text())) errors.push(`${m.text()} ${m.location().url}`); });
  page.on("pageerror", (e) => errors.push(e.message));
  const response = await page.goto(LOCAL + path, { waitUntil: "load", timeout: 60000 });
  for (let y = 0, total = await page.evaluate(() => document.documentElement.scrollHeight); y < total; y += height) {
    await page.evaluate((v) => scrollTo(0, v), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(600);
  const info = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - innerWidth,
    broken: [...document.images].filter((i) => i.offsetParent && i.complete && !i.naturalWidth && !/ytimg/.test(i.src)).map((i) => i.src),
    reference: [...document.querySelectorAll("a[href]")].map((a) => a.href).filter((h) => /^https?:\/\/([\w-]+\.)*hcompany\.ai/.test(h)),
    links: [...document.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href").split("#")[0]),
  }));
  info.links.forEach((link) => link && links.add(link));
  await page.screenshot({ path: `${OUT}/${path.slice(1).replaceAll("/", "__") || "home"}-${width}.png`, fullPage: true });
  const problems = [
    response.status() !== 200 && `status ${response.status()}`,
    info.overflow > 0 && `overflow ${info.overflow}`,
    info.broken.length && `broken images ${info.broken.slice(0, 3)}`,
    info.reference.length && `links to reference ${info.reference.slice(0, 3)}`,
    errors.length && `errors ${[...new Set(errors)].join(" | ").slice(0, 300)}`,
  ].filter(Boolean);
  if (problems.length) { failures++; console.log(`FAIL ${width} ${path} ${problems.join("; ")}`); }
  await context.close();
}

for (const [width, height] of [[1440, 900], [390, 844]]) {
  const queue = [...PAGES];
  await Promise.all([0, 1, 2, 3].map(async () => {
    while (queue.length) {
      const path = queue.shift();
      try { await check(path, width, height); } catch (error) { failures++; console.log(`FAIL ${width} ${path} ${error.message.split("\n")[0]}`); }
    }
  }));
  console.log(`checked ${PAGES.length} pages at ${width}px`);
}

const request = await browser.newContext();
for (const link of [...links].sort()) {
  const response = await request.request.get(LOCAL + link, { timeout: 60000 });
  if (response.status() >= 400) { failures++; console.log(`FAIL link ${link} ${response.status()}`); }
}
console.log(`checked ${links.size} internal links, ${failures} failures`);
await browser.close();
process.exitCode = failures ? 1 : 0;
