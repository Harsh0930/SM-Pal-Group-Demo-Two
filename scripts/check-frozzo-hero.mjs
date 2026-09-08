import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

await mkdir('reports/frozzo-hero', { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const route = 'http://127.0.0.1:4173/industries/pal-frozen-foods/frozzo';
const results = [];
try {
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.addInitScript(() => {
      window.iceDrawCalls = 0;
      for (const Context of [WebGLRenderingContext, WebGL2RenderingContext]) {
        for (const key of ['drawElements', 'drawArrays']) {
          const original = Context.prototype[key];
          Context.prototype[key] = function(...args) { window.iceDrawCalls++; return original.apply(this, args); };
        }
      }
    });
    const errors = [], warnings = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (['error', 'warning'].includes(m.type())) warnings.push(m.text()); });
    await page.goto(route, { waitUntil: 'load' });
    await page.locator('[data-ice-state="ready"]').waitFor({ timeout: 30000 });
    await page.waitForTimeout(2100);
    assert.equal(await page.locator('.fz-ice-stage canvas').count(), 1);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.screenshot({ path: `reports/frozzo-hero/${width}-opening.png` });
    await page.getByRole('button', { name: 'Pause ice animation', exact: true }).click();
    await page.waitForTimeout(150);
    const frozenA = await page.evaluate(() => window.iceDrawCalls);
    await page.waitForTimeout(250);
    const frozenB = await page.evaluate(() => window.iceDrawCalls);
    assert.equal(frozenA, frozenB, 'Pause stops GPU draw calls');
    await page.getByRole('button', { name: 'Resume ice animation', exact: true }).click();
    await page.evaluate(() => scrollTo(0, 300));
    await page.waitForTimeout(900);
    assert.ok(await page.evaluate(() => window.iceDrawCalls) > frozenB, 'Resume restarts rendering');
    await page.screenshot({ path: `reports/frozzo-hero/${width}-scroll.png` });
    await page.getByRole('link', { name: /Explore our snacks/ }).click();
    await page.waitForTimeout(800);
    assert.equal(await page.evaluate(() => location.hash), '#fz-products');
    assert.equal(await page.locator('.fz-packet-card').count(), 6);
    results.push({ width, errors, warnings });
    assert.deepEqual(errors, []);
    console.log(`PASS ${width}px: WebGL, pause/resume, scroll, CTA, six packets, no overflow.`);
    await page.close();
  }
  for (const fallback of ['reduced-motion', 'no-webgl']) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: fallback === 'reduced-motion' ? 'reduce' : 'no-preference' });
    if (fallback === 'no-webgl') await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function(type, ...args) { return type.includes('webgl') ? null : original.call(this, type, ...args); };
    });
    await page.goto(route, { waitUntil: 'load' });
    await page.waitForTimeout(1800);
    assert.equal(await page.locator('.fz-ice-stage canvas').count(), 0);
    assert.ok(await page.locator('#frozzo-hero-title').isVisible());
    assert.ok(await page.locator('.fz-ice-emblem img').isVisible());
    await page.screenshot({ path: `reports/frozzo-hero/${fallback}.png` });
    console.log(`PASS ${fallback}: static logo and content remain visible.`);
    await page.close();
  }
  const other = await browser.newPage();
  const requests = [];
  other.on('request', request => requests.push(request.url()));
  await other.goto('http://127.0.0.1:4173/', { waitUntil: 'load' });
  await other.waitForTimeout(1500);
  assert.ok(!requests.some(url => /createIceScene|FrozzoPage/.test(url)), 'Homepage does not download Frozzo effects');
  console.log('PASS: Frozzo scene is not loaded on the homepage.');
} finally { await browser.close(); }
await writeFile('reports/frozzo-hero/results.json', JSON.stringify(results, null, 2));
