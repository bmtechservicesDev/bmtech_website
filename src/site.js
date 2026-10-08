import { productFamilies, solutions, industries, serviceCatalogue } from './content.js';

// These recipients are used only to prepare a visitor-sent draft.
export const contact = { email: 'bmtechservices2025@gmail.com', phone: '+919642668815' };
export const enquiryTypes = ['General enquiry', 'Product demo', 'Custom development', 'Digital transformation', 'Website & marketing', 'Training & education'];

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const link = (href, label, className = 'content-link') => `<a class="${className}" href="${escape(href)}">${escape(label)}</a>`;
const eyebrow = text => `<p class="eyebrow"><span class="eyebrow-line"></span>${escape(text)}</p>`;
const sectionHead = (kicker, heading, text) => `<div class="section-head">${eyebrow(kicker)}<h2>${escape(heading)}</h2><p>${escape(text)}</p></div>`;
const familyLabels = { hospitality: 'Hospitality', healthcare: 'Healthcare', education: 'Education', 'embedded-systems': 'Embedded Systems', hr: 'HR' };

const productLegacyIds = { 'restaurant-solution': 'product-0', 'clinic-automation': 'product-1', 'school-management-app': 'product-2', 'iot-gateway': 'product-3', 'smart-led': 'product-4', 'queue-management': 'product-5' };
const industryLegacyIds = { education: 'industry-0', manufacturing: 'industry-2', hospitality: 'industry-3', healthcare: 'industry-4', retail: 'industry-5', startups: 'industry-6', services: 'industry-7' };
const solutionLegacyIds = { 'smart-spaces-service-delivery': ['solution-0'], 'business-digital-transformation-integration': ['solution-1'], 'digital-presence-customer-growth': ['solution-2', 'solution-3'] };

function relatedLinks(links, label = 'Related products and services') {
  return `<ul class="related-links" aria-label="${escape(label)}">${links.map(item => `<li>${link(item.href, item.label)}</li>`).join('')}</ul>`;
}

function brand() {
  return '<a class="brand" href="/" aria-label="BM Tech Services home"><img src="/brand/bmtech-logo.webp" width="1600" height="639" alt="BMTech — Engineering Intelligence | Transforming Business"></a>';
}

function menuIcon(index) {
  const paths = [
    '<rect x="4" y="5" width="24" height="20" rx="3"/><path d="M4 11h24M11 29h10M16 25v4"/>',
    '<path d="M16 3l11 6v14l-11 6-11-6V9zM5 9l11 6 11-6M16 15v14"/>',
    '<circle cx="16" cy="16" r="6"/><path d="M16 3v7M16 22v7M3 16h7M22 16h7M7 7l5 5M20 20l5 5M7 25l5-5M20 12l5-5"/>',
    '<path d="M5 6h9a4 4 0 014 4v18a5 5 0 00-5-4H5zM18 10a4 4 0 014-4h5v18h-5a4 4 0 00-4 4"/>'
  ];
  return `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths[index % paths.length]}</svg>`;
}

function header(page) {
  const navigation = [
    ['/products/', 'Products', [
      ...productFamilies.map(family => [family.path, family.title, family.products.map(product => product.name).join(' · ')]),
      ['/products/', 'Product portfolio', 'All industry software and smart system offerings.']
    ]],
    ['/industries/', 'Industries', industries.map(industry => [`/industries/#${industry.id}`, industry.title, industry.isAudience ? 'For teams building a new software or connected product.' : industry.description])],
    ['/solutions/', 'Solutions', [
      ...solutions.map(solution => [`/solutions/#${solution.id}`, solution.title, solution.description]),
      ['/services/', 'Services', 'Custom software, embedded engineering, AI, cloud, integration and support.']
    ]],
    ['/resources/', 'Resources', [
      ['/resources/#company-profile', 'Company profile', 'Industry software, smart systems and delivery capabilities.'],
      ['/resources/#resource-0', 'Product planning', 'Prepare your software requirements and product discussion.'],
      ['/resources/#resource-1', 'Development brief', 'Define users, workflows and existing systems.'],
      ['/resources/#resource-2', 'AI & transformation', 'Assess connected systems and useful automation.'],
      ['/resources/#questions', 'Common questions', 'Understand implementation and prepare an enquiry.']
    ]]
  ];
  return `<header class="site-header"><div class="container header-inner">${brand()}
    <button class="menu-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span><span></span></button>
    <nav id="site-nav" class="site-nav" aria-label="Main navigation">${navigation.map(([path, label, children], i) => `
      <div class="nav-item"><div class="nav-heading"><button class="dropdown-toggle" aria-label="${label} submenu" ${page.startsWith(path) ? 'aria-current="page"' : ''} aria-expanded="false" aria-controls="submenu-${i}">${label}</button></div>
      <div class="nav-dropdown" id="submenu-${i}" hidden>${children.map(([href, text, description], j) => `<a class="mega-card" href="${escape(href)}" aria-label="${escape(text)}" aria-describedby="menu-description-${i}-${j}"><span class="mega-icon" aria-hidden="true">${menuIcon(j)}</span><span class="mega-copy"><strong>${escape(text)}</strong><span id="menu-description-${i}-${j}">${escape(description)}</span></span></a>`).join('')}</div></div>`).join('')}
      <a class="button button-small nav-cta" href="/book-a-demo/">Book a demo</a>
    </nav></div></header>`;
}

