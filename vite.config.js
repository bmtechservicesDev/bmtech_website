import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { routes } from './src/routes.js';

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(routes.map(route => [route === '/' ? 'index' : route.slice(1, -1), resolve(import.meta.dirname, route.slice(1), 'index.html')]))
    }
  }
});
