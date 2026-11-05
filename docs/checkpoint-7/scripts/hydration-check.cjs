/* eslint-disable @typescript-eslint/no-require-imports -- Production hydration regression. */
const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const fs = require('fs');
const targets = require('../../checkpoint-3/route-map.json').referencePages;
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:3000';
(async () => {
  const browser = await chromium.launch({executablePath: '/usr/bin/chromium', args: ['--no-sandbox']});
  const results = [];
  try {
    for (const round of [1, 2]) for (const mode of ['desktop', 'mobile']) {
      const page = await browser.newPage({viewport: mode === 'desktop' ? {width: 1440, height: 900} : {width: 390, height: 844}, isMobile: mode === 'mobile', hasTouch: mode === 'mobile', deviceScaleFactor: 1});
      const errors = [];
      page.on('pageerror', e => errors.push({url: page.url(), message: e.stack}));
      await page.route('**/api/visits', r => r.fulfill({status: 204}));
      for (const target of targets) {
        const response = await page.goto(base + target.twinlinkTarget, {waitUntil: 'domcontentloaded'});
        if (response) assert.equal(response.status(), 200);
        else {
          // T03 navigates within the already loaded About document.
          assert.equal(target.id, 'T03');
          assert.equal(new URL(page.url()).hash, '#culture');
          assert.equal(await page.locator('#culture').count(), 1);
        }
        // Exercise the hydrated header without waiting for main hydration.
        const selector = mode === 'desktop' ? '[data-group="1"]' : '.foundation-menu-toggle';
        await page.waitForFunction(selector => Object.keys(document.querySelector(selector)).some(k => k.startsWith('__reactFiber$')), selector);
        const trigger = page.locator(selector);
        if (mode === 'desktop') {
          await trigger.focus();
          await trigger.press('ArrowDown');
        } else await trigger.click();
        await page.waitForFunction(selector => document.querySelector(selector).getAttribute('aria-expanded') === 'true', selector);
        await page.keyboard.press('Escape');
        await page.waitForFunction(selector => document.querySelector(selector).getAttribute('aria-expanded') === 'false', selector);
        await page.waitForFunction(() => Object.keys(document.querySelector('#marketing-content')).some(k => k.startsWith('__reactFiber$')));
        // Force the other stateful shared-shell component to update as well.
        await page.evaluate(() => scrollTo({top: 500, behavior: 'instant'}));
        await page.getByRole('button', {name: 'Back to top', exact: true}).click();
        await page.waitForFunction(() => scrollY === 0);
        await page.waitForTimeout(100);
        assert.deepEqual(errors, [], `${target.id} ${mode} early header interaction`);
        results.push({round, id: target.id, mode, earlyHeaderInteraction: true, errors: []});
        console.log(target.id, mode, 'early header hydration passed');
      }
      await page.close();
    }
    fs.writeFileSync('docs/checkpoint-7/evidence/hydration-results.json', JSON.stringify(results, null, 2) + '\n');
  } finally {await browser.close();}
})().catch(e => {console.error(e); process.exitCode = 1;});
