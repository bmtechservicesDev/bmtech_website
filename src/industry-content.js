// Industry context is separate from the approved product catalogue.
// Product references deliberately include only these five approved offerings.
const productReferences = {
  'clinic-automation': { title: 'Clinic Automation', icon: 'healthcare' },
  'restaurant-solution': { title: 'Restaurant Solution', icon: 'hospitality' },
  'my-school': { title: 'My School', icon: 'education' },
  'queue-management': { title: 'Queue Management', icon: 'queue' },
  'smart-led': { title: 'Smart LED', icon: 'display' }
};

const product = (id, description) => ({
  id,
  ...productReferences[id],
  href: `/products/${id}/`,
  description
});

export const industries = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    path: '/industries/healthcare/',
    icon: 'healthcare',
    summary: 'Clinics, hospitals, pharmacies and the teams delivering care.',
    description: 'Connect care delivery and administration around the patient journey. Explore Clinic Automation and define wider healthcare information, queue and integration requirements.',
    seoTitle: 'Healthcare Software & Digital Solutions | AMPIGEN',
    metaDescription: 'Explore Clinic Automation, queue management and custom healthcare software with AMPIGEN. Plan patient journeys, information flows and implementation.',
    h1: 'Digital solutions for connected healthcare workflows',
    intro: 'Bring the patient journey, clinical work and administration into one implementation plan. AMPIGEN combines Clinic Automation with custom software and integration services for the needs of clinics, hospitals and pharmacy teams.',
    focus: ['Patient journeys', 'Care team handoffs', 'Information access'],
    workflowTitle: 'Follow the patient through each handoff',
    workflows: [
      { title: 'Arrival and consultation', body: 'Map registration, appointments, walk-ins and consultation handoffs so the team can review the complete visit.' },
      { title: 'Records and downstream work', body: 'Identify where clinical notes, prescriptions, investigation requests and results need to move between people and systems.' },
      { title: 'Billing and oversight', body: 'Define episode billing, payment capture, day-end review and the role-specific information needed by administrators.' }
    ],
    products: [
      product('clinic-automation', 'Review clinic workflows from registration and consultation through pharmacy and episode billing.'),
      product('queue-management', 'Assess token, counter and display workflows for patient arrival and service areas.'),
      product('smart-led', 'Plan information displays around waiting areas and facility communication.')
    ],
    capabilityTitle: 'Connect the wider care environment',
    capability: 'Hospital, pharmacy, EMR, EHR, PMS, LIS, RIS and SIS requirements belong in a scoped healthcare discussion. Define each module, interface and responsibility against the systems already in use.',
    serviceLinks: [
      { href: '/services/#service-06', label: 'Healthcare system integration' },
      { href: '/services/#service-02', label: 'Custom software development' }
    ],
    priorities: ['Review access to patient information by role.', 'Validate handoffs with care and administration teams.', 'Agree data migration, rollout and support responsibilities.'],
    checklist: ['Care setting, departments and daily workflows', 'User roles and information each role needs', 'Existing systems and interface documentation', 'Representative scenarios using synthetic patient data'],
    planningNote: 'Use fictional examples when preparing an enquiry. Patient records and identifiable clinical information are unnecessary for an initial discussion.',
    faqs: [
      { question: 'Can a clinic product cover a hospital-wide requirement?', answer: 'Start by comparing Clinic Automation with the clinic workflow. Hospital departments and specialist information systems require their own scope and interface assessment.' },
      { question: 'Can existing clinical records be brought into the solution?', answer: 'Migration depends on source formats, data quality and authorized access. Agree mapping, validation and responsibilities before committing to a migration approach.' }
    ],
    relatedIndustries: ['services', 'embedded-systems', 'properties']
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    path: '/industries/hospitality/',
    icon: 'hospitality',
    summary: 'Restaurants, guest houses, hotels and lodges.',
    description: 'Connect restaurant operations, guest service and digital touchpoints. Evaluate Restaurant Solution and scope the distinct requirements of accommodation businesses.',
    seoTitle: 'Hospitality & Restaurant Digital Solutions | AMPIGEN',
    metaDescription: 'Explore Restaurant Solution and custom hospitality software from AMPIGEN. Plan restaurant, hotel, guest house and lodge workflows around your business.',
    h1: 'Digital solutions for hospitality operations',
    intro: 'Give restaurant and accommodation teams a clear path from guest request to service completion. AMPIGEN brings Restaurant Solution, connected displays and custom development into the operating context of your restaurant, hotel, guest house or lodge.',
    focus: ['Guest experience', 'Service coordination', 'Daily operations'],
    workflowTitle: 'Connect service at the points that matter',
    workflows: [
      { title: 'Restaurant service', body: 'Review menu management, order capture, kitchen coordination and billing against dine-in and takeaway workflows.' },
      { title: 'Accommodation operations', body: 'Map reservations, arrival, room status, guest requests and departure as a separate accommodation requirements stream.' },
      { title: 'Guest communication', body: 'Align website information, enquiries, on-site displays and staff handoffs with the experience guests should receive.' }
    ],
    products: [
      product('restaurant-solution', 'Evaluate restaurant service workflows from ordering and kitchen coordination to billing.'),
      product('queue-management', 'Explore organized token and counter workflows where service queues are part of the operation.'),
      product('smart-led', 'Plan menu, promotional and guest information displays around the venue.')
    ],
    capabilityTitle: 'Plan accommodation and wider operations',
    capability: 'Hotel, guest house and lodge applications can be scoped through custom development. Website, workforce and system integration requirements can join the same delivery plan, with responsibilities defined for each workstream.',
    serviceLinks: [
      { href: '/services/#service-02', label: 'Hospitality application development' },
      { href: '/services/#service-01', label: 'Websites and hosting' }
    ],
    priorities: ['Validate busy-period handoffs and exception handling.', 'Identify devices, printers and connectivity dependencies.', 'Plan staff training around operational shifts.'],
    checklist: ['Venue type, outlets and service formats', 'Order or guest journey and key exceptions', 'Current devices, applications and connections', 'Rollout sequence and people responsible for training'],
    planningNote: 'Bring one typical service journey and one difficult scenario, such as an order correction or an arrival change, to the requirements discussion.',
    faqs: [
      { question: 'Is Restaurant Solution also a hotel management product?', answer: 'Restaurant Solution is the product to evaluate for restaurant operations. Reservations, room management and other accommodation requirements are assessed separately.' },
      { question: 'How should a business with several venues start?', answer: 'Describe what is shared and what differs by venue. Confirm catalogue, access, reporting, hardware and rollout requirements before agreeing the implementation scope.' }
    ],
    relatedIndustries: ['retail', 'properties', 'services']
  },
  {
    id: 'education',
    title: 'Education',
    path: '/industries/education/',
    icon: 'education',
    summary: 'Schools, institutions and their parent communities.',
    description: 'Bring school administration and parent communication into a connected experience. Explore My School alongside institution websites, integrations and team training.',
    seoTitle: 'School Software & Education Solutions | AMPIGEN',
    metaDescription: 'Explore My School and digital solutions for education with AMPIGEN. Plan school administration, parent communication, websites and implementation.',
    h1: 'Digital solutions for schools and their communities',
    intro: 'Connect the people who keep a school running: administrators, teachers, parents and support teams. AMPIGEN combines My School with custom applications, websites and integration services around the institution’s everyday work.',
    focus: ['School administration', 'Parent experience', 'Academic-year readiness'],
    workflowTitle: 'Make the school day easier to coordinate',
    workflows: [
      { title: 'Administrative continuity', body: 'Map admissions, student information and recurring office tasks, including the changes required between academic years.' },
      { title: 'Staff and parent handoffs', body: 'Define who creates updates, who approves them and what parents need to see or acknowledge.' },
      { title: 'Digital access', body: 'Consider shared devices, mobile use and the support needed for staff and parents to adopt a new system.' }
    ],
    products: [
      product('my-school', 'Evaluate school administration and communication against your institution’s workflows.'),
      product('smart-led', 'Explore campus information displays for notices and communication in shared spaces.')
    ],
    capabilityTitle: 'Support the wider institution',
    capability: 'Institution websites, application integrations and workforce administration can be scoped alongside the school experience. Technical training and applied projects are separate service capabilities for developing staff or learner skills.',
    serviceLinks: [
      { href: '/services/#service-01', label: 'Institution websites and hosting' },
      { href: '/services/#service-09', label: 'Domain training and education' }
    ],
    priorities: ['Clarify staff, parent and administrative access.', 'Prepare data and communication before term changes.', 'Test key tasks on the devices families actually use.'],
    checklist: ['School structure, classes and academic-year setup', 'Administrative tasks and parent communication needs', 'Existing records and authorized data owners', 'Device access, training and rollout timetable'],
    planningNote: 'Use a sample class, fictional student records and a typical parent communication to make the initial scope concrete.',
    faqs: [
      { question: 'Can a parent application be part of the project?', answer: 'Review My School against the school’s administration and communication needs. Any additional parent application or integration can be scoped alongside the product after confirming the required workflows.' },
      { question: 'Can rollout fit an academic-year transition?', answer: 'Plan data preparation, staff training and parent communication against the school calendar. Agree the transition approach after reviewing the existing process and records.' }
    ],
    relatedIndustries: ['services', 'properties', 'embedded-systems']
  },
  {
    id: 'embedded-systems',
    title: 'Embedded Systems',
    path: '/industries/embedded-systems/',
    icon: 'embedded-systems',
    summary: 'Device makers, connected-product teams and physical systems.',
    description: 'Connect firmware, devices and applications in one engineering plan. Explore Queue Management and Smart LED, or scope custom embedded and IoT development.',
    seoTitle: 'Embedded Systems & IoT Engineering | AMPIGEN',
    metaDescription: 'Plan embedded systems, firmware, IoT gateways and connected applications with AMPIGEN. Explore Queue Management, Smart LED and custom engineering.',
    h1: 'Engineering for devices and connected systems',
    intro: 'Bring the physical product and its digital experience into the same development plan. AMPIGEN works across firmware, embedded software, device interfaces and cloud applications, alongside Queue Management and Smart LED products.',
    focus: ['Device behavior', 'Application interfaces', 'Operating conditions'],
    workflowTitle: 'Design around the whole system',
    workflows: [
      { title: 'Device behavior', body: 'Define inputs, outputs, timing requirements and what the equipment must do during startup, interruption and recovery.' },
      { title: 'Data and connectivity', body: 'Map device information, interfaces and application needs. Identify bandwidth, latency and intermittent connection constraints early.' },
      { title: 'Installation and support', body: 'Plan provisioning, diagnostics, maintenance access and the handover from engineering teams to installers and support staff.' }
    ],
    products: [
      product('queue-management', 'Evaluate token workflows, counter allocation and customer displays as a connected service system.'),
      product('smart-led', 'Review display, content presentation and installation requirements for digital signage.')
    ],
    capabilityTitle: 'Build the connections your product needs',
    capability: 'Firmware, IoT gateway integration, home automation and monitoring applications are custom engineering capabilities. Agree hardware responsibilities, protocols and application interfaces through technical discovery before defining delivery milestones.',
    serviceLinks: [
      { href: '/services/#service-03', label: 'Embedded systems and IoT development' },
      { href: '/services/#service-05', label: 'Cloud applications and APIs' }
    ],
    priorities: ['Validate on representative hardware and environments.', 'Document interface contracts and ownership boundaries.', 'Define update, recovery and field-support requirements.'],
    checklist: ['Hardware details and available interface documentation', 'Operating environment, power and connectivity', 'Data flows, control actions and timing requirements', 'Prototype availability and installation responsibilities'],
    planningNote: 'A block diagram, equipment list and expected operating sequence provide a useful starting point for technical discovery.',
    faqs: [
      { question: 'Can AMPIGEN work with existing hardware?', answer: 'Share hardware details, interface documentation and access constraints. Compatibility and the development approach are assessed against the actual equipment and required behavior.' },
      { question: 'How are IoT gateway and home automation projects scoped?', answer: 'Start with the devices, control requirements and operating environment. The engineering scope then defines the firmware, interfaces, application work and installation dependencies needed for the project.' }
    ],
    relatedIndustries: ['manufacturing', 'properties', 'startups']
  },
  {
    id: 'properties',
    title: 'Residential & Commercial Properties',
    path: '/industries/properties/',
    icon: 'building',
    summary: 'Connected residential spaces and commercial facilities.',
    description: 'Plan connected spaces around occupants, facilities teams and installation conditions. Scope home automation, service queues, displays and device integration.',
    seoTitle: 'Connected Property & Building Solutions | AMPIGEN',
    metaDescription: 'Explore digital solutions for residential and commercial properties. Plan home automation, queue management, Smart LED and device integration with AMPIGEN.',
    h1: 'Digital solutions for connected properties',
    intro: 'Shape technology around the building and the people who use it. AMPIGEN combines custom home automation and device integration with queue and display products for residential properties, shared facilities and commercial spaces.',
    focus: ['Occupant experience', 'Facility operations', 'Installation readiness'],
    workflowTitle: 'Start with the spaces people use',
    workflows: [
      { title: 'Residential control', body: 'Identify the rooms, devices and control actions involved, together with occupant preferences and manual operating needs.' },
      { title: 'Shared-space service', body: 'Map reception, help-desk and facility-service journeys where visitors need direction, a token or clear status information.' },
      { title: 'Building communication', body: 'Define which notices belong on displays, who maintains the content and where information must remain readable.' }
    ],
    products: [
      product('queue-management', 'Review organized service workflows for reception and staffed facility counters.'),
      product('smart-led', 'Plan information displays for lobbies, common areas and commercial spaces.')
    ],
    capabilityTitle: 'Connect the building to the application',
    capability: 'Home automation, device interfaces and monitoring applications are scoped as custom solutions. Coordinate equipment selection, electrical work, network readiness and software responsibilities with the people responsible for the property.',
    serviceLinks: [
      { href: '/services/#service-03', label: 'Device integration and embedded engineering' },
      { href: '/services/#service-10', label: 'Implementation and handover' }
    ],
    priorities: ['Review site conditions before confirming installation.', 'Define access and control for each user group.', 'Plan manual operation, maintenance and support ownership.'],
    checklist: ['Property type, zones and intended users', 'Equipment inventory and installation constraints', 'Power, network and available control interfaces', 'Facility contacts and maintenance responsibilities'],
    planningNote: 'A floor plan and zone-by-zone equipment list help connect the proposed experience with practical installation requirements.',
    faqs: [
      { question: 'Can the solution use equipment already installed?', answer: 'An equipment and interface review is needed first. Existing devices, wiring, connectivity and site access determine the feasible integration approach.' },
      { question: 'Who is responsible for installation and maintenance?', answer: 'The delivery plan defines software, hardware, electrical, network and support responsibilities. Confirm these with the property team and relevant installers before rollout.' }
    ],
    relatedIndustries: ['embedded-systems', 'hospitality', 'services']
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & Engineering',
    path: '/industries/manufacturing/',
    icon: 'manufacturing',
    summary: 'Engineering teams, equipment and connected operations.',
    description: 'Bring equipment information and operational workflows into useful applications. Scope embedded engineering, IoT integration, monitoring and business-system connections.',
    seoTitle: 'Manufacturing & Engineering Digital Solutions | AMPIGEN',
    metaDescription: 'Connect equipment, operational data and business applications with AMPIGEN. Explore embedded engineering, IoT integration and custom manufacturing software.',
    h1: 'Digital solutions for manufacturing and engineering',
    intro: 'Make equipment information useful to the teams operating and maintaining it. AMPIGEN brings embedded engineering, IoT integration and custom applications together around the physical environment and the decisions your people need to make.',
    focus: ['Equipment information', 'Operational handoffs', 'Engineering ownership'],
    workflowTitle: 'Connect the data to an operational purpose',
    workflows: [
      { title: 'Equipment visibility', body: 'Identify useful machine signals, available interfaces and the operating conditions in which information must be collected.' },
      { title: 'Actionable workflows', body: 'Define who reviews equipment information, what requires attention and how a finding becomes an assigned task.' },
      { title: 'Business-system handoffs', body: 'Map the operational records that need to reach reporting, maintenance or other business applications without duplicate entry.' }
    ],
    products: [
      product('smart-led', 'Explore workplace information displays where clear on-site communication supports the operating process.')
    ],
    capabilityTitle: 'Engineer around the installed environment',
    capability: 'Equipment monitoring, gateway integration and manufacturing applications are custom development scopes. Review machine interfaces and approved access methods with the equipment owner, then define the application and information flows around them.',
    serviceLinks: [
      { href: '/services/#service-03', label: 'Embedded systems and IoT engineering' },
      { href: '/services/#service-06', label: 'Operational system integration' }
    ],
    priorities: ['Separate monitoring needs from control requirements.', 'Validate against representative equipment and signals.', 'Agree deployment windows and maintenance ownership.'],
    checklist: ['Equipment list and interface documentation', 'Signals, events and decisions they should support', 'Network conditions and permitted system access', 'Operational owners, pilot area and acceptance scenarios'],
    planningNote: 'Choose a bounded pilot around one equipment group or workflow so the information and operational benefit can be assessed before a wider rollout.',
    faqs: [
      { question: 'How is a manufacturing engagement scoped?', answer: 'Start with the operational decision or workflow that needs support. The engineering and software scope follows the equipment, interfaces and data requirements identified during discovery.' },
      { question: 'Can monitoring begin without changing equipment controls?', answer: 'Describe the information you need and available read interfaces. The team assesses a monitoring approach with the equipment owner before any system changes are agreed.' }
    ],
    relatedIndustries: ['embedded-systems', 'properties', 'startups']
  },
  {
    id: 'retail',
    title: 'Retail & Commerce',
    path: '/industries/retail/',
    icon: 'retail',
    summary: 'Retailers, commerce teams and customer-facing operations.',
    description: 'Connect digital discovery with in-store service and follow-up. Explore commerce websites, queue and display products, CRM and custom business applications.',
    seoTitle: 'Retail & Commerce Digital Solutions | AMPIGEN',
    metaDescription: 'Plan retail websites, commerce integrations, queue management and digital displays with AMPIGEN. Connect online discovery with customer service workflows.',
    h1: 'Digital solutions for retail and commerce',
    intro: 'Connect the places where customers discover, enquire and receive service. AMPIGEN combines websites, commerce integrations and business applications with Queue Management and Smart LED for the in-store experience.',
    focus: ['Customer discovery', 'In-store service', 'Enquiry follow-up'],
    workflowTitle: 'Connect the customer journey across channels',
    workflows: [
      { title: 'Digital storefront', body: 'Organize product information, content ownership and enquiry or purchase journeys around the way customers make decisions.' },
      { title: 'In-store communication', body: 'Identify where tokens, counter information and display content can help customers understand the next step.' },
      { title: 'Business follow-through', body: 'Define how enquiries, customer requests and operational records move between store teams, support and business systems.' }
    ],
    products: [
      product('queue-management', 'Evaluate token and counter workflows for service desks and other staffed customer touchpoints.'),
      product('smart-led', 'Review digital signage for product information, promotions and customer communication.')
    ],
    capabilityTitle: 'Connect commerce and customer information',
    capability: 'Commerce websites, CRM workflows, workforce administration and system connections can be scoped as services. Review existing catalogue, inventory and payment systems before confirming which interfaces and custom development the project needs.',
    serviceLinks: [
      { href: '/services/#service-01', label: 'Websites and commerce development' },
      { href: '/services/#service-07', label: 'CRM and business automation' }
    ],
    priorities: ['Make mobile discovery and enquiry journeys clear.', 'Assign content and customer follow-up ownership.', 'Validate handoffs across online and store teams.'],
    checklist: ['Sales channels, locations and customer journeys', 'Product content and catalogue ownership', 'Existing commerce and operational applications', 'Service queues, display locations and content updates'],
    planningNote: 'Bring an example of a customer moving from an online enquiry to a store visit, service interaction or follow-up.',
    faqs: [
      { question: 'Which existing retail systems should we include in discovery?', answer: 'Identify the systems that own product, inventory, sales and customer information. Describe the records and actions that need to connect, then assess the available interfaces.' },
      { question: 'Can a website connect to an existing commerce system?', answer: 'Share the platform and available interfaces. Catalogue ownership, data flows, access and operational responsibilities determine the integration approach.' }
    ],
    relatedIndustries: ['hospitality', 'services', 'properties']
  },
  {
    id: 'services',
    title: 'Service Organizations',
    path: '/industries/services/',
    icon: 'users',
    summary: 'Professional services, customer service and business operations.',
    description: 'Connect enquiries, customer requests and internal handoffs. Plan CRM, workflow automation, in-person service and business applications around your delivery process.',
    seoTitle: 'Digital Solutions for Service Organizations | AMPIGEN',
    metaDescription: 'Connect enquiries, customer requests and team handoffs with AMPIGEN. Explore CRM, automation, queue management and custom service applications.',
    h1: 'Digital solutions for service organizations',
    intro: 'Make each request easier to follow from first contact to completion. AMPIGEN brings CRM, custom applications and workflow automation together with queue and display products for organizations delivering professional or in-person services.',
    focus: ['Request ownership', 'Team handoffs', 'Service visibility'],
    workflowTitle: 'Give each request a clear next step',
    workflows: [
      { title: 'Enquiry and intake', body: 'Define the information needed at first contact and how a request reaches the person responsible for follow-up.' },
      { title: 'Delivery and handoff', body: 'Map assignments, approvals and customer updates, including what happens when a task is delayed or changes scope.' },
      { title: 'Service oversight', body: 'Agree the work status, response information and exception reports that help managers coordinate the team.' }
    ],
    products: [
      product('queue-management', 'Review organized token and counter workflows for facilities delivering in-person services.'),
      product('smart-led', 'Plan customer information displays for reception, waiting areas and service locations.')
    ],
    capabilityTitle: 'Connect teams through the work',
    capability: 'CRM, customer portals, approval workflows, workforce administration and reporting can be scoped around the service process. Connect existing applications where feasible, with defined data ownership and access responsibilities.',
    serviceLinks: [
      { href: '/services/#service-07', label: 'CRM and business automation' },
      { href: '/services/#service-04', label: 'AI and workflow automation' }
    ],
    priorities: ['Assign an owner and next action to each handoff.', 'Review exceptions alongside the normal service path.', 'Define permissions, reporting and operational support.'],
    checklist: ['Service types and intake channels', 'Roles, approvals and customer communication steps', 'Current tools and duplicated information', 'Common delays and representative request scenarios'],
    planningNote: 'Bring one complete request journey, including the documents, decisions and team handoffs involved in getting it resolved.',
    faqs: [
      { question: 'Can an existing CRM remain part of the workflow?', answer: 'Yes, subject to an interface and access review. Identify which system owns customer data and which tasks need integration or additional development.' },
      { question: 'Where is automation a useful starting point?', answer: 'Begin with a repetitive task that has clear inputs, decisions and ownership. Agree exception handling and human review before expanding automation to other work.' }
    ],
    relatedIndustries: ['healthcare', 'retail', 'startups']
  },
  {
    id: 'startups',
    title: 'Startups & Product Teams',
    path: '/industries/startups/',
    icon: 'rocket',
    isAudience: true,
    summary: 'Founders and teams building software or connected products.',
    description: 'Turn a product idea into a focused release and delivery plan. Bring discovery, user experience, software, cloud and embedded engineering into one engagement.',
    seoTitle: 'Product Engineering for Startups & Teams | AMPIGEN',
    metaDescription: 'Build a focused product plan with AMPIGEN. Explore discovery, web and mobile development, cloud architecture and embedded engineering for product teams.',
    h1: 'Product engineering for startups and growing teams',
    intro: 'Turn the business idea into a product people can evaluate and use. AMPIGEN connects discovery, user experience, software development, cloud architecture and embedded engineering around a focused first release and a practical path forward.',
    focus: ['Product scope', 'First-user journeys', 'Release readiness'],
    workflowTitle: 'Build around a clear first use case',
    workflows: [
      { title: 'Problem and audience', body: 'Identify the user, the job they need to complete and the evidence that will help assess the proposed product.' },
      { title: 'Essential journeys', body: 'Define the smallest useful set of workflows, including access, setup, the core task and important failure states.' },
      { title: 'Delivery and ownership', body: 'Bring architecture, deployment, testing and operational responsibilities into the release plan from the beginning.' }
    ],
    products: [],
    capabilityTitle: 'Bring the right engineering disciplines together',
    capability: 'Web, mobile and desktop applications, SaaS platforms and connected-device projects can be scoped through custom development. Establish code ownership, interfaces and acceptance criteria around the product your team intends to build.',
    serviceLinks: [
      { href: '/services/#service-02', label: 'Custom software and product development' },
      { href: '/services/#service-05', label: 'Cloud applications and SaaS' },
      { href: '/services/#service-03', label: 'Embedded systems and IoT engineering' }
    ],
    priorities: ['Prioritize one complete user journey for evaluation.', 'Make technical dependencies and operating costs visible.', 'Agree release criteria, handover and support ownership.'],
    checklist: ['Target users and the problem being solved', 'Core journeys and first-release priorities', 'Existing prototypes, code or technical dependencies', 'Evaluation criteria, budget context and delivery constraints'],
    planningNote: 'A short product brief with example user journeys is more useful at the outset than a long feature list without priorities.',
    faqs: [
      { question: 'Can AMPIGEN continue an existing product?', answer: 'Share the current architecture, source ownership and priority gaps. A code and delivery review helps define what can be extended and what work is needed.' },
      { question: 'How is the first release kept focused?', answer: 'Agree the audience, essential journeys and evidence needed from early use. Prioritize the release against those goals and maintain a separate list of future requirements.' }
    ],
    relatedIndustries: ['embedded-systems', 'services', 'manufacturing']
  }
];

// Keep existing consumers of industry.relatedLinks compatible during the route refresh.
for (const industry of industries) {
  industry.relatedLinks = [
    ...industry.products.map(({ href, title }) => ({ href, label: title })),
    ...industry.serviceLinks
  ];
}
