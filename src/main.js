export const contact = {
  email: 'bmtechservices2025@gmail.com',
  phone: '+919642668815',
  phoneDisplay: '+91 96426 68815',
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
  ['06', 'Technology direction', 'Consulting & integration', 'Clear roadmaps and connected systems, from initial discovery through deployment and support.', 'Architecture · Modernization · System integration · Product strategy'],
  ['07', 'Customer operations', 'CRM & business automation', 'Organize leads, customer records and follow-ups, and reduce repetitive work across sales and service teams.', 'Lead management · Approvals · Service workflows · Reporting'],
  ['08', 'Digital growth', 'Digital marketing', 'Connect your website, content, search presence and campaigns with enquiry capture and customer follow-up.', 'Search visibility · Content · Campaigns · Marketing analytics']
];
const serviceInterests = ['Website & digital experience', 'Business applications', 'Embedded systems & IoT', 'AI & automation', 'Cloud & SaaS', 'Consulting & integration', 'CRM & business automation', 'Digital Marketing & Solutions'];
const enquiryHref = (interest, type = 'Custom development') => `/contact/?type=${encodeURIComponent(type)}&service=${encodeURIComponent(interest)}#enquiry-form`;

const industries = [
  ['Education', 'School administration, learning experiences and connected education workflows.'],
  ['Embedded systems', 'Firmware, gateways, device integration and cloud-connected product engineering.'],
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

function brand() {
  return `<a class="brand" href="/" aria-label="BM Tech Services home"><img src="/brand/bmtech-logo.webp" width="1600" height="639" alt="BMTech — Engineering Intelligence | Transforming Business"></a>`;
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
  const nav = [
    ['/products/', 'Products', products.map(([title, category, , features], i) => [`/products/#product-${i}`, title, features.join(' · ')])],
    ['/industries/', 'Industries', industries.map(([title, copy], i) => [`/industries/#industry-${i}`, title, copy])],
    ['/solutions/', 'Solutions', [...solutionGroups.map(([title, , copy], i) => [`/solutions/#solution-${i}`, title, copy]), ['/services/', 'All engineering capabilities', 'Software, embedded systems, AI and cloud expertise.']]],
    ['/resources/', 'Resources', [['/resources/#company-profile', 'Company profile', 'Services, solution portfolio and delivery capabilities.'], ['/resources/#resource-0', 'Product planning', 'Define your users, product scope and priorities.'], ['/resources/#resource-1', 'Development brief', 'Prepare requirements for your next software project.'], ['/resources/#resource-2', 'AI & transformation', 'Find practical opportunities to improve workflows.'], ['/resources/#questions', 'Common questions', 'Understand how we work and prepare an enquiry.']]],
  ];
  return `<header class="site-header"><div class="container header-inner">${brand()}<button class="menu-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span><span></span></button><nav id="site-nav" class="site-nav" aria-label="Main navigation">${nav.map(([path, label, children], i) => `<div class="nav-item"><div class="nav-heading"><button class="dropdown-toggle" aria-label="${label} submenu" ${page === path ? 'aria-current="page"' : ''} aria-expanded="false" aria-controls="submenu-${i}">${label}</button></div><div class="nav-dropdown" id="submenu-${i}" hidden>${children.map(([href, text, description], j) => `<a class="mega-card" href="${href}" aria-label="${text}" aria-describedby="menu-description-${i}-${j}"><span class="mega-icon" aria-hidden="true">${menuIcon(j)}</span><span class="mega-copy"><strong>${text}</strong><span id="menu-description-${i}-${j}">${description || 'Explore this area with BMTech.'}</span></span></a>`).join('')}</div></div>`).join('')}<a class="button button-small nav-cta" href="/book-a-demo/">Book a demo</a></nav></div></header>`;
}
function footer() {
  const column = (title, links) => `<div class="footer-column"><h3>${title}</h3>${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}</div>`;
  return `<footer class="site-footer"><div class="container"><div class="footer-top"><div class="footer-brand">${brand()}<p>BMTech brings software, connected engineering and intelligent automation together to help businesses improve everyday operations.</p><p>Engineering Intelligence<br>Transforming Business</p></div>${column('Products', products.map(([title], i) => [`/products/#product-${i}`, title]))}${column('Industries', industries.map(([title], i) => [`/industries/#industry-${i}`, title]))}${column('Solutions', [['/solutions/#solution-0','Firmware Development'],['/solutions/#solution-1','Product Development'],['/solutions/#solution-2','Website Development'],['/solutions/#solution-3','Digital Marketing & Solutions'],['/services/','Technical capabilities']])}${column('Resources', [['/resources/#company-profile','Company profile'],['/resources/#resource-0','Product discussions'],['/resources/#resource-1','Development briefs'],['/resources/#questions','Common questions']])}${column('Company', [['/about/','About us'],['/contact/','Contact us']])}</div><div class="footer-bottom"><span>© <span id="year"></span> BM Tech Services. All rights reserved.</span><span>Innovate. Automate. Digitalize. Grow.</span></div></div></footer>`;
}
function cta() { return ''; }
const enquiryTypes = ['General enquiry', 'Product demo', 'Custom development', 'Digital transformation', 'Website & marketing', 'Training & education'];
const interests = ['Restaurant Solution', 'Clinic Automation', 'My School', 'IoT Gateway', 'Smart LED', 'Queue Management', 'Website Development & Hosting', 'Domain Training & Education', 'Firmware Development', 'Product Development', 'Digital Marketing & Solutions', 'Digital transformation', 'Website & digital experience', 'Business applications', 'Embedded systems & IoT', 'AI & automation', 'Cloud & SaaS', 'Consulting & integration', 'CRM & business automation'];
function serviceGrid(heading = 'h3') {
  return `<div class="service-grid">${services.map(([n, group, title, copy, tags], i) => `<article class="service-card" id="service-${n}"><div class="card-top"><span class="card-number">${n}</span><span class="small-label">${group}</span></div><${heading}>${title}</${heading}><p>${copy}</p><ul class="card-tags">${tags.split(' · ').map(tag => `<li>${tag}</li>`).join('')}</ul></article>`).join('')}</div>`;
}
function industryGrid(heading = 'h3') {
  return `<div class="industry-grid">${industries.map(([title, copy], i) => `<article class="industry-card" id="industry-${i}"><span class="industry-index">0${i + 1}</span><${heading}>${title}</${heading}><p>${copy}</p></article>`).join('')}</div>`;
}
function breadcrumbs(label) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">${label}</span></nav>`;
}