function footer() {
  const column = (title, links, href) => `<div class="footer-column"><h3>${href ? link(href, title, 'footer-heading-link') : title}</h3>${links.map(([target, label]) => link(target, label, 'footer-link')).join('')}</div>`;
  return `<footer class="site-footer"><div class="container"><div class="footer-top">
    <div class="footer-brand">${brand()}<p>Industry software, smart systems and custom engineering, from requirements to implementation and support.</p><p>Engineering Intelligence | Transforming Business</p></div>
    ${column('Products', productFamilies.map(family => [family.path, family.title]), '/products/')}
    ${column('Industries', industries.filter(industry => !industry.isAudience).map(industry => [`/industries/#${industry.id}`, industry.title]), '/industries/')}
    ${column('Solutions', [...solutions.map(solution => [`/solutions/#${solution.id}`, solution.title]), ['/services/', 'Services']], '/solutions/')}
    ${column('Resources', [['/resources/#company-profile', 'Company profile'], ['/resources/#resource-0', 'Product planning'], ['/resources/#resource-1', 'Development briefs'], ['/resources/#questions', 'Common questions']], '/resources/')}
    ${column('Company', [['/about/', 'About us'], ['/contact/', 'Contact us']])}
    </div><div class="footer-bottom"><span>© <span id="year"></span> BM Tech Services. All rights reserved.</span><span>AI • Cloud • IoT • Automation • Digital Transformation</span></div></div></footer>`;
}

function breadcrumbs(label, parent) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span>${parent ? `<a href="${escape(parent.href)}">${escape(parent.label)}</a><span aria-hidden="true">/</span>` : ''}<span aria-current="page">${escape(label)}</span></nav>`;
}

function innerHero(label, title, copy, parent) {
  return `<section class="page-hero"><div class="container">${breadcrumbs(label, parent)}${eyebrow(label)}<h1>${escape(title)}</h1><p>${escape(copy)}</p></div></section>`;
}

function familyCards(heading = 'h3', showProducts = false) {
  return `<div class="product-grid family-grid">${productFamilies.map(family => `<article class="product-card family-card" id="${family.id}" data-product-family="${family.id}"><div class="product-content">
    <span class="small-label">${family.id === 'hr' ? 'Workforce operations' : family.id === 'embedded-systems' ? 'Connected technology' : 'Industry software'}</span>
    <${heading}>${link(family.path, family.title, 'heading-link')}</${heading}><p>${escape(family.description)}</p>
    ${showProducts ? `<ul class="portfolio-links">${family.products.map(product => `<li>${link(`${family.path}#${product.id}`, product.name, 'product-name-link').replace('<a ', `<a ${productLegacyIds[product.id] ? `id="${productLegacyIds[product.id]}" ` : ''}`)}</li>`).join('')}</ul>${family.brandNote ? `<p class="product-brand-note">${escape(family.brandNote)}</p>` : ''}` : ''}
    </div></article>`).join('')}</div>`;
}

