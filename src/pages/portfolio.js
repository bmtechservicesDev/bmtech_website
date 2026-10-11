import { products } from '../products.js';
import { industries } from '../industry-content.js';
import { escape, icon, eyebrow, sectionHead, innerHero, relatedLinks, link } from '../components.js';

const legacyProductIds = {
  'clinic-automation': 'product-1',
  'restaurant-solution': 'product-0',
  'my-school': 'product-2',
  'queue-management': 'product-5',
  'smart-led': 'product-4'
};

function productCard(product) {
  const searchText = [product.name, product.domain, product.summary, product.description, ...product.tags].join(' ');
  return `<article class="card catalogue-card" id="${escape(product.id)}" data-product-entry="${escape(product.id)}" data-industries="${escape(product.industries.join(' '))}" data-search="${escape(searchText)}">
    <a class="catalogue-product-link" href="${escape(product.path)}" aria-label="${escape(product.name)}">
      <span class="legacy-anchor" id="${legacyProductIds[product.id]}" aria-hidden="true"></span>
      <div class="product-card-heading"><span class="icon-badge">${icon(product.icon)}</span><span class="product-domain">${escape(product.domain)}</span></div>
      <h3>${escape(product.name)}</h3><p>${escape(product.description)}</p>
      <ul class="tag-list" aria-label="${escape(product.name)} workflow areas">${product.tags.map(tag => `<li>${escape(tag)}</li>`).join('')}</ul>
      <span class="catalogue-card-tail">View product details ${icon('arrow')}</span>
    </a>
  </article>`;
}

function discoveryControls() {
  return `<div class="product-discovery" data-catalogue-controls hidden>
    <div class="discovery-fields">
      <div class="search-field"><label for="portfolio-search">Search products or workflows</label><input id="portfolio-search" type="search" maxlength="100" placeholder="Try appointments, school or displays" aria-controls="portfolio-product-grid" autocomplete="off"></div>
      <div class="search-field"><label for="portfolio-industry">Your industry</label><select id="portfolio-industry" aria-controls="portfolio-product-grid"><option value="all">All industries</option>${industries.map(industry => `<option value="${escape(industry.id)}">${escape(industry.title)}</option>`).join('')}</select></div>
    </div>
    <div class="discovery-status"><p id="portfolio-status" role="status" aria-live="polite" aria-atomic="true">5 products</p><button type="button" class="text-action" data-clear-filters>Clear filters</button><button type="button" class="text-action" data-copy-product-search>Copy search link</button><span id="search-copy-status" role="status" aria-live="polite"></span></div>
    <div class="copy-link-fallback" hidden><label for="product-search-link">Search link</label><input id="product-search-link" type="url" readonly></div>
  </div>`;
}

function workflowPanel(product) {
  return `<aside class="product-workflow" aria-label="${escape(product.name)} workflow focus"><span class="icon-badge">${icon(product.icon)}</span><p class="small-label">WORKFLOW FOCUS</p><ol>${product.workflow.map(item => `<li>${escape(item.title)}</li>`).join('')}</ol><p class="workflow-caption">A starting point for your product discussion.</p></aside>`;
}

function productPage(product) {
  return {
    title: product.seoTitle,
    description: product.metaDescription,
    html: `${innerHero(product.name, product.h1, product.intro, { href: '/products/', label: 'Products' }, workflowPanel(product))}
      <nav class="product-section-nav" aria-label="On this product page"><div class="container">${link('#workflow', 'Workflow areas')}${link('#implementation', 'Implementation checklist')}${link('#questions', 'Product questions')}${link('#related', 'Related expertise')}</div></nav>
      <section class="section" id="workflow"><div class="container">
        ${sectionHead('PRODUCT OVERVIEW', 'Bring the whole workflow into view', product.audience)}
        <div class="card-grid-three">${product.workflow.map(item => `<article class="card workflow-card"><span class="workflow-dot" aria-hidden="true"></span><h3>${escape(item.title)}</h3><p>${escape(item.description)}</p></article>`).join('')}</div>
      </div></section>
      <section class="section section-soft" id="implementation"><div class="container product-implementation">
        <div>${eyebrow('PREPARE FOR IMPLEMENTATION')}<h2>A more useful discussion starts here.</h2><p>Use this checklist to bring your team’s priorities into a focused product discussion.</p><p>Review the product fit, system dependencies and delivery scope with the people who will use the solution.</p></div>
        <div class="implementation-checklist"><h3>${escape(product.name)} checklist</h3><ul>${product.requirements.map((item, index) => `<li><label for="requirement-${index}"><input id="requirement-${index}" type="checkbox" data-preparation-item><span>${escape(item)}</span></label></li>`).join('')}</ul><p class="checklist-status" role="status" aria-live="polite" data-preparation-status hidden>0 of ${product.requirements.length} points reviewed</p></div>
      </div></section>
      <section class="section" id="questions"><div class="container product-questions">${sectionHead('PRODUCT QUESTIONS', 'What to consider before your demonstration')}
        <div class="faq-list">${product.faqs.map(faq => `<details><summary>${escape(faq.question)}</summary><p>${escape(faq.answer)}</p></details>`).join('')}</div>
      </div></section>
      <section class="section section-soft" id="related"><div class="container"><h2>Connect the wider requirement</h2>${relatedLinks(product.relatedLinks, `Related expertise for ${product.name}`)}${link('/products/', 'All AMPIGEN products')}</div></section>`
  };
}

export const portfolioPages = {
  '/products/': {
    title: 'Software Products & Smart Systems | AMPIGEN',
    description: 'Explore Clinic Automation, Restaurant Solution, My School, Queue Management and Smart LED from AMPIGEN. Find a product for your industry and workflow.',
    html: `${innerHero('Products', 'Practical Products. Connected Digital Solutions.', 'Explore five focused products for clinical work, restaurant operations, school administration, service queues and digital displays. Connect the right starting point with the engineering and implementation your organization needs.')}
      <section class="section" id="find-your-product"><div class="container">
        ${sectionHead('OUR PRODUCTS', 'Find your starting point', 'Search a workflow or choose your industry to see relevant products. Each product page explains the workflow focus and helps you prepare for implementation.')}
        ${discoveryControls()}
        <div class="catalogue-grid" id="portfolio-product-grid">${products.map(productCard).join('')}</div>
        <div class="portfolio-empty" id="portfolio-empty" hidden><span class="icon-badge">${icon('search')}</span><h3>No products match this selection.</h3><p>Try another search, or explore custom development and integration for your requirements.</p><button type="button" class="button button-outline" data-clear-filters>Show all products</button>${relatedLinks([{ href: '/services/', label: 'Explore engineering services' }, { href: '/industries/', label: 'Explore your industry' }])}</div>
      </div></section>
      <section class="section section-soft"><div class="container product-service-intro">
        <div>${eyebrow('EXTEND THE SOLUTION')}<h2>Products backed by end-to-end engineering.</h2><p>Bring websites, custom applications, cloud services, AI, embedded systems and integration into the same delivery plan. Explore these capabilities in Services.</p></div>
        <ul class="related-links" aria-label="Supporting engineering services">
          <li id="product-6">${link('/services/#service-01', 'Website Development & Hosting')}</li>
          <li id="product-7">${link('/services/#service-09', 'Domain Training & Education')}</li>
          <li id="product-3">${link('/services/#service-03', 'Embedded Systems & IoT Development')}</li>
          <li>${link('/services/', 'All engineering services')}</li>
        </ul>
      </div></section>`
  },
  ...Object.fromEntries(products.map(product => [product.path, productPage(product)]))
};
