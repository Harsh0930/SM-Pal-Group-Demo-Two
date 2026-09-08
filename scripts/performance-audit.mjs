import lighthouse from 'lighthouse';
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';

const [label = 'current', mode = 'mobile', ...routes] = process.argv.slice(2);
const base = process.env.AUDIT_URL || 'http://127.0.0.1:4173';
await mkdir('reports/performance', { recursive: true });
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true, args: [`--remote-debugging-port=${port}`],
});
try {
  for (const route of routes.length ? routes : ['/']) {
    const result = await lighthouse(`${base}${route}`, {
      port, output: ['json', 'html'], logLevel: 'error',
      onlyCategories: ['performance'], ...(mode === 'desktop' ? { preset: 'desktop' } : {}),
    });
    const name = `${label}-${mode}-${route.replaceAll('/', '_') || 'home'}`;
    await writeFile(`reports/performance/${name}.json`, result.report[0]);
    await writeFile(`reports/performance/${name}.html`, result.report[1]);
    const { audits, categories } = result.lhr;
    console.log(JSON.stringify({ route, mode, score: categories.performance.score * 100,
      fcp: audits['first-contentful-paint'].numericValue,
      lcp: audits['largest-contentful-paint'].numericValue,
      tbt: audits['total-blocking-time'].numericValue,
      cls: audits['cumulative-layout-shift'].numericValue,
      bytes: audits['total-byte-weight'].numericValue,
    }));
  }
} finally { await chrome.close(); }
