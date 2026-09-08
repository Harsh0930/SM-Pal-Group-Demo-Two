/**
 * CSS Optimizer for SM Pal Group Website
 *
 * Strategy:
 * 1. Use PostCSS to parse all CSS
 * 2. Split CSS into route-specific bundles based on class prefixes
 * 3. Generate critical CSS for above-the-fold content
 * 4. Output optimized CSS bundles for each route
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import postcss from 'postcss';
import path from 'node:path';

const STYLES_DIR = path.resolve('src/styles');
const OUTPUT_DIR = path.resolve('reports/css-optimized');

// Route to CSS class prefix mapping
const ROUTE_CLASS_MAP = {
  '/': ['home-page'],
  '/about': ['about-page'],
  '/about/the-pal-group': ['pal-group-page', 'about-page'],
  '/about/board-of-directors': ['board-page', 'about-page'],
  '/about/ownership': ['ownership-page', 'about-page'],
  '/about/prateek-pal': ['prateek-page', 'about-page'],

  // Industries
  '/industries/pal-frozen-foods/pal-fresh': ['pal-fresh-page', 'pf-page', 'route-page'],
  '/industries/pal-frozen-foods/frozzo': ['frozzo-page', 'fz-page', 'route-page'],
  '/industries/pal-stone': ['skoda-page', 'nissan-page', 'ford-page', 'route-page'],
  '/industries/pal-skoda': ['skoda-page', 'route-page'],
  '/industries/pal-nissan': ['nissan-page', 'route-page'],
  '/industries/pal-ford': ['ford-page', 'route-page'],

  // Palam View and Sumeera
  '/palam-view': ['palam-view-page'],
  '/pal-sumeera': ['pal-sumeera-page'],

  // Default fallback - includes everything
  'default': [] // will collect all
};

// Flatten all route classes for matching
function getAllRouteClasses() {
  const classes = new Set();
  Object.values(ROUTE_CLASS_MAP).flat().forEach(c => classes.add(c));
  return Array.from(classes);
}

async function optimizeCss() {
  console.log('🔍 Reading all CSS files from src/styles...');

  // Read all CSS files
  const files = await readdir(STYLES_DIR);
  const cssFiles = files.filter(f => f.endsWith('.css'));

  console.log(`📄 Found ${cssFiles.length} CSS files: ${cssFiles.join(', ')}`);

  // Parse all CSS with PostCSS
  const root = postcss.root();

  for (const file of cssFiles) {
    const content = await readFile(path.join(STYLES_DIR, file), 'utf8');
    try {
      const parsed = postcss.parse(content, { from: file });
      root.append(parsed.nodes);
      console.log(`  ✓ Parsed ${file}`);
    } catch (err) {
      console.warn(`  ⚠️  Failed to parse ${file}: ${err.message}`);
    }
  }

  console.log('🌳 CSS AST built with', root.nodes.length, 'top-level nodes');

  // For each route, extract matching CSS
  await mkdir(OUTPUT_DIR, { recursive: true });

  const routeResults = {};

  for (const [route, classPrefixes] of Object.entries(ROUTE_CLASS_MAP)) {
    console.log(`\\n🎯 Processing route: ${route}`);

    // Create a copy of the root for this route
    const routeRoot = postcss.root();

    // Walk through all rules and keep only those matching route classes
    root.walkRules(rule => {
      const selector = rule.selector;
      let shouldKeep = false;

      // If route has specific classes, check for them
      if (classPrefixes.length > 0) {
        for (const prefix of classPrefixes) {
          if (selector.includes(`.${prefix}`) || selector.includes(`[class*="${prefix}"]`)) {
            shouldKeep = true;
            break;
          }
        }
      } else {
        // Default case: keep everything (fallback)
        shouldKeep = true;
      }

      if (shouldKeep) {
        routeRoot.append(rule.clone());
      }
    });

    // Generate CSS string
    const css = routeRoot.toString();

    // Save route-specific CSS
    const safeRouteName = route.replace(/[\\/:*?"<>|]/g, '_') || 'root';
    const outputPath = path.join(OUTPUT_DIR, `${safeRouteName}.css`);

    await writeFile(outputPath, css);

    // Calculate stats
    const originalSize = root.toString().length;
    const routeSize = css.length;
    const savings = ((originalSize - routeSize) / originalSize * 100).toFixed(1);

    routeResults[route] = {
      originalSize,
      routeSize,
      savings,
      selectors: routeRoot.nodes.filter(n => n.type === 'rule').length
    };

    console.log(`  📊 Original: ${originalSize.toLocaleString()} → Route: ${routeSize.toLocaleString()} bytes (${savings}% savings)`);
    console.log(`  🔢 Selectors: ${routeResults[route].selectors}`);
  }

  // Also generate a combined "all routes" CSS for comparison
  const allCss = root.toString();
  await writeFile(path.join(OUTPUT_DIR, 'all-routes.css'), allCss);

  // Generate manifest
  const manifest = {
    generatedAt: new Date().toISOString(),
    totalOriginalBytes: root.toString().length,
    routes: routeResults
  };

  await writeFile(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));

  console.log(`\\n✅ CSS optimization complete! Output in: ${OUTPUT_DIR}`);
  console.log('\\n📈 Savings per route:');
  for (const [route, data] of Object.entries(routeResults)) {
    console.log(`  ${route.padEnd(40)}: ${data.savings}%`);
  }

  return manifest;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  optimizeCss().catch(err => {
    console.error('❌ Optimization failed:', err);
    process.exit(1);
  });
}

export default optimizeCss;