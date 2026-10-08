import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { routes } from '../src/routes.js';
import { renderPage } from '../src/site.js';
import { applySeoMetadata, createRobotsTxt, createSitemap, getBreadcrumbs, renderSeoMetadata, resolveSeoConfig } from '../src/seo.js';

const page = { title: 'Healthcare Software | BM Tech Services', description: 'Explore healthcare software for hospitals, clinics and pharmacies.' };
const production = () => resolveSeoConfig({ SITE_URL: 'https://www.example.com/', SITE_INDEXABLE: 'true' });
const readSchema = html => JSON.parse(html.match(/<script type="application\/ld\+json">([^]*?)<\/script>/)[1]);

test('Unconfigured previews stay noindex without a fabricated canonical, image host or sitemap', () => {
  const config = resolveSeoConfig();
  const metadata = renderSeoMetadata('/products/healthcare/', page, config);
  assert.equal(config.indexable, false);
  assert.equal(config.siteUrl, null);
  assert.match(metadata, /name="robots" content="noindex, follow"/);
  assert.doesNotMatch(metadata, /rel="canonical"|property="og:url"|property="og:image"|name="twitter:image"|application\/ld\+json/);
  assert.equal(createSitemap(config), null);
  assert.equal(createRobotsTxt(config), 'User-agent: *\nAllow: /\n');
});

test('Indexable builds require an explicitly configured production origin', () => {
  assert.throws(() => resolveSeoConfig({ SITE_INDEXABLE: 'true' }), /requires SITE_URL/);
  assert.throws(() => resolveSeoConfig({ SITE_URL: 'https://www.example.com', SITE_INDEXABLE: 'yes' }), /true or false/);
  assert.throws(() => resolveSeoConfig({ SITE_URL: 'https://localhost', SITE_INDEXABLE: 'true' }), /localhost or loopback/);
  assert.throws(() => resolveSeoConfig({ SITE_URL: 'https://127.0.0.1', SITE_INDEXABLE: 'true' }), /localhost or loopback/);
  assert.throws(() => resolveSeoConfig({ SITE_URL: 'https://[::1]', SITE_INDEXABLE: 'true' }), /localhost or loopback/);
  assert.equal(production().siteUrl, 'https://www.example.com');
});

test('Invalid origins cannot leak credentials or become canonical URLs', () => {
  for (const SITE_URL of [
    'www.example.com', '//www.example.com', 'http://www.example.com',
    'https://user:secret@www.example.com', 'https://@www.example.com',
    'https://www.example.com/products/', 'https://www.example.com/../',
    'https://www.example.com?campaign=preview', 'https://www.example.com?',
    'https://www.example.com/#fragment', 'https://www.example.com#',
    'https://www.example.com\\products', 'https://www.exa\nmple.com',
    'https://www.example.com/"/><script>alert(1)</script>'
  ]) {
    assert.throws(() => resolveSeoConfig({ SITE_URL }), /absolute HTTPS origin/, SITE_URL);
  }
});

test('Configured preview metadata uses the chosen origin while sitemap and indexing remain disabled', () => {
  const config = resolveSeoConfig({ SITE_URL: 'https://www.example.com' });
  const metadata = renderSeoMetadata('/products/hr/', page, config);
  assert.match(metadata, /content="noindex, follow"/);
  assert.match(metadata, /rel="canonical" href="https:\/\/www\.example\.com\/products\/hr\/"/);
  assert.equal(createSitemap(config), null);
  assert.doesNotMatch(createRobotsTxt(config), /Sitemap:|Disallow:/);
});

test('Nested pages emit consistent absolute social URLs, truthful organization data and full breadcrumbs', () => {
  const metadata = renderSeoMetadata('/products/healthcare/', page, production());
  assert.match(metadata, /name="robots" content="index, follow"/);
  for (const attribute of ['rel="canonical" href', 'property="og:url" content']) {
    assert.ok(metadata.includes(`${attribute}="https://www.example.com/products/healthcare/"`));
  }
  assert.match(metadata, /property="og:image" content="https:\/\/www\.example\.com\/brand\/social-preview\.jpg"/);
  assert.match(metadata, /name="twitter:image" content="https:\/\/www\.example\.com\/brand\/social-preview\.jpg"/);
  assert.match(metadata, /name="twitter:card" content="summary_large_image"/);
  const schema = readSchema(metadata);
  assert.deepEqual(schema['@graph'][0], {
    '@type': 'Organization', '@id': 'https://www.example.com/#organization',
    name: 'BM Tech Services', url: 'https://www.example.com/', logo: 'https://www.example.com/brand/bmtech-logo.webp'
  });
  assert.deepEqual(schema['@graph'][1].itemListElement.map(({ position, name, item }) => [position, name, item]), [
    [1, 'Home', 'https://www.example.com/'],
    [2, 'Products', 'https://www.example.com/products/'],
    [3, 'Healthcare', 'https://www.example.com/products/healthcare/']
  ]);
  assert.doesNotMatch(JSON.stringify(schema), /telephone|address|contactPoint|rating|review|FAQPage|SoftwareApplication/);
  assert.equal(readSchema(renderSeoMetadata('/', page, production()))['@graph'].length, 1);
});

