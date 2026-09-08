import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { routePages } from '../src/data/routes.js';
import path from 'node:path';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const base = await readFile('dist/index.html', 'utf8');
const bundles = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
const pageFiles = { about: 'AboutPage', 'pal-group': 'PalGroupPage', ownership: 'OwnershipPage', board: 'BoardPage', prateek: 'PrateekPage', 'pal-fresh-global': 'PalFreshGlobalPage', 'pal-fresh': 'PalFreshPage', frozzo: 'FrozzoPage', 'pal-stone': 'PalStoneIndustriesPage', 'pal-skoda': 'PalSkodaPage', nissan: 'PalNissanPage', 'pal-ford': 'PalFordPage', 'palam-view': 'PalamViewPage', 'pal-sumeera': 'PalSumeeraPage' };
function pageStyles(name, seen = new Set()) {
  const key = Object.keys(bundles).find(key => key.endsWith(`/${name}.jsx`));
  const visit = key => {
    if (!key || seen.has(key)) return [];
    seen.add(key);
    const entry = bundles[key];
    return [...(entry?.css || []), ...(entry?.imports || []).flatMap(visit)];
  };
  return [...new Set(visit(key))];
}
pageFiles['palam-city'] = 'PalamCityPage';
pageFiles.pallazio = 'PallazioPage';

// Pages with exported metadata also receive complete SEO in the initial HTML.
function withSeo(template, seo) {
  if (!seo) return template;
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  template = template.replace(/<title>[^<]*<\/title>/, `<title>${escape(seo.title)}</title>`);
  const tags = [['name', 'description', seo.description], ['property', 'og:title', seo.title], ['property', 'og:description', seo.description], ['property', 'og:url', `https://smpalgroup.com${seo.path}`], ['property', 'og:image', seo.image], ['property', 'og:image:alt', seo.imageAlt], ['name', 'twitter:title', seo.title], ['name', 'twitter:description', seo.description], ['name', 'twitter:image', seo.image], ['name', 'twitter:image:alt', seo.imageAlt]];
  for (const [attribute, key, value] of tags) {
    const pattern = new RegExp(`<meta[^>]*${attribute}="${key}"[^>]*>`);
    const tag = `<meta ${attribute}="${key}" content="${escape(value)}">`;
    template = pattern.test(template) ? template.replace(pattern, tag) : template.replace('</head>', `${tag}</head>`);
  }
  template = template.replace(/<link[^>]*rel="canonical"[^>]*>/g, '');
  return template.replace('</head>', `<link rel="canonical" href="https://smpalgroup.com${seo.path}"></head>`);
}
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const { loadPage } = await server.ssrLoadModule('/src/pages/SiteRouter.jsx');
  for (const route of ['/', ...Object.keys(routePages)]) {
    const { default: Page, seo } = await loadPage(route);
    const markup = renderToString(React.createElement(App, { Page, path: route }));
    const file = `dist${route === '/' ? '' : route}/index.html`;
    let template;
    try { template = await readFile(file, 'utf8'); } catch { template = base; }
    template = withSeo(template, seo);
    const preloads = [...markup.matchAll(/<link\b[^>]*rel="preload"[^>]*\/>/g)].map(m => m[0]);
    const css = pageStyles(route === '/' ? 'HomePage' : pageFiles[routePages[route]?.type] || 'RoutePage')
      .filter(file => !template.includes(file)).map(file => `<link rel="stylesheet" href="/${file}">`).join('');
    const html = template.replace('<div id="root"></div>', `<div id="root" data-route="${route}">${markup.replace(/<link\b[^>]*rel="preload"[^>]*\/>/g, '')}</div>`)
      .replace('</head>', `${css}${preloads.join('')}\n<link rel="preload" as="font" type="font/woff2" href="/fonts/montserrat-latin-wght-normal.woff2" crossorigin>\n<link rel="preload" as="font" type="font/woff2" href="/fonts/playfair-display-latin-wght-normal.woff2" crossorigin>\n</head>`);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
  }
  console.log(`Prerendered ${Object.keys(routePages).length + 1} routes with original page markup.`);
} finally { await server.close(); }
