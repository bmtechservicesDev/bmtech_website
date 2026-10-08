# BM Tech Services website review — 5 October 2026

## Evidence and scope

Reviewed the supplied [Firebase review site](https://bmtech-website--review-cmk5idw7.web.app/) in a browser, capturing the home, navigation, product and contact views. Inspected repository history, the open brand/product PR, all eight page templates, responsive CSS, enquiry logic, prerendering and build workflow. The starting feature-branch commit was `7c193fb5a3e269b5bffa769cf1f75af548abc519`.

The deployed review shows the earlier dark dropdown menus. The current repository already contains a light two-column mega menu. This refinement builds on that newer work and preserves the approved logo, navy/cyan/orange palette, single header demo button and removed hero illustrations/CTA sections.

## Findings and changes

| Observed issue | Resulting improvement |
| --- | --- |
| Product cards emphasize generic decorative windows and offer little next-step guidance. | Content-led cards explain relevant workflows and include an enquiry link that selects the offering and request type. |
| The company-profile portfolio is incomplete on the website. | Add Smart LED, Queue Management, Website Development & Hosting, and Domain Training & Education; retain My School and IoT Gateway. |
| CRM and digital marketing are difficult to find among broad capabilities. | Give both dedicated service cards with practical scope and contextual links. |
| Desktop header gets crowded at tablet widths. | Switch to tap navigation at 1100px and preserve Escape, focus return and outside dismissal. |
| A first pointer click closes a dropdown that hover just opened. | Keep it open on the first pointer click; retain subsequent toggle and keyboard behavior. |
| A large contact hero delays access to the form. | Shorten the hero, improve field order and show the form before contact details on smaller screens. |
| A general enquiry defaults to a product-demo request. | Default to General enquiry; retain allowlisted contextual selections. |
| Customers lack a shareable overview on the Resources page. | Publish the finished six-page company profile PDF through Resources and the footer. |
| Repository updates can be confused with an older Firebase review deployment. | Include a public build manifest with source commit, source state and build timestamp. |

## Commercial and delivery positioning

The site presents a single partner for discovery, design, development, integration, deployment and improvement. Capabilities span websites, web/mobile/desktop applications, AI/ML and automation, embedded systems and IoT, cloud/SaaS, consulting, CRM and digital marketing. Products and specialist solutions are described as workflow areas for a requirement discussion, with specifications and availability agreed during discovery.

The website introduces no invented customer logos, testimonials, performance metrics, prices or certifications. The enquiry flow validates and prepares a brief; the visitor must send the email or WhatsApp message. No submission backend, enquiry database or live AI service is configured.

## Validation and release

Syntax, static build, prerendered metadata and diff checks run locally. Browser checks cover every route from phone through large desktop, menu behavior, selected enquiries, validation, draft freshness, email/WhatsApp encoding, clipboard fallback, reduced motion, local assets and the PDF download. GitHub Actions produces screenshots for visual inspection.

This workspace cannot install Chromium or serve a local preview to the cloud browser, so browser execution uses the existing GitHub Actions workflow. Final test results and screenshot-review evidence are recorded on PR #4 after that run. The supplied Firebase URL remains on its prior deployment until the authenticated owner refreshes the review channel using the README commands. The review channel can be published without merging the PR or changing production.

Before adding broader commercial claims, obtain approved product specifications, evidence from completed projects, the canonical domain, and any required privacy wording for a future server-side enquiry service.
