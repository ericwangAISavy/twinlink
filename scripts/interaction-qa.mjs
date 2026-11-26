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
  assert.deepEqual(seen, ["01 Enterprise", "02 Agents API", "03 Models API", "04 OrinTab"]);
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
  assert.ok(await mobile.getByRole("heading", { name: "Build on Orin directly." }).isVisible());
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

for (const [path, count] of [["enterprise", 2], ["agents-api", 1], ["orin-tab", 1], ["platform", 1]]) {
  await check(`${path} tabs change what is shown`, async () => {
    const tabs = await open(1440, 900);
    await tabs.goto(new URL(path, LOCAL).href, { waitUntil: "load" });
    await tabs.waitForTimeout(800);
    assert.equal(await tabs.locator("main .contents").count(), count);
    for (let group = 0; group < count; group++) {
      const wrapper = tabs.locator("main .contents").nth(group);
      const seen = new Set();
      const total = await wrapper.locator("[data-swap]:visible").count();
      assert.ok(total >= 3, `only ${total} tabs`);
      for (let i = 0; i < total; i++) {
        await wrapper.locator(`[data-swap="${i}"]:visible`).first().click();
        await tabs.waitForTimeout(300);
        seen.add(await wrapper.innerHTML());
      }
      assert.equal(seen.size, total);
    }
    await tabs.context().close();
  });
}
await check("question list expands", async () => {
  const faq = await open(1440, 900);
  await faq.goto(new URL("pricing", LOCAL).href, { waitUntil: "load" });
  await faq.waitForTimeout(800);
  const before = await faq.locator("main button[aria-expanded]").count();
  await faq.getByRole("button", { name: /more questions/ }).click();
  assert.ok(await faq.locator("main button[aria-expanded]").count() > before);
  await faq.context().close();
});

await check("no console errors", async () => assert.ok(!errors.length, [...new Set(errors)].join(" | ").replace(/s+/g, " ").slice(0, 600)));
await browser.close();
console.log(results.join("\n"));
process.exitCode = results.some((line) => line.startsWith("FAIL")) ? 1 : 0;
