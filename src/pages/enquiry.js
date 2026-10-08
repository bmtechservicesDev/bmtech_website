import { productFamilies, serviceCatalogue } from '../content.js';
import { escape, icon, eyebrow, relatedLinks } from '../components.js';

export const contact = { email: 'bmtechservices2025@gmail.com', phone: '+919642668815' };
export const enquiryTypes = ['General enquiry', 'Product demo', 'Custom development', 'Digital transformation', 'Website & marketing', 'Training & education'];
const legacyInterests = ['My School', 'Website Development & Hosting', 'Domain Training & Education', 'Firmware Development', 'Product Development', 'Digital Marketing & Solutions', 'Digital transformation'];
export const interests = [...new Set([...productFamilies.flatMap(family => family.products.map(product => product.name)), ...serviceCatalogue.map(service => service.interest), ...legacyInterests])];

function interestOptions(required) {
  const productNames = new Set(productFamilies.flatMap(family => family.products.map(product => product.name)));
  const services = interests.filter(value => !productNames.has(value) && value !== 'My School');
  return '<option value="">' + (required ? 'Select a product or service' : 'General enquiry') + '</option>' +
    productFamilies.map(family => '<optgroup label="' + escape(family.title) + '">' + family.products.map(product => '<option value="' + escape(product.name) + '">' + escape(product.name) + '</option>').join('') + '</optgroup>').join('') +
    '<optgroup label="Existing product enquiry"><option value="My School">My School</option></optgroup><optgroup label="Services & digital transformation">' +
    services.map(service => '<option value="' + escape(service) + '">' + escape(service) + '</option>').join('') + '</optgroup>';
}

function inputField(name, label, type, autocomplete, required = true) {
  return '<label class="field-label" for="' + name + '">' + label + (required ? ' <span aria-hidden="true">*</span>' : ' <span class="optional-label">Optional</span>') +
    '<input id="' + name + '" name="' + name + '" type="' + type + '" autocomplete="' + autocomplete + '" ' + (required ? 'required ' : '') + 'maxlength="160" aria-describedby="' + name + '-error">' +
    '<span class="field-error" id="' + name + '-error" hidden></span></label>';
}
function interestField(required) {
  return '<label class="field-label" for="interest">' + (required ? 'Select a product or service <span aria-hidden="true">*</span>' : 'Product or service <span class="optional-label">Optional</span>') +
    '<select id="interest" name="interest" ' + (required ? 'required ' : '') + 'aria-describedby="interest-error">' + interestOptions(required) + '</select><span class="field-error" id="interest-error" hidden></span></label>';
}

