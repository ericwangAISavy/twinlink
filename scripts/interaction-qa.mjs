// Behaviour checks against a running local build (see scripts/visual-qa.mjs).
import { mkdirSync } from "node:fs";
import assert from "node:assert/strict";
import { chromium } from "playwright";

const LOCAL = process.env.VISUAL_QA_URL || "http://localhost:3100/";
const SHOTS = ".visual-qa/implementation/interactions";
mkdirSync(SHOTS, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const errors = [];
async function open(width, height, options = {}) {
  const context = await browser.newContext({ viewport: { width, height }, ...options });
  await context.route(/\/api\/visits/, (route) => route.abort());
  const page = await context.newPage();
  page.on("console", (m) => { if (m.type() === "error" && !/ERR_FAILED/.test(m.text())) errors.push(`${m.text()} ${m.location().url}`); });
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(LOCAL, { waitUntil: "load" });
  await page.waitForTimeout(1200);
  return page;
}
const results = [];
async function check(name, run) {
  try { await run(); results.push(`PASS ${name}`); } catch (error) { results.push(`FAIL ${name}: ${error.message.split("\n")[0]}`); }
}

const page = await open(1440, 900);
for (const menu of ["Products", "Research", "Solutions", "Resources", "Company"]) {
  await check(`dropdown ${menu} opens on hover`, async () => {
    const button = page.getByRole("button", { name: menu, exact: true });
    await button.hover();
    await page.waitForTimeout(500);
    assert.equal(await button.getAttribute("aria-expanded"), "true");
    await page.screenshot({ path: `${SHOTS}/menu-${menu}.png` });
    await page.mouse.move(5, 600);
    await page.waitForTimeout(200);
    assert.equal(await button.getAttribute("aria-expanded"), "false");
  });
}
await check("Escape closes a dropdown", async () => {
  const button = page.getByRole("button", { name: "Research", exact: true });
  await button.focus();
  await page.keyboard.press("Enter");
  assert.equal(await button.getAttribute("aria-expanded"), "true");
  await page.keyboard.press("Escape");
  assert.equal(await button.getAttribute("aria-expanded"), "false");
});
await check("header collapses the announcement on scroll", async () => {
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(700);
  assert.equal(Math.round((await page.locator("header").boundingBox()).height), 72);
});
await check("pinned platform section steps through four tabs", async () => {
  const top = await page.locator("#builder").evaluate((n) => n.getBoundingClientRect().top + scrollY);
  const seen = [];
  for (let i = 0; i < 4; i++) {
    await page.evaluate((y) => scrollTo(0, y), top + 2700 * (i + 0.5) / 4);
    await page.waitForTimeout(600);
    seen.push((await page.locator("#builder button[aria-pressed=true]:visible").innerText()).replace(/\s+/g, " "));
    await page.screenshot({ path: `${SHOTS}/tab-${i}.png` });
  }
  assert.deepEqual(seen, ["01 Enterprise", "02 Agents API", "03 Models API", "04 HoloTab"]);
});
await check("clicking a tab scrolls to it", async () => {
  await page.locator("#builder button:visible", { hasText: "Agents API" }).click();
  await page.waitForTimeout(1500);
  assert.match(await page.locator("#builder button[aria-pressed=true]:visible").innerText(), /Agents API/);
});
await check("every image loads", async () => {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 450) { await page.evaluate((v) => scrollTo(0, v), y); await page.waitForTimeout(80); }
  await page.waitForTimeout(1000);
  const broken = await page.evaluate(() => [...document.images].filter((i) => i.offsetParent && !(i.complete && i.naturalWidth)).map((i) => i.src));
  assert.deepEqual(broken, []);
});

const mobile = await open(390, 844);
await check("mobile menu opens, expands and closes", async () => {
  await mobile.getByRole("button", { name: "Open menu" }).click();
  await mobile.waitForTimeout(400);
  await mobile.screenshot({ path: `${SHOTS}/mobile-menu.png` });
  await mobile.getByRole("button", { name: "Products", exact: true }).click();
  await mobile.waitForTimeout(400);
  await mobile.screenshot({ path: `${SHOTS}/mobile-menu-products.png` });
  assert.ok(await mobile.getByRole("link", { name: "Enterprise", exact: true }).first().isVisible());
  await mobile.getByRole("button", { name: "Close menu" }).click();
  assert.equal(await mobile.getByRole("button", { name: "Products", exact: true }).isVisible(), false);
});
await check("mobile platform tabs switch panels", async () => {
  await mobile.getByRole("tab", { name: "Models API" }).click();
  assert.ok(await mobile.getByRole("heading", { name: "Build on Holo4 directly." }).isVisible());
});

