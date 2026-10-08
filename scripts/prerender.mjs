import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { renderPage } from '../src/main.js';

const routes = ['/', '/services/', '/solutions/', '/about/', '/contact/', '/products/', '/industries/', '/resources/', '/book-a-demo/'];
const escapeAttribute = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

for (const route of routes) {
  const file = resolve('dist', route.slice(1), 'index.html');
  const page = renderPage(route);
  let html = await readFile(file, 'utf8');
  html = html.replace('<div id="app"></div>', `<div id="app">${page.html.replace('<span id="year"></span>', `<span id="year">${new Date().getFullYear()}</span>`)}</div>`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttribute(page.title)}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${escapeAttribute(page.description)}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${escapeAttribute(page.title)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${escapeAttribute(page.description)}$2`);
  await writeFile(file, html);
}

// Lets a review deployment be matched to its source without exposing environment data.
let sourceCommit = null;
let sourceState = 'unavailable';
try {
  sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  sourceState = execFileSync('git', ['status', '--porcelain', '--untracked-files=no'], { encoding: 'utf8' }).trim() ? 'modified' : 'clean';
} catch { /* Source archives may have no Git metadata. */ }
await writeFile(resolve('dist', 'build-info.json'), JSON.stringify({ sourceCommit, sourceState, builtAt: new Date().toISOString() }, null, 2) + '\n');
