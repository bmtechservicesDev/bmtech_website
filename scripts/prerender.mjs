import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderPage } from '../src/main.js';

const routes = ['/', '/services/', '/solutions/', '/about/', '/contact/'];
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
