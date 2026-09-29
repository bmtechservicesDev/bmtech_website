export const contact = {
  email: 'bmtechservices2025@gmail.com',
  phone: '+919642668815',
  phoneDisplay: '096426 68815',
  address: 'Flat No. 35001, Block 3, Wing A, Janapriya Utopia, Janapriya Utopia Road, Attapur, in front of Apollo Pharmacy, Hyderguda, Rajendranagar, Rangareddy – 500048, Telangana'
};
const whatsappUrl = `https://wa.me/${contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hello BM Tech Services, I would like to discuss a requirement.')}`;
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

const services = [
  ['01', 'Digital experiences', 'Websites & commerce', 'Fast, accessible websites and customer journeys built to create trust and generate enquiries.', 'Corporate websites · Landing pages · E-commerce · SEO foundations'],
  ['02', 'Business software', 'Web, mobile & desktop apps', 'Purpose-built applications that connect teams, customers, operations and decisions.', 'Portals · CRM & ERP · Field apps · Industrial desktop tools'],
  ['03', 'Connected engineering', 'Embedded systems & IoT', 'Firmware, gateways and cloud-connected systems that bring devices and data together.', 'Firmware · Device integration · Monitoring · Edge computing'],
  ['04', 'Intelligent workflows', 'AI, ML & automation', 'Practical intelligence and automation applied to real workflows and measurable outcomes.', 'Assistants · Document workflows · Forecasting · Analytics'],
  ['05', 'Scalable platforms', 'Cloud & SaaS', 'Lean cloud architecture and subscription platforms designed to grow with demand.', 'Multi-tenant SaaS · APIs · DevOps · Security architecture'],
  ['06', 'Technology direction', 'Consulting & integration', 'Clear roadmaps and connected systems, from initial discovery through deployment and support.', 'Architecture · Modernization · System integration · Product strategy']
];

const industries = [
  ['Manufacturing & engineering', 'Connected equipment, industrial applications, embedded products and workflow automation.'],
  ['Restaurants & hospitality', 'Ordering, billing, kitchen workflows, inventory and digital customer experiences.'],
  ['Healthcare & clinics', 'Appointments, patient journeys, prescriptions, billing and operational visibility.'],
  ['Retail & commerce', 'Inventory, ordering, customer engagement and online sales experiences.'],
  ['Startups & product teams', 'Requirements, prototypes, MVPs, SaaS platforms and architecture for growth.'],
  ['Service businesses', 'Lead management, field workflows, customer portals and reporting.']
];

const steps = [
  ['01', 'Discover', 'Understand your challenge, users, processes and desired outcome.'],
  ['02', 'Design', 'Shape the roadmap, architecture and experience around your priorities.'],
  ['03', 'Build', 'Develop, integrate and validate a solution fit for real use.'],
  ['04', 'Grow', 'Deploy, support and improve as your business evolves.']
];

const link = (href, label, cls = 'button') => `<a class="${cls}" href="${href}">${label}<span aria-hidden="true">↗</span></a>`;
const eyebrow = text => `<p class="eyebrow"><span class="eyebrow-line"></span>${text}</p>`;
const sectionHead = (kicker, heading, text) => `<div class="section-head">${eyebrow(kicker)}<h2>${heading}</h2><p>${text}</p></div>`;