function productCards(family) {
  return `<div class="product-grid product-detail-grid">${family.products.map(product => `<article class="product-card" id="${product.id}" data-product="${product.id}"><div class="product-content"><h3>${escape(product.name)}</h3><p>${escape(product.description)}</p>${product.tags.length ? `<ul class="product-features">${product.tags.map(tag => `<li>${escape(tag)}</li>`).join('')}</ul>` : ''}</div></article>`).join('')}</div>`;
}

function industryCards(heading = 'h3', items = industries.filter(industry => !industry.isAudience), idPrefix = '') {
  return `<div class="industry-grid">${items.map((industry, index) => `<article class="industry-card" id="${idPrefix}${industry.id}"><span class="industry-index">${String(index + 1).padStart(2, '0')}</span><${heading} ${industryLegacyIds[industry.id] ? `id="${industryLegacyIds[industry.id]}"` : ''}>${escape(industry.title)}</${heading}><p>${escape(industry.description)}</p>${relatedLinks(industry.relatedLinks, `Relevant offerings for ${industry.title}`)}</article>`).join('')}</div>`;
}

function solutionCards(heading = 'h3') {
  return `<div class="solution-grid">${solutions.map((solution, index) => {
    const aliases = solutionLegacyIds[solution.id] || [];
    return `<article class="service-card solution-card" id="${solution.id}"><div class="card-top"><span class="card-number">${String(index + 1).padStart(2, '0')}</span><span class="small-label">Business solutions</span></div><${heading} ${aliases[0] ? `id="${aliases[0]}"` : ''}>${escape(solution.title)}</${heading}><p ${aliases[1] ? `id="${aliases[1]}"` : ''}>${escape(solution.description)}</p>${relatedLinks(solution.relatedLinks)}</article>`;
  }).join('')}</div>`;
}

function serviceCards() {
  return `<div class="service-grid">${serviceCatalogue.map((service, index) => `<article class="service-card" id="${service.id}"><div class="card-top"><span class="card-number">${String(index + 1).padStart(2, '0')}</span><span class="small-label">Delivery capabilities</span></div><h2>${escape(service.title)}</h2><p>${escape(service.description)}</p><ul class="card-tags">${service.tags.map(tag => `<li>${escape(tag)}</li>`).join('')}</ul></article>`).join('')}</div>`;
}

function process() {
  const steps = [
    ['Understand', 'Define your users, workflows, existing systems and desired outcome.'],
    ['Design', 'Shape the experience, architecture and implementation plan.'],
    ['Develop & integrate', 'Build the solution and connect the required systems.'],
    ['Test & deploy', 'Validate the workflows, prepare the rollout and train users.'],
    ['Support & improve', 'Maintain the solution and plan changes as requirements evolve.']
  ];
  return `<section class="section process-section"><div class="container">${sectionHead('HOW WE WORK', 'A clear path from requirements to support', 'Bring the product, engineering work and implementation into one delivery plan.')}<div class="steps">${steps.map(([title, copy], index) => `<article><span>${String(index + 1).padStart(2, '0')}</span><h3>${escape(title)}</h3><p>${escape(copy)}</p></article>`).join('')}</div></div></section>`;
}

function supportingServices() {
  return `<section class="section section-soft"><div class="container">${sectionHead('SUPPORTING SERVICES', 'Build, connect and support your solution', 'Custom development, integration and specialist services support your products and wider digital requirements.')}<div class="supporting-grid">
    <article id="product-6"><h3>${link('/services/#service-01', 'Website Development & Hosting')}</h3><p>Business websites, hosting, maintenance and enquiry integrations for your digital presence.</p></article>
    <article id="product-7"><h3>${link('/services/#service-09', 'Domain Training & Education')}</h3><p>Practical training and applied projects in software, embedded systems, IoT, AI and automation.</p></article>
    <article><h3>${link('/services/', 'Custom Development & Integration')}</h3><p>Web, mobile and desktop software, cloud applications, embedded engineering and system integration.</p></article>
    </div></div></section>`;
}

