import { productFamilies, solutions, industries, serviceCatalogue } from '../content.js';
import {
  escape, icon, eyebrow, sectionHead, innerHero, relatedLinks, link, process
} from '../components.js';

// Keep existing fragment destinations while the semantic URLs remain primary.
const industryLegacyIds = {
  education: 'industry-0',
  manufacturing: 'industry-2',
  hospitality: 'industry-3',
  healthcare: 'industry-4',
  retail: 'industry-5',
  startups: 'industry-6',
  services: 'industry-7'
};
const solutionLegacyIds = {
  'smart-spaces-service-delivery': ['solution-0'],
  'business-digital-transformation-integration': ['solution-1'],
  'digital-presence-customer-growth': ['solution-2', 'solution-3']
};
const solutionIcons = [
  'hospitality', 'healthcare', 'education', 'embedded-systems', 'hr', 'link', 'spark'
];
const industryIcons = {
  hospitality: 'hospitality', healthcare: 'healthcare', education: 'education',
  properties: 'building', manufacturing: 'embedded-systems', retail: 'spark',
  services: 'users', startups: 'rocket'
};

const number = index => String(index + 1).padStart(2, '0');
const optionalId = id => id ? ` id="${escape(id)}"` : '';
const tags = items => `<ul class="tag-list">${items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>`;

function solutionCard(solution) {
  const index = solutions.indexOf(solution);
  const [headingId, descriptionId] = solutionLegacyIds[solution.id] || [];
  return `<article class="card solution-card" id="${escape(solution.id)}">
    <div class="icon-badge">${icon(solutionIcons[index])}</div>
    <p class="numbered-label">${number(index)} / Business solution</p>
    <h3${optionalId(headingId)}>${escape(solution.title)}</h3>
    <p${optionalId(descriptionId)}>${escape(solution.description)}</p>
    ${relatedLinks(solution.relatedLinks, `Explore ${solution.title}`)}
  </article>`;
}

function sectorCard(industry) {
  return `<article class="sector-card industry-card" id="${escape(industry.id)}">
    <div class="icon-badge">${icon(industryIcons[industry.id])}</div>
    <h3${optionalId(industryLegacyIds[industry.id])}>${escape(industry.title)}</h3>
    <p>${escape(industry.description)}</p>
    ${relatedLinks(industry.relatedLinks, `Relevant offerings for ${industry.title}`)}
  </article>`;
}

const planningResources = [
  {
    id: 'resource-0',
    icon: 'compass',
    title: 'Evaluate industry software',
    description: 'Give a product discussion a clear operational focus.',
    questions: [
      'Which product family and operating setting are relevant to your organization?',
      'Who will use the software, and which workflows should a demonstration cover?',
      'Which existing systems, data and rollout requirements need to be considered?'
    ]
  },
  {
    id: 'resource-1',
    icon: 'code',
    title: 'Prepare a development brief',
    description: 'Explain the problem before defining the application.',
    questions: [
      'What business problem should the application solve?',
      'Who are its users, and what are their essential tasks?',
      'Which integrations, timeline and operating constraints affect the project?'
    ]
  },
  {
    id: 'resource-2',
    icon: 'embedded-systems',
    title: 'Plan connected systems',
    description: 'Bring the devices, information and operating environment into the brief.',
    questions: [
      'Which devices, information or recurring activities are involved?',
      'What data, interfaces and system access are available?',
      'Where are human review, exception handling and evaluation required?'
    ]
  }
];

const deliveryPrinciples = [
  {
    icon: 'users',
    title: 'Start with the people',
    description: 'Understand who will use the solution, the work they need to complete and the information they rely on.'
  },
  {
    icon: 'link',
    title: 'Consider the whole workflow',
    description: 'Assess the product, existing systems and required connections together so development follows the business requirement.'
  },
  {
    icon: 'compass',
    title: 'Make the scope clear',
    description: 'Bring users, operating constraints, system dependencies and rollout needs into the design and implementation plan.'
  },
  {
    icon: 'check',
    title: 'Plan beyond development',
    description: 'Include testing, deployment, user training, handover and ongoing support in the delivery conversation.'
  }
];

const coreIndustries = industries.filter(industry => ['hospitality', 'healthcare', 'education'].includes(industry.id));
const operatingIndustries = industries.filter(industry => !industry.isAudience && !coreIndustries.includes(industry));
const startupAudience = industries.find(industry => industry.isAudience);
const crossIndustryFamilies = productFamilies.filter(family => ['embedded-systems', 'hr'].includes(family.id));

