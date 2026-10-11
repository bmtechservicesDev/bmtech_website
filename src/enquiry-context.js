import { products } from './products.js';
import { industries } from './industry-content.js';
import { serviceCatalogue } from './content.js';

export const unsureInterest = 'Not sure yet';
export const enquiryInterests = Object.freeze([
  ...products.map(product => product.name),
  ...serviceCatalogue.map(service => service.interest),
  unsureInterest
]);
export const enquiryFieldLimits = Object.freeze({
  firstName: 80, lastName: 80, company: 160, email: 254, phone: 40, message: 3000
});

// Old shared links remain useful without advertising the retired product list.
const legacyInterests = Object.freeze({
  Hospitality: 'Restaurant Solution',
  'Hospitality Software': 'Restaurant Solution',
  Healthcare: 'Clinic Automation',
  'Healthcare Software': 'Clinic Automation',
  Education: 'My School',
  'Education Software': 'My School',
  'School Management App': 'My School',
  'Parent App': 'Business applications',
  'Smart & Embedded Systems': 'Embedded systems & IoT',
  'Embedded Systems': 'Embedded systems & IoT',
  'Home Automation': 'Embedded systems & IoT',
  'IoT Gateway': 'Embedded systems & IoT',
  'HR & Workforce': 'Business applications',
  'HR & Workforce Software': 'Business applications',
  'HR Solution': 'Business applications',
  'Website Development & Hosting': 'Website & digital experience',
  'Firmware Development': 'Embedded systems & IoT',
  'Product Development': 'Business applications',
  'Digital transformation': 'Consulting & integration'
});

const productPrompts = {
  'Clinic Automation': [
    'Which registration, consultation and follow-up steps should the discussion cover?',
    'Which clinical and administrative roles will use the system?',
    'What existing software and rollout priorities should we consider?'
  ],
  'Restaurant Solution': [
    'Which ordering, kitchen and billing workflows should the discussion cover?',
    'How many outlets and service points are involved?',
    'What existing devices, systems and rollout priorities should we consider?'
  ],
  'My School': [
    'Which school administration and parent communication needs matter most?',
    'Which staff and parent groups need access?',
    'What existing records and academic calendar dates affect your rollout?'
  ],
  'Queue Management': [
    'Where do visitors join the queue, wait and receive service?',
    'How many counters, locations and staff roles are involved?',
    'What display, announcement and system connection needs should we review?'
  ],
  'Smart LED': [
    'Where will the display be installed and who will view it?',
    'What content, schedule and update process do you need?',
    'What size, connectivity and installation constraints should we review?'
  ]
};
const industryPrompts = {
  hospitality: 'Include your operating format, locations and guest service workflow.',
  healthcare: 'Describe the care setting, user roles and clinical or administrative workflow.',
  education: 'Include the institution type and the needs of staff and parent communities.',
  'embedded-systems': 'Include the devices, connectivity and operating environment involved.',
  properties: 'Include the building type, locations and day-to-day facilities workflow.',
  manufacturing: 'Include the equipment, operating environment and information your teams need.',
  retail: 'Include your selling channels, locations and customer service workflow.',
  services: 'Include the customer request, team handoffs and follow-up process.',
  startups: 'Include your intended users, core product idea and first release priorities.'
};
const generalPrompts = [
  'What business problem do you want to solve, and who is affected?',
  'Which applications, devices or workflows are involved?',
  'What are your priorities, constraints and preferred timeline?'
];

export const findEnquiryIndustry = id => industries.find(industry => industry.id === id) || null;
export const findEnquiryProduct = name => products.find(product => product.name === name) || null;

export function resolveEnquiryInterest(value) {
  if (enquiryInterests.includes(value)) return value;
  const mapped = Object.hasOwn(legacyInterests, value) ? legacyInterests[value] : '';
  return enquiryInterests.includes(mapped) ? mapped : '';
}

export function defaultProductIndustry(interest) {
  const ids = findEnquiryProduct(interest)?.industries || [];
  return ids.length === 1 && findEnquiryIndustry(ids[0]) ? ids[0] : '';
}

export function getEnquiryPreparation(interest, industryId) {
  const product = findEnquiryProduct(interest);
  const service = serviceCatalogue.find(item => item.interest === interest);
  const industry = findEnquiryIndustry(industryId);
  return {
    title: product ? `Prepare for ${product.name}` : service ? `Prepare for ${service.title}` : 'Prepare a useful enquiry',
    prompts: product ? productPrompts[product.name] : generalPrompts,
    industry: industry ? `Industry context: ${industry.title}` : '',
    industryPrompt: industry ? industryPrompts[industry.id] || 'Include the people, activities and operating constraints involved.' : ''
  };
}
