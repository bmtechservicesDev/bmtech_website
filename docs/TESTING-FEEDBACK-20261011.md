# AMPIGEN testing-feedback implementation — 11 October 2026

## Outcome and release scope

This change implements the four observations in the supplied **Website Testing Feedback.docx** and adds focused product discovery, industry content and enquiry preparation features. The public product inventory is now five named products, backed by nine dedicated industry/audience pages and the existing end-to-end engineering services.

The work is on `feat/ampigen-market-ready-20261011`, based on the verified deployed revision `e22cd579c00b5ae6650c0fc5aee5a99e2a085223`. Before implementation, `https://ampigen.web.app/build-info.json` reported that revision, `sourceState: "clean"`, and build time `2026-10-09T04:37:47.705Z`.

At the baseline check, GitHub `main` was `073f5e51ae953b56edad4dcaeaf7aaf084fa110e`, and [PR #8](https://github.com/bmtechservicesDev/bmtech_website/pull/8) was still open and draft. Consequently, this branch includes the already deployed AMPIGEN production configuration from that earlier branch. Review that relationship before merging; do not assume PR #8 has merged. This change does not itself merge, deploy, create a Firebase resource or alter billing.

## Source observations and acceptance

The one-page feedback document was read as text and rendered to inspect both embedded screenshots. Its screenshots predate the verified live baseline, so fixes were applied to the current source rather than recreating the older layout.

| Observation | Implemented behaviour | Acceptance evidence |
| --- | --- | --- |
| Products must contain only Clinic Automation, Restaurant Solution, My School, Queue Management and Smart LED, in that order | A central five-record catalogue drives the homepage, Products menu, footer, catalogue, detail pages, enquiry choices, About/Resources copy and company profile | Independent browser and Node inventories assert exact names, order and domain icons; the PDF generator also enforces the five IDs/names/order |
| Use icons appropriate to the industry/domain | Healthcare, hospitality, education, queue/counter and LED/display icons accompany the five products; industry cards use relevant domain icons | Icon identifiers checked in the browser; desktop/mobile screenshots visually reviewed |
| Remove industry numbering | Industry cards and navigation present readable names and descriptions without visible numeric prefixes | Industry hub/card assertions and screenshot review; hidden legacy fragment IDs remain for old bookmarks |
| Education and every other industry must open a dedicated page | All nine industry cards, menu items and footer links open dedicated canonical routes; Education opens `/industries/education/` | Browser checks exercise every destination, desktop/mobile keyboard navigation and contextual demo links |

Product ordering is consistent wherever products are listed. Industry recommendations may show the relevant subset, preserving that same relative order. Startups & Product Teams has an explicit custom engineering path rather than an invented packaged product recommendation.

## Information architecture and content decisions

### Five clear product destinations

| Product | Route | Content focus |
| --- | --- | --- |
| Clinic Automation | `/products/clinic-automation/` | Reception, consultation records and billing workflows |
| Restaurant Solution | `/products/restaurant-solution/` | Ordering, kitchen handoffs and checkout |
| My School | `/products/my-school/` | School administration and communication needs |
| Queue Management | `/products/queue-management/` | Joining a queue, counter operations and service displays |
| Smart LED | `/products/smart-led/` | Display use, content updates and installation/integration requirements |

Each page has a distinct title, description, H1, workflow overview, four-point implementation checklist, FAQs and contextual internal links. The wording helps a prospective buyer assess fit and prepare a useful discussion without asserting unverified integrations, commercial bundles or performance results.

### Nine industry and audience destinations

Healthcare, Hospitality, Education, Embedded Systems, Residential & Commercial Properties, Manufacturing & Engineering, Retail & Commerce, Service Organizations, and Startups & Product Teams now each have a dedicated page. Content covers the sector's workflow, related products or services, delivery priorities and project preparation. The pages are more than duplicated product lists.

The original end-to-end positioning remains: products can be combined with custom applications, cloud, AI, embedded engineering, integration, websites, training and ongoing support. Broader hospital/pharmacy, accommodation, HR/workforce, home automation and additional parent-application requirements remain accessible through industry, solution and service content. They are not presented as extra approved products. My School copy does not claim an additional Parent App is included.

Seven Solutions and ten Services are retained. About, Resources and the downloadable six-page company profile have been updated to agree with this model. No new customer logos, statistics, certifications, reviews or prices were invented.

## Additional features delivered

| Feature | Visitor benefit | Behaviour and boundaries |
| --- | --- | --- |
| Workflow search plus industry filtering | Helps visitors find relevant products quickly | Combines a text query and allowlisted industry, announces the result count and offers clear/reset controls |
| Shareable discovery links | Lets a buyer send a useful shortlist to colleagues | `q` and `industry` URL state restore the same results; clipboard denial exposes a selectable URL |
| Useful empty states | Supports requirements beyond the packaged catalogue | Links to engineering services and industry guidance instead of ending the journey |
| Product implementation checklists | Helps prospects prepare users, workflows and dependencies | Four editable points and a completion count on each product page; no persistence or transmission |
| Contextual Book a demo action | Reduces repetition between discovery and enquiry | Carries the product or industry into the existing single header CTA; the visitor can change it |
| Tailored enquiry preparation prompts | Improves the information a prospective customer can provide | Product-specific questions and optional industry context change with the visitor's selection |
| Downloadable enquiry brief | Supports internal review and later follow-up | Downloads the same prepared text used for email, WhatsApp and copy; editing a source field invalidates stale outputs |
| Improved enquiry validation | Gives clearer corrections before drafting | Required fields, consent, field lengths, optional fields and unsupported selections are checked; errors are associated with inputs |
| Stronger Resources page | Gives visitors practical preparation material | Planning resources, implementation considerations, FAQs and a consistent company profile |

The forms remain visitor-sent drafts. Preparing or downloading a request does not deliver a lead or book a demonstration time. Existing email and WhatsApp destinations are preserved. No live message was sent during testing, and no backend, local-storage lead collection or tracking service was added.

## URL continuity and SEO

The build now contains **23 canonical pages and five compatibility pages**. Production metadata uses the existing `https://ampigen.web.app` origin when built with `SITE_URL=https://ampigen.web.app SITE_INDEXABLE=true`.

The old Hospitality, Healthcare, Education, Embedded Systems and HR product-family URLs remain accessible. Known fragments resolve to their corresponding current product or industry/service destination. Unknown or malformed fragments use a fixed relevant fallback; arbitrary redirect URLs are not accepted. The former product-hub and industry-hub fragment links are retained.

Family URLs covered multiple former offerings, so a single server redirect would lose some fragment-specific product destinations. The compatibility pages use browser routing with accessible fallback links, `noindex, follow`, appropriate canonical targets and sitemap exclusion. The existing server-side 301 for the former company-profile PDF remains unchanged.

Canonical pages have prerendered content, distinct metadata, internal links, applicable breadcrumb data and truthful Organization data. Preview builds remain non-indexable. The production sitemap contains only the 23 canonical URLs. These changes improve crawlable structure and content consistency; they do not guarantee rankings or establish measured search traffic.

## Verification completed

| Gate | Result |
| --- | --- |
| Dependency installation | `npm ci` passed using the existing lockfile |
| Production build | `SITE_URL=https://ampigen.web.app SITE_INDEXABLE=true npm run build` passed |
| SEO/content contract | **12/12 Node tests passed** |
| Built-route verification | **28/28 routes passed**, each with distinct metadata and one H1 |
| Browser regression suite | **47/47 Playwright cases passed**; final run completed in 47.3 seconds |
| Responsive coverage | All 23 canonical pages at **320, 375, 480, 768, 1024, 1280, 1440 and 1920 px**; no horizontal overflow or uncaught page errors |
| Industry journey review | Hub plus nine pages at desktop/mobile; cards, submenu order, Escape/focus restoration, FAQs and all nine footer destinations checked |
| Brand integrity | Original PNG SHA-256 and responsive logo placement verified; approved wording and single header CTA preserved |
| No-JavaScript access | Product catalogue, industry destinations and compatibility links remain readable/usable |
| Company profile | All **six pages** rendered and visually inspected; five products, seven solutions, ten services and nine industry contexts aligned |
| Patch hygiene | `git diff --check` passed before release preparation |

The browser run used Playwright 1.63 and Chromium 153.0.8010.12. The configured browser CDN returned an unavailable page in this execution environment, so the matching headless-shell archive was obtained from the official Chrome for Testing Google Storage origin. Browser version and launch were verified; no dependency, lockfile or CI installer change was needed.

The first full browser run exposed a genuine catalogue initialization defect: an empty fragment produced an empty string where a DOM element or `null` was required. This was repaired and the complete suite rerun successfully. An older CTA test was also updated to assert the exact new contextual destinations. Review corrected product/industry recommendation mismatches, clarified the additional Parent App scope, and simplified the Manufacturing H1 wrapping.

Full-page screenshots at 375 and 1440 pixels and targeted menu/focus captures were inspected. Some initial tall screenshots had compositor timing or sticky-header capture artefacts; final captures and viewport checks are used for visual sign-off. Browser coverage is Chromium and the listed viewports, not a physical-device matrix or a full accessibility certification. No production Core Web Vitals or live lead delivery claim is made.

The profile checksum at this release is `662167e8a6a4411aad7764a9f1b974e8fccdb4909ae3bbdd78e436201425c06d` (SHA-256). Intermediate document extraction, PDF renders, local screenshots and logs remain outside tracked source. GitHub CI uploads the browser evidence as `website-browser-review`; the exact PR and workflow run are the remote verification record.

## Release and next business decisions

This implementation is ready for source/product review and an authorized release. The new branch has not been deployed by this task. The existing AMPIGEN Hosting site and original project are preserved. After merging the reviewed change, use the explicit production command in the README and verify deployed build provenance, the canonical routes, old URLs, PDF redirect and indexability.

The next improvements with the clearest business value depend on real business inputs:

1. **Reliable lead capture:** choose a managed enquiry endpoint or CRM, confirm the inbox owner and response process, then implement server-side delivery, abuse controls and delivery monitoring. This would remove reliance on a visitor finishing a draft in another app.
2. **Product proof:** supply approved screenshots, demo videos, deployment/support details and attributable customer evidence. Add these to the appropriate product and industry pages only when verified and cleared for publication.
3. **Conversion and search measurement:** choose the analytics approach and privacy wording, configure ownership in search tools, and measure discovery-to-enquiry behaviour before choosing experiments. Avoid collecting personal enquiry text in analytics.
4. **Real scheduling:** connect an approved calendar/scheduling service if the business can offer actual available slots and confirmations.
5. **Measured performance and wider access:** assess deployed Core Web Vitals and priority physical devices/assistive technologies, then make changes against observed issues.

These are follow-on decisions, not hidden dependencies of the completed document fixes. They do not justify claiming a working CRM, automatic lead delivery, live booking, verified customer outcomes or guaranteed SEO performance in this release.
