import { readFile, writeFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { loadEnv } from 'vite';
import { renderPage } from '../src/site.js';
import { routes } from '../src/routes.js';
import { applySeoMetadata, createRobotsTxt, createSitemap, resolveSeoConfig } from '../src/seo.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const outputRoot = resolve(projectRoot, 'dist');
const config = resolveSeoConfig({ ...loadEnv('production', projectRoot, 'SITE_'), ...process.env });

for (const route of routes) {
  const file = resolve(outputRoot, route.slice(1), 'index.html');
  const page = renderPage(route);
  let html = await readFile(file, 'utf8');
  if (!/<div id="app">\s*<\/div>/.test(html)) throw new Error(`Missing empty app container for ${route}`);
  const content = page.html.replace('<span id="year"></span>', () => `<span id="year">${new Date().getFullYear()}</span>`);
  html = html.replace(/<div id="app">\s*<\/div>/, () => `<div id="app">${content}</div>`);
  html = applySeoMetadata(html, route, page, config);
  await writeFile(file, html);
}

await writeFile(resolve(outputRoot, 'robots.txt'), createRobotsTxt(config));
const sitemap = createSitemap(config);
if (sitemap) await writeFile(resolve(outputRoot, 'sitemap.xml'), sitemap);
else await rm(resolve(outputRoot, 'sitemap.xml'), { force: true });

// Lets a review deployment be matched to its source without exposing environment data.
let sourceCommit = null;
let sourceState = 'unavailable';
try {
  const gitOptions = { cwd: projectRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] };
  sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], gitOptions).trim();
  sourceState = execFileSync('git', ['status', '--porcelain', '--untracked-files=no'], gitOptions).trim() ? 'modified' : 'clean';
} catch { /* Source archives may have no Git metadata. */ }
await writeFile(resolve(outputRoot, 'build-info.json'), JSON.stringify({ sourceCommit, sourceState, builtAt: new Date().toISOString() }, null, 2) + '\n');
