import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { routes } from '../src/routes.js';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const titles = new Set();
const descriptions = new Set();
for (const route of routes) {
  const html = await readFile(resolve(root, route.slice(1), 'index.html'), 'utf8');
  assert.equal((html.match(/<main\b/g) || []).length, 1, `${route}: one main landmark`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one main heading`);
  assert.ok(html.includes('<main id="main">'), `${route}: prerendered content`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && description, `${route}: title and description`);
  assert.match(title, /\bAMPIGEN\b/, `${route}: AMPIGEN page title`);
  assert.doesNotMatch(html, /\bBM\s*Tech(?:\s+Services)?\b|bm-tech-services|\/brand\/bmtech-logo\.|\/brand\/social-preview\./i, `${route}: no old branding or asset reference`);
  if (route === '/resources/') {
    assert.match(html, /href="\/documents\/ampigen-company-profile\.pdf"/, `${route}: current company profile`);
  }
  assert.ok(!titles.has(title), `${route}: distinct title`);
  assert.ok(!descriptions.has(description), `${route}: distinct description`);
  titles.add(title);
  descriptions.add(description);
}
console.log(`Verified ${routes.length} prerendered routes with distinct metadata and one H1 each.`);
