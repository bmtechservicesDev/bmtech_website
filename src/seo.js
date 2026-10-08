import { routes } from './routes.js';

const breadcrumbNames = {
  '/': 'Home',
  '/services/': 'Services',
  '/solutions/': 'Solutions',
  '/about/': 'About',
  '/contact/': 'Contact us',
  '/products/': 'Products',
  '/industries/': 'Industries',
  '/resources/': 'Resources',
  '/book-a-demo/': 'Book a demo',
  '/products/hospitality/': 'Hospitality',
  '/products/healthcare/': 'Healthcare',
  '/products/education/': 'Education',
  '/products/embedded-systems/': 'Embedded Systems',
  '/products/hr/': 'HR'
};

export const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

function assertRoute(route) {
  if (!routes.includes(route)) throw new Error(`Unknown page route: ${route}`);
}

export function resolveSeoConfig(env = {}) {
  const indexableValue = String(env.SITE_INDEXABLE ?? '').trim();
  if (!['', 'true', 'false'].includes(indexableValue)) {
    throw new Error('SITE_INDEXABLE must be true or false. Leave it unset for a noindex preview.');
  }
  const indexable = indexableValue === 'true';
  const suppliedUrl = String(env.SITE_URL ?? '').trim();
  let siteUrl = null;

  if (suppliedUrl) {
    let url;
    try { url = new URL(suppliedUrl); } catch { /* Report a configuration error below. */ }
    // Check the supplied spelling as well as URL's normalized form: URL parsing
    // can otherwise hide dot paths, empty query strings and backslashes.
    if (!url || !/^https:\/\/[^/?#\s\\]+\/?$/i.test(suppliedUrl)
      || url.protocol !== 'https:' || !url.hostname
      || url.username || url.password || suppliedUrl.includes('@')
      || url.pathname !== '/' || url.search || url.hash) {
      throw new Error('SITE_URL must be an absolute HTTPS origin, with no credentials, path, query or fragment.');
    }
    if (indexable && (url.hostname === 'localhost' || url.hostname.endsWith('.localhost')
      || url.hostname === '[::1]' || url.hostname === '0.0.0.0' || /^127\./.test(url.hostname))) {
      throw new Error('SITE_URL must not use a localhost or loopback address for an indexable site.');
    }
    siteUrl = url.origin;
  }

  if (indexable && !siteUrl) {
    throw new Error('SITE_INDEXABLE=true requires SITE_URL set to the verified production HTTPS origin.');
  }
  return Object.freeze({ siteUrl, indexable });
}

export function getBreadcrumbs(route) {
  assertRoute(route);
  // These pages use a homepage or enquiry layout without a visible breadcrumb.
  if (['/', '/contact/', '/book-a-demo/'].includes(route)) return [];
  const pathSegments = route.split('/').filter(Boolean);
  return ['/', ...pathSegments.map((_, index) => `/${pathSegments.slice(0, index + 1).join('/')}/`)]
    .map(path => ({ path, name: breadcrumbNames[path] }));
}

function jsonForHtml(value) {
  return JSON.stringify(value)
    .replaceAll('<', '\\u003c')
    .replaceAll('>', '\\u003e')
    .replaceAll('&', '\\u0026')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029');
}

export function renderSeoMetadata(route, page, config) {
  assertRoute(route);
  if (typeof page.title !== 'string' || !page.title.trim()
    || typeof page.description !== 'string' || !page.description.trim()) {
    throw new Error(`Page title and description are required for ${route}`);
  }
  const tags = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<meta name="robots" content="${config.indexable ? 'index, follow' : 'noindex, follow'}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="BM Tech Services" />',
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:card" content="${config.siteUrl ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`
  ];

  if (config.siteUrl) {
    const canonical = new URL(route, config.siteUrl).href;
    const image = new URL('/brand/social-preview.jpg', config.siteUrl).href;
    tags.push(
      `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
      `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
      `<meta property="og:image" content="${escapeHtml(image)}" />`,
      '<meta property="og:image:alt" content="BM Tech Services" />',
      `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
      '<meta name="twitter:image:alt" content="BM Tech Services" />'
    );

    const graph = [{
      '@type': 'Organization',
      '@id': `${config.siteUrl}/#organization`,
      name: 'BM Tech Services',
      url: `${config.siteUrl}/`,
      logo: new URL('/brand/bmtech-logo.webp', config.siteUrl).href
    }];
    const breadcrumbs = getBreadcrumbs(route);
    if (breadcrumbs.length > 1) {
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: breadcrumbs.map(({ path, name }, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name,
          item: new URL(path, config.siteUrl).href
        }))
      });
    }
    tags.push(`<script type="application/ld+json">${jsonForHtml({ '@context': 'https://schema.org', '@graph': graph })}</script>`);
  }
  return tags.map(tag => `  ${tag}`).join('\n');
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
    .map(([, name, doubleQuoted, singleQuoted, unquoted]) => [name.toLowerCase(), doubleQuoted ?? singleQuoted ?? unquoted]));
}

export function applySeoMetadata(template, route, page, config) {
  const metadata = renderSeoMetadata(route, page, config);
  if (!/<head\b[^>]*>[\s\S]*?<\/head\s*>/i.test(template)) {
    throw new Error(`Missing HTML head for ${route}`);
  }
  return template.replace(/(<head\b[^>]*>)([\s\S]*?)(<\/head\s*>)/i, (_, start, head, end) => {
    const cleanHead = head
      .replace(/<title\b[^>]*>[\s\S]*?<\/title\s*>/gi, '')
      .replace(/<meta\b[^>]*>/gi, tag => {
        const attrs = attributes(tag);
        const name = (attrs.name || '').toLowerCase();
        const property = (attrs.property || '').toLowerCase();
        return ['description', 'robots', 'googlebot', 'keywords'].includes(name)
          || name.startsWith('twitter:') || property.startsWith('og:') ? '' : tag;
      })
      .replace(/<link\b[^>]*>/gi, tag => (attributes(tag).rel || '').toLowerCase().split(/\s+/).includes('canonical') ? '' : tag)
      .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, tag => {
        const openingTag = tag.slice(0, tag.indexOf('>') + 1);
        return (attributes(openingTag).type || '').toLowerCase() === 'application/ld+json' ? '' : tag;
      })
      .replace(/\n[ \t]*(?=\n)/g, '')
      .trimEnd();
    return `${start}${cleanHead}\n${metadata}\n${end}`;
  });
}

export function createRobotsTxt(config) {
  return `User-agent: *\nAllow: /\n${config.indexable && config.siteUrl ? `\nSitemap: ${config.siteUrl}/sitemap.xml\n` : ''}`;
}

export function createSitemap(config) {
  if (!config.indexable || !config.siteUrl) return null;
  return '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + routes.map(route => `  <url><loc>${escapeHtml(new URL(route, config.siteUrl).href)}</loc></url>`).join('\n')
    + '\n</urlset>\n';
}
