import { products } from '../products.js';
import { legacyRoutes } from '../legacy-routes.js';
import { innerHero, relatedLinks, link, escape } from '../components.js';

export const legacyPages = Object.fromEntries(Object.entries(legacyRoutes).map(([path, entry]) => [path, {
  title: `${entry.label}: Updated Pages | AMPIGEN`,
  description: entry.description,
  noindex: true,
  canonicalPath: entry.target.split('#')[0],
  html: `${innerHero(entry.label, `${entry.label} has a new home`, entry.description, { href: '/products/', label: 'Products' })}
    <section class="section legacy-page"><div class="container"><h2>Continue to the updated page</h2><p>${escape(entry.description)}</p>
      ${link(entry.target, `Explore ${entry.label}`, 'text-link')}
      ${relatedLinks(products.filter(product => entry.productIds.includes(product.id)).map(product => ({ href: product.path, label: product.name })), 'Product pages')}
      ${link('/products/', 'All AMPIGEN products')}
    </div></section>`
}]));