const products = [
  ['Restaurant Solution', 'Hospitality', 'Restaurant workflows from the first order to billing, kitchen coordination and management reporting.', ['Ordering & POS', 'Kitchen workflows', 'Billing & reporting'], 'Product demo'],
  ['Clinic Automation', 'Healthcare', 'Clinic operations spanning patient registration, appointments, consultation records and billing.', ['Patient journeys', 'Appointments', 'Clinic administration'], 'Product demo'],
  ['My School', 'Education', 'Explore a digital approach to school administration and communication around your institution’s needs.', ['Administration', 'Communication', 'Digital workflows'], 'Product demo'],
  ['IoT Gateway', 'Connected systems', 'Connect devices and operational data with cloud applications, monitoring and control workflows.', ['Device connectivity', 'Remote monitoring', 'Edge integration'], 'Product demo'],
  ['Smart LED', 'Digital displays', 'Display and signage solutions for communicating information in retail, hospitality and business spaces.', ['Digital signage', 'Content presentation', 'Display integration'], 'Product demo'],
  ['Queue Management', 'Customer service', 'Structure token, counter and customer-display workflows for facilities handling in-person service.', ['Token workflows', 'Counter allocation', 'Customer displays'], 'Product demo'],
  ['Website Development & Hosting', 'Digital presence', 'Business and product websites with hosting, maintenance and enquiry integrations suited to your offer.', ['Responsive websites', 'Hosting & maintenance', 'Lead capture'], 'Website & marketing'],
  ['Domain Training & Education', 'Skills development', 'Practical learning and applied projects in software, embedded systems, IoT, AI and automation.', ['Technical training', 'Applied projects', 'Team capability'], 'Training & education']
];
const solutionGroups = [
  ['Firmware Development', 'Engineering close to the hardware.', 'Firmware, device integration and embedded engineering for connected products.', 'Embedded systems & IoT'],
  ['Product Development', 'From a requirement to a working solution.', 'Discovery, UX, web, mobile and desktop engineering, cloud architecture and integration.', 'Product Development'],
  ['Website Development', 'A digital presence with a business purpose.', 'Business websites, hosting, online stores and enquiry integrations that make your offer clear and easy to act on.', 'Website & digital experience'],
  ['Digital Marketing & Solutions', 'Connect your presence to your growth goals.', 'Content, search visibility, campaigns, CRM and follow-up workflows that connect your digital presence with sales activity.', 'Digital Marketing & Solutions']
];
function productGrid(heading='h3', start=0, end=products.length) {
 return `<div class="product-grid">${products.slice(start,end).map(([title,category,copy,features,type],offset)=>`<article class="product-card" id="product-${start+offset}"><div class="product-content"><span class="small-label">${category}</span><${heading}>${title}</${heading}><p>${copy}</p><ul class="product-features">${features.map(feature=>`<li>${feature}</li>`).join('')}</ul></div></article>`).join('')}</div>`;
}
function solutionsGrid(heading='h3') {
 return `<div class="solution-grid">${solutionGroups.map(([title,subtitle,copy,interest],i)=>`<article class="service-card" id="solution-${i}"><div class="card-top"><span class="card-number">0${i+1}</span><span class="small-label">${['Device engineering','Custom software','Digital presence','Customer growth'][i]}</span></div><${heading}>${title}</${heading}><p>${copy}</p></article>`).join('')}</div>`;
}
function innerHero(label,title,copy) {return `<section class="page-hero"><div class="container">${breadcrumbs(label)}${eyebrow(label)}<h1>${title}</h1><p>${copy}</p></div></section>`;}
function process() {return `<section class="section process-section"><div class="container">${sectionHead('HOW WE WORK','A clear path. From idea to impact.','Understand requirements → Design the solution → Develop & integrate → Test & deploy → Support & improve.')}<div class="steps">${[['01','Understand','Define your users, challenge and success criteria.'],['02','Design','Shape the experience and technology roadmap.'],['03','Develop & integrate','Build the software and connect the systems.'],['04','Test & deploy','Validate the experience and prepare the rollout.'],['05','Support & improve','Keep the solution useful as needs evolve.']].map(([n,t,c])=>`<article><span>${n}</span><h3>${t}</h3><p>${c}</p></article>`).join('')}</div></div></section>`;}
const pages = {
  '/': {
    title: 'Software products, custom development & transformation | BM Tech Services',
    description: 'BM Tech Services turns business challenges into websites, applications, connected products, AI solutions and scalable cloud platforms.',
    html: `<section class="hero"><div class="hero-grid" aria-hidden="true"></div><div class="container hero-inner"><div class="hero-copy">${eyebrow('IDEAS. PRODUCTS. PROGRESS.')}<h1>Software products.<br>Custom development.<br><span>Real business impact.</span></h1><p>We build websites, web and mobile applications, desktop software and connected products. Bring AI, cloud, IoT and automation into your business with one development partner from discovery to deployment and support.</p><div class="hero-note"><span class="pulse-dot"></span> Innovate. Automate. Digitalize. Grow.</div></div></div></section>
    <section class="section"><div class="container">${sectionHead('WHAT WE DO','Products, development and transformation.','Choose a solution area, build around your own requirements or improve the way your business works.')}<div class="offering-grid">${[['01','Our products','Explore software and connected product areas for your business.','/products/'],['02','Custom development','Build around your requirements, from the first concept through deployment.','/solutions/'],['03','Digital transformation','Connect your systems, automate workflows and apply intelligence with purpose.','/contact/?type=Digital%20transformation&service=Digital%20transformation']].map(([n,t,c,h])=>`<a class="offering-card" href="${h}"><span>${n} /</span><h3>${t}</h3><p>${c}</p></a>`).join('')}</div></div></section>
    <section class="section section-soft"><div class="container">${sectionHead('OUR PRODUCTS','Solutions for everyday operations.','Explore a starting point for your organization. Scope and availability are confirmed with our team.')}${productGrid('h3',0,4)}</div></section>
    <section class="section"><div class="container">${sectionHead('INDUSTRIES WE SERVE','Your context. Our starting point.','We design around the people, processes and constraints in your industry.')}${industryGrid()}</div></section>
    <section class="section section-soft"><div class="container">${sectionHead('OUR SOLUTIONS','Engineering across the entire journey.','From firmware to your customer’s screen, connect the right disciplines around your goals.')}${solutionsGrid()}</div></section>
    <section class="section intelligence-section"><div class="container split-intro"><div>${eyebrow('PRACTICAL AI & AUTOMATION')}<h2>Make intelligence<br><em>useful to your business.</em></h2><p>Start with a workflow worth improving. Then connect the data, technology and people to make it work.</p></div><div class="intelligence-list"><article><span>01</span><h3>Find the right use case</h3><p>Identify repetitive work, document tasks or decisions that could benefit from assistance.</p></article><article><span>02</span><h3>Connect the context</h3><p>Assess data, integrations and human review needs before selecting an approach.</p></article><article><span>03</span><h3>Build, evaluate, improve</h3><p>Validate usefulness with your team and refine the solution around real workflows.</p></article></div></div></section>${process()}`
  },
  '/services/': {
    title: 'Technology services | BM Tech Services',
    description: 'Explore BM Tech Services capabilities in digital experiences, applications, embedded systems, IoT, AI, automation, cloud and SaaS.',
    html: `<section class="page-hero"><div class="container">${breadcrumbs('Services')}${eyebrow('OUR SERVICES')}<h1>Technology that moves<br><em>your business forward.</em></h1><p>Bring us a focused need or a complex product idea. We connect the right disciplines to build a solution around your goals.</p></div></section><section class="section"><div class="container"><nav class="capability-nav" aria-label="Find a capability">${services.map(([n, , title]) => `<a href="#service-${n}">${title}</a>`).join('')}</nav>${serviceGrid('h2')}</div></section><section class="section section-soft"><div class="container split-intro"><div>${eyebrow('MORE THAN DELIVERY')}<h2>Built to work.<br><em>Built to evolve.</em></h2></div><div><p>We support the full journey: discovery, requirements, architecture, UX and UI, prototyping, development, testing, deployment, maintenance and continuous improvement.</p><p>Whether you need to modernize an existing system or launch something new, we start with the outcome and design the technology around it.</p></div></div></section>${cta()}`
  },
  '/products/': {
    title: 'Products and solution portfolio | BM Tech Services', description: 'Clinic and restaurant software, Smart LED, queue management, websites, training, school applications and IoT gateways from BM Tech Services.',
    html: `${innerHero('Products','Products and solutions<br><em>for your business.</em>','Explore the workflow you want to improve, then request details for the solution that fits. We confirm current features, customization and rollout options during your consultation.')}<section class="section portfolio-section"><div class="container">${sectionHead('SOFTWARE & CONNECTED PRODUCTS','Start with your operational needs.','Solutions for hospitality, healthcare, education and connected equipment.')}${productGrid('h2',0,4)}</div></section><section class="section section-soft portfolio-section"><div class="container">${sectionHead('SPECIALIST SOLUTIONS','Communication, service and skills.','Explore display systems, customer queues, your digital presence and practical technical training.')}${productGrid('h2',4,8)}<p class="section-footnote">Product specifications, availability and implementation scope are agreed for each engagement.</p></div></section>${cta()}`
  },
  '/industries/': {
    title: 'Industries we serve | BM Tech Services', description: 'Technology possibilities for hospitality, healthcare, education, embedded systems, manufacturing, retail and growing businesses.',
    html: `${innerHero('Industries','Technology shaped<br><em>around your world.</em>','Every industry has its own workflows. We begin with yours, then shape the technology around it.')}<section class="section"><div class="container">${industryGrid('h2')}<p class="section-footnote">These are solution possibilities. Each engagement is scoped around your requirements.</p></div></section>${cta()}`
  },
  '/solutions/': {
    title: 'Custom development & digital solutions | BM Tech Services', description: 'Firmware development, product development, websites, digital marketing and end-to-end digital transformation.',
    html: `${innerHero('Solutions','Your challenge.<br><em>The right solution.</em>','Turn a product idea, disconnected process or business challenge into practical technology.')}<section class="section"><div class="container">${solutionsGrid('h2')}</div></section><section class="section section-soft"><div class="container split-intro"><div>${eyebrow('COMPLETE DIGITAL TRANSFORMATION')}<h2>Connect your systems.<br><em>Improve how work happens.</em></h2></div><div><p>Bring software, cloud, IoT, AI and automation together around your operations. We help define a roadmap, connect existing systems and build what is missing.</p></div></div></section>${process()}${cta()}`
  },
  '/resources/': {
    title: 'Company profile and project resources | BM Tech Services', description: 'Download the BM Tech Services company profile and prepare for a product, custom development or digital transformation discussion.',
    html: `${innerHero('Resources','Learn about BMTech.<br><em>Plan your next step.</em>','Explore our capabilities and use these practical prompts to prepare your first conversation.')}<section class="section profile-section"><div class="container profile-resource" id="company-profile"><div>${eyebrow('COMPANY PROFILE')}<h2>Our capabilities, in one document.</h2><p>A concise overview of our services, solution portfolio, delivery approach and customer fit. Use it for your project discussion or share it with your team.</p></div><div class="profile-download"><span class="small-label">PDF · 6 PAGES</span>${link('/documents/bm-tech-services-company-profile.pdf','Download company profile','button')}<p>Ready for customer and project presentations.</p></div></div></section><section class="section section-soft"><div class="container resource-grid">${[['Plan a product discussion',['Which product area are you exploring?','Who will use it and where?','What should a demonstration help you understand?']],['Prepare a development brief',['What problem are you solving today?','What are your users and essential workflows?','Which systems, timeline and constraints matter?']],['Explore AI & transformation',['Which repetitive workflow could improve?','What data and systems are available?','Where is human review important?']]].map(([t,items], i)=>`<article class="service-card" id="resource-${i}"><h2>${t}</h2><ul class="feature-list">${items.map(i=>`<li>${i}</li>`).join('')}</ul></article>`).join('')}</div></section><section class="section section-soft"><div class="container"><h2>Before we build</h2><div class="faq-list" id="questions"><details><summary>Can we start with an early-stage idea?</summary><p>Yes. Bring the challenge, users and desired outcome. Discovery helps shape the scope and next steps.</p></details><details><summary>Can you work with existing systems?</summary><p>Integration and modernization are part of our capabilities. We first assess your architecture, access and constraints.</p></details><details><summary>How do enquiries reach your team?</summary><p>The contact form prepares a brief. Review it and send it from your email app or WhatsApp.</p></details></div></div></section>${cta()}`
  },
  '/about/': {
    title: 'About BM Tech Services | Our approach',
    description: 'Learn how BM Tech Services brings software, embedded systems, IoT, cloud, AI and business understanding together.',
    html: `<section class="page-hero"><div class="container">${breadcrumbs('About')}${eyebrow('ABOUT BM TECH SERVICES')}<h1>Engineering meets<br><em>business understanding.</em></h1><p>We help organizations move from ideas and operational challenges to practical, scalable digital solutions.</p></div></section><section class="section"><div class="container split-intro"><div>${eyebrow('WHAT DRIVES US')}<h2>Start with the problem.<br><em>Build for the outcome.</em></h2></div><div><p>BM Tech Services works across software, embedded engineering, IoT, AI, cloud and automation. That breadth helps us look at the whole challenge, from a device in the field to the experience on a customer's screen.</p><p>We work with startups, growing businesses, manufacturers and service organizations. Our aim is to understand the business need, design a suitable solution, deploy it successfully and support its growth.</p></div></div></section><section class="section section-soft"><div class="container" id="approach">${sectionHead('HOW WE ENGAGE', 'A straightforward path to progress.', 'We bring structure to ambitious work without losing sight of the people who will use it.') }<div class="steps steps-light">${steps.map(([n, name, copy]) => `<article><span>${n}</span><h3>${name}</h3><p>${copy}</p></article>`).join('')}</div></div></section><section class="section"><div class="container split-intro"><div id="why-us">${eyebrow('WHY WORK WITH US')}<h2>Connected thinking.<br><em>Practical execution.</em></h2></div><div><ul class="feature-list"><li>End-to-end capability across hardware, software and cloud</li><li>Solutions designed around your users and workflows</li><li>Architecture that can grow in stages</li><li>Ongoing support and continuous improvement</li></ul></div></div></section>${cta()}`
  },
  '/book-a-demo/': {
    title: 'Book a Demo | BM Tech Services',
    description: 'Request a product demonstration tailored to your business.',
    html: `<section class="enquiry-section"><div class="container demo-container"><form id="enquiry-form" class="contact-form reference-form demo-form" data-demo="true" aria-labelledby="enquiry-heading"><div class="form-heading"><h1 id="enquiry-heading">Book a Demo</h1><p>A conversation tailored to your business requirements. Choose the product you would like to explore.</p></div><p id="form-error-summary" class="form-error-summary" role="alert" hidden></p><label>Select a Demo <span aria-hidden="true">*</span><select name="interest" required aria-describedby="interest-error"><option value="">Select a product</option><option>Restaurant Solution</option><option>Clinic Automation</option><option>My School</option><option>IoT Gateway</option><option>Smart LED</option><option>Queue Management</option><option>Website Development &amp; Hosting</option><option>Domain Training &amp; Education</option></select><span class="field-error" id="interest-error" hidden></span></label><div class="form-row"><label>First name <span aria-hidden="true">*</span><input name="firstName" type="text" autocomplete="given-name" required maxlength="160" aria-describedby="firstName-error"><span class="field-error" id="firstName-error" hidden></span></label><label>Last name <span aria-hidden="true">*</span><input name="lastName" type="text" autocomplete="family-name" required maxlength="160" aria-describedby="lastName-error"><span class="field-error" id="lastName-error" hidden></span></label></div><label>Email <span aria-hidden="true">*</span><input name="email" type="email" autocomplete="email" required maxlength="160" aria-describedby="email-error"><span class="field-error" id="email-error" hidden></span></label><label>Company name <span aria-hidden="true">*</span><input name="company" type="text" autocomplete="organization" required maxlength="160" aria-describedby="company-error"><span class="field-error" id="company-error" hidden></span></label><label>Comment<textarea name="message" rows="3" maxlength="3000" aria-label="Comment"></textarea></label><label class="consent-label"><input type="checkbox" name="consent" required aria-describedby="consent-error"><span>I agree to share these details with BM Tech Services to respond to this demo request. *</span></label><span class="field-error" id="consent-error" hidden></span><div class="form-submit"><button class="button button-primary" type="submit">Book Demo</button></div><p class="form-hint">Prepare your request, then review and send it from your email app or WhatsApp.</p><div id="form-result" class="form-result" role="status" aria-live="polite" hidden><h3 id="result-heading" tabindex="-1">Your brief is ready</h3><p>Open the draft in your email app or WhatsApp, review it and send it to BM Tech Services. Your enquiry has not been sent yet.</p><textarea id="brief-output" readonly rows="9" aria-label="Prepared enquiry"></textarea><div class="result-actions"><a id="email-brief" class="button" href="mailto:${contact.email}">Open email draft <span aria-hidden="true">↗</span></a><a id="whatsapp-brief" class="button button-whatsapp" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp <span aria-hidden="true">↗</span></a><button type="button" id="copy-brief" class="button button-outline">Copy enquiry</button></div><span id="copy-status" role="status" aria-live="polite"></span></div></form></div></section>`
  },
  '/contact/': {
    title: 'Contact us | BM Tech Services',
    description: 'Send BM Tech Services a message about your project or requirement.',
    html: `<section class="enquiry-section"><div class="container contact-reference-layout"><form id="enquiry-form" class="contact-form reference-form " data-demo="false" aria-labelledby="enquiry-heading"><div class="form-heading"><h1 id="enquiry-heading">Send a message</h1><p>Tell us about your business challenge, project or partnership enquiry.</p></div><p id="form-error-summary" class="form-error-summary" role="alert" hidden></p><div class="form-row"><label>First name <span aria-hidden="true">*</span><input name="firstName" type="text" autocomplete="given-name" required maxlength="160" aria-describedby="firstName-error"><span class="field-error" id="firstName-error" hidden></span></label><label>Last name <span aria-hidden="true">*</span><input name="lastName" type="text" autocomplete="family-name" required maxlength="160" aria-describedby="lastName-error"><span class="field-error" id="lastName-error" hidden></span></label></div><label>Email <span aria-hidden="true">*</span><input name="email" type="email" autocomplete="email" required maxlength="160" aria-describedby="email-error"><span class="field-error" id="email-error" hidden></span></label><label>Phone number<input name="phone" type="tel" autocomplete="tel"  maxlength="160" aria-describedby="phone-error"><span class="field-error" id="phone-error" hidden></span></label><label>Message<textarea name="message" rows="3" maxlength="3000" aria-label="Message"></textarea></label><label class="consent-label"><input type="checkbox" name="consent" required aria-describedby="consent-error"><span>I agree to share these details with BM Tech Services to respond to this enquiry. *</span></label><span class="field-error" id="consent-error" hidden></span><div class="form-submit"><button class="button button-primary" type="submit">Submit</button></div><p class="form-hint">Prepare your request, then review and send it from your email app or WhatsApp.</p><div id="form-result" class="form-result" role="status" aria-live="polite" hidden><h3 id="result-heading" tabindex="-1">Your brief is ready</h3><p>Open the draft in your email app or WhatsApp, review it and send it to BM Tech Services. Your enquiry has not been sent yet.</p><textarea id="brief-output" readonly rows="9" aria-label="Prepared enquiry"></textarea><div class="result-actions"><a id="email-brief" class="button" href="mailto:${contact.email}">Open email draft <span aria-hidden="true">↗</span></a><a id="whatsapp-brief" class="button button-whatsapp" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp <span aria-hidden="true">↗</span></a><button type="button" id="copy-brief" class="button button-outline">Copy enquiry</button></div><span id="copy-status" role="status" aria-live="polite"></span></div></form><aside class="contact-reference-aside"><div class="contact-info-card"><h2>Let’s start a conversation</h2><p>Products, partnerships, custom development and general enquiries.</p><hr><h3>Tell us what you have in mind</h3><p>Share your goals, the people who will use your solution and any important project requirements.</p></div><div class="contact-info-card contact-demo-note"><h2>Want to see our products first?</h2><p>Use Book a demo at the top of the page to request a product walkthrough tailored to your business.</p></div></aside></div></section>`
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
    if (!open) closeDropdowns();
  };
  const items = [...nav.querySelectorAll('.nav-item')];
  const closeDropdowns = () => items.forEach(item => {
    item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
    item.querySelector('.nav-dropdown').hidden = true;
  });
  const openDropdown = item => {
    closeDropdowns();
    item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'true');
    item.querySelector('.nav-dropdown').hidden = false;
  };
  items.forEach(item => {
    const button = item.querySelector('.dropdown-toggle');
    let openedByHover = false;
    button.addEventListener('click', event => {
      const wasOpen = button.getAttribute('aria-expanded') === 'true';
      if (wasOpen && openedByHover && event.detail > 0 && window.innerWidth > 1100) {
        openedByHover = false;
        return;
      }
      openedByHover = false;
      closeDropdowns();
      if (!wasOpen) openDropdown(item);
    });
    item.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse' && window.innerWidth > 1100) {
        openDropdown(item);
        openedByHover = true;
      }
    });
    item.addEventListener('pointerleave', () => {
      openedByHover = false;
      if (window.innerWidth > 1100 && !item.contains(document.activeElement)) closeDropdowns();
    });
    item.addEventListener('focusout', event => {
      if (!item.contains(event.relatedTarget)) closeDropdowns();
    });
    button.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault(); openDropdown(item);
        item.querySelector('.nav-dropdown a').focus();
      }
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const active = items.find(item => item.querySelector('.dropdown-toggle').getAttribute('aria-expanded') === 'true');
      closeDropdowns();
      if (active) { event.stopImmediatePropagation(); active.querySelector('.dropdown-toggle').focus(); }
    }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.nav-item')) closeDropdowns(); });
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
  window.matchMedia('(max-width: 1100px)').addEventListener('change', () => setMenu(false));
}

