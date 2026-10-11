import { industries } from '../industry-content.js';
import { escape, icon, innerHero, sectionHead, relatedLinks, link } from '../components.js';

const legacyIds = {
  education: 'industry-0',
  'embedded-systems': 'industry-1',
  manufacturing: 'industry-2',
  hospitality: 'industry-3',
  healthcare: 'industry-4',
  retail: 'industry-5',
  startups: 'industry-6',
  services: 'industry-7'
};

const industryById = new Map(industries.map(industry => [industry.id, industry]));

function industryCard(industry) {
  const legacyId = legacyIds[industry.id];
  return `<li class="industry-directory-item" id="${escape(industry.id)}">
    ${legacyId ? `<span class="industry-legacy-anchor" id="${escape(legacyId)}" aria-hidden="true"></span>` : ''}
    <a class="industry-route-card" href="${escape(industry.path)}" aria-labelledby="industry-title-${escape(industry.id)}" aria-describedby="industry-summary-${escape(industry.id)}">
      <span class="icon-badge">${icon(industry.icon)}</span>
      <h3 id="industry-title-${escape(industry.id)}">${escape(industry.title)}</h3>
      <p id="industry-summary-${escape(industry.id)}">${escape(industry.description)}</p>
      <span class="industry-card-link" aria-hidden="true">${industry.isAudience ? 'Explore product engineering' : 'Explore industry solutions'}${icon('arrow')}</span>
    </a>
  </li>`;
}

function contextSnapshot(industry) {
  return `<aside class="industry-context-snapshot" aria-label="${escape(industry.title)} planning focus">
    <div class="industry-snapshot-heading"><span class="industry-snapshot-icon">${icon(industry.icon)}</span><span>Planning focus</span></div>
    <ul>${industry.focus.map(item => `<li>${escape(item)}</li>`).join('')}</ul>
    <p>Shape the technology around the people and work it needs to support.</p>
  </aside>`;
}

function productRecommendations(industry) {
  if (!industry.products.length) return '';
  return `<div class="industry-product-selection">
    <h3>Relevant products</h3>
    <ul class="industry-product-links" aria-label="Products for ${escape(industry.title)}">${industry.products.map(product => `<li>
      <a href="${escape(product.href)}" class="industry-product-link" aria-labelledby="recommended-${escape(product.id)}">
        <span class="industry-product-icon">${icon(product.icon)}</span>
        <span class="industry-product-copy"><strong id="recommended-${escape(product.id)}">${escape(product.title)}</strong><span>${escape(product.description)}</span></span>
        ${icon('arrow')}
      </a>
    </li>`).join('')}</ul>
  </div>`;
}

function deliveryScope(industry) {
  return `<section class="section section-soft" id="industry-solutions"><div class="container">
    ${sectionHead('PRODUCTS & ENGINEERING', industry.capabilityTitle)}
    <div class="industry-scope-grid${industry.products.length ? '' : ' industry-scope-services'}">
      ${productRecommendations(industry)}
      <div class="industry-engineering-scope">
        <h3>Custom solutions and services</h3>
        <p>${escape(industry.capability)}</p>
        ${relatedLinks(industry.serviceLinks, `Engineering services for ${industry.title}`)}
        <div class="industry-delivery-priorities"><h3>Delivery priorities</h3><ul>${industry.priorities.map(item => `<li>${icon('check')}<span>${escape(item)}</span></li>`).join('')}</ul></div>
      </div>
    </div>
  </div></section>`;
}

