import { productFamilies, solutions, industries } from './content.js';

export const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
export const link = (href, label, className = 'text-link') => '<a class="' + escape(className) + '" href="' + escape(href) + '">' + escape(label) + '</a>';

const drawings = {
  hospitality: '<path d="M4 3v6a3 3 0 006 0V3M7 3v18M20 21V3c-4 3-4 8 0 9"/>',
  healthcare: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
  education: '<path d="M3 5h6a4 4 0 014 4v12a5 5 0 00-5-3H3zM13 9a4 4 0 014-4h4v13h-4a5 5 0 00-4 3"/>',
  'embedded-systems': '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v5m6-5v5M9 18v5m6-5v5M1 9h5m-5 6h5m12-6h5m-5 6h5"/><rect x="10" y="10" width="4" height="4" rx="1"/>',
  hr: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0112 0v3M16 5a3 3 0 010 6m2 4a5 5 0 013 4v2"/>',
  code: '<path d="M7 6l-6 6 6 6m10-12l6 6-6 6M14 3l-4 18"/>',
  cloud: '<path d="M7 18a5 5 0 11.5-10A7 7 0 0121 10a4 4 0 01-1 8z"/>',
  link: '<path d="M10 14l4-4M8 16l-2 2a4 4 0 01-6-6l4-4a4 4 0 016 0m4 0l2-2a4 4 0 016 6l-4 4a4 4 0 01-6 0" transform="translate(1 -1)"/>',
  spark: '<path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>',
  document: '<path d="M14 2H5a1 1 0 00-1 1v18a1 1 0 001 1h14a1 1 0 001-1V8zM14 2v6h6M8 12h8M8 16h8M8 19h5"/>',
  building: '<path d="M4 22V4l8-2v20M12 9l8-2v15M1 22h22M7 7h2M7 11h2M7 15h2M15 12h2M15 16h2"/>',
  arrow: '<path d="M4 12h16m-6-6l6 6-6 6"/>',
  check: '<path d="M5 12l4 4L19 6"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M16 8l-3 5-5 3 3-5z"/>',
  rocket: '<path d="M14 4c4-2 6-1 7-1 0 1 1 3-1 7l-8 8-6-6zM7 11l-4 1-1 5 5-1m6 1l-1 5 5-1 1-4M6 18l-3 3"/><circle cx="16" cy="8" r="1.5"/>',
  users: '<circle cx="12" cy="7" r="3"/><path d="M6 21v-3a6 6 0 0112 0v3M3 5a3 3 0 010 6m-2 8v-2a4 4 0 013-4m17-8a3 3 0 000 6m2 8v-2a4 4 0 00-3-4"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M16 16l5 5"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M3 6l9 7 9-7"/>',
  layers: '<path d="M12 2L2 7l10 5 10-5zM2 12l10 5 10-5M2 17l10 5 10-5"/>'
};
export const icon = name => '<svg class="line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (drawings[name] || drawings.layers) + '</svg>';
export const eyebrow = text => '<p class="eyebrow"><span aria-hidden="true"></span>' + escape(text) + '</p>';
export const sectionHead = (kicker, title, copy = '') => '<div class="section-head">' + eyebrow(kicker) + '<h2>' + escape(title) + '</h2>' + (copy ? '<p>' + escape(copy) + '</p>' : '') + '</div>';
export const relatedLinks = (links, label = 'Related products and services') => '<ul class="related-links" aria-label="' + escape(label) + '">' + links.map(item => '<li>' + link(item.href, item.label) + '</li>').join('') + '</ul>';

export function breadcrumbs(label, parent) {
  return '<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span>' +
    (parent ? '<a href="' + escape(parent.href) + '">' + escape(parent.label) + '</a><span aria-hidden="true">/</span>' : '') +
    '<span aria-current="page">' + escape(label) + '</span></nav>';
}

export function innerHero(label, title, copy, parent, asideHtml = '') {
  return '<section class="page-hero"><div class="container">' + breadcrumbs(label, parent) +
    '<div class="page-hero-layout' + (asideHtml ? ' with-aside' : '') + '"><div class="page-hero-copy">' + eyebrow(label) + '<h1>' + escape(title) + '</h1><p>' + escape(copy) +
    '</p></div>' + (asideHtml ? '<div class="page-hero-aside">' + asideHtml + '</div>' : '<div class="page-hero-motif" aria-hidden="true"><span></span><span></span><span></span></div>') +
    '</div></div></section>';
}

export function brand() {
  return '<a class="brand" href="/" aria-label="AMPIGEN home"><img src="/brand/ampigen-logo.webp" width="1672" height="941" decoding="async" alt="AMPIGEN — Engineering Intelligence | Transforming Business"></a>';
}

const menuDescriptions = {
  hospitality: 'Restaurant, guest house, hotel and lodge operations.',
  healthcare: 'Hospital, clinic, pharmacy and specialist healthcare systems.',
  education: 'School Management App and Parent App solutions.',
  'embedded-systems': 'Home automation, queues, Smart LED and IoT gateways.',
  hr: 'HR software for workforce operations across industries.'
};
const solutionSummaries = [
  'Connect restaurant and accommodation operations.',
  'Plan clinical, administrative and information workflows.',
  'Bring school administration and the parent experience together.',
  'Connect spaces, equipment and in-person service.',
  'Support HR and workforce administration.',
  'Connect applications, information and business processes.',
  'Build your digital presence and customer touchpoints.'
];
const industrySummaries = {
  hospitality: 'Restaurants, guest houses, hotels and lodges.',
  healthcare: 'Hospitals, clinics, pharmacies and care teams.',
  education: 'Schools, institutions and their parent communities.',
  properties: 'Connected residential and commercial spaces.',
  manufacturing: 'Engineering teams, equipment and connected operations.',
  retail: 'Commerce, customer experience and digital presence.',
  services: 'Professional services and business operations.',
  startups: 'New software ideas and connected-product teams.'
};

