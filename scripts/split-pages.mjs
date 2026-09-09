// One-time extraction of existing page markup into independently loaded modules.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const file = 'src/pages/SiteRouter.jsx';
const source = await readFile(file, 'utf8');
// This migration is only valid for the original monolithic router.
// Fail before writing anything when it has already been applied.
for (const marker of ['// Data constants', 'const siteUrl =', 'function AboutPage(', '  const [storyIndex']) {
  if (!source.includes(marker)) throw new Error('Page splitting migration already applied or source format changed; no files were written.');
}
const part = (a, b) => source.slice(source.indexOf(a), source.indexOf(b));
await mkdir('src/pages/screens', { recursive: true });
const imports = source.slice(0, source.indexOf('// Data constants')).replace(/^import PalamViewPage.*\r?\n/m, '').replace(/^import PalSumeeraPage.*\r?\n/m, '');
const seo = part('const siteUrl =', 'const routePages =');
const seoNames = [...seo.matchAll(/^function (\w+)/gm)].map(m => m[1]);
await writeFile('src/pages/PageSeo.jsx', `${imports}${seo}\nexport { ${seoNames.join(', ')} };\n`);
await writeFile('src/data/routes.js', `${part('const chairmanImage =', 'const siteUrl =')}${part('const routePages =', 'function Logo(')}\nexport { routePages, businessRoutes };\n`);
await writeFile('src/pages/PageShared.jsx', `${imports}import { businessRoutes } from '../data/routes.js';\n${part('function Logo(', 'function AboutPage(')}\nexport { RouteHeader, LegacyWall, ContactSection };\n`);
const pageNames = [...source.matchAll(/^function (\w+Page)\(/gm)].map(m => m[1]);
const common = imports.replaceAll('"../', '"../../') + `import { ${seoNames.join(', ')} } from '../PageSeo.jsx';\nimport { RouteHeader, LegacyWall, ContactSection } from '../PageShared.jsx';\nimport { businessRoutes } from '../../data/routes.js';\n`;
for (let i = 0; i < pageNames.length; i++) {
  const name = pageNames[i];
  const body = part(`function ${name}(`, `function ${pageNames[i + 1] || 'SiteRouter'}(`);
  await writeFile(`src/pages/screens/${name}.jsx`, `${common}\n${body}\nexport default ${name};\n`);
}
const homeState = part('  const [storyIndex', '  useEffect(() => {\r\n    const onPopState');
const timer = part('  useEffect(() => {\r\n    const interval', '  if (path !==');
const homeBody = part('  const story = stories[storyIndex];', 'export default SiteRouter;');
await writeFile('src/pages/screens/HomePage.jsx', `${common}\nfunction HomePage() {\n${homeState}${timer}${homeBody}\nexport default HomePage;\n`);
const types = { about: 'AboutPage', 'pal-group': 'PalGroupPage', ownership: 'OwnershipPage', board: 'BoardPage', prateek: 'PrateekPage', 'pal-fresh-global': 'PalFreshGlobalPage', 'pal-fresh': 'PalFreshPage', frozzo: 'FrozzoPage', 'pal-stone': 'PalStoneIndustriesPage', 'pal-skoda': 'PalSkodaPage', nissan: 'PalNissanPage', 'pal-ford': 'PalFordPage' };
await writeFile(file, `import React, { useEffect, useState } from 'react';
import { routePages } from '../data/routes.js';
import { RouteHeader } from './PageShared.jsx';

const loaders = {
${Object.entries(types).map(([type, name]) => `  '${type}': () => import('./screens/${name}.jsx'),`).join('\n')}
  'palam-view': () => import('./PalamViewPage.jsx'),
  'pal-sumeera': () => import('./PalSumeeraPage.jsx'),
};
export function loadPage(path) {
  if (path === '/' || !routePages[path]) return import('./screens/HomePage.jsx');
  return (loaders[routePages[path].type] || (() => import('./screens/RoutePage.jsx')))();
}

export default function SiteRouter({ Page, path = '/' }) {
  const page = routePages[path];
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [path]);
  if (!Page) return null;
  if (page?.type === 'pal-sumeera') return <div className="route-page"><a className="skip-link" href="#main">Skip to content</a><RouteHeader /><Page page={page} /></div>;
  if (page?.type === 'palam-view') return <div className="route-page palam-view-page"><RouteHeader /><Page /></div>;
  return <Page page={page} />;
}
`);