test('Breadcrumb schema matches each rendered page and is omitted where no breadcrumb is visible', () => {
  for (const route of routes) {
    const renderedPage = renderPage(route);
    const markup = renderedPage.html.match(/<nav class="breadcrumbs"[^>]*>([\s\S]*?)<\/nav>/)?.[1] || '';
    const visibleLabels = [...markup.matchAll(/<(a|span)\b([^>]*)>([^<]*)<\/\1>/g)]
      .filter(([, , attrs]) => !attrs.includes('aria-hidden="true"'))
      .map(([, , , label]) => label);
    const graph = readSchema(renderSeoMetadata(route, renderedPage, production()))['@graph'];
    const breadcrumbs = graph.find(item => item['@type'] === 'BreadcrumbList');
    assert.deepEqual(breadcrumbs?.itemListElement.map(item => item.name) || [], visibleLabels, route);
  }
  assert.deepEqual(getBreadcrumbs('/about/').map(item => item.name), ['Home', 'About']);
  for (const route of ['/', '/contact/', '/book-a-demo/']) {
    assert.deepEqual(getBreadcrumbs(route), [], route);
    const metadata = renderSeoMetadata(route, renderPage(route), production());
    assert.match(metadata, /rel="canonical"/);
    assert.ok(readSchema(metadata)['@graph'].some(item => item['@type'] === 'Organization'));
    assert.doesNotMatch(metadata, /BreadcrumbList/);
  }
});

test('All canonical routes have entry HTML and sitemap URLs, with no fragments or build-date lastmod', async () => {
  assert.equal(routes.length, 14);
  assert.equal(new Set(routes).size, routes.length);
  const sitemap = createSitemap(production());
  assert.equal([...sitemap.matchAll(/<loc>/g)].length, routes.length);
  for (const route of routes) {
    const entry = new URL(`..${route}index.html`, import.meta.url);
    assert.match(await readFile(entry, 'utf8'), /<div id="app"><\/div>/, route);
    assert.ok(sitemap.includes(`<loc>https://www.example.com${route}</loc>`), route);
    assert.ok(getBreadcrumbs(route).every(crumb => crumb.name && routes.includes(crumb.path)), route);
  }
  assert.doesNotMatch(sitemap, /localhost|#|lastmod/);
  assert.match(createRobotsTxt(production()), /Sitemap: https:\/\/www\.example\.com\/sitemap\.xml/);
});

test('Prerender metadata replaces legacy and repeated tags while preserving page content and assets', async () => {
  const template = (await readFile(new URL('../index.html', import.meta.url), 'utf8')).replace('</head>', `
    <meta content='outdated' name='description'>
    <meta content='index' name='robots'>
    <meta name='twitter:card' content='summary'>
    <link href='https://outdated.invalid/' rel='canonical'>
    <script type='application/ld+json'>{"@type":"FAQPage"}</script>
    </head>`);
  const output = applySeoMetadata(template, '/products/healthcare/', page, production());
  for (const pattern of [/<title>/g, /name="description"/g, /name="robots"/g,
    /property="og:title"/g, /property="og:description"/g, /property="og:image"/g,
    /rel="canonical"/g, /name="twitter:card"/g, /type="application\/ld\+json"/g]) {
    assert.equal([...output.matchAll(pattern)].length, 1, pattern.source);
  }
  assert.doesNotMatch(output, /outdated|FAQPage|content="\/brand\/social-preview/);
  assert.match(output, /<link rel="stylesheet" href="\/src\/styles\.css"/);
  assert.match(output, /<script type="module" src="\/src\/main\.js"><\/script>/);
  assert.match(output, /<a class="skip-link" href="#main">Skip to content<\/a>/);
  assert.equal(applySeoMetadata(output, '/products/healthcare/', page, production()), output);
});

test('Content is safely escaped and unsupported routes cannot emit misleading home metadata', () => {
  const unsafePage = { title: 'R&D "software" </title><script>bad</script> $&', description: 'A < B & C "quoted"' };
  const metadata = renderSeoMetadata('/', unsafePage, production());
  assert.ok(metadata.includes('R&amp;D &quot;software&quot; &lt;/title&gt;&lt;script&gt;bad&lt;/script&gt; $&'));
  assert.ok(metadata.includes('A &lt; B &amp; C &quot;quoted&quot;'));
  assert.doesNotMatch(metadata, /<script>bad/);
  assert.throws(() => renderSeoMetadata('/missing/', page, production()), /Unknown page route/);
  assert.throws(() => renderSeoMetadata('/', { title: '', description: 'Summary' }, production()), /title and description/);
  assert.throws(() => applySeoMetadata('<body></body>', '/', page, production()), /Missing HTML head/);
});
