// Compatibility destinations for previously published product-family URLs.
// Fragments never reach the server, so the browser maps recognised old product
// bookmarks before falling back to the relevant industry or solution page.
export const legacyRoutes = {
  '/products/hospitality/': {
    label: 'Hospitality', target: '/industries/hospitality/',
    description: 'Find Restaurant Solution and the wider hospitality engineering services on their updated AMPIGEN pages.',
    fragments: { 'restaurant-solution': '/products/restaurant-solution/' },
    productIds: ['restaurant-solution', 'smart-led']
  },
  '/products/healthcare/': {
    label: 'Healthcare', target: '/industries/healthcare/',
    description: 'Find Clinic Automation, Queue Management and healthcare engineering services on their updated AMPIGEN pages.',
    fragments: { 'clinic-automation': '/products/clinic-automation/' },
    productIds: ['clinic-automation', 'queue-management']
  },
  '/products/education/': {
    label: 'Education', target: '/industries/education/',
    description: 'Find My School and education engineering services on their updated AMPIGEN pages.',
    fragments: { 'school-management-app': '/products/my-school/', 'my-school': '/products/my-school/' },
    productIds: ['my-school']
  },
  '/products/embedded-systems/': {
    label: 'Embedded Systems', target: '/industries/embedded-systems/',
    description: 'Find Queue Management, Smart LED and embedded engineering services on their updated AMPIGEN pages.',
    fragments: {
      'queue-management': '/products/queue-management/',
      'smart-led': '/products/smart-led/',
      'home-automation': '/industries/properties/'
    },
    productIds: ['queue-management', 'smart-led']
  },
  '/products/hr/': {
    label: 'Workforce Operations', target: '/solutions/#workforce-operations',
    description: 'Explore AMPIGEN workforce digitalization, custom software and integration services on the updated Solutions page.',
    fragments: {}, productIds: []
  }
};

export function resolveLegacyDestination(path, hash = '') {
  const entry = legacyRoutes[path];
  if (!entry) return null;
  let fragment = '';
  try { fragment = decodeURIComponent(hash.replace(/^#/, '')); } catch { /* Use the safe default destination. */ }
  return Object.hasOwn(entry.fragments, fragment) ? entry.fragments[fragment] : entry.target;
}
