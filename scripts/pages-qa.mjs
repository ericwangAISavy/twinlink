// Loads every public page of a running local build, checks for errors, horizontal
// overflow and broken media, and saves screenshots.
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const LOCAL = process.env.VISUAL_QA_URL || "http://localhost:3000";
const OUT = ".visual-qa/implementation/pages";
const PAGES = ["/", "/enterprise", "/agents-api", "/models-api", "/orin-tab", "/platform", "/pricing", "/coming-soon", "/about", "/careers", "/contact", "/blog", "/events", "/case-studies", "/privacy", "/terms", "/login", "/register"];
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
let failed = false;
const links = new Set();
for (const [width, height] of [[1440, 900], [1024, 768], [390, 844]]) {
  for (const path of PAGES) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce" });
    await context.route(/\/api\/visits/, (route) => route.abort());
    const page = await context.newPage();
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error" && !/ERR_FAILED/.test(m.text())) errors.push(`${m.text()} ${m.location().url}`); });
    page.on("pageerror", (e) => errors.push(e.message));
    const response = await page.goto(LOCAL + path, { waitUntil: "load" });
    await page.waitForTimeout(800);
    const info = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - innerWidth,
      height: document.documentElement.scrollHeight,
      names: document.body.innerText.match(/H Company|H Platform|Holo|hcompany/gi)?.length || 0,
      links: [...document.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href").split("#")[0]),
      broken: [...document.querySelectorAll("img,video")].filter((m) => m.offsetParent && (m.tagName === "IMG" ? m.complete && !m.naturalWidth : m.error)).length,
    }));
    info.links.forEach((link) => link && links.add(link));
    await page.screenshot({ path: `${OUT}/${path.slice(1) || "home"}-${width}.png`, fullPage: true });
    const bad = response.status() !== 200 || info.overflow > 0 || info.broken > 0 || info.names > 0 || errors.length > 0;
    failed ||= bad;
    console.log(`${bad ? "FAIL" : "PASS"} ${width} ${path} ${response.status()} height ${info.height} overflow ${info.overflow} broken ${info.broken} old-names ${info.names} errors ${[...new Set(errors)].join(" | ").slice(0, 300)}`);
    await context.close();
  }
}
// Every internal link, plus the existing pages' own links, must resolve.
const request = await browser.newContext();
for (const path of ["/about", "/careers", "/contact", "/blog", "/events", "/case-studies", "/privacy", "/terms"]) {
  const page = await request.newPage();
  await page.goto(LOCAL + path, { waitUntil: "load" });
  for (const link of await page.$$eval("a[href^='/']", (all) => all.map((a) => a.getAttribute("href").split("#")[0]))) if (link) links.add(link);
  await page.close();
}
for (const link of [...links].sort()) {
  const response = await request.request.get(LOCAL + link, { timeout: 60000 });
  if (response.status() >= 400) { failed = true; console.log(`FAIL link ${link} ${response.status()}`); }
}
console.log(`checked ${links.size} internal links`);
await browser.close();
process.exitCode = failed ? 1 : 0;