function header(page) {
  const nav = [['/', 'Home'], ['/services/', 'Services'], ['/solutions/', 'Solutions'], ['/about/', 'About'], ['/contact/', 'Contact']];
  return `<header class="site-header"><div class="container header-inner"><a class="brand" href="/" aria-label="BM Tech Services home"><span class="brand-mark" aria-hidden="true">BM<span>.</span></span><span class="brand-name">BM TECH<br><strong>SERVICES</strong></span></a><button class="menu-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span><span></span></button><nav id="site-nav" class="site-nav" aria-label="Main navigation">${nav.map(([path, label]) => `<a href="${path}" ${page === path ? 'aria-current="page"' : ''}>${label}</a>`).join('')}${link('/contact/', 'Start a conversation', 'button button-small nav-cta')}</nav></div></header>`;
}
function footer() {
  return `<footer class="site-footer"><div class="container"><div class="footer-top"><div><a class="brand brand-light" href="/" aria-label="BM Tech Services home"><span class="brand-mark" aria-hidden="true">BM<span>.</span></span><span class="brand-name">BM TECH<br><strong>SERVICES</strong></span></a><p>Practical technology for better businesses and smarter products.</p></div><div><h3>Explore</h3><a href="/services/">Services</a><a href="/solutions/">Solutions</a><a href="/about/">About us</a></div><div><h3>Get in touch</h3><a href="/contact/">Discuss your requirement ↗</a><a href="mailto:${contact.email}">${contact.email}</a><a href="tel:${contact.phone}">${contact.phoneDisplay}</a><a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">WhatsApp enquiry ↗</a><address>${contact.address}</address></div></div><div class="footer-bottom"><span>© <span id="year"></span> BM Tech Services</span><span>Innovate. Automate. Digitalize. Grow.</span></div></div></footer>`;
}
function cta() {
  return `<section class="cta-band"><div class="container cta-inner"><div>${eyebrow('LET’S BEGIN')}<h2>Have a business challenge?<br><em>Let’s build the solution.</em></h2><p>Bring us an idea, a process that needs fixing, or a product ready to grow.</p></div>${link('/contact/', 'Discuss your requirement', 'button button-light')}</div></section>`;
}
const interests = ['Website & digital experience', 'Business applications', 'Embedded systems & IoT', 'AI & automation', 'Cloud & SaaS', 'Consulting & integration'];
function serviceGrid(heading = 'h3') {
  return `<div class="service-grid">${services.map(([n, group, title, copy, tags], i) => `<article class="service-card" id="service-${n}"><div class="card-top"><span class="card-number">${n}</span><span class="small-label">${group}</span></div><${heading}>${title}</${heading}><p>${copy}</p><ul class="card-tags">${tags.split(' · ').map(tag => `<li>${tag}</li>`).join('')}</ul><a class="card-action" href="/contact/?service=${encodeURIComponent(interests[i])}" aria-label="Discuss ${title}">Discuss this service <span aria-hidden="true">↗</span></a></article>`).join('')}</div>`;
}
function industryGrid(heading = 'h3') {
  return `<div class="industry-grid">${industries.map(([title, copy], i) => `<article class="industry-card"><span class="industry-index">0${i + 1}</span><${heading}>${title}</${heading}><p>${copy}</p><a class="card-action" href="/contact/" aria-label="Discuss solutions for ${title}">Explore the possibilities <span aria-hidden="true">↗</span></a></article>`).join('')}</div>`;
}
function breadcrumbs(label) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">${label}</span></nav>`;
}