function enquiryForm(isDemo) {
  const heading = isDemo ? 'Book a Product Demo' : 'Contact AMPIGEN';
  const intro = isDemo ? 'Tell us what you want to explore. We can shape the discussion around your business, users and workflows.' : 'Start with your business need. Tell us about a product, a new idea or a system you want to improve.';
  return '<form id="enquiry-form" class="contact-form reference-form' + (isDemo ? ' demo-form' : '') + '" data-demo="' + isDemo + '" aria-labelledby="enquiry-heading">' +
    '<div class="form-heading">' + eyebrow(isDemo ? 'LET’S EXPLORE YOUR REQUIREMENTS' : 'LET’S START A CONVERSATION') + '<h1 id="enquiry-heading">' + heading + '</h1><p>' + intro + '</p></div>' +
    '<p class="required-note">Fields marked * are required.</p><p id="form-error-summary" class="form-error-summary" role="alert" hidden></p>' +
    (isDemo ? interestField(true) : '') +
    '<div class="form-row">' + inputField('firstName', 'First name', 'text', 'given-name') + inputField('lastName', 'Last name', 'text', 'family-name') + '</div>' +
    inputField('email', 'Email', 'email', 'email') +
    (isDemo ? inputField('company', 'Company name', 'text', 'organization') : inputField('phone', 'Phone number', 'tel', 'tel', false) + interestField(false)) +
    '<label class="field-label" for="message">' + (isDemo ? 'What would you like the discussion to cover?' : 'Message') + ' <span class="optional-label">Optional</span><textarea id="message" name="message" rows="4" maxlength="3000"></textarea></label>' +
    '<label class="consent-label"><input type="checkbox" name="consent" required aria-describedby="consent-error"><span>I agree to share these details with AMPIGEN to respond to this ' + (isDemo ? 'demo request.' : 'enquiry.') + '<span class="consent-required" aria-hidden="true"> *</span></span></label><span class="field-error" id="consent-error" hidden></span>' +
    '<div class="form-submit"><button class="button button-primary" type="submit" data-enable-enquiry disabled>' + (isDemo ? 'Prepare demo request' : 'Prepare enquiry') + '</button></div>' +
    '<p class="form-hint">Prepare your ' + (isDemo ? 'request' : 'enquiry') + ', then review and send the draft from your email app or WhatsApp.' + (isDemo ? ' Your demonstration time is confirmed after we discuss your request.' : '') + '</p>' +
    '<noscript><p class="form-hint">Enable JavaScript in your browser to prepare an enquiry draft.</p></noscript>' +
    '<div id="form-result" class="form-result" role="status" aria-live="polite" hidden><span class="result-icon">' + icon('check') + '</span><h2 id="result-heading" tabindex="-1">Your ' + (isDemo ? 'demo request' : 'enquiry') + ' is ready to send</h2><p>' +
    (isDemo ? 'Review the draft and send it from your email app or WhatsApp. Preparing this request does not send it or reserve a demonstration time.' : 'Open the draft in your email app or WhatsApp, review the details and send it to AMPIGEN. Your enquiry has not been sent yet.') +
    '</p><textarea id="brief-output" readonly rows="10" aria-label="Prepared enquiry"></textarea><div class="result-actions">' +
    '<a id="email-brief" class="button button-secondary" href="mailto:' + contact.email + '">Open email draft</a><a id="whatsapp-brief" class="button button-secondary" href="https://wa.me/' + contact.phone.replace(/\D/g, '') + '" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a><button type="button" id="copy-brief" class="button button-outline">Copy enquiry</button></div><span id="copy-status" role="status" aria-live="polite"></span></div></form>';
}

function enquiryAside(isDemo) {
  const rows = isDemo ? [
    ['Choose your starting point', 'Select the product family or service that is relevant to your organization.'],
    ['Bring your workflow', 'Share who will use the solution and the activities you want to review.'],
    ['Plan the next step', 'Discuss product fit, implementation and any development or integration needs.']
  ] : [
    ['Your business context', 'The industry, users and everyday work the solution needs to support.'],
    ['Your existing systems', 'The applications, data and devices involved in the requirement.'],
    ['Your next step', 'The priorities, timeline and questions you want to discuss.']
  ];
  return '<aside class="enquiry-aside"><div class="enquiry-aside-inner"><span class="icon-badge">' + icon(isDemo ? 'compass' : 'spark') + '</span>' +
    '<h2>' + (isDemo ? 'A useful demo starts with your business.' : 'From your first idea to everyday use.') + '</h2><p>' +
    (isDemo ? 'A focused discussion helps connect your requirements with the right product and delivery approach.' : 'Bring your product, custom software and connected-system requirements into one conversation.') +
    '</p><ol class="enquiry-steps">' + rows.map(([title, copy], i) => '<li><span>' + String(i + 1).padStart(2, '0') + '</span><div><h3>' + title + '</h3><p>' + copy + '</p></div></li>').join('') +
    '</ol><div class="enquiry-related"><p class="small-label">EXPLORE BEFORE YOU ENQUIRE</p>' + relatedLinks([{ href: '/products/', label: 'Product portfolio' }, { href: '/services/', label: 'Engineering services' }]) + '</div></div></aside>';
}
export const enquiryPages = {
  '/contact/': {
    title: 'Contact AMPIGEN | Product & Project Enquiries',
    description: 'Discuss hospitality, healthcare, education, HR or embedded products, custom software and digital transformation with AMPIGEN.',
    html: '<section class="enquiry-section"><div class="container enquiry-layout">' + enquiryForm(false) + enquiryAside(false) + '</div></section>'
  },
  '/book-a-demo/': {
    title: 'Book a Product Demo | AMPIGEN',
    description: 'Explore AMPIGEN hospitality, healthcare, education, HR and smart system offerings in a discussion focused on your users and business requirements.',
    html: '<section class="enquiry-section"><div class="container enquiry-layout">' + enquiryForm(true) + enquiryAside(true) + '</div></section>'
  }
};
