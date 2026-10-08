import { productFamilies } from '../content.js';
import { escape, icon, eyebrow, sectionHead, innerHero, relatedLinks, link } from '../components.js';

const familyLabels = {
  hospitality: 'Hospitality',
  healthcare: 'Healthcare',
  education: 'Education',
  'embedded-systems': 'Embedded Systems',
  hr: 'HR'
};

const legacyProductIds = {
  'restaurant-solution': 'product-0',
  'clinic-automation': 'product-1',
  'school-management-app': 'product-2',
  'iot-gateway': 'product-3',
  'smart-led': 'product-4',
  'queue-management': 'product-5'
};

const offeringCount = productFamilies.reduce((total, family) => total + family.products.length, 0);
const offeringLabel = count => `${count} ${count === 1 ? 'offering' : 'offerings'}`;

function catalogueControls() {
  return `<div class="portfolio-toolbar" data-catalogue-controls hidden>
    <div class="search-field">
      <label for="portfolio-search">Search products</label>
      <input id="portfolio-search" type="search" name="product-search" placeholder="Search by product or requirement" aria-controls="portfolio-family-grid" autocomplete="off">
    </div>
    <div class="filter-chips" role="group" aria-label="Filter by product family">
      <button class="filter-chip" type="button" data-family-filter="all" aria-pressed="true" aria-controls="portfolio-family-grid">All families</button>
      ${productFamilies.map(family => `<button class="filter-chip" type="button" data-family-filter="${escape(family.id)}" aria-pressed="false" aria-controls="portfolio-family-grid">${escape(familyLabels[family.id])}</button>`).join('')}
    </div>
  </div>`;
}

function catalogueEntry(family, product) {
  const searchText = [family.title, family.navLabel, product.name, product.description, ...product.tags].join(' ');
  const legacyId = legacyProductIds[product.id];
  return `<li data-product-entry="${escape(product.id)}" data-search="${escape(searchText)}">
    <a class="product-name-link"${legacyId ? ` id="${escape(legacyId)}"` : ''} href="${escape(`${family.path}#${product.id}`)}"><span>${escape(product.name)}</span><span aria-hidden="true">${icon('arrow')}</span></a>
  </li>`;
}

function familyCard(family) {
  return `<article class="card family-card" id="${escape(family.id)}" data-product-family="${escape(family.id)}">
    <div class="product-content">
      <div class="icon-badge" aria-hidden="true">${icon(family.id)}</div>
      <p class="small-label">${offeringLabel(family.products.length)}</p>
      <h3>${link(family.path, family.title)}</h3>
      <p>${escape(family.description)}</p>
      <ul class="portfolio-links">${family.products.map(product => catalogueEntry(family, product)).join('')}</ul>
      ${family.brandNote ? `<p class="product-brand-note">${escape(family.brandNote)}</p>` : ''}
    </div>
  </article>`;
}

function supportingServices() {
  const services = [
    {
      id: 'product-6',
      icon: 'code',
      title: 'Website Development & Hosting',
      href: '/services/#service-01',
      description: 'Business websites, hosting, maintenance and enquiry integrations for your digital presence.'
    },
    {
      id: 'product-7',
      icon: 'education',
      title: 'Domain Training & Education',
      href: '/services/#service-09',
      description: 'Practical training and applied projects in software, embedded systems, IoT, AI and automation.'
    },
    {
      icon: 'link',
      title: 'Custom Development & Integration',
      href: '/services/',
      description: 'Web, mobile and desktop software, cloud applications, embedded engineering and system integration.'
    }
  ];

  return `<section class="section section-soft"><div class="container">
    ${sectionHead('SUPPORTING SERVICES', 'Build, connect and support your solution', 'Custom development, integration and specialist services support your products and wider digital requirements.')}
    <div class="supporting-grid">${services.map(service => `<article class="card"${service.id ? ` id="${service.id}"` : ''}>
      <div class="icon-badge" aria-hidden="true">${icon(service.icon)}</div>
      <h3>${link(service.href, service.title)}</h3>
      <p>${escape(service.description)}</p>
    </article>`).join('')}</div>
  </div></section>`;
}

function familyJumpNav(family) {
  return `<nav class="product-jump-nav" aria-label="Products in ${escape(familyLabels[family.id])}">
    ${eyebrow('IN THIS FAMILY')}
    <ul>${family.products.map(product => `<li>${link(`#${product.id}`, product.name)}</li>`).join('')}</ul>
  </nav>`;
}

function productCard(product, index) {
  return `<article class="card product-card" id="${escape(product.id)}" data-product="${escape(product.id)}">
    <div class="product-content">
      <header><span class="product-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><h3>${escape(product.name)}</h3></header>
      <p>${escape(product.description)}</p>
      ${product.tags.length ? `<ul class="product-features tag-list" aria-label="${escape(`${product.name} features`)}">${product.tags.map(tag => `<li>${escape(tag)}</li>`).join('')}</ul>` : ''}
    </div>
  </article>`;
}

function familyPage(family) {
  return {
    title: family.seoTitle,
    description: family.metaDescription,
    html: `${innerHero(familyLabels[family.id], family.h1, family.intro, { href: '/products/', label: 'Products' }, familyJumpNav(family))}
      <section class="section"><div class="container">
        ${sectionHead('PRODUCT PORTFOLIO', family.title, 'Choose the offering that fits your organization and the workflows you want to support.')}
        <div class="product-grid product-detail-grid">${family.products.map(productCard).join('')}</div>
        ${family.brandNote ? `<p class="family-brand-note">${escape(family.brandNote)}</p>` : ''}
      </div></section>
      <section class="section section-soft"><div class="container family-context-grid">
        ${family.sections.map(section => `<article><h2>${escape(section.title)}</h2><p>${escape(section.body)}</p></article>`).join('')}
      </div></section>
      <section class="section related-section"><div class="container">
        <h2>Related solutions and services</h2>
        ${relatedLinks(family.relatedLinks, `Related solutions and services for ${familyLabels[family.id]}`)}
      </div></section>`
  };
}

export const portfolioPages = {
  '/products/': {
    title: 'Software Products & Smart Systems | BM Tech Services',
    description: 'Explore BMTech software for hospitality, healthcare, education and HR, plus home automation, queue management, Smart LED and connected systems.',
    html: `${innerHero('Products', 'Industry Software Products & Smart Systems', 'Explore the BM Tech Services portfolio by the industry or business function you want to support. Our offerings span hospitality, healthcare, education, HR and smart embedded systems, with development and implementation services to support your requirements.')}
      <section class="section"><div class="container">
        ${sectionHead('PRODUCT FAMILIES', 'Find the right starting point', 'Each family brings together related offerings and links to their product and implementation scope.')}
        ${catalogueControls()}
        <div class="portfolio-summary"><p id="portfolio-status" role="status" aria-live="polite" aria-atomic="true">${offeringLabel(offeringCount)} across ${productFamilies.length} product families</p></div>
        <div class="product-grid family-grid" id="portfolio-family-grid">${productFamilies.map(familyCard).join('')}</div>
        <div class="portfolio-empty" id="portfolio-empty" hidden>
          <h3>No matching products</h3>
          <p>Try another product name or requirement, or clear the filters to see the full portfolio.</p>
          <button class="filter-chip" type="button" data-clear-filters>Clear filters</button>
        </div>
      </div></section>
      ${supportingServices()}`
  },
  ...Object.fromEntries(productFamilies.map(family => [family.path, familyPage(family)]))
};