export function header(path) {
  const navigation = [
    ['/products/', 'Products', productFamilies.map(family => [family.path, family.title, menuDescriptions[family.id], family.id]).concat([['/products/', 'Product portfolio', 'Browse every offering by family or search the catalogue.', 'layers']])],
    ['/industries/', 'Industries', industries.map(industry => ['/industries/#' + industry.id, industry.title, industrySummaries[industry.id], industry.id === 'properties' ? 'building' : industry.id])],
    ['/solutions/', 'Solutions', solutions.map((solution, i) => ['/solutions/#' + solution.id, solution.title, solutionSummaries[i], ['hospitality', 'healthcare', 'education', 'embedded-systems', 'hr', 'link', 'spark'][i]]).concat([['/services/', 'Services', 'Explore our engineering and delivery capabilities.', 'code']])],
    ['/resources/', 'Resources', [
      ['/resources/#company-profile', 'Company profile', 'Our portfolio, capabilities and delivery approach.', 'document'],
      ['/resources/#resource-0', 'Product planning', 'Prepare for a useful software discussion.', 'compass'],
      ['/resources/#resource-1', 'Development brief', 'Turn a business need into a project brief.', 'code'],
      ['/resources/#resource-2', 'Connected systems', 'Plan connected systems and useful automation.', 'spark'],
      ['/resources/#questions', 'Common questions', 'Understand product selection and implementation.', 'users']
    ]]
  ];
  return '<header class="site-header"><div class="container header-inner">' + brand() +
    '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span><span></span></button>' +
    '<nav id="site-nav" class="site-nav" aria-label="Main navigation">' + navigation.map(([href, label, items], i) =>
      '<div class="nav-item"><div class="nav-heading"><button type="button" class="dropdown-toggle" aria-label="' + label + ' submenu" ' + (path.startsWith(href) ? 'aria-current="page" ' : '') + 'aria-expanded="false" aria-controls="submenu-' + i + '">' + label + '</button></div>' +
      '<div class="nav-dropdown" id="submenu-' + i + '" hidden>' + items.map(([target, name, description, symbol], j) =>
        '<a class="mega-card" href="' + escape(target) + '" aria-label="' + escape(name) + '" aria-describedby="menu-description-' + i + '-' + j + '"><span class="mega-icon">' + icon(symbol) +
        '</span><span class="mega-copy"><strong>' + escape(name) + '</strong><span id="menu-description-' + i + '-' + j + '">' + escape(description) + '</span></span></a>').join('') +
      '</div></div>').join('') + '<a class="button button-primary nav-cta" href="/book-a-demo/">Book a demo</a></nav></div>' +
    '<noscript><nav class="static-nav container" aria-label="Page navigation"><a href="/products/">Products</a><a href="/industries/">Industries</a><a href="/solutions/">Solutions</a><a href="/resources/">Resources</a><a href="/book-a-demo/">Book a demo</a></nav></noscript></header>';
}

export function footer() {
  const column = (title, items, href) => '<div class="footer-column"><h3>' + (href ? link(href, title, 'footer-heading-link') : escape(title)) + '</h3><ul>' +
    items.map(([target, label]) => '<li>' + link(target, label, 'footer-link') + '</li>').join('') + '</ul></div>';
  return '<footer class="site-footer"><div class="container"><div class="footer-intro"><div>' + brand() +
    '<p>Engineering Intelligence <span aria-hidden="true">|</span> Transforming Business</p></div><p>Industry products. Custom engineering.<br>One connected digital journey.</p></div><div class="footer-columns">' +
    column('Products', productFamilies.map(f => [f.path, f.title]), '/products/') +
    column('Industries', industries.filter(i => !i.isAudience).map(i => ['/industries/#' + i.id, i.title]), '/industries/') +
    column('Solutions', solutions.map(s => ['/solutions/#' + s.id, s.title]).concat([['/services/', 'Services']]), '/solutions/') +
    column('Resources', [['/resources/#company-profile', 'Company profile'], ['/resources/#resource-0', 'Product planning'], ['/resources/#resource-1', 'Development briefs'], ['/resources/#questions', 'Common questions']], '/resources/') +
    column('Company', [['/about/', 'About us'], ['/contact/', 'Contact us']]) +
    '</div><div class="footer-bottom"><span>© <span id="year"></span> AMPIGEN. All rights reserved.</span><span>AI • Cloud • IoT • Automation • Digital Transformation</span></div></div></footer>';
}

export function process() {
  const steps = [
    ['Understand', 'Map your users, workflows, existing systems and the outcome you want to achieve.', 'compass'],
    ['Design', 'Define the experience, architecture and implementation plan.', 'layers'],
    ['Build & connect', 'Develop the solution and integrate the systems it needs.', 'code'],
    ['Validate & launch', 'Test the workflows, prepare the rollout and train your team.', 'rocket'],
    ['Support & improve', 'Support day-to-day use and plan changes as requirements evolve.', 'link']
  ];
  return '<section class="section process-section"><div class="container">' +
    sectionHead('FROM IDEA TO EVERYDAY USE', 'One delivery path. Every step connected.', 'Bring product selection, engineering and implementation into one practical plan.') +
    '<div class="delivery-steps">' + steps.map(([title, copy, symbol], i) => '<article><div class="step-marker"><span>' + String(i + 1).padStart(2, '0') + '</span>' + icon(symbol) + '</div><h3>' + title + '</h3><p>' + copy + '</p></article>').join('') +
    '</div></div></section>';
}
