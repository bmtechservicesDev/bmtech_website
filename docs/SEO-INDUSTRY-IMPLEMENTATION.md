# SEO and industry portfolio implementation

## Scope and baseline

This change implements the owner’s expanded portfolio and end-to-end digital solution positioning on branch `feat/industry-portfolio-seo-20261008`. It starts from `feat/brand-product-experience` at `7abcf62288db2343da1ea932d4c1153d2a10dc45`, matching the reviewed Firebase preview baseline. It is an additive branch for review; merging and deployment are separate actions.

The approved company name, supplied artwork, tagline, capability line, four header menus and single Book a demo call to action remain the visual and editorial foundation. Public email, phone and address blocks remain removed. Repeated promotional bands and per-card enquiry buttons are not reintroduced.

## Information architecture

| Section | Reader question | Implemented role |
| --- | --- | --- |
| Products | What does BMTech offer? | Five product families, 20 offering entries and dedicated family pages |
| Solutions | Which business need can BMTech address? | Seven outcome-oriented areas with contextual product and service links |
| Industries | Does BMTech understand my sector? | Sector-specific context and cross-industry workforce/embedded applications |
| Services | What engineering work can BMTech deliver? | Ten capabilities spanning discovery, applications, cloud, AI, embedded systems, digital growth, training and support |

### Complete product mapping

| Family | Offerings |
| --- | --- |
| Hospitality | Restaurant Solution, Guest House, Hotel, Lodge |
| Healthcare | Hospital, Clinic Automation, Pharmacy, EMR, EHR, PMS, LIS, RIS, SIS |
| Education | School Management App, Parent App |
| Smart & Embedded Systems | Home Automation, Queue Management, Smart LED, IoT Gateway |
| HR & Workforce | HR Solution |

My School remains an existing education identity and enquiry option. It is not counted as a third education application or silently equated with either app. The existing Restaurant Solution and Clinic Automation names are retained.

The five family pages supply useful category context, offering descriptions, related services and industry links. They avoid creating 20 thin pages around product names for which detailed specifications have not been supplied. Future individual product pages should be based on approved, substantial product information.

### Solutions and industries

Solutions cover hospitality digital operations; healthcare workflow digitalisation; school and parent digital experience; smart spaces and service delivery; workforce operations; business digital transformation and integration; and digital presence and customer growth.

Industries cover hospitality, healthcare, education, property and facilities, manufacturing, retail, and professional services. Startups and growing businesses are identified as an audience spanning industries. Smart and embedded systems and HR/workforce needs are also connected across sectors rather than described as industries themselves.

## Content and implementation changes

- Extracted the shared catalogue into `src/content.js` and the page renderer into `src/site.js`. Browser interaction remains in `src/main.js`, reducing duplicated product names across navigation, forms and pages.
- Added five real HTML routes under `/products/`, with distinct titles, descriptions, H1s and visible product-family breadcrumbs.
- Rewrote Home, Products, Solutions, Industries, Services, Resources and About around the supplied positioning, inventory and credible workflow descriptions.
- Added contextual links between products, business needs, sectors and delivery capabilities. Preserved the previous product, solution and industry anchor destinations where applicable.
- Grouped enquiry choices by product family and connected the selectors to the same catalogue. Contact supports optional product/service preselection; Demo requires it. Unknown choices are rejected and edits invalidate old drafts.
- Made form labels and result copy reflect the actual draft-only behaviour. Preparing a request does not claim that a message was sent or a demo scheduled.
- Added a shared route registry used by Vite, the renderer, sitemap generation and route validation.
- Added environment-driven canonical URLs, social tags, organisation/breadcrumb structured data, robots rules and sitemap generation. Default builds remain noindex, and indexable builds require a verified HTTPS origin.
- Refreshed the public company profile and added a reproducible generator that reads the shared catalogue.
- Extended the existing build/test workflow with SEO configuration checks, all-route validation, catalogue/link checks and responsive browser coverage. The workflow still does not deploy.

## Editorial boundaries and owner inputs

PMS and SIS remain exactly as supplied in the healthcare family. Their full names and product roles need owner confirmation before more specific copy is added. EMR and EHR remain separate entries. The relationship among Guest House, Hotel and Lodge offerings is not assumed to be one product or multiple independent editions.

Published descriptions do not invent release status, prices, clients, certifications, compliance guarantees, integrations, payroll features, measured benefits or testimonials. Existing supported workflow descriptions are retained; newly supplied categories receive conservative scope descriptions. Detailed product screenshots, demonstrable workflows, approved feature matrices and customer evidence can support richer pages later.

The production hostname has not been supplied. Default preview builds therefore remain noindex, without a guessed canonical or sitemap. Production configuration requires the verified origin and an explicit indexable build, followed by response-header verification. See the README for exact environment behaviour.

The forms continue to prepare email/WhatsApp drafts and a copyable brief. A submission endpoint, delivery confirmation and scheduling integration would be separate functional work.

## Verification and review

Use the verification commands in the README. The checks cover SEO configuration and metadata, the 14 prerendered routes, responsive layout, real local links and fragments, the complete 20-entry catalogue, legacy anchors, navigation, allowlisted enquiry preselection and draft interactions.

The draft pull request should target `feat/brand-product-experience` while its existing PR #4 remains open, so reviewers see only this implementation. After that parent PR merges, retarget the new PR to `main`; if the parent is squash-merged or rebased, update this branch’s ancestry before merging.

The branch and pull request are the review deliverables. They do not update the deployed Firebase preview or production website. Build provenance and CI results should be checked against the final commit before any separately requested release.
