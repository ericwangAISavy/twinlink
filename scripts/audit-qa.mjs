// Finds things that look usable but do nothing: dead buttons, anchors without a target,
// and leftover branding in page metadata. Writes .visual-qa/reports/audit.json.
import { readdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";

const LOCAL = process.env.VISUAL_QA_URL || "http://localhost:3000";
const width = Number(process.argv[2] || 1440);
const PAGES = process.env.VISUAL_QA_ONLY?.split(",").map((p) => "/" + p)
  ?? ["/", ...readdirSync("src/content/reference").map((file) => "/" + file.replace(/\.json$/, "").replaceAll("__", "/"))];
const browser = await chromium.launch({ channel: "chrome" });
const report = {};

async function audit(path) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  await context.route(/\/api\/visits|youtube|ytimg|googlevideo|vimeo/, (route) => route.abort());
  const page = await context.newPage();
  await page.goto(LOCAL + path, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(900);
  const info = await page.evaluate(() => {
    const anchors = [...document.querySelectorAll("a[href*='#']")].map((a) => new URL(a.href))
      .filter((u) => u.origin === location.origin && u.pathname === location.pathname && u.hash.length > 1 && !document.getElementById(decodeURIComponent(u.hash.slice(1))))
      .map((u) => u.hash);
    const head = [...document.head.querySelectorAll("title, meta[content], link[rel*='icon']")].map((e) => e.outerHTML).filter((h) => /twinlink/i.test(h)).map((h) => h.slice(0, 120));
    return { anchors: [...new Set(anchors)], head, inputs: document.querySelectorAll("main input:not([type=hidden]), main select, main textarea").length };
  });
  // Click every visible button in the page body and see whether anything changes.
  const total = await page.locator("main button").count();
  const dead = [];
  for (let i = 0; i < total; i++) {
    const button = page.locator("main button").nth(i);
    if (!(await button.isVisible().catch(() => false))) continue;
    const state = await button.evaluate((b) => ({
      selected: b.getAttribute("aria-pressed") === "true" || b.getAttribute("aria-selected") === "true",
      off: b.disabled || b.tabIndex === -1, submit: b.type === "submit" && !!b.closest("form"),
      label: (b.innerText || b.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim().slice(0, 50),
    })).catch(() => null);
    if (!state || state.off || state.selected || state.submit) continue;
    const snapshot = () => page.evaluate(() => document.querySelector("main").innerHTML + scrollY);
    await button.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(120);
    const before = await snapshot();
    await button.click({ timeout: 1500, force: true }).catch(() => {});
    await page.waitForTimeout(250);
    if (!page.url().startsWith(LOCAL + path)) break;
    if ((await snapshot()) === before) dead.push(state.label || "(icon)");
  }
  report[path] = { ...info, buttons: total, dead };
  await context.close();
}

const queue = [...PAGES];
await Promise.all([0, 1, 2, 3].map(async () => {
  while (queue.length) {
    const path = queue.shift();
    try { await audit(path); } catch (error) { report[path] = { error: error.message.split("\n")[0] }; }
  }
}));
await browser.close();
writeFileSync(".visual-qa/reports/audit.json", JSON.stringify(report, null, 1));
for (const [path, r] of Object.entries(report).sort()) {
  if (r.error || r.dead.length || r.anchors.length) console.log(path, r.error ?? `dead ${r.dead.length}/${r.buttons} [${[...new Set(r.dead)].slice(0, 8).join(" | ")}] inputs ${r.inputs}${r.anchors.length ? " anchors " + r.anchors.join(",") : ""}`);
}
const head = Object.entries(report).filter(([, r]) => r.head?.length);
console.log("pages with old branding in metadata:", head.length, head[0]?.[1].head.join(" ") ?? "");
