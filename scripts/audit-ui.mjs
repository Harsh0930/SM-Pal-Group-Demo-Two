// Source/render checks. This does not replace a visual browser inspection.
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { legacyMoments } from "../src/data/aboutContent.js";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import postcss from "postcss";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const source = read("src/data/routes.js");
const paths = ["/", ...new Set([...source.matchAll(/^  "(\/[^"\n]+)": \{/gm)].map((m) => m[1]))];
const roots = [...read("src/main.jsx").matchAll(/import "\.\/(styles\/[^\"]+\.css)"/g)].map(([, file]) => postcss.parse(read(`src/${file}`), { from: `src/${file}` }));

assert.equal(new Set(legacyMoments.map((moment) => moment.image)).size, legacyMoments.length, "No duplicate journey photographs");
for (const moment of legacyMoments) {
  assert.ok(existsSync(new URL(`../public${moment.image}`, import.meta.url)), `Journey image exists: ${moment.image}`);
  assert.ok(moment.alt && moment.area, `Journey image description and placement: ${moment.title}`);
}

function active(rule, width) {
  for (let parent = rule.parent; parent; parent = parent.parent) {
    if (parent.type !== "atrule" || parent.name !== "media") continue;
    if (/prefers-reduced-motion|max-height/.test(parent.params)) return false;
    for (const [, kind, value] of parent.params.matchAll(/(min|max)-width:\s*(\d+)px/g)) {
      if (kind === "max" && width > Number(value)) return false;
      if (kind === "min" && width < Number(value)) return false;
    }
  }
  return true;
}

// Resolve explicit layout rules, including media queries, specificity and order.
// Selectors are supplied for these known shared elements, not arbitrary DOM.
function ruleValue(selectors, property, width) {
  let winner;
  let order = 0;
  for (const root of roots) root.walkRules((rule) => {
    if (!active(rule, width)) return;
    for (const selector of rule.selectors) {
      if (!selectors.includes(selector)) continue;
      const specificity = (selector.match(/\.[\w-]+/g) || []).length;
      rule.walkDecls(property, (decl) => {
        const candidate = { value: decl.value, important: Number(decl.important || 0), specificity, order: ++order };
        if (!winner || candidate.important > winner.important || (candidate.important === winner.important && candidate.specificity >= winner.specificity)) winner = candidate;
      });
    }
  });
  return winner?.value;
}

const widths = [320, 360, 390, 414, 640, 768, 820, 900, 1000, 1001, 1024, 1200, 1280, 1440, 1920];
for (const width of widths) {
  const ownerAreas = ruleValue([".ownership-page main .own-moments-grid"], "grid-template-areas", width);
  const ownerRows = [...ownerAreas.matchAll(/"([^"]+)"/g)].map((match) => match[1].split(/\s+/));
  assert.equal(ownerRows[0].length, width <= 900 ? 2 : 4, `Ownership gallery columns at ${width}px`);
  for (const name of ["founder", "office", "award", "stat", "formal", "quote", "stage", "portrait"]) {
    const cells = ownerRows.flatMap((row, y) => row.flatMap((cell, x) => cell === name ? [{ x, y }] : []));
    assert.ok(cells.length, `Ownership ${name} has a cell at ${width}px`);
    const xs = cells.map((cell) => cell.x), ys = cells.map((cell) => cell.y);
    assert.equal(cells.length, (Math.max(...xs) - Math.min(...xs) + 1) * (Math.max(...ys) - Math.min(...ys) + 1), `Ownership ${name} forms a rectangle`);
  }
  const mosaicSelectors = [".legacy-wall .legacy-mosaic", ".about-page .legacy-wall .legacy-mosaic"];
  const areas = ruleValue(mosaicSelectors, "grid-template-areas", width);
  const rows = [...areas.matchAll(/"([^"]+)"/g)].map((match) => match[1].split(/\s+/));
  const names = new Set(rows.flat());
  assert.equal(names.size, legacyMoments.length + 1, `Every journey image and logo has a cell at ${width}px`);
  for (const name of ["brand", ...legacyMoments.map((moment) => moment.area)]) {
    const cells = rows.flatMap((row, y) => row.flatMap((cell, x) => cell === name ? [{ x, y }] : []));
    assert.ok(cells.length, `${name} has a placement at ${width}px`);
    const xs = cells.map((cell) => cell.x), ys = cells.map((cell) => cell.y);
    assert.equal(cells.length, (Math.max(...xs) - Math.min(...xs) + 1) * (Math.max(...ys) - Math.min(...ys) + 1), `${name} forms a valid rectangular grid area`);
  }
  if (width <= 640) {
    for (const moment of legacyMoments.filter((moment) => moment.shape === "wide")) {
      assert.ok(rows.some((row) => row.every((cell) => cell === moment.area)), `${moment.title} spans the mobile gallery`);
    }
  }
  const nav = ruleValue([".route-desktop-nav", ".route-nav .route-desktop-nav"], "display", width);
  const toggle = ruleValue([".route-menu-toggle"], "display", width);
  assert.equal(nav, width <= 1000 ? "none" : "flex", `Navigation at ${width}px`);
  assert.equal(toggle, width <= 1000 ? "grid" : "none", `Menu button at ${width}px`);
  const footer = ruleValue([".site-footer .footer-shell"], "grid-template-columns", width);
  assert.equal(footer, width <= 640 ? "minmax(0, 1fr)" : width <= 1200 ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 1.32fr) minmax(0, .82fr) minmax(0, .58fr) minmax(0, 1.2fr)", `Footer at ${width}px`);
  if (width <= 900) assert.equal(ruleValue([".legacy-wall .legacy-layout"], "grid-template-columns", width), "minmax(0, 1fr)", `Legacy grid at ${width}px`);
  assert.equal(ruleValue([".section-pad"], "padding-top", width), "var(--space-section)");
  assert.equal(ruleValue([".prateek-page .prateek-timeline-row"], "grid-template-columns", width), width <= 640 ? "minmax(0, 1fr)" : "repeat(2, minmax(0, 1fr))", `Prateek timeline columns at ${width}px`);
  assert.equal(ruleValue([".prateek-page .prateek-timeline-row > *"], "grid-row", width), width <= 640 ? "auto" : "1", `Prateek timeline row alignment at ${width}px`);
  assert.equal(ruleValue([".prateek-recognition-grid"], "grid-template-columns", width), width <= 900 ? "minmax(0, 1fr)" : "minmax(0, .9fr) minmax(0, 1.1fr)", `Prateek recognition at ${width}px`);
  if (width <= 640) {
    assert.equal(ruleValue([".route-page main .mobile-photo-hero"], "min-height", width), "0", `Mobile heroes grow with their text at ${width}px`);
    assert.equal(ruleValue([".route-hero > img", ".route-page main .mobile-photo-hero > img"], "position", width), "relative", `Mobile hero images occupy their own space at ${width}px`);
    assert.equal(ruleValue(['.route-page main .mobile-photo-hero > [class$="-hero-mark"]'], "display", width), "none", `Hero badges cannot overlap mobile text at ${width}px`);
    assert.equal(ruleValue([".hero .hero-actions .button", ".home-page .hero .hero-actions .button"], "font-size", width), "var(--text-label)", `Home buttons remain readable at ${width}px`);
  }
  if (width <= 900) {
    assert.equal(ruleValue([".own-hero > img", ".route-page main .portrait-hero > img"], "object-position", width), "var(--hero-position)", `Leadership portraits retain their focal point at ${width}px`);
  }
}
roots[0].walkRules((rule) => {
  if (rule.selectors.every((selector) => /(?:^|\s)h1$|^\.palam-hero-title-row$/.test(selector))) {
    rule.walkDecls("font-size", (decl) => assert.equal(decl.value, "var(--text-h1)", rule.selector));
  }
  if (rule.selectors.every((selector) => /(?:^|\s|>)h2$|^\.palam-life-title$/.test(selector))) {
    rule.walkDecls("font-size", (decl) => assert.equal(decl.value, "var(--text-h2)", rule.selector));
  }
});
assert.ok(!read("src/styles/global.css").includes(".fz-explore-card .ui-styling"));
assert.ok(!read("src/styles/global.css").includes("#7fb3d5"));
assert.ok(read("src/styles/global.css").includes('--serif: "Playfair Display", Georgia, serif;'));
console.log(`PASS: shared CSS rules at ${widths.join(", ")}px; heading scale, palette and font checks.`);

const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
const renderedPages = new Map();
try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const { loadPage } = await server.ssrLoadModule("/src/pages/SiteRouter.jsx");
  for (const path of paths) {
    globalThis.window = {
      location: { pathname: path }, innerWidth: 390,
      matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }),
      addEventListener() {}, removeEventListener() {},
    };
    const { default: Page } = await loadPage(path);
    const html = renderToStaticMarkup(React.createElement(App, { Page, path }));
    renderedPages.set(path, html);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: one page heading`);
    assert.equal((html.match(/<main\b/g) || []).length, 1, `${path}: one main landmark`);
    assert.equal((html.match(/class="route-header"/g) || []).length, 1, `${path}: shared header`);
    assert.equal((html.match(/class="site-footer"/g) || []).length, 1, `${path}: shared footer`);
    for (const [, src] of html.matchAll(/<img\b[^>]*\bsrc="(\/assets\/[^"]+)"/g)) {
      assert.ok(existsSync(new URL(`../public${src.split("?")[0]}`, import.meta.url)), `${path}: image exists: ${src}`);
    }
    if (path === "/industries/pal-frozen-foods/frozzo") {
      assert.ok(html.includes("fz-ice-hero") && html.includes("fz-ice-canvas"), "Frozzo: cinematic hero and canvas");
    } else if (!["/", "/about/the-pal-group", "/about/board-of-directors", "/industries/pal-colonisers/palam-view"].includes(path)) {
      assert.ok(html.includes("mobile-photo-hero"), `${path}: responsive photographic hero`);
    }
    if (path === "/about") {
      assert.equal((html.match(/<figure class="legacy-tile/g) || []).length, legacyMoments.length);
      assert.ok(html.includes('id="about-main"') && html.includes('href="#about-main"'));
      assert.ok(html.includes('id="legacy-heading"') && html.includes('aria-labelledby="legacy-heading"'));
      assert.ok(!html.includes('class="legacy-layout reveal"'), "Long mobile gallery does not depend on an intersection threshold");
    }
    if (path === "/about/ownership") {
      assert.ok(html.includes('id="ownership-main"') && html.includes('href="#ownership-main"'));
      assert.equal((html.match(/data-moment=/g) || []).length, 6, "Six ownership photographs retain explicit placement");
      assert.equal((html.match(/class="text-link ownership-chapter-link"/g) || []).length, 4);
      assert.ok(html.includes('class="ownership-message-grid"'));
      assert.ok(!html.includes('class="own-next-gen-card reveal"'), "Long mobile message is not hidden behind an intersection threshold");
    }
    if (path === "/about/the-pal-group") {
      assert.ok(html.includes('/assets/hero-gradient-images/banner-gradient.webp'));
      assert.ok(html.includes('id="pal-group-main"') && html.includes('href="#pal-group-main"'));
      assert.ok(html.includes('href="#core-businesses"') && html.includes('id="core-businesses"'));
      assert.equal((html.match(/class="pg-core-card reveal"/g) || []).length, 4);
      assert.equal((html.match(/class="pg-wider-card reveal"/g) || []).length, 9);
    }
    if (path === "/about/prateek-pal") {
      assert.equal((html.match(/class="prateek-timeline-image"/g) || []).length, 4);
      assert.ok(html.includes('class="prateek-recognition-grid"'));
      assert.ok(html.includes('/assets/prateek-pal-images/prateek-pal-banner.webp'));
      assert.ok(html.includes('href="#contributions"'));
      assert.ok(html.includes('id="contributions"'));
      assert.equal((html.match(/<details\b/g) || []).length, 3);
    }
    console.log(`PASS: ${path}`);
  }
  console.log(`PASS: all ${paths.length} routes render with the shared layout.`);
  const brokenIndustryLinks = [];
  for (const [path, html] of renderedPages) {
    if (!path.startsWith("/industries/")) continue;
    const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] || "";
    for (const [, href] of main.matchAll(/<a\b[^>]*href="([^\"]+)"/g)) {
      if (!href.startsWith("/") && !href.startsWith("#")) continue;
      const url = new URL(href.replaceAll("&amp;", "&"), `https://smpalgroup.com${path}`);
      const target = renderedPages.get(url.pathname.replace(/\/$/, "") || "/");
      if (!target || (url.hash && !target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`))) {
        brokenIndustryLinks.push(`${path}: ${href}`);
      }
    }
  }
  assert.deepEqual(brokenIndustryLinks, [], "Industry links resolve to an existing page or section");
  console.log(`PASS: internal links on all ${paths.filter((path) => path.startsWith("/industries/")).length} industry pages resolve.`);
} finally {
  await server.close();
  delete globalThis.window;
}
