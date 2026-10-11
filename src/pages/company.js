import { products, solutions, serviceCatalogue } from '../content.js';
import {
  escape, icon, eyebrow, sectionHead, innerHero, relatedLinks, link, process
} from '../components.js';

// Keep existing fragment destinations while the semantic URLs remain primary.
const solutionLegacyIds = {
  'smart-spaces-service-delivery': ['solution-0'],
  'business-digital-transformation-integration': ['solution-1'],
  'digital-presence-customer-growth': ['solution-2', 'solution-3']
};
const solutionIcons = [
  'hospitality', 'healthcare', 'education', 'embedded-systems', 'hr', 'link', 'spark'
];
const number = index => String(index + 1).padStart(2, '0');
const optionalId = id => id ? ` id="${escape(id)}"` : '';
const tags = items => `<ul class="tag-list">${items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>`;
const productNames = `${products.slice(0, -1).map(product => product.name).join(', ')} and ${products.at(-1).name}`;

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

const planningResources = [
  {
    id: 'resource-0',
    icon: 'compass',
    title: 'Evaluate a product',
    description: 'Use your everyday workflow to assess product fit.',
    questions: [
      'Which product matches the work you want to improve?',
      'Which users and end-to-end tasks should a demonstration cover?',
      'Which functions must be available at launch, and which can follow later?',
      'What information, devices or existing systems will the product need to work with?'
    ]
  },
  {
    id: 'resource-1',
    icon: 'code',
    title: 'Prepare a development brief',
    description: 'Explain the problem before defining the application.',
    questions: [
      'What problem should the application solve, and how will you assess the outcome?',
      'Who are its users, and which tasks and exceptions must it support?',
      'Which applications, data sources and integrations are involved?',
      'What are your launch priorities, budget range and timeline constraints?'
    ]
  },
  {
    id: 'resource-2',
    icon: 'embedded-systems',
    title: 'Plan connected systems',
    description: 'Bring the devices, information and operating environment into the brief.',
    questions: [
      'Which devices, displays and locations are part of the installation?',
      'What power, connectivity, interfaces and system access are available?',
      'How should staff handle connectivity loss, exceptions or manual overrides?',
      'Who will own installation, content, maintenance and ongoing support?'
    ]
  }
];

const implementationChecks = [
  {
    icon: 'compass',
    title: 'Scope and acceptance',
    questions: [
      'Write down the essential workflows and the result expected from each.',
      'Confirm the included configuration, custom work and integration scope.',
      'Agree who will review the solution and approve it for launch.'
    ]
  },
  {
    icon: 'users',
    title: 'Data and access',
    questions: [
      'Identify records to migrate and who will check their quality.',
      'Define the access each role needs for its everyday work.',
      'Confirm the data handling, export and recovery requirements to assess.'
    ]
  },
  {
    icon: 'link',
    title: 'Systems and dependencies',
    questions: [
      'List required applications, devices, interfaces and responsible owners.',
      'Check connectivity, hosting and installation dependencies.',
      'Include normal workflows and failure scenarios in acceptance testing.'
    ]
  },
  {
    icon: 'check',
    title: 'Rollout and support',
    questions: [
      'Decide whether to start with one team or location before wider rollout.',
      'Plan training, handover and the transition from existing processes.',
      'Agree support ownership, recurring costs and how changes will be assessed.'
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
    description: 'Download the AMPIGEN company profile and use practical checklists to evaluate products, plan custom development and prepare implementation.',
    html: `${innerHero(
      'Resources',
      'A Clearer Start to Your Digital Project',
      'Compare products around your everyday work, prepare a clear development brief and plan what implementation will involve. Use these questions with your team before your next discussion.'
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
          <p class="lead-copy">Explore ${escape(productNames)}, along with our engineering services and implementation approach.</p>
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
    <section class="section" id="implementation-checklist">
      <div class="container">
        ${sectionHead('Implementation checklist', 'Look beyond the feature list', 'Use these criteria to compare scope and prepare the people, data and systems involved in rollout.')}
        <div class="card-grid">${implementationChecks.map(check => `<article class="resource-card">
          <div class="icon-badge">${icon(check.icon)}</div>
          <h3>${escape(check.title)}</h3>
          <ul class="checklist">${check.questions.map(question => `<li>${escape(question)}</li>`).join('')}</ul>
        </article>`).join('')}</div>
      </div>
    </section>
    <section class="section" id="questions">
      <div class="container split-layout">
        <div>${eyebrow('Common questions')}<h2>Before we begin</h2><p class="lead-copy">Understand how a product or development requirement becomes an implementation discussion.</p></div>
        <div class="faq-list">
          <details><summary>Which products can we evaluate?</summary><p>Our product portfolio includes ${escape(productNames)}. Each product page describes its focus and the workflows to discuss.</p>${relatedLinks(products.map(product => ({ href: product.path, label: product.name })), 'Explore the five AMPIGEN products')}</details>
          <details><summary>Can we combine a product with custom development?</summary><p>Yes. We assess the product against your requirements, then define any configuration, development or integration work needed for the agreed scope. Review the functions you need during the product discussion before agreeing the implementation.</p></details>
          <details><summary>Can you work with existing systems?</summary><p>Integration and modernization are part of our capabilities. We review the architecture, interfaces, data and access constraints before confirming the approach.</p></details>
          <details><summary>What should we prepare for a product discussion?</summary><p>Choose a typical task and an exception your team handles today. Describe who performs each step, what information is needed and the result you expect. Include existing systems, rollout needs and the questions you want a demonstration to answer.</p></details>
          <details><summary>What should an implementation plan include?</summary><p>Agree the scope, responsibilities, data preparation, access requirements, integrations and acceptance criteria. Include training, rollout, support and any recurring costs so your team can evaluate the complete engagement.</p></details>
          <details><summary>How do enquiries reach your team?</summary><p>The form prepares a draft for you to review and send from your email app or WhatsApp. Preparing the draft does not send your enquiry or reserve a demonstration time.</p></details>
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
          <p>Our products are ${escape(productNames)}. They provide a starting point for clinic, restaurant and school workflows, in-person service and information display.</p>
          <p>Our wider capabilities cover custom software, websites, web and mobile applications, desktop applications, AI, cloud, IoT, embedded engineering and system integration. Workforce operations, accommodation workflows and other business requirements can be scoped as custom solutions.</p>
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
