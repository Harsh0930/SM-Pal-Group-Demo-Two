import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { routePages } from './src/data/routes.js';

export default defineConfig({
  plugins: [react(), {
    name: 'prerendered-preview-routes',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        const route = url.pathname.replace(/\/$/, '');
        if (routePages[route]) req.url = `${route}/index.html${url.search}`;
        next();
      });
    },
  }],
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        about: fileURLToPath(new URL('./about/index.html', import.meta.url)),
        sumeera: fileURLToPath(new URL('./industries/pal-colonisers/pal-sumeera-residency/index.html', import.meta.url))
      }
    }
  }
});
