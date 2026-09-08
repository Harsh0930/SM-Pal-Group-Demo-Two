import React, { useEffect, useState } from 'react';
import { routePages } from '../data/routes.js';
import { RouteHeader } from './PageShared.jsx';

const loaders = {
  'about': () => import('./screens/AboutPage.jsx'),
  'pal-group': () => import('./screens/PalGroupPage.jsx'),
  'ownership': () => import('./screens/OwnershipPage.jsx'),
  'board': () => import('./screens/BoardPage.jsx'),
  'prateek': () => import('./screens/PrateekPage.jsx'),
  'pal-fresh-global': () => import('./screens/PalFreshGlobalPage.jsx'),
  'pal-fresh': () => import('./screens/PalFreshPage.jsx'),
  'frozzo': () => import('./screens/FrozzoPage.jsx'),
  'pal-stone': () => import('./screens/PalStoneIndustriesPage.jsx'),
  'pal-skoda': () => import('./screens/PalSkodaPage.jsx'),
  'nissan': () => import('./screens/PalNissanPage.jsx'),
  'pal-ford': () => import('./screens/PalFordPage.jsx'),
  'palam-view': () => import('./PalamViewPage.jsx'),
  'pal-sumeera': () => import('./PalSumeeraPage.jsx'),
  'palam-city': () => import('./PalamCityPage.jsx'),
  'pallazio': () => import('./PallazioPage.jsx'),
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