const pages = {
  '/': {
    title: 'Engineering digital solutions for smarter businesses | BM Tech Services',
    description: 'BM Tech Services turns business challenges into websites, applications, connected products, AI solutions and scalable cloud platforms.',
    html: `<section class="hero"><div class="hero-grid" aria-hidden="true"></div><div class="container hero-inner"><div class="hero-copy">${eyebrow('YOUR END-TO-END TECHNOLOGY PARTNER')}<h1>Engineering<br><span>digital solutions</span><br>for smarter businesses<span class="period">.</span></h1><p>From embedded devices to AI-powered cloud platforms, we turn ideas and operational challenges into technology that works in the real world.</p><div class="hero-actions">${link('/contact/', 'Discuss your requirement', 'button button-primary')}${link('/solutions/', 'Explore our solutions', 'text-link')}</div><div class="hero-note"><span class="pulse-dot"></span> Innovate. Automate. Digitalize. Grow.</div></div><div class="hero-visual" aria-label="Diagram connecting devices, data, applications and business outcomes" role="img"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="visual-center"><span class="center-icon">✳</span><strong>One connected<br>technology partner</strong></div><div class="visual-pill pill-a"><span>01</span> Embedded & IoT</div><div class="visual-pill pill-b"><span>02</span> Cloud & SaaS</div><div class="visual-pill pill-c"><span>03</span> AI & Automation</div><div class="visual-pill pill-d"><span>04</span> Digital Experiences</div></div></div><div class="container hero-bottom"><span>STRATEGY</span><i></i><span>DESIGN</span><i></i><span>ENGINEERING</span><i></i><span>DEPLOYMENT</span><i></i><span>GROWTH</span></div></section>
    <section class="section intro-section"><div class="container split-intro"><div>${eyebrow('WHAT WE DO')}<h2>One partner.<br><em>Across the entire stack.</em></h2></div><div><p>Technology creates value when it solves the right problem. We bring business understanding and engineering capability together to design, build and support solutions that fit how you operate.</p>${link('/about/', 'Get to know us', 'inline-link')}</div></div></section>
    <section class="section section-soft"><div class="container">${sectionHead('OUR CAPABILITIES', 'Built for the challenge in front of you.', 'From your first digital presence to connected products and intelligent platforms, we can help at every stage.')}${serviceGrid()}<div class="section-end">${link('/services/', 'Explore all services', 'inline-link')}</div></div></section>
    <section class="section"><div class="container">${sectionHead('WHERE WE WORK', 'Technology shaped around your world.', 'Different industries have different workflows. We start by understanding yours.')}${industryGrid()}<div class="section-end">${link('/solutions/', 'Explore solutions', 'inline-link')}</div></div></section>
    <section class="section process-section"><div class="container"><div class="process-heading">${eyebrow('OUR APPROACH')}<h2>From idea to impact<span class="period">.</span></h2><p>A clear path from the first conversation to a solution that keeps improving.</p></div><div class="steps">${steps.map(([n, name, copy]) => `<article><span>${n}</span><h3>${name}</h3><p>${copy}</p></article>`).join('')}</div></div></section>${cta()}`
  },
  '/services/': {
    title: 'Technology services | BM Tech Services',
    description: 'Explore BM Tech Services capabilities in digital experiences, applications, embedded systems, IoT, AI, automation, cloud and SaaS.',
    html: `<section class="page-hero"><div class="container">${breadcrumbs('Services')}${eyebrow('OUR SERVICES')}<h1>Technology that moves<br><em>your business forward.</em></h1><p>Bring us a focused need or a complex product idea. We connect the right disciplines to build a solution around your goals.</p></div></section><section class="section"><div class="container"><nav class="capability-nav" aria-label="Find a capability">${services.map(([n, , title]) => `<a href="#service-${n}">${title}</a>`).join('')}</nav>${serviceGrid('h2')}</div></section><section class="section section-soft"><div class="container split-intro"><div>${eyebrow('MORE THAN DELIVERY')}<h2>Built to work.<br><em>Built to evolve.</em></h2></div><div><p>We support the full journey: discovery, requirements, architecture, UX and UI, prototyping, development, testing, deployment, maintenance and continuous improvement.</p><p>Whether you need to modernize an existing system or launch something new, we start with the outcome and design the technology around it.</p></div></div></section>${cta()}`
  },
  '/solutions/': {
    title: 'Industry solutions | BM Tech Services',
    description: 'Practical digital, software, IoT and automation possibilities for manufacturing, hospitality, healthcare, retail, startups and service businesses.',
    html: `<section class="page-hero"><div class="container">${breadcrumbs('Solutions')}${eyebrow('INDUSTRIES & SOLUTIONS')}<h1>Built around how<br><em>your world works.</em></h1><p>We combine a deep range of technical capabilities with the context of your people, processes and customers.</p></div></section><section class="section"><div class="container">${industryGrid('h2')}<p class="section-footnote">These are example solution areas, not claims of completed client projects. We shape each engagement around your requirements.</p></div></section><section class="section section-soft"><div class="container split-intro"><div>${eyebrow('YOUR CHALLENGE')}<h2>Different problem?<br><em>Start the conversation.</em></h2></div><div><p>We also support education, logistics, field services and growing businesses seeking better digital experiences and more connected operations.</p>${link('/contact/', 'Tell us what you need', 'inline-link')}</div></div></section>${cta()}`
  },
  '/about/': {
    title: 'About BM Tech Services | Our approach',
    description: 'Learn how BM Tech Services brings software, embedded systems, IoT, cloud, AI and business understanding together.',
    html: `<section class="page-hero"><div class="container">${breadcrumbs('About')}${eyebrow('ABOUT BM TECH SERVICES')}<h1>Engineering meets<br><em>business understanding.</em></h1><p>We help organizations move from ideas and operational challenges to practical, scalable digital solutions.</p></div></section><section class="section"><div class="container split-intro"><div>${eyebrow('WHAT DRIVES US')}<h2>Start with the problem.<br><em>Build for the outcome.</em></h2></div><div><p>BM Tech Services works across software, embedded engineering, IoT, AI, cloud and automation. That breadth helps us look at the whole challenge, from a device in the field to the experience on a customer's screen.</p><p>We work with startups, growing businesses, manufacturers and service organizations. Our aim is to understand the business need, design a suitable solution, deploy it successfully and support its growth.</p></div></div></section><section class="section section-soft"><div class="container">${sectionHead('HOW WE ENGAGE', 'A straightforward path to progress.', 'We bring structure to ambitious work without losing sight of the people who will use it.') }<div class="steps steps-light">${steps.map(([n, name, copy]) => `<article><span>${n}</span><h3>${name}</h3><p>${copy}</p></article>`).join('')}</div></div></section><section class="section"><div class="container split-intro"><div>${eyebrow('WHY WORK WITH US')}<h2>Connected thinking.<br><em>Practical execution.</em></h2></div><div><ul class="feature-list"><li>End-to-end capability across hardware, software and cloud</li><li>Solutions designed around your users and workflows</li><li>Architecture that can grow in stages</li><li>Ongoing support and continuous improvement</li></ul></div></div></section>${cta()}`
  },
  '/contact/': {
    title: 'Discuss your requirement | BM Tech Services',
    description: 'Tell BM Tech Services about your business challenge or product idea and prepare a clear project enquiry.',
    html: `<section class="page-hero contact-hero"><div class="container">${breadcrumbs('Contact')}${eyebrow('LET’S TALK')}<h1>Tell us what<br><em>you want to build.</em></h1><p>Share a few details about the challenge. We’ll help you shape the right next step.</p></div></section><section class="section"><div class="container contact-layout"><div class="contact-aside"><span class="small-label">START WITH AN IDEA</span><h2>Good projects start with a clear conversation.</h2><p>Tell us what is happening today, what you want to change and who the solution is for. Even an early-stage idea is enough to begin.</p><div class="contact-details"><div><h3>Email</h3><a href="mailto:${contact.email}">${contact.email}</a></div><div><h3>Call us</h3><a href="tel:${contact.phone}">${contact.phoneDisplay}</a></div><div><h3>WhatsApp</h3><a class="inline-link" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">Chat on WhatsApp <span aria-hidden="true">↗</span></a></div><div><h3>Address</h3><address>${contact.address}</address><a class="inline-link" href="${mapUrl}" target="_blank" rel="noopener noreferrer">View on map <span aria-hidden="true">↗</span></a></div></div><div class="contact-note"><strong>Send an enquiry by email or WhatsApp</strong><p>Complete the form to prepare your enquiry, then open an email draft or a WhatsApp message and send it to us. You can also call us directly.</p></div></div><form id="enquiry-form" class="contact-form" aria-labelledby="enquiry-heading"><div class="form-heading"><span class="small-label">YOUR PROJECT BRIEF</span><h2 id="enquiry-heading">Let’s make it clear.</h2><p>A few details help us understand what you need. Required fields are marked *.</p></div><p id="form-error-summary" class="form-error-summary" role="alert" hidden></p><div class="form-row"><label>Your name <span aria-hidden="true">*</span><input name="name" autocomplete="name" required maxlength="100" placeholder="Your name" aria-describedby="name-error"><span class="field-error" id="name-error" hidden></span></label><label>Company <input name="company" autocomplete="organization" maxlength="120" placeholder="Company or organization"></label></div><div class="form-row"><label>Email <span aria-hidden="true">*</span><input name="email" type="email" autocomplete="email" required maxlength="160" placeholder="you@company.com" aria-describedby="email-error"><span class="field-error" id="email-error" hidden></span></label><label>Area of interest <span aria-hidden="true">*</span><select name="interest" required aria-describedby="interest-error"><option value="">Select a service</option><option>Website & digital experience</option><option>Business applications</option><option>Embedded systems & IoT</option><option>AI & automation</option><option>Cloud & SaaS</option><option>Consulting & integration</option><option>Something else</option></select><span class="field-error" id="interest-error" hidden></span></label></div><label>Tell us about your requirement <span aria-hidden="true">*</span><textarea name="message" rows="6" required minlength="20" maxlength="3000" placeholder="What challenge are you solving? What would success look like?" aria-describedby="message-help message-error"></textarea><span class="field-help" id="message-help">At least 20 characters. Include your users, current challenge and desired outcome.</span><span class="field-error" id="message-error" hidden></span></label><button class="button button-primary" type="submit">Prepare enquiry <span aria-hidden="true">↗</span></button><p class="form-hint">Required fields are marked *. You send the prepared enquiry from your email app or WhatsApp.</p><div id="form-result" class="form-result" role="status" aria-live="polite" hidden><h3 id="result-heading" tabindex="-1">Your brief is ready</h3><p>Open the draft in your email app or WhatsApp, review it and send it to BM Tech Services. Your enquiry has not been sent yet.</p><textarea id="brief-output" readonly rows="9" aria-label="Prepared enquiry"></textarea><div class="result-actions"><a id="email-brief" class="button" href="mailto:${contact.email}">Open email draft <span aria-hidden="true">↗</span></a><a id="whatsapp-brief" class="button button-whatsapp" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp <span aria-hidden="true">↗</span></a><button type="button" id="copy-brief" class="button button-outline">Copy enquiry</button></div><span id="copy-status" role="status" aria-live="polite"></span></div></form></div></section>`
  }
};

