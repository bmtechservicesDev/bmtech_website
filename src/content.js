export { products } from './products.js';
export { industries } from './industry-content.js';

export const solutions = [
  {
    id: 'hospitality-digital-operations',
    title: 'Hospitality Digital Operations',
    description: 'Connect restaurant ordering, kitchen workflows and billing with Restaurant Solution. Bring property operations, guest-facing websites and other hospitality requirements into a scoped custom development and integration plan.',
    relatedLinks: [
      { href: '/products/restaurant-solution/', label: 'Restaurant Solution' },
      { href: '/industries/hospitality/', label: 'Hospitality digital solutions' },
      { href: '/services/#service-06', label: 'System Integration' }
    ]
  },
  {
    id: 'healthcare-workflow-digitalization',
    title: 'Healthcare Workflow Digitalization',
    description: 'Bring patient registration, appointments, consultation records and billing into a connected clinic discussion. Scope wider hospital, pharmacy, health-record and specialist information workflows through consulting, development and integration services.',
    relatedLinks: [
      { href: '/products/clinic-automation/', label: 'Clinic Automation' },
      { href: '/products/queue-management/', label: 'Queue Management' },
      { href: '/services/#service-06', label: 'System Integration' }
    ]
  },
  {
    id: 'school-parent-digital-experience',
    title: 'School & Parent Digital Experience',
    description: 'Connect school administration and communication with My School. Plan the wider institution website, parent experience and application integrations around the people who create and use school information.',
    relatedLinks: [
      { href: '/products/my-school/', label: 'My School' },
      { href: '/industries/education/', label: 'Education digital solutions' },
      { href: '/services/#service-01', label: 'Website Development & Hosting' }
    ]
  },
  {
    id: 'smart-spaces-service-delivery',
    title: 'Smart Spaces & Service Delivery',
    description: 'Organize visitor flow with Queue Management and communicate through Smart LED displays. Connect property automation, equipment and applications through embedded engineering and integration around the operating environment.',
    relatedLinks: [
      { href: '/products/queue-management/', label: 'Queue Management' },
      { href: '/products/smart-led/', label: 'Smart LED' },
      { href: '/industries/embedded-systems/', label: 'Embedded systems engineering' }
    ]
  },
  {
    id: 'workforce-operations',
    title: 'Workforce Operations',
    description: 'Define HR and workforce digitalization around your organization’s roles, approvals, records and reporting needs. Scope custom applications, configuration and integration to connect the agreed processes with existing business systems.',
    relatedLinks: [
      { href: '/services/#service-07', label: 'Business Automation' },
      { href: '/services/#service-02', label: 'Custom Software Development' },
      { href: '/services/#service-10', label: 'Implementation & Support' }
    ]
  },
  {
    id: 'business-digital-transformation-integration',
    title: 'Business Digital Transformation & Integration',
    description: 'Connect applications, devices and data across business functions. Assess existing systems, identify repetitive work and plan the custom software, cloud, IoT or AI-assisted automation needed for the next stage.',
    relatedLinks: [
      { href: '/services/#service-06', label: 'Consulting & System Integration' },
      { href: '/services/#service-04', label: 'AI, ML & Workflow Automation' },
      { href: '/services/#service-05', label: 'Cloud & SaaS Development' }
    ]
  },
  {
    id: 'digital-presence-customer-growth',
    title: 'Digital Presence & Customer Growth',
    description: 'Connect website content, search visibility, campaigns and enquiry follow-up around a clear customer journey. Bring websites, hosting, digital marketing and CRM workflows into a coordinated plan.',
    relatedLinks: [
      { href: '/services/#service-01', label: 'Website Development & Hosting' },
      { href: '/services/#service-07', label: 'CRM & Business Automation' },
      { href: '/services/#service-08', label: 'Digital Marketing' }
    ]
  }
];

export const serviceCatalogue = [
  {
    id: 'service-01',
    title: 'Website Development & Hosting',
    description: 'Create business websites, product sites and online stores with clear content and useful enquiry paths. Plan hosting, maintenance and the integrations needed to support your digital presence.',
    tags: ['Responsive websites', 'E-commerce', 'Hosting & maintenance', 'Enquiry integrations'],
    interest: 'Website & digital experience'
  },
  {
    id: 'service-02',
    title: 'Custom Software & Product Development',
    description: 'Develop web, mobile and desktop applications around your users and workflows. Scope the experience, architecture, business logic and integrations needed for a new application or an extension to an existing system.',
    tags: ['Web applications', 'Mobile applications', 'Desktop software', 'Product development'],
    interest: 'Business applications'
  },
  {
    id: 'service-03',
    title: 'Embedded Systems & IoT Development',
    description: 'Develop firmware, embedded software, gateway connections and device integrations. Bring equipment data into applications and monitoring workflows around the operating environment.',
    tags: ['Firmware', 'Device integration', 'IoT gateways', 'Monitoring'],
    interest: 'Embedded systems & IoT'
  },
  {
    id: 'service-04',
    title: 'AI, ML & Workflow Automation',
    description: 'Assess document tasks, information retrieval, analysis and repetitive administration. Define the data, integration, evaluation and human review requirements around a specific business use case.',
    tags: ['AI & machine learning', 'Document workflows', 'Analytics', 'Automation'],
    interest: 'AI & automation'
  },
  {
    id: 'service-05',
    title: 'Cloud Applications & SaaS Development',
    description: 'Design cloud applications, APIs and software platforms around the product and its expected use. Plan architecture, deployment, integration and operational support.',
    tags: ['Cloud architecture', 'SaaS platforms', 'APIs', 'DevOps'],
    interest: 'Cloud & SaaS'
  },
  {
    id: 'service-06',
    title: 'Technology Consulting & System Integration',
    description: 'Assess existing systems, clarify architecture choices and plan modernization. Define the information flows, interfaces and development needed to connect the business workflow.',
    tags: ['Architecture', 'Modernization', 'System integration', 'Product strategy'],
    interest: 'Consulting & integration'
  },
  {
    id: 'service-07',
    title: 'CRM & Business Automation',
    description: 'Organize customer records, enquiries and follow-up activities around your sales and service processes. Define the approvals, information flows and reporting needed to connect teams and automate repetitive work.',
    tags: ['Customer records', 'Lead management', 'Service workflows', 'Reporting'],
    interest: 'CRM & business automation'
  },
  {
    id: 'service-08',
    title: 'Digital Marketing',
    description: 'Connect website content, search visibility, campaigns and enquiry follow-up around your audience and business goals. Shape the customer journey and marketing reporting around the way your team works.',
    tags: ['Search visibility', 'Content', 'Campaigns', 'Marketing analytics'],
    interest: 'Digital Marketing & Solutions'
  },
  {
    id: 'service-09',
    title: 'Domain Training & Education',
    description: 'Develop practical skills through training and applied projects in software, embedded systems, IoT, AI and automation. Shape the learning scope around the capabilities your team needs.',
    tags: ['Technical training', 'Applied projects', 'Team capability'],
    interest: 'Domain Training & Education'
  },
  {
    id: 'service-10',
    title: 'Implementation, Training & Ongoing Support',
    description: 'Bring requirements, design, development, testing, deployment and handover into a clear delivery plan. Prepare users for rollout and define maintenance and future improvement needs.',
    tags: ['Implementation', 'User training', 'Handover', 'Ongoing support'],
    interest: 'Implementation & support'
  }
];
