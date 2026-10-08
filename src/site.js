import { productFamilies } from './content.js';
import { escape, icon, eyebrow, sectionHead, relatedLinks, link, header, footer, process } from './components.js';
import { companyPages } from './pages/company.js';
import { portfolioPages } from './pages/portfolio.js';
import { enquiryPages } from './pages/enquiry.js';
export { contact, interests, enquiryTypes } from './pages/enquiry.js';

const familyExamples = {
  hospitality: 'Restaurant Solution · Guest House · Hotel · Lodge',
  healthcare: 'Hospital · Clinic Automation · Pharmacy · Health records',
  education: 'School Management App · Parent App',
  'embedded-systems': 'Home Automation · Queue Management · Smart LED · IoT Gateway',
  hr: 'HR Solution'
};

function portfolioMap() {
  return '<div class="portfolio-map"><div class="map-heading"><span class="map-status" aria-hidden="true"></span><span>THE AMPIGEN PORTFOLIO</span><span class="map-caption">Built around your business</span></div>' +
    '<div class="map-families">' + productFamilies.map((family, i) => '<a href="' + family.path + '" class="map-family map-family-' + family.id + '" aria-label="' + escape(family.title) + '"><span class="map-icon">' + icon(family.id) + '</span><span><small>' + String(i + 1).padStart(2, '0') + '</small><strong>' + escape(family.id === 'embedded-systems' ? 'Smart & Embedded' : family.id === 'hr' ? 'HR & Workforce' : family.navLabel) + '</strong></span>' + icon('arrow') + '</a>').join('') +
    '</div><div class="map-connection" aria-hidden="true"><span></span><span></span><span></span></div><div class="map-foundation">' + icon('layers') + '<div><strong>Connected by engineering</strong><span>Custom development · Integration · Support</span></div></div><p class="map-footnote">Web & mobile <span>•</span> Cloud applications <span>•</span> Connected devices</p></div>';
}

function homeFamilies() {
  return '<div class="family-grid home-family-grid">' + productFamilies.map((family, i) => '<article class="card family-card home-family-card" data-product-family="' + family.id + '"><a class="home-family-link" href="' + family.path + '" aria-label="' + escape(family.title) + '"><div class="family-card-top"><span class="icon-badge">' + icon(family.id) + '</span><span class="family-number">' + String(i + 1).padStart(2, '0') + '</span></div><h3>' + escape(family.title) + '</h3><p>' + escape(family.description) + '</p><div class="family-card-bottom"><span>' + escape(familyExamples[family.id]) + '</span>' + icon('arrow') + '</div></a></article>').join('') + '</div>';
}

const home = {
  title: 'Business Software & Digital Solutions | AMPIGEN',
  description: 'Explore AMPIGEN software for hospitality, healthcare, education and HR, plus embedded systems, custom development and end-to-end digital solutions.',
  html: '<section class="hero"><div class="hero-aura" aria-hidden="true"></div><div class="container hero-layout"><div class="hero-copy">' + eyebrow('AMPIGEN') +
    '<h1>Industry software.<br><span>End-to-end<br class="hero-break"> digital solutions.</span></h1><p>Software for your industry. Engineering for your business. We bring products, custom development and connected systems together—from the first requirement to everyday use.</p>' +
    '<div class="hero-signature"><span></span>Engineering Intelligence | Transforming Business</div></div>' + portfolioMap() +
    '</div><div class="container hero-capabilities"><span>Industry software</span><span>Custom engineering</span><span>Implementation & support</span></div></section>' +
    '<section class="section portfolio-home"><div class="container"><div class="section-intro-row">' + sectionHead('OUR PRODUCTS', 'A portfolio built for real operations.', 'Find software for your industry and smart systems for the spaces, people and equipment around it.') + link('/products/', 'Browse the product portfolio', 'text-link section-link') + '</div>' + homeFamilies() + '</div></section>' +
    '<section class="section section-soft"><div class="container"><div class="split-layout"><div>' + sectionHead('END-TO-END DIGITAL DELIVERY', 'The product is a starting point.', '') +
    '<p class="lead-copy">The complete solution connects your software, people and processes.</p></div><div class="delivery-intro"><p>Start with an AMPIGEN product, build a new application or improve the systems you already use. Our engineering services connect each requirement to a practical delivery plan.</p>' +
    relatedLinks([{ href: '/solutions/', label: 'Business solutions' }, { href: '/services/', label: 'Delivery capabilities' }]) + '</div></div>' +
    '<div class="delivery-grid"><article class="delivery-card"><span class="icon-badge">' + icon('code') + '</span><span class="small-label">BUILD</span><h3>Software shaped around your business</h3><p>Custom web, mobile and desktop applications, with user experience and engineering aligned to the work your teams do.</p>' + link('/services/#service-02', 'Custom software development') + '</article>' +
    '<article class="delivery-card"><span class="icon-badge">' + icon('link') + '</span><span class="small-label">CONNECT</span><h3>Systems that work together</h3><p>Application, cloud and device integration, with information flows planned around your operating environment.</p>' + link('/services/#service-06', 'System integration') + '</article>' +
    '<article class="delivery-card"><span class="icon-badge">' + icon('spark') + '</span><span class="small-label">IMPROVE</span><h3>Useful automation. Clear purpose.</h3><p>Assess AI and automation against a defined business problem, the available data and the people who need to stay involved.</p>' + link('/services/#service-04', 'AI & workflow automation') + '</article></div></div></section>' +
    '<section class="section"><div class="container industry-feature"><div class="industry-feature-intro">' + sectionHead('INDUSTRY UNDERSTANDING', 'Start with the way your business works.', 'The right digital solution starts with your users, daily activities and operating requirements.') +
    link('/industries/', 'Explore industry contexts', 'text-link section-link') + '</div><div class="industry-list">' +
    [['hospitality', 'Hospitality', 'Restaurant and property operations, guest experience and supporting systems.'], ['healthcare', 'Healthcare', 'Clinical and administrative workflows, records and specialist information systems.'], ['education', 'Education', 'School administration, the parent experience and institution-wide digital needs.']].map(([id, title, copy]) => '<a class="industry-list-item" href="/industries/#' + id + '"><span class="icon-badge">' + icon(id) + '</span><div><h3>' + title + '</h3><p>' + copy + '</p></div>' + icon('arrow') + '</a>').join('') + '</div></div></section>' +
    '<section class="section section-dark"><div class="container connected-section"><div>' + eyebrow('BEYOND A SINGLE SYSTEM') + '<h2>Your digital requirements.<br>One connected plan.</h2><p>Bring your operational products, workforce needs, digital presence and connected devices into the same conversation. We help identify what to build, what to integrate and how to implement it.</p>' +
    relatedLinks([{ href: '/solutions/#business-digital-transformation-integration', label: 'Digital transformation & integration' }, { href: '/solutions/#digital-presence-customer-growth', label: 'Digital presence & customer growth' }]) +
    '</div><div class="capability-stack" aria-label="Connected engineering capabilities"><div>' + icon('cloud') + '<span>Cloud & SaaS</span></div><div>' + icon('embedded-systems') + '<span>Embedded systems & IoT</span></div><div>' + icon('spark') + '<span>AI & automation</span></div><div>' + icon('users') + '<span>Implementation & support</span></div></div></div></section>' +
    process()
};

const pages = { '/': home, ...portfolioPages, ...companyPages, ...enquiryPages };

export function renderPage(path) {
  const page = pages[path];
  if (!page) throw new Error('Unknown website route: ' + path);
  return { title: page.title, description: page.description, html: header(path) + '<main id="main">' + page.html + '</main>' + footer() };
}