function familyPage(family) {
  return {
    title: family.seoTitle,
    description: family.metaDescription,
    html: `${innerHero(familyLabels[family.id], family.h1, family.intro, { href: '/products/', label: 'Products' })}
      <section class="section"><div class="container">${sectionHead('PRODUCT PORTFOLIO', family.title, 'Choose the offering that fits your organization and the workflows you want to support.')}
      ${productCards(family)}${family.brandNote ? `<p class="family-brand-note">${escape(family.brandNote)}</p>` : ''}</div></section>
      <section class="section section-soft"><div class="container family-context-grid">${family.sections.map(section => `<article><h2>${escape(section.title)}</h2><p>${escape(section.body)}</p></article>`).join('')}</div></section>
      <section class="section related-section"><div class="container"><h2>Related solutions and services</h2>${relatedLinks(family.relatedLinks)}</div></section>`
  };
}

const legacyInterests = ['My School', 'Website Development & Hosting', 'Domain Training & Education', 'Firmware Development', 'Product Development', 'Digital Marketing & Solutions', 'Digital transformation'];
export const interests = [...new Set([...productFamilies.flatMap(family => family.products.map(product => product.name)), ...serviceCatalogue.map(service => service.interest), ...legacyInterests])];

function interestOptions(required) {
  const products = new Set(productFamilies.flatMap(family => family.products.map(product => product.name)));
  const services = interests.filter(interest => !products.has(interest) && interest !== 'My School');
  return `<option value="">${required ? 'Select a product or service' : 'General enquiry'}</option>${productFamilies.map(family => `<optgroup label="${escape(family.title)}">${family.products.map(product => `<option value="${escape(product.name)}">${escape(product.name)}</option>`).join('')}</optgroup>`).join('')}<optgroup label="Existing product enquiry"><option value="My School">My School</option></optgroup><optgroup label="Services & digital transformation">${services.map(interest => `<option value="${escape(interest)}">${escape(interest)}</option>`).join('')}</optgroup>`;
}

function inputField(name, label, type, autocomplete, required = true) {
  return `<label>${label}${required ? ' <span aria-hidden="true">*</span>' : ''}<input name="${name}" type="${type}" autocomplete="${autocomplete}" ${required ? 'required' : ''} maxlength="160" aria-describedby="${name}-error"><span class="field-error" id="${name}-error" hidden></span></label>`;
}

function interestField(required) {
  return `<label>${required ? 'Select a product or service <span aria-hidden="true">*</span>' : 'Product or service'}<select name="interest" ${required ? 'required' : ''} aria-describedby="interest-error">${interestOptions(required)}</select><span class="field-error" id="interest-error" hidden></span></label>`;
}

function enquiryForm(isDemo) {
  const heading = isDemo ? 'Book a Product Demo' : 'Contact BM Tech Services';
  const intro = isDemo ? 'Tell us which product or solution you want to explore and the workflows that matter to your team.' : 'Tell us about the product, business challenge or digital project you want to explore.';
  const resultText = isDemo ? 'Review the draft and send it from your email app or WhatsApp. Preparing this request does not send it or reserve a demonstration time.' : 'Open the draft in your email app or WhatsApp, review the details and send it to BM Tech Services. Your enquiry has not been sent yet.';
  return `<form id="enquiry-form" class="contact-form reference-form ${isDemo ? 'demo-form' : ''}" data-demo="${isDemo}" aria-labelledby="enquiry-heading">
    <div class="form-heading"><h1 id="enquiry-heading">${heading}</h1><p>${intro}</p></div><p id="form-error-summary" class="form-error-summary" role="alert" hidden></p>
    ${isDemo ? interestField(true) : ''}<div class="form-row">${inputField('firstName', 'First name', 'text', 'given-name')}${inputField('lastName', 'Last name', 'text', 'family-name')}</div>
    ${inputField('email', 'Email', 'email', 'email')}${isDemo ? inputField('company', 'Company name', 'text', 'organization') : inputField('phone', 'Phone number', 'tel', 'tel', false)}
    ${isDemo ? '' : interestField(false)}
    <label>${isDemo ? 'What would you like the discussion to cover?' : 'Message'}<textarea name="message" rows="3" maxlength="3000" aria-label="${isDemo ? 'Comment' : 'Message'}"></textarea></label>
    <label class="consent-label"><input type="checkbox" name="consent" required aria-describedby="consent-error"><span>I agree to share these details with BM Tech Services to respond to this ${isDemo ? 'demo request' : 'enquiry'}. *</span></label><span class="field-error" id="consent-error" hidden></span>
    <div class="form-submit"><button class="button button-primary" type="submit">${isDemo ? 'Prepare demo request' : 'Prepare enquiry'}</button></div>
    <p class="form-hint">Prepare your ${isDemo ? 'request' : 'enquiry'}, then review and send the draft from your email app or WhatsApp.${isDemo ? ' Your demonstration time is confirmed after we discuss your request.' : ''}</p>
    <div id="form-result" class="form-result" role="status" aria-live="polite" hidden><h3 id="result-heading" tabindex="-1">Your ${isDemo ? 'demo request' : 'enquiry'} is ready to send</h3><p>${resultText}</p><textarea id="brief-output" readonly rows="9" aria-label="Prepared enquiry"></textarea><div class="result-actions">
    <a id="email-brief" class="button" href="mailto:${contact.email}">Open email draft</a><a id="whatsapp-brief" class="button button-whatsapp" href="https://wa.me/${contact.phone.replace(/\D/g, '')}" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a><button type="button" id="copy-brief" class="button button-outline">Copy enquiry</button></div><span id="copy-status" role="status" aria-live="polite"></span></div>
  </form>`;
}

