import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(['index', 'services', 'solutions', 'about', 'contact', 'products', 'industries', 'resources', 'book-a-demo'].map(page => [page, resolve(import.meta.dirname, page === 'index' ? 'index.html' : `${page}/index.html`)]))
    }
  }
});