const form = typeof document !== 'undefined' ? document.querySelector('#enquiry-form') : null;
if (form) {
  // Native constraints remain authoritative; show persistent errors after JS attaches.
  form.noValidate = true;
  const requiredFields = [...form.querySelectorAll('[required]')];
  const summary = document.querySelector('#form-error-summary');
  const result = document.querySelector('#form-result');
  const errorFor = field => {
    if (field.type === 'checkbox') return field.checked ? '' : 'Please agree to share your details for this request.';
    if (field.validity.valueMissing || !field.value.trim()) return 'Please complete this field.';
    if (field.validity.typeMismatch) return 'Enter a valid email address, such as you@company.com.';
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
  if (form.elements.interest && interests.includes(selected)) form.elements.interest.value = selected;
  const enquiryType = new URLSearchParams(window.location.search).get('type');
  
  form.addEventListener('input', event => {
    result.hidden = true;
    if (event.target.getAttribute('aria-invalid') === 'true') validate(event.target);
    summary.hidden = true;
  });
  form.addEventListener('change', event => {
    result.hidden = true;
    summary.hidden = true;
    if (event.target.getAttribute('aria-invalid') === 'true') validate(event.target);
  });
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
    const value = name => String(data.get(name) || '').trim();
    const isDemo = form.dataset.demo === 'true';
    const subject = isDemo ? 'Demo request — ' + value('interest') : 'General enquiry';
    const brief = `BM Tech Services — ${isDemo ? 'Demo Request' : 'Enquiry'}\n\nName: ${value('firstName')} ${value('lastName')}\nCompany: ${value('company') || 'Not provided'}\nEmail: ${value('email')}\nPhone: ${value('phone') || 'Not provided'}\nProduct: ${value('interest') || 'Not specified'}\n\nMessage:\n${value('message') || 'Not provided'}`;
    document.querySelector('#brief-output').value = brief;
    document.querySelector('#email-brief').href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;
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
