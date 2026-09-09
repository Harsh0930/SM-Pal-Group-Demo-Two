import React, { useEffect } from 'react';
import { getPageFile } from './pageRegistry.js';
import { routePages } from '../data/routes.js';
import { RouteHeader } from './PageShared.jsx';

const pageModules = import.meta.glob('./**/*Page.jsx');
export function loadPage(path) {
  const key = getPageFile(path).replace('src/pages/', './');
  const load = pageModules[key];
  if (!load) throw new Error('No page module registered for ' + path + ': ' + key);
  return load();
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
  if (page?.type === 'palam-view') return <div className="route-page palam-view-page"><RouteHeader /><Page /></div>;
  return <Page page={page} />;
}
