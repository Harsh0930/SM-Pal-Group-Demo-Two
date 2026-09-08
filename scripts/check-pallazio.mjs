import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { routePages } from '../src/data/routes.js';
import * as pallazio from '../src/data/pallazioContent.js';
import * as palamCity from '../src/data/palamCityContent.js';
const isPalamCity = process.env.TEST_PROJECT === 'palam-city';
const project = isPalamCity ? 'palam-city' : 'pallazio';
const prefix = isPalamCity ? 'pc' : 'pz';
const pallazioSeo = isPalamCity ? palamCity.palamCitySeo : pallazio.pallazioSeo;
const pallazioFaqs = isPalamCity ? palamCity.palamCityFaqs : pallazio.pallazioFaqs;
const pallazioGallery = isPalamCity ? palamCity.palamCityGallery : pallazio.pallazioGallery;

const base = process.env.AUDIT_URL || 'http://127.0.0.1:4180';
await mkdir(`reports/${project}`, { recursive: true });
const html = await readFile(`dist${pallazioSeo.path}/index.html`, 'utf8');
assert.ok(html.includes(`<title>${pallazioSeo.title}</title>`));
assert.ok(html.includes(pallazioSeo.description));
assert.ok(html.includes(`rel="canonical" href="https://smpalgroup.com${pallazioSeo.path}"`));
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  for (const width of [320, 390, 768, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}${pallazioSeo.path}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.title(), pallazioSeo.title);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('h1').isVisible(), true);
    assert.equal(await page.locator('.pc-hero-photo img').isVisible(), true);
    assert.equal(await page.locator('.pc-hero-photo img').evaluate(img => img.complete && img.naturalWidth > 0), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.equal(await page.locator('main p').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).textAlign === 'left')), true);
    await page.screenshot({ path: `reports/${project}/${width}-hero.png` });
    await page.locator(`a[href="#${prefix}-gallery"]`).first().click();
    const gallery = page.locator('.pz-gallery-item');
    assert.equal(await gallery.count(), 6);
    for (const item of await gallery.all()) {
      await item.scrollIntoViewIfNeeded();
      await item.locator('img').evaluate(img => img.decode());
    }
    await page.locator(`#${prefix}-gallery`).screenshot({ path: `reports/${project}/${width}-gallery.png` });
    const first = gallery.first();
    await first.click();
    const dialog = page.getByRole('dialog');
    await dialog.waitFor({ state: 'visible' });
    assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
    assert.equal(await dialog.locator('img').getAttribute('alt'), pallazioGallery[0].alt);
    await page.getByRole('button', { name: 'Next image', exact: true }).click();
    assert.equal(await dialog.locator('img').getAttribute('alt'), pallazioGallery[1].alt);
    await page.keyboard.press('ArrowLeft');
    assert.equal(await dialog.locator('img').getAttribute('alt'), pallazioGallery[0].alt);
    await page.getByRole('button', { name: 'Previous image', exact: true }).click();
    assert.equal(await dialog.locator('img').getAttribute('alt'), pallazioGallery.at(-1).alt);
    await dialog.locator('img').evaluate(img => img.decode());
    await page.screenshot({ path: `reports/${project}/${width}-lightbox.png` });
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      assert.ok(await dialog.evaluate(node => node.contains(document.activeElement)), 'Modal traps keyboard focus');
    }
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'hidden' });
    await page.waitForFunction(() => document.body.style.overflow !== 'hidden', null, { timeout: 2000 });
    assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
    assert.ok(await first.evaluate(node => node === document.activeElement), 'Focus returns to gallery trigger');
    await gallery.nth(2).click();
    await page.getByRole('button', { name: 'Close gallery', exact: true }).click();
    await dialog.waitFor({ state: 'hidden' });
    const amenity = page.locator('.pc-amenities details').nth(1);
    await amenity.locator('summary').click();
    assert.equal(await amenity.locator('p').isVisible(), true);
    for (const faq of await page.locator(`#${prefix}-faq details`).all()) {
      await faq.locator('summary').click();
      assert.equal(await faq.locator('p').isVisible(), true);
    }
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const schema = schemas.map(JSON.parse).find(data => data['@type'] === 'FAQPage');
    assert.deepEqual(schema.mainEntity.map(q => [q.name, q.acceptedAnswer.text]), pallazioFaqs);
    const links = await page.locator('main a:not(.pz-gallery-item)').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
    for (const href of links.filter(href => href.startsWith('/') || href.startsWith('#'))) {
      const url = new URL(href, `${base}${pallazioSeo.path}`);
      assert.ok(url.pathname === '/' || routePages[url.pathname], `Known route: ${href}`);
      if (url.hash) {
        const targetHtml = await readFile(`dist${url.pathname === '/' ? '' : url.pathname}/index.html`, 'utf8');
        assert.ok(targetHtml.includes(`id="${url.hash.slice(1)}"`), `Existing anchor: ${href}`);
      }
    }
    assert.deepEqual(errors, []);
    console.log(`PASS ${width}px: visible hero, no overflow, gallery controls/focus, FAQs, SEO and internal links`);
    await page.close();
  }
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto(`${base}${pallazioSeo.path}`);
  assert.equal(await page.locator('h1').isVisible(), true);
  await page.locator(`#${prefix}-faq summary`).first().click();
  assert.equal(await page.locator(`#${prefix}-faq details p`).first().isVisible(), true);
  const imageHref = await page.locator('.pz-gallery-item').first().getAttribute('href');
  const response = await page.request.get(`${base}${imageHref}`);
  assert.equal(response.status(), 200);
  console.log('PASS: prerendered content, FAQ and gallery image links work without JavaScript');
} finally { await browser.close(); }