await check("no horizontal overflow at intermediate widths", async () => {
  const bad = [];
  for (const width of [320, 360, 430, 540, 639, 640, 767, 900, 1023, 1100, 1366, 1680, 2560]) {
    await mobile.setViewportSize({ width, height: 900 });
    await mobile.waitForTimeout(250);
    const extra = await mobile.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (extra > 0) bad.push(`${width}px +${extra}`);
  }
  assert.deepEqual(bad, []);
});

async function visit(path, run) {
  const view = await open(1440, 900);
  await view.goto(new URL(path, LOCAL).href, { waitUntil: "load" });
  await view.waitForTimeout(900);
  await run(view);
  await view.context().close();
}
const text = (view) => view.locator("main").innerText();
for (const path of ["newsroom", "technical-blog", "insights", "research/publications", "use-cases", "events/ces-2027", "bot-estate-audit", "exception-queue-sprint", "team", "newsroom/h-x-42ai-hackathon-paris-winners"]) {
  await check(`${path}: controls change the page`, () => visit(path, async (view) => {
    const total = await view.locator("main [data-swap]").count();
    assert.ok(total >= 2, `${total} controls`);
    const before = await view.locator("main").innerHTML();
    const changed = new Set();
    for (let i = 1; i <= Math.min(total, 4); i++) {
      const control = view.locator(`main [data-swap="${i}"]`).first();
      if (!(await control.count()) || !(await control.isVisible())) continue;
      await control.click();
      await view.waitForTimeout(250);
      const now = await view.locator("main").innerHTML();
      if (now !== before) changed.add(i);
    }
    assert.ok(changed.size >= 1, "nothing changed");
  }));
}
await check("calculator updates its estimate", () => visit("bot-run-cost-calculator", async (view) => {
  assert.match(await text(view), /\$637,000/);
  await view.fill("#calc-lic", "350000");
  assert.match(await text(view), /\$737,000/);
  assert.match(await text(view), /\$12,283/);
}));
await check("scorecard reaches a verdict", () => visit("exception-queue-scorecard", async (view) => {
  const options = view.locator("main button[aria-pressed]");
  for (let q = 0; q < 12; q++) await options.nth(q * 3 + 2).click();
  assert.match(await text(view), /24 \/ 24/);
  assert.match(await text(view), /Sprint-ready/);
  await options.nth(0).click();
  assert.match(await text(view), /22 \/ 24/);
  assert.match(await text(view), /Volume is the gap/);
}));
await check("copy button copies the address", () => visit("contact", async (view) => {
  await view.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await view.getByRole("button", { name: "Copy" }).first().click();
  assert.equal(await view.evaluate(() => navigator.clipboard.readText()), "contact@hcompany.ai");
}));
await check("story search filters cards", () => visit("newsroom", async (view) => {
  const cards = view.locator("main a[href^='/newsroom/']:visible");
  const before = await cards.count();
  await view.locator("main input").first().fill("holotab");
  await view.waitForTimeout(500);
  const after = await cards.count();
  assert.ok(after > 0 && after < before, `${before} -> ${after}`);
}));
await check("forms do not submit", () => visit("contact", async (view) => {
  const posts = [];
  view.on("request", (request) => { if (request.method() === "POST" && !/api\/visits/.test(request.url())) posts.push(request.url()); });
  await view.locator("main form").first().evaluate((form) => form.requestSubmit?.() ?? form.submit());
  await view.waitForTimeout(500);
  assert.deepEqual(posts, []);
}));
await check("unknown addresses show the site's not-found page", async () => {
  const view = await open(1440, 900);
  const response = await view.goto(new URL("no-such-page", LOCAL).href);
  assert.equal(response.status(), 404);
  assert.match(await view.locator("body").innerText(), /Page not found/);
  errors.length = 0;
  await view.context().close();
});

await check("no console errors", async () => assert.ok(!errors.length, [...new Set(errors)].join(" | ").replace(/s+/g, " ").slice(0, 600)));
await browser.close();
console.log(results.join("\n"));
process.exitCode = results.some((line) => line.startsWith("FAIL")) ? 1 : 0;
