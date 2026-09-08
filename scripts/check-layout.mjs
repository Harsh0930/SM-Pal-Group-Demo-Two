import { chromium } from 'playwright-core';
import { mkdir, writeFile, readFile } from 'node:fs/promises';

const label = process.argv[2] || 'after';
const source = await readFile('src/data/routes.js', 'utf8');
const routes = ['/', ...new Set([...source.matchAll(/^  "(\/[^"\n]+)": \{/gm)].map(m => m[1]))];
await mkdir('reports/layout', { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const results = [];
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const route of routes) {
      const errors = [];
      const onError = error => errors.push(error.message);
      page.on('pageerror', onError);
      await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(500);
      const layout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        nodes: [...document.querySelectorAll('main section, main h1, main h2, main h3, main p')].map(node => {
          const r = node.getBoundingClientRect(), css = getComputedStyle(node);
          return { tag: node.tagName, text: node.matches('section') ? node.id : node.textContent.slice(0, 90), x: r.x, y: r.y, w: r.width, h: r.height, font: css.fontFamily, size: css.fontSize, color: css.color };
        }),
      }));
      results.push({ route, width, errors, ...layout });
      if (['/', '/about', '/industries/pal-frozen-foods/frozzo'].includes(route)) {
        await page.screenshot({ path: `reports/layout/${label}-${width}-${route.replaceAll('/', '_')}.png`, animations: 'disabled' });
      }
      page.off('pageerror', onError);
      console.log(`${label} ${width} ${route}: ${errors.length} errors, overflow=${layout.overflow}`);
    }
    await page.close();
  }
} finally { await browser.close(); }
await writeFile(`reports/layout/${label}.json`, JSON.stringify(results, null, 2));
