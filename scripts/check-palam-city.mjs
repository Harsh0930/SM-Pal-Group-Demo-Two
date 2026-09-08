import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { routePages } from '../src/data/routes.js';
import { palamCitySeo, palamCityFaqs } from '../src/data/palamCityContent.js';

const base = process.env.AUDIT_URL || 'http://127.0.0.1:4180';
await mkdir('reports/palam-city', { recursive: true });
const html = await readFile(`dist${palamCitySeo.path}/index.html`, 'utf8');
assert.ok(html.includes(`<title>${palamCitySeo.title}</title>`));
assert.ok(html.includes(palamCitySeo.description));
assert.ok(html.includes('FAQPage'));
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  for (const width of [320, 390, 768, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}${palamCitySeo.path}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.title(), palamCitySeo.title);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('h1').isVisible(), true, `${width}: hero heading visible`);
    assert.equal(await page.locator('.pc-hero-photo img').isVisible(), true, `${width}: hero image visible`);
    assert.equal(await page.locator('.pc-hero-photo img').evaluate(img => img.complete && img.naturalWidth > 0), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${width}: no overflow`);
    assert.equal(await page.locator('main p').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).textAlign === 'left')), true);
    await page.screenshot({ path: `reports/palam-city/${width}-hero.png` });
    await page.locator('a[href="#pc-living"]').first().click();
    await page.locator('.pc-amenities details').nth(1).locator('summary').click();
    assert.equal(await page.locator('.pc-amenities details').nth(1).getAttribute('open'), '');
    await page.locator('#pc-living').screenshot({ path: `reports/palam-city/${width}-living.png` });
    for (let i = 0; i < palamCityFaqs.length; i++) {
      const faq = page.locator('#pc-faq details').nth(i);
      await faq.locator('summary').click();
      assert.equal(await faq.locator('p').isVisible(), true);
    }
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faq = schemas.map(JSON.parse).find(data => data['@type'] === 'FAQPage');
    assert.equal(faq.mainEntity.length, 4);
    const links = await page.locator('main a:not(.pz-gallery-item)').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
    for (const href of links.filter(href => href.startsWith('/') || href.startsWith('#'))) {
      const url = new URL(href, `${base}${palamCitySeo.path}`);
      assert.ok(url.pathname === '/' || routePages[url.pathname], `Known route: ${href}`);
      if (url.hash) {
        const targetHtml = await readFile(`dist${url.pathname === '/' ? '' : url.pathname}/index.html`, 'utf8');
        assert.ok(targetHtml.includes(`id="${url.hash.slice(1)}"`), `Existing anchor: ${href}`);
      }
    }
    assert.deepEqual(errors, [], `${width}: browser errors`);
    console.log(`PASS ${width}px: layout, paragraphs, amenities, FAQs, SEO and internal links`);
    await page.close();
  }
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto(`${base}${palamCitySeo.path}`);
  assert.equal(await page.locator('h1').isVisible(), true);
  await page.locator('#pc-faq summary').first().click();
  assert.equal(await page.locator('#pc-faq details p').first().isVisible(), true);
  console.log('PASS: content and FAQs work without JavaScript');
} finally { await browser.close(); }