export function renderPage(path) {
  const page = pages[path] || pages['/'];
  return { title: page.title, description: page.description, html: `${header(path)}<main id="main">${page.html}</main>${footer()}` };
}

if (typeof document !== 'undefined') {
  const path = window.location.pathname.replace(/\/index\.html$/, '/');
  const page = renderPage(path);
  document.title = page.title;
  document.querySelector('meta[name="description"]').content = page.description;
  document.querySelector('meta[property="og:title"]').content = page.title;
  document.querySelector('meta[property="og:description"]').content = page.description;
  // Static output is pre-rendered; only replace it for local dev or an unknown path.
  if (!document.querySelector('.site-header') || !pages[path]) document.querySelector('#app').innerHTML = page.html;
  document.querySelector('#year').textContent = new Date().getFullYear();

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const setMenu = open => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
  window.matchMedia('(max-width: 860px)').addEventListener('change', () => setMenu(false));
}

const form = typeof document !== 'undefined' ? document.querySelector('#enquiry-form') : null;
if (form) {
  // Native constraints remain authoritative; show persistent errors after JS attaches.
  form.noValidate = true;
  const requiredFields = [...form.querySelectorAll('[required]')];
  const summary = document.querySelector('#form-error-summary');
  const result = document.querySelector('#form-result');
  const errorFor = field => {
    if (field.validity.valueMissing || !field.value.trim()) return field.name === 'interest' ? 'Choose an area of interest.' : field.name === 'name' ? 'Enter your name.' : field.name === 'email' ? 'Enter your email address.' : 'Describe your requirement.';
    if (field.validity.typeMismatch) return 'Enter a valid email address, such as you@company.com.';
    if (field.name === 'message' && field.value.trim().length < 20) return 'Add a little more detail — at least 20 characters.';
    return field.validity.valid ? '' : 'Check this field and try again.';
  };
  const validate = field => {
    const error = errorFor(field);
    const output = document.querySelector(`#${field.name}-error`);
    field.setAttribute('aria-invalid', String(Boolean(error)));
    output.textContent = error;
    output.hidden = !error;
    return !error;
  };
  const selected = new URLSearchParams(window.location.search).get('service');
  if (interests.includes(selected)) form.elements.interest.value = selected;
  form.addEventListener('input', event => {
    result.hidden = true;
    if (event.target.getAttribute('aria-invalid') === 'true') validate(event.target);
    summary.hidden = true;
  });
  form.addEventListener('change', () => { result.hidden = true; summary.hidden = true; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const invalid = requiredFields.filter(field => !validate(field));
    if (invalid.length) {
      result.hidden = true;
      summary.textContent = 'Please check the highlighted fields before preparing your enquiry.';
      summary.hidden = false;
      invalid[0].focus();
      return;
    }
    summary.hidden = true;
    const data = new FormData(form);
    const brief = `BM Tech Services — Project Enquiry\n\nName: ${data.get('name').trim()}\nCompany: ${data.get('company').trim() || 'Not provided'}\nEmail: ${data.get('email').trim()}\nArea of interest: ${data.get('interest')}\n\nRequirement:\n${data.get('message').trim()}`;
    document.querySelector('#brief-output').value = brief;
    document.querySelector('#email-brief').href = `mailto:${contact.email}?subject=${encodeURIComponent('Project enquiry — ' + data.get('interest'))}&body=${encodeURIComponent(brief)}`;
    document.querySelector('#whatsapp-brief').href = `https://wa.me/${contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(brief)}`;
    document.querySelector('#copy-status').textContent = '';
    result.hidden = false;
    document.querySelector('#result-heading').focus({ preventScroll: true });
    result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
  });
  document.querySelector('#copy-brief').addEventListener('click', async () => {
    const output = document.querySelector('#brief-output');
    try {
      await navigator.clipboard.writeText(output.value);
      document.querySelector('#copy-status').textContent = 'Copied to clipboard.';
    } catch {
      output.focus(); output.select();
      document.querySelector('#copy-status').textContent = 'Select and copy the highlighted text.';
    }
  });
}