const pages = {
  '/': {
    title: 'Business Software & Digital Solutions | BM Tech Services',
    description: 'Explore BMTech software for hospitality, healthcare, education and HR, plus embedded systems, custom development and end-to-end digital solutions.',
    html: `<section class="hero"><div class="hero-grid" aria-hidden="true"></div><div class="container hero-inner"><div class="hero-copy">${eyebrow('BM TECH SERVICES')}<h1>Industry Software &amp;<br><span>End-to-End Digital Solutions</span></h1><p>BM Tech Services is an end-to-end digital solution provider with software products for hospitality, healthcare, education and HR, alongside smart and embedded systems for connected spaces and service delivery.</p><p>We combine our portfolio with custom development, AI, cloud, IoT and automation to shape solutions around your business.</p><div class="hero-note"><span class="pulse-dot"></span>Engineering Intelligence | Transforming Business</div></div></div></section>
    <section class="section"><div class="container">${sectionHead('OUR PRODUCTS', 'Products for your industry and operations', 'Five product families, supported by development, integration, implementation and ongoing support.')}${familyCards()}</div></section>
    <section class="section section-soft"><div class="container">${sectionHead('END-TO-END DELIVERY', 'Custom development that fits your business', 'Build new applications, extend an existing product or connect the systems you already use.')}<div class="offering-grid">${[
      ['01', 'Industry software', 'Find the relevant product for your organization and plan its implementation.', '/products/'],
      ['02', 'Custom development', 'Develop web, mobile and desktop software, cloud applications and connected systems.', '/services/'],
      ['03', 'Digital transformation', 'Connect information, systems and people around the workflows that matter.', '/solutions/']
    ].map(([number, title, copy, href]) => `<a class="offering-card" href="${href}"><span>${number} /</span><h3>${title}</h3><p>${copy}</p></a>`).join('')}</div></div></section>
    <section class="section"><div class="container">${sectionHead('INDUSTRY CONTEXT', 'Solutions shaped around your industry', 'Start with your users, everyday activities and operating requirements.')}${industryCards('h3', industries.filter(industry => ['hospitality', 'healthcare', 'education'].includes(industry.id)), 'context-')}</div></section>
    <section class="section section-soft"><div class="container split-intro"><div>${eyebrow('DIGITAL TRANSFORMATION')}<h2>Connect your systems.<br>Improve everyday work.</h2></div><div><p>Identify where disconnected systems, repeated administration or hard-to-access information affect your operations. We help define the next step and plan the products, development or integration needed.</p>${relatedLinks([{ href: '/solutions/', label: 'Business digital solutions' }, { href: '/services/#service-04', label: 'AI & workflow automation' }])}</div></div></section>${process()}`
  },
  '/products/': {
    title: 'Software Products & Smart Systems | BM Tech Services',
    description: 'Explore BMTech software for hospitality, healthcare, education and HR, plus home automation, queue management, Smart LED and connected systems.',
    html: `${innerHero('Products', 'Industry Software Products & Smart Systems', 'Explore the BM Tech Services portfolio by the industry or business function you want to support. Our offerings span hospitality, healthcare, education, HR and smart embedded systems, with development and implementation services to support your requirements.')}
      <section class="section portfolio-section"><div class="container">${sectionHead('PRODUCT FAMILIES', 'Find the right starting point', 'Each family brings together related offerings and links to their product and implementation scope.')}${familyCards('h2', true)}</div></section>${supportingServices()}`
  },
  '/solutions/': {
    title: 'Business Digital Solutions & Automation | BM Tech Services',
    description: 'Connect industry software, custom development, smart systems and integration to address operational needs with BM Tech Services.',
    html: `${innerHero('Solutions', 'Digital Solutions for Business Operations', 'Start with the business need, then bring the relevant products, development and integration services together around it. BM Tech Services helps organizations plan and deliver solutions across industry operations, connected spaces, workforce processes and customer experience.')}
      <section class="section"><div class="container">${solutionCards('h2')}</div></section>${process()}`
  },
  '/industries/': {
    title: 'Industry Digital Solutions | BM Tech Services',
    description: 'Explore software and digital solutions for hospitality, healthcare, education, property, manufacturing, retail and service organizations.',
    html: `${innerHero('Industries', 'Digital Solutions Shaped Around Your Industry', 'Choose the industry context that reflects your organization. We start with its users, everyday activities and operating constraints, then identify the relevant software products, smart systems and development services.')}
      <section class="section"><div class="container">${industryCards('h2')}</div></section>
      <section class="section section-soft"><div class="container">${sectionHead('ACROSS INDUSTRIES', 'Workforce and connected systems', 'Explore these product families alongside your industry software.')}<div class="supporting-grid"><article id="industry-1"><h3>${link('/products/embedded-systems/', 'Smart & Embedded Systems')}</h3><p>Home Automation, Queue Management, Smart LED and IoT Gateway offerings for relevant spaces, service facilities and equipment.</p></article><article><h3>${link('/products/hr/', 'HR & Workforce Software')}</h3><p>HR software and implementation services around the people, processes and systems in your organization.</p></article></div></div></section>
      <section class="section"><div class="container">${sectionHead('CUSTOMER TEAMS', 'For startups and product teams', 'Bring software and connected-product ideas into a focused development plan.')}${industryCards('h3', industries.filter(industry => industry.isAudience))}</div></section>`
  },
  '/services/': {
    title: 'Software, AI & IoT Services | BM Tech Services',
    description: 'Explore custom software, AI, cloud, IoT, embedded engineering, integration, websites, digital marketing and technical training from BM Tech Services.',
    html: `${innerHero('Services', 'Software Development, AI, Cloud & IoT Services', 'Build, connect and support the digital systems your business needs. BM Tech Services brings software development, embedded engineering and implementation services together around your products, users and operational requirements.')}
      <section class="section"><div class="container"><nav class="capability-nav" aria-label="Find a capability">${serviceCatalogue.map(service => link(`#${service.id}`, service.title)).join('')}</nav>${serviceCards()}</div></section>${process()}`
  },
  '/resources/': {
    title: 'Software Buying & Project Resources | BM Tech Services',
    description: 'Explore the BM Tech Services company profile and practical questions for planning industry software, connected systems and digital projects.',
    html: `${innerHero('Resources', 'Resources for Choosing Software & Planning Digital Projects', 'Prepare a focused product or project discussion with our company profile and planning questions. Start with your organization, the people who will use the solution and the workflows that matter most.')}
      <section class="section profile-section"><div class="container profile-resource" id="company-profile"><div>${eyebrow('COMPANY PROFILE')}<h2>Our portfolio and delivery capabilities</h2><p>Explore our industry software, smart and embedded systems, technical services and implementation approach. Share the profile with your team to prepare a product or development discussion.</p></div><div class="profile-download"><span class="small-label">PDF · COMPANY PROFILE</span>${link('/documents/bm-tech-services-company-profile.pdf', 'Download company profile', 'content-link profile-link')}<p>Products, industries, solutions and services.</p></div></div></section>
      <section class="section section-soft"><div class="container resource-grid">${[
        ['Plan an industry software discussion', ['Which product family and operating setting are relevant to your organization?', 'Who will use the software, and which workflows should a demonstration cover?', 'Which existing systems, data and rollout requirements need to be considered?']],
        ['Prepare a custom development brief', ['What business problem should the application solve?', 'Who are its users, and what are their essential tasks?', 'Which integrations, timeline and operating constraints affect the project?']],
        ['Assess connected systems and automation', ['Which devices, information or recurring activities are involved?', 'What data, interfaces and system access are available?', 'Where are human review, exception handling and evaluation required?']]
      ].map(([title, questions], index) => `<article class="service-card" id="resource-${index}"><h2>${title}</h2><ul class="feature-list">${questions.map(question => `<li>${question}</li>`).join('')}</ul></article>`).join('')}</div></section>
      <section class="section"><div class="container"><h2>Common questions</h2><div class="faq-list" id="questions"><details><summary>Can we combine a product with custom development?</summary><p>Yes. We assess the product against your requirements, then define any configuration, development or integration work needed for the agreed scope.</p></details><details><summary>Can you work with existing systems?</summary><p>Integration and modernization are part of our capabilities. We review the architecture, interfaces, data and access constraints before confirming the approach.</p></details><details><summary>How do enquiries reach your team?</summary><p>The form prepares a draft. Review it and send it from your email app or WhatsApp.</p></details></div></div></section>`
  },
  '/about/': {
    title: 'About BM Tech Services | Digital Solutions Provider',
    description: 'Meet BM Tech Services: an end-to-end digital solution provider combining industry software, embedded systems, custom development and implementation.',
    html: `${innerHero('About', 'About BM Tech Services', 'BM Tech Services is an end-to-end digital solution provider bringing software products, smart systems and custom engineering together.')}
      <section class="section"><div class="container split-intro"><div>${eyebrow('OUR BUSINESS')}<h2>Industry understanding and engineering delivery</h2></div><div><p>Our portfolio covers hospitality, healthcare, education, HR and embedded systems, supported by software development, AI, cloud, IoT and automation services.</p><p>An engagement can start with an industry product, a new application idea or an existing workflow that needs improvement. We work from the business requirement through design, development, integration, testing, deployment, training and support.</p><p>The starting point is the people who will use the solution, the work they need to complete and the environment the technology must operate in.</p></div></div></section>
      <div id="approach">${process()}</div><section class="section section-soft"><div class="container split-intro" id="why-us"><div>${eyebrow('OUR APPROACH')}<h2>Bring the work together</h2></div><div><p>Industry products provide a focused starting point. Custom development addresses requirements unique to the organization. Integration connects the information and systems involved. Implementation and support carry the work into day-to-day use.</p>${relatedLinks([{ href: '/products/', label: 'Product portfolio' }, { href: '/services/', label: 'Delivery services' }])}</div></div></section>`
  },
  '/contact/': {
    title: 'Contact BM Tech Services | Product & Project Enquiries',
    description: 'Discuss hospitality, healthcare, education, HR or embedded products, custom software and digital transformation with BM Tech Services.',
    html: `<section class="enquiry-section"><div class="container contact-reference-layout">${enquiryForm(false)}<aside class="contact-reference-aside"><div class="contact-info-card"><h2>Tell us what you want to build or improve</h2><p>A clear brief helps us understand the requirement and prepare a relevant discussion.</p><hr><h3>Start with your business needs</h3><p>Share the intended users, relevant systems and the workflows that matter most. You can describe a new idea, an existing system or a product you want to evaluate.</p></div><div class="contact-info-card contact-demo-note"><h2>Plan a product discussion</h2><p>Use Book a demo at the top of the page to request a walkthrough focused on your business.</p></div></aside></div></section>`
  },
  '/book-a-demo/': {
    title: 'Book a Product Demo | BM Tech Services',
    description: 'Explore BMTech hospitality, healthcare, education, HR and smart system offerings in a discussion focused on your users and business requirements.',
    html: `<section class="enquiry-section"><div class="container demo-container">${enquiryForm(true)}</div></section>`
  }
};

for (const family of productFamilies) pages[family.path] = familyPage(family);

export function renderPage(path) {
  const page = pages[path];
  if (!page) throw new Error(`Unknown website route: ${path}`);
  return { title: page.title, description: page.description, html: `${header(path)}<main id="main">${page.html}</main>${footer()}` };
}