function industryPage(industry) {
  const related = industry.relatedIndustries.map(id => industryById.get(id)).filter(Boolean);
  return {
    title: industry.seoTitle,
    description: industry.metaDescription,
    html: `<div class="industry-detail" data-industry="${escape(industry.id)}">
      ${innerHero(industry.title, industry.h1, industry.intro, { href: '/industries/', label: 'Industries' }, contextSnapshot(industry))}
      <section class="section" id="industry-workflows"><div class="container">
        ${sectionHead('WORKFLOW NEEDS', industry.workflowTitle)}
        <div class="industry-workflow-grid">${industry.workflows.map(workflow => `<article class="industry-workflow-card">
          <h3>${escape(workflow.title)}</h3><p>${escape(workflow.body)}</p>
        </article>`).join('')}</div>
      </div></section>
      ${deliveryScope(industry)}
      <section class="section" id="industry-planning"><div class="container industry-planning-grid">
        <div>${sectionHead('YOUR REQUIREMENTS', 'Prepare a useful industry brief', 'Bring the operating context, existing systems and the first workflow you want to improve.')}
          <ul class="industry-requirements-list">${industry.checklist.map(item => `<li>${icon('document')}<span>${escape(item)}</span></li>`).join('')}</ul>
        </div>
        <aside class="industry-planning-note" aria-label="Planning guidance">
          <span class="icon-badge">${icon('compass')}</span><h3>A practical starting point</h3><p>${escape(industry.planningNote)}</p>
          ${link('/resources/#resource-1', 'Project planning resources')}
        </aside>
      </div></section>
      <section class="section section-soft industry-faq-section" id="industry-questions"><div class="container industry-faq-grid">
        ${sectionHead('COMMON QUESTIONS', 'Before you plan the next step')}
        <div class="faq-list">${industry.faqs.map(faq => `<details><summary>${escape(faq.question)}</summary><p>${escape(faq.answer)}</p></details>`).join('')}</div>
      </div></section>
      <section class="section related-section industry-related-section"><div class="container">
        <h2>Related industries and contexts</h2>
        ${relatedLinks(related.map(item => ({ href: item.path, label: item.title })), `Related industries for ${industry.title}`)}
        <p class="industry-all-link">${link('/industries/', 'View all industries')}</p>
      </div></section>
    </div>`
  };
}

export const industryPages = {
  '/industries/': {
    title: 'Industry Software & Digital Solutions | AMPIGEN',
    description: 'Explore AMPIGEN digital solutions for healthcare, hospitality, education, embedded systems, properties, manufacturing, retail, services and product teams.',
    html: `<div class="industry-hub">
      ${innerHero('Industries', 'Digital solutions shaped around your industry', 'Connect the way your organization works with the technology it needs. Explore industry products, custom engineering and implementation services around your users, operating environment and business priorities.')}
      <section class="section"><div class="container">
        ${sectionHead('INDUSTRY EXPERTISE', 'Find your operating context', 'Choose an industry to explore relevant workflows, products and practical requirements for your next digital project.')}
        <ul class="industry-directory" aria-label="Industries and product teams">${industries.map(industryCard).join('')}</ul>
      </div></section>
      <section class="section section-soft"><div class="container">
        ${sectionHead('ONE CONNECTED APPROACH', 'From the business need to everyday use', 'An industry plan can combine a product with the engineering and implementation work your organization needs.')}
        <div class="industry-delivery-grid">
          <article><span class="icon-badge">${icon('layers')}</span><h3>Choose a product</h3><p>Evaluate Clinic Automation, Restaurant Solution, My School, Queue Management or Smart LED against the relevant workflows.</p>${link('/products/', 'Explore the product portfolio')}</article>
          <article><span class="icon-badge">${icon('code')}</span><h3>Scope the engineering</h3><p>Define custom software, embedded systems, cloud, integration and automation around your operating environment.</p>${link('/services/', 'Explore engineering services')}</article>
          <article><span class="icon-badge">${icon('users')}</span><h3>Prepare for adoption</h3><p>Bring testing, rollout, training and ongoing support into the delivery plan so teams can use the solution in everyday work.</p>${link('/services/#service-10', 'Implementation and support')}</article>
        </div>
      </div></section>
      <section class="section"><div class="container industry-hub-planning">
        <div>${sectionHead('START WITH THE CONTEXT', 'Make your first discussion useful', 'Describe the people, workflow and result you want to support. Include the systems already in use and the constraints that affect rollout.')}</div>
        <div class="industry-hub-planning-note"><span class="icon-badge">${icon('compass')}</span><h3>Bring one complete workflow</h3><p>Trace it from the first request to the final outcome, including handoffs, exceptions and the information each person needs.</p>${link('/resources/#resource-1', 'Prepare your project brief')}</div>
      </div></section>
    </div>`
  },
  ...Object.fromEntries(industries.map(industry => [industry.path, industryPage(industry)]))
};
