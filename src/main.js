import { renderPage } from './site.js';
import { initNavigation } from './navigation.js';
import { initCatalogue } from './catalogue.js';
import { initEnquiry } from './enquiry-controller.js';
export { renderPage };
export { contact } from './pages/enquiry.js';

if (typeof document !== 'undefined') {
  const requestedPath = window.location.pathname.replace(/\/index\.html$/, '/');
  const path = requestedPath.endsWith('/') ? requestedPath : requestedPath + '/';
  const page = renderPage(path);
  document.title = page.title;
  document.querySelector('meta[name="description"]').content = page.description;
  document.querySelector('meta[property="og:title"]').content = page.title;
  document.querySelector('meta[property="og:description"]').content = page.description;
  if (!document.querySelector('.site-header')) document.querySelector('#app').innerHTML = page.html;
  document.querySelector('#year').textContent = new Date().getFullYear();
  document.documentElement.classList.add('has-js');
  initNavigation();
  initCatalogue();
  initEnquiry();
}
