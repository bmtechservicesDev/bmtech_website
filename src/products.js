// The approved public product catalogue. Order is part of the content contract.
// Broader engineering capabilities belong in Solutions and Services.
export const products = [
  {
    id: 'clinic-automation',
    name: 'Clinic Automation',
    path: '/products/clinic-automation/',
    icon: 'healthcare',
    domain: 'Healthcare',
    industries: ['healthcare'],
    summary: 'Patient registration, appointments, consultation records and billing.',
    description: 'Bring the activities before, during and after a patient visit into a clearer clinic workflow.',
    h1: 'Clinic Automation for Everyday Patient Workflows',
    seoTitle: 'Clinic Automation Software | AMPIGEN',
    metaDescription: 'Explore AMPIGEN Clinic Automation for patient registration, appointments, consultation records and billing, with implementation planning for your clinic.',
    intro: 'Help reception, consultation and billing teams work from a connected patient journey. Clinic Automation brings registration, appointments, consultation records and billing into the product discussion, with implementation shaped around your clinic.',
    audience: 'Clinics and care teams reviewing the flow from arrival and appointment handling to consultation documentation and billing.',
    tags: ['Patient registration', 'Appointments', 'Consultation records', 'Billing'],
    workflow: [
      { title: 'Before the visit', description: 'Review how reception registers patients and manages appointments, including the information staff need when a patient arrives.' },
      { title: 'During consultation', description: 'Explore consultation records around the way clinicians document a visit and the information needed for follow-up.' },
      { title: 'At checkout', description: 'Review the billing workflow and the handoff between clinical and administrative activities.' }
    ],
    requirements: [
      'Identify the reception, clinician and billing roles for the demonstration.',
      'Prepare an example patient journey using fictional information.',
      'List existing records and systems that may need migration or integration.',
      'Identify training, access and rollout requirements for the clinic.'
    ],
    faqs: [
      { question: 'What should a Clinic Automation demonstration cover?', answer: 'Use a fictional patient visit to review registration, appointment handling, consultation records and billing. Bring examples of the handoffs your team finds difficult so the discussion stays focused on your clinic.' },
      { question: 'Can we discuss existing healthcare systems?', answer: 'Yes. Share the system names, available interfaces and information flows you need to connect. Compatibility, migration scope and any development work are assessed during requirements planning.' }
    ],
    relatedLinks: [
      { href: '/industries/healthcare/', label: 'Healthcare digital solutions' },
      { href: '/products/queue-management/', label: 'Queue Management' },
      { href: '/services/#service-06', label: 'System integration' },
      { href: '/services/#service-10', label: 'Implementation & support' }
    ]
  },
  {
    id: 'restaurant-solution',
    name: 'Restaurant Solution',
    path: '/products/restaurant-solution/',
    icon: 'hospitality',
    domain: 'Hospitality',
    industries: ['hospitality'],
    summary: 'Ordering and POS, kitchen coordination, billing and reporting.',
    description: 'Connect the service team, kitchen and checkout around the way your restaurant operates.',
    h1: 'Restaurant Software from Order to Checkout',
    seoTitle: 'Restaurant Management & POS Software | AMPIGEN',
    metaDescription: 'Explore AMPIGEN Restaurant Solution for ordering, POS, kitchen workflows, billing and reporting, with implementation around your restaurant operations.',
    intro: 'Give each order a clearer path through your restaurant. Restaurant Solution brings ordering and POS, kitchen workflows, billing and reporting into one evaluation, supported by implementation and integration planning.',
    audience: 'Restaurant owners, managers, service teams and kitchen teams who need to review their daily ordering and billing process together.',
    tags: ['Ordering & POS', 'Kitchen workflows', 'Billing', 'Reporting'],
    workflow: [
      { title: 'Take the order', description: 'Review how service staff capture orders and use the POS around your menu and operating model.' },
      { title: 'Coordinate the kitchen', description: 'Walk through the handoff from the service team to the kitchen and the information each team needs while an order is prepared.' },
      { title: 'Complete the sale', description: 'Explore billing and management reporting as part of the same daily operating workflow.' }
    ],
    requirements: [
      'Describe your service model, outlets and the people handling orders.',
      'Prepare a sample menu and an order-to-bill scenario.',
      'List existing POS hardware, printers and payment or accounting systems.',
      'Identify the reports, training and rollout priorities to review.'
    ],
    faqs: [
      { question: 'How do we prepare for a Restaurant Solution demonstration?', answer: 'Bring a sample menu and describe how an order moves from your service team to the kitchen and checkout. Include exceptions and the information your manager needs at the end of a shift.' },
      { question: 'Can we review our existing hardware and integrations?', answer: 'Yes. Provide device models and details of payment, accounting or other systems. Their compatibility and the scope of any integration should be confirmed before implementation.' }
    ],
    relatedLinks: [
      { href: '/industries/hospitality/', label: 'Hospitality digital solutions' },
      { href: '/products/smart-led/', label: 'Smart LED' },
      { href: '/services/#service-01', label: 'Website development & hosting' },
      { href: '/services/#service-10', label: 'Implementation & support' }
    ]
  },
  {
    id: 'my-school',
    name: 'My School',
    path: '/products/my-school/',
    icon: 'education',
    domain: 'Education',
    industries: ['education'],
    summary: 'School administration, communication and digital workflows.',
    description: 'Bring school teams and their information needs into a more connected digital experience.',
    h1: 'My School for School Administration & Communication',
    seoTitle: 'My School Management Software | AMPIGEN',
    metaDescription: 'Explore My School from AMPIGEN for school administration, communication and digital workflows, with implementation planning for your institution.',
    intro: 'Build a clearer digital experience around the school community. My School focuses on administration, communication and everyday workflows, with the roles, information and implementation needs defined around your institution.',
    audience: 'School leaders, administrators and staff reviewing how information moves through the institution and reaches its parent community.',
    tags: ['School administration', 'Communication', 'Digital workflows'],
    workflow: [
      { title: 'Organize school work', description: 'Explore administration around the information school teams handle and the responsibilities of each role.' },
      { title: 'Connect the community', description: 'Review the communication needs of staff and parents, including who prepares information and who should receive it.' },
      { title: 'Plan adoption', description: 'Bring existing records, role access and staff training into the rollout plan so the agreed digital workflow is usable in practice.' }
    ],
    requirements: [
      'Identify the school teams and parent communication needs involved.',
      'Choose the administrative workflows to review in a demonstration.',
      'List existing records, applications and information-sharing requirements.',
      'Plan the academic-calendar constraints, access and staff training needs.'
    ],
    faqs: [
      { question: 'Which school workflows should we bring to a demonstration?', answer: 'Choose the administrative and communication activities your teams handle most often. Describe the people involved, the records they use and the information that needs to reach staff or parents.' },
      { question: 'Can an institution website or parent experience be part of the project?', answer: 'Yes. Website development, application development and integration can be discussed alongside My School. The product scope and any additional application or integration work are confirmed separately during planning.' }
    ],
    relatedLinks: [
      { href: '/industries/education/', label: 'Education digital solutions' },
      { href: '/solutions/#school-parent-digital-experience', label: 'School & parent digital experience' },
      { href: '/services/#service-01', label: 'Institution websites' },
      { href: '/services/#service-09', label: 'Domain training & education' }
    ]
  },
  {
    id: 'queue-management',
    name: 'Queue Management',
    path: '/products/queue-management/',
    icon: 'queue',
    domain: 'Service operations',
    industries: ['healthcare', 'hospitality', 'embedded-systems', 'properties', 'retail', 'services'],
    summary: 'Token workflows, counter allocation and customer displays.',
    description: 'Make the next step clearer for visitors and the teams providing in-person service.',
    h1: 'Queue Management for In-Person Service',
    seoTitle: 'Queue Management & Token Systems | AMPIGEN',
    metaDescription: 'Explore AMPIGEN Queue Management for token workflows, counter allocation and customer displays, with planning for your service facility.',
    intro: 'Connect visitor flow with the service counter. Queue Management supports token workflows, counter allocation and customer displays, with the process shaped around your facility, teams and visitor information needs.',
    audience: 'Clinics, retail locations, reception areas and service facilities that need to organize a visit across one or more service counters.',
    tags: ['Token workflows', 'Counter allocation', 'Customer displays'],
    workflow: [
      { title: 'Join the queue', description: 'Review how a visitor enters the token workflow and how different service requirements should be handled.' },
      { title: 'Reach the counter', description: 'Explore counter allocation around your team, service types and the handoffs needed during a visit.' },
      { title: 'Keep visitors informed', description: 'Plan the customer displays and information that help visitors understand where to go next.' }
    ],
    requirements: [
      'Map service types, counters and the way visitors enter the facility.',
      'Identify priority, transfer and missed-turn scenarios to assess.',
      'List display locations, available devices and connectivity constraints.',
      'Prepare an example visit from arrival to service completion.'
    ],
    faqs: [
      { question: 'What information is useful when planning a queue system?', answer: 'Start with the number of service points, visitor entry paths, service types and display locations. Include exception scenarios such as a missed turn or a transfer so the required behavior can be assessed.' },
      { question: 'Does a queue project include installation and integration planning?', answer: 'The discussion can cover devices, display placement, connectivity and connections to existing applications. Required equipment and implementation responsibilities are agreed as part of the project scope.' }
    ],
    relatedLinks: [
      { href: '/industries/services/', label: 'Service organizations' },
      { href: '/industries/healthcare/', label: 'Healthcare workflows' },
      { href: '/products/smart-led/', label: 'Smart LED' },
      { href: '/services/#service-03', label: 'Embedded systems & integration' }
    ]
  },
  {
    id: 'smart-led',
    name: 'Smart LED',
    path: '/products/smart-led/',
    icon: 'display',
    domain: 'Digital signage',
    industries: ['healthcare', 'hospitality', 'education', 'embedded-systems', 'properties', 'manufacturing', 'retail', 'services'],
    summary: 'Digital signage, content presentation and display integration.',
    description: 'Bring useful visual information to the spaces where customers, visitors and teams need it.',
    h1: 'Smart LED for Digital Signage & Information Displays',
    seoTitle: 'Smart LED & Digital Signage Solutions | AMPIGEN',
    metaDescription: 'Explore AMPIGEN Smart LED for digital signage, content presentation and display integration in hospitality, retail and business spaces.',
    intro: 'Connect your message with the place people see it. Smart LED brings digital signage, content presentation and display integration into one planning conversation, shaped around your audience, location and operating environment.',
    audience: 'Hospitality venues, retail locations, business facilities and reception areas evaluating digital information displays.',
    tags: ['Digital signage', 'Content presentation', 'Display integration'],
    workflow: [
      { title: 'Define the message', description: 'Identify the information people need to see and how content should be prepared for the intended audience.' },
      { title: 'Plan the display', description: 'Review the display location, viewing conditions, available power and connectivity alongside the presentation needs.' },
      { title: 'Connect the operation', description: 'Scope display integration, content responsibilities and support around the team managing the installation.' }
    ],
    requirements: [
      'Describe the audience, display locations and viewing conditions.',
      'Prepare example messages or content to assess.',
      'List existing screens, controllers, power and connectivity options.',
      'Identify content ownership, update needs and installation responsibilities.'
    ],
    faqs: [
      { question: 'Can Smart LED be assessed for our existing space?', answer: 'Yes. Share the proposed locations, viewing conditions and details of any existing display equipment. Those inputs help define the presentation, integration and installation requirements.' },
      { question: 'What should be agreed before a signage installation?', answer: 'Confirm the intended content, display and controller compatibility, update workflow, site prerequisites and support responsibilities. Requirements such as scheduling or external data feeds should be raised explicitly for assessment.' }
    ],
    relatedLinks: [
      { href: '/industries/retail/', label: 'Retail & commerce' },
      { href: '/industries/hospitality/', label: 'Hospitality digital solutions' },
      { href: '/products/queue-management/', label: 'Queue Management' },
      { href: '/services/#service-03', label: 'Embedded engineering' }
    ]
  }
];