export const companyPages = {
  '/solutions/': {
    title: 'Business Digital Solutions & Automation | AMPIGEN',
    description: 'Connect industry software, custom development, smart systems and integration to address operational needs with AMPIGEN.',
    html: `${innerHero(
      'Solutions',
      'Digital Solutions for Business Operations',
      'Start with the work you want to improve. Bring the relevant software products, custom development and integration services together around the people, systems and activities involved.'
    )}
    <section class="section">
      <div class="container">
        ${sectionHead('Industry workflows', 'Built around how your organization works', 'Connect the product and supporting services around the needs of your restaurant, care setting or school community.')}
        <div class="card-grid-three">${solutions.slice(0, 3).map(solutionCard).join('')}</div>
      </div>
    </section>
    <section class="section section-soft">
      <div class="container">
        ${sectionHead('Across the business', 'Connect your spaces, teams and digital experience', 'Shape a focused plan for connected environments, workforce operations, system integration or your customer journey.')}
        <div class="card-grid">${solutions.slice(3).map(solutionCard).join('')}</div>
      </div>
    </section>
    <section class="section">
      <div class="container split-layout editorial-intro">
        <div>${eyebrow('From need to delivery')}<h2>One requirement. The right combination of capabilities.</h2></div>
        <div class="lead-copy"><p>A solution can begin with an industry product, a new application or a workflow that crosses existing systems. Identify the users and the result you need, then define the development, integration and implementation work around it.</p>${relatedLinks([
          { href: '/products/', label: 'Explore the product portfolio' },
          { href: '/services/', label: 'Explore engineering capabilities' }
        ])}</div>
      </div>
    </section>`
  },

  '/industries/': {
    title: 'Industry Digital Solutions | AMPIGEN',
    description: 'Explore software and digital solutions for hospitality, healthcare, education, property, manufacturing, retail and service organizations.',
    html: `${innerHero(
      'Industries',
      'Digital Solutions Shaped Around Your Industry',
      'The operating context matters. Start with your users, everyday activities and business constraints, then identify the software products, smart systems and engineering services that fit.'
    )}
    <section class="section">
      <div class="container">
        ${sectionHead('Industry focus', 'Understand the setting. Shape the solution.', 'Explore dedicated software portfolios and the supporting services around your organization.')}
        <div class="sector-grid">${coreIndustries.map(sectorCard).join('')}</div>
      </div>
    </section>
    <section class="section section-soft">
      <div class="container">
        ${sectionHead('Operating environments', 'Connect physical operations and digital work', 'Plan around your facilities, equipment, customer journey and the systems your teams use.')}
        <div class="card-grid">${operatingIndustries.map(sectorCard).join('')}</div>
      </div>
    </section>
    <section class="section">
      <div class="container split-layout">
        <div>${eyebrow('Across industries')}<h2>Workforce and connected systems</h2><p class="lead-copy">Explore these product families alongside your industry requirements.</p></div>
        <div class="prose-grid">${crossIndustryFamilies.map(family => `<article id="${escape(family.id)}">
          <div class="icon-badge">${icon(family.id)}</div>
          <h3${family.id === 'embedded-systems' ? ' id="industry-1"' : ''}>${escape(family.title)}</h3>
          <p>${escape(family.description)}</p>
          ${link(family.path, `Explore ${family.navLabel}`)}
        </article>`).join('')}</div>
      </div>
    </section>
    <section class="section section-dark">
      <div class="container split-layout">
        <div>${eyebrow('Product teams')}<h2>From a product idea to a development plan</h2><p class="lead-copy">Bring a new software or connected-product requirement into focus.</p></div>
        <article id="${escape(startupAudience.id)}">
          <div class="icon-badge">${icon('rocket')}</div>
          <h3 id="industry-6">${escape(startupAudience.title)}</h3>
          <p>${escape(startupAudience.description)}</p>
          ${relatedLinks(startupAudience.relatedLinks, 'Capabilities for startups and product teams')}
        </article>
      </div>
    </section>`
  },

  '/services/': {
    title: 'Software, AI & IoT Services | AMPIGEN',
    description: 'Explore custom software, AI, cloud, IoT, embedded engineering, integration, websites, digital marketing and technical training from AMPIGEN.',
    html: `${innerHero(
      'Services',
      'Software Development, AI, Cloud & IoT Services',
      'Build, connect and support the digital systems your business needs. Bring software development, embedded engineering and implementation together around your products, users and operational requirements.'
    )}
    <section class="section">
      <div class="container">
        ${sectionHead('Engineering capabilities', 'The expertise behind your digital solution', 'Find the capability you need, or combine services within a product, integration or transformation project.')}
        <nav class="capability-nav" aria-label="Find a capability">${serviceCatalogue.map(service => link(`#${service.id}`, service.title)).join('')}</nav>
        ${serviceCatalogue.map((service, index) => `<article class="service-row" id="${escape(service.id)}">
          <div class="service-index" aria-hidden="true">${number(index)}</div>
          <div class="service-body">
            <h3>${escape(service.title)}</h3>
            <p>${escape(service.description)}</p>
            ${tags(service.tags)}
          </div>
        </article>`).join('')}
      </div>
    </section>
    ${process()}`
  },

  '/resources/': {
    title: 'Software Buying & Project Resources | AMPIGEN',
    description: 'Explore the AMPIGEN company profile and practical questions for planning industry software, connected systems and digital projects.',
    html: `${innerHero(
      'Resources',
      'A Clearer Start to Your Digital Project',
      'Explore our company profile and prepare the questions that make a product or project discussion useful. Start with your organization, the people who will use the solution and the workflows that matter most.'
    )}
    <section class="section" id="company-profile">
      <div class="container profile-resource">
        <div class="profile-cover" aria-hidden="true">
          <span>AMPIGEN</span>
          ${icon('document')}
          <strong>Company<br>profile</strong>
          <p>Industry software.<br>Smart systems.<br>Engineering delivery.</p>
          <span>Engineering Intelligence | Transforming Business</span>
        </div>
        <div>
          ${eyebrow('Company profile · PDF')}
          <h2>Our portfolio. Your starting point.</h2>
          <p class="lead-copy">Explore our industry software, smart and embedded systems, technical services and implementation approach in one company profile.</p>
          <p>Share it with your team to prepare a product evaluation, a custom development brief or a discussion about connecting existing systems.</p>
          ${link('/documents/ampigen-company-profile.pdf', 'Download company profile')}
        </div>
      </div>
    </section>
    <section class="section section-soft">
      <div class="container">
        ${sectionHead('Planning your next step', 'Bring the right questions to the conversation', 'A focused brief helps connect the business need with the relevant product, services and delivery scope.')}
        <div class="resource-grid">${planningResources.map(resource => `<article class="resource-card" id="${resource.id}">
          <div class="icon-badge">${icon(resource.icon)}</div>
          <h3>${escape(resource.title)}</h3>
          <p>${escape(resource.description)}</p>
          <ul class="checklist">${resource.questions.map(question => `<li>${escape(question)}</li>`).join('')}</ul>
        </article>`).join('')}</div>
      </div>
    </section>
    <section class="section" id="questions">
      <div class="container split-layout">
        <div>${eyebrow('Common questions')}<h2>Before we begin</h2><p class="lead-copy">Understand how a product or development requirement becomes an implementation discussion.</p></div>
        <div class="faq-list">
          <details><summary>Can we combine a product with custom development?</summary><p>Yes. We assess the product against your requirements, then define any configuration, development or integration work needed for the agreed scope.</p></details>
          <details><summary>Can you work with existing systems?</summary><p>Integration and modernization are part of our capabilities. We review the architecture, interfaces, data and access constraints before confirming the approach.</p></details>
          <details><summary>What should we prepare for a product discussion?</summary><p>Describe your organization, the people who will use the product and the workflows you want to review. Include relevant existing systems, implementation needs and operating constraints.</p></details>
          <details><summary>How do enquiries reach your team?</summary><p>The form prepares a draft. Review it and send it from your email app or WhatsApp.</p></details>
        </div>
      </div>
    </section>`
  },

  '/about/': {
    title: 'About AMPIGEN | Digital Solutions Provider',
    description: 'Meet AMPIGEN: an end-to-end digital solution provider combining industry software, embedded systems, custom development and implementation.',
    html: `${innerHero(
      'About',
      'About AMPIGEN',
      'An end-to-end digital solution provider bringing industry software, smart systems and custom engineering together.'
    )}
    <section class="section" id="about">
      <div class="container split-layout editorial-intro">
        <div>${eyebrow('Our business')}<h2>Industry understanding.<br>Engineering delivery.</h2><p class="lead-copy">Engineering Intelligence | Transforming Business</p></div>
        <div class="lead-copy">
          <p>Our portfolio covers hospitality, healthcare, education, HR and embedded systems, supported by software development, AI, cloud, IoT and automation services.</p>
          <p>An engagement can start with an industry product, a new application idea or an existing workflow that needs improvement. We work from the business requirement through design, development, integration, testing, deployment, training and support.</p>
          <p>The starting point is the people who will use the solution, the work they need to complete and the environment the technology must operate in.</p>
        </div>
      </div>
    </section>
    <section class="section section-soft" id="why-us">
      <div class="container">
        ${sectionHead('Our approach', 'Bring the work together', 'Industry products provide a focused starting point. Custom development, integration and implementation shape the solution around your organization.')}
        <div class="value-grid">${deliveryPrinciples.map(principle => `<article class="value-card">
          <div class="icon-badge">${icon(principle.icon)}</div>
          <h3>${escape(principle.title)}</h3>
          <p>${escape(principle.description)}</p>
        </article>`).join('')}</div>
        ${relatedLinks([
          { href: '/products/', label: 'Explore our product portfolio' },
          { href: '/services/', label: 'Explore our delivery services' }
        ])}
      </div>
    </section>
    <div id="approach">${process()}</div>`
  }
};
