import { products } from './products.js';
import { industries } from './industry-content.js';
import { legacyRoutes } from './legacy-routes.js';

// Canonical pages are shared by the renderer, build inputs and sitemap.
export const routes = Object.freeze([
  '/', '/services/', '/solutions/', '/about/', '/contact/', '/products/',
  '/industries/', '/resources/', '/book-a-demo/',
  ...products.map(product => product.path),
  ...industries.map(industry => industry.path)
]);

// Old published family URLs remain usable on Firebase and ordinary static hosts.
export const buildRoutes = Object.freeze([...routes, ...Object.keys(legacyRoutes)]);
