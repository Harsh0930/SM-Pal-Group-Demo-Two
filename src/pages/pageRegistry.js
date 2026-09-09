import { routePages } from '../data/routes.js';

// One source for both browser page loading and prerendered CSS dependencies.
const pageFiles = {
  about: 'screens/AboutPage.jsx',
  'pal-group': 'screens/PalGroupPage.jsx',
  ownership: 'screens/OwnershipPage.jsx',
  board: 'screens/BoardPage.jsx',
  prateek: 'screens/PrateekPage.jsx',
  'pal-fresh-global': 'screens/PalFreshGlobalPage.jsx',
  'pal-fresh': 'screens/PalFreshPage.jsx',
  frozzo: 'screens/FrozzoPage.jsx',
  'pal-stone': 'screens/PalStoneIndustriesPage.jsx',
  'pal-skoda': 'screens/PalSkodaPage.jsx',
  nissan: 'screens/PalNissanPage.jsx',
  'pal-ford': 'screens/PalFordPage.jsx',
  'palam-view': 'PalamViewPage.jsx',
  'pal-sumeera': 'PalSumeeraPage.jsx',
  'palam-city': 'PalamCityPage.jsx',
  pallazio: 'PallazioPage.jsx',
  'eco-town': 'EcoTownPage.jsx',
  'paloma-greens': 'PalomaGreensPage.jsx',
};

export function getPageFile(path) {
  if (path === '/' || !routePages[path]) return 'src/pages/screens/HomePage.jsx';
  return `src/pages/${pageFiles[routePages[path].type] || 'screens/RoutePage.jsx'}`;
}
