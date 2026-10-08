# BMTech frontend rebuild

The branch `feat/bmtech-website-rebuild-20261008` rebuilds the website frontend from baseline commit `2db9a1d`. It uses the approved SEO and portfolio recommendations as its content foundation, with new page markup, shared components, CSS and interaction modules. The work is isolated from the earlier implementation checkout.

The project remains a Vite multi-page static website written in plain JavaScript and CSS. The rebuild retains the existing Firebase Hosting configuration and does not introduce Sites, Hercules, a runtime framework, a submission backend, a database or a new hosting project.

## What the rebuild changes

The new frontend gives each page type a layout suited to its content:

| Area | Rebuilt experience |
| --- | --- |
| Home | Company positioning, product families and routes into solutions and engineering services |
| Product catalogue | Search and family filters layered over the full static portfolio |
| Product-family pages | Family introduction, offering navigation, product descriptions and contextual services |
| Solutions | Industry-workflow cards and cross-business solution cards linked to relevant products and services |
| Industries | Sector panels, operating-environment panels and separate workforce, embedded and startup context |
| Services | Capability navigation and ten numbered service rows with descriptive tags |
| Resources | Company-profile feature, practical planning checklists and accessible question/answer disclosures |
| About | Company narrative, delivery principles and the shared delivery process |
| Contact and demo | Fresh form presentation with local validation and visitor-sent draft preparation |
| Shared UI | Rebuilt navigation, footer, icons, typography, responsive layouts and interaction states |

The page structures are new. The content boundaries, route destinations and hosting model continue from the approved implementation.

## Preserved content and behaviour

`src/content.js` remains the shared source for the approved portfolio. It contains 20 offering entries across five families:

| Product family | Offering entries |
| --- | --- |
| Hospitality | Restaurant Solution, Guest House, Hotel, Lodge |
| Healthcare | Hospital, Clinic Automation, Pharmacy, EMR, EHR, PMS, LIS, RIS, SIS |
| Education | School Management App, Parent App |
| Smart & Embedded Systems | Home Automation, Queue Management, Smart LED, IoT Gateway |
| HR & Workforce | HR Solution |

My School remains a brief education-brand note. It is not counted as a third education product, and its relationship to the two apps is not invented. PMS and SIS remain healthcare offerings without guessed expansions. The inventory does not imply equal maturity or separate packaged applications for every entry.

The seven Solutions entries describe business needs and workflows. Industries provide sector context, with startups and product teams treated as an audience. The ten Services entries describe technical and delivery capabilities. These layers link together without replacing one another.

Published copy retains the approved scope. Do not add unsupported modules, integrations, customer counts, performance figures, geography, pricing, launch status, compliance claims or certifications during visual development.

The following remain part of the rebuild contract:

- All 14 routes, their route-specific metadata and meaningful prerendered HTML.
- Semantic fragment IDs and existing legacy destinations, including product, industry, solution, resource and About anchors.
- One header **Book a demo** link, with **About us** and **Contact us** in the Company footer.
- The absence of repeated demo CTA blocks and public address, phone or email blocks.
- **Engineering Intelligence | Transforming Business** and **AI • Cloud • IoT • Automation • Digital Transformation**, plus the supplied logo artwork.
- The linked company-profile PDF and its reproducible generation script.
- Local validation, allowlisted form preselection and visitor-sent email/WhatsApp/copy actions. Preparing a draft does not submit an enquiry or reserve a demo slot.
- The existing SEO environment rules and Firebase static-hosting configuration.

## Source map and editing guide

| File | Responsibility | Typical edit |
| --- | --- | --- |
| `src/content.js` | Approved portfolio, solutions, industries and services | Change a supplied product description or related link |
| `src/components.js` | Shared UI helpers, icons, navigation, footer, inner-page hero and delivery process | Adjust a common component used by several pages |
| `src/site.js` | Home page, page registry and route renderer | Change home-page structure or combine page modules |
| `src/pages/portfolio.js` | Catalogue and product-family pages | Change offering presentation, family navigation or filter markup |
| `src/pages/company.js` | Solutions, Industries, Services, Resources and About | Change a company-page section or planning resource |
| `src/pages/enquiry.js` | Contact/demo templates, enquiry choices and draft destinations | Change a form label, field layout, destination or page introduction |
| `src/navigation.js` | Menu state and desktop/mobile navigation | Change keyboard, pointer or touch menu behaviour |
| `src/catalogue.js` | Product search and family filters | Change matching, filter state or catalogue feedback |
| `src/enquiry-controller.js` | Validation, preselection and draft interactions | Change draft preparation, stale-state handling or copy fallback |
| `src/main.js` | Browser module initialisation | Attach a controller after the static page is ready |
| `src/styles.css` | New visual system and responsive component styles | Change spacing, colour, layout or interaction presentation |
| `src/routes.js` | Shared route registry | Update only when intentionally adding or removing a route |
| `src/seo.js` | SEO environment validation and metadata | Change canonical, social, breadcrumb or indexing logic |

Build and asset responsibilities stay in their existing files:

- `scripts/prerender.mjs` renders the HTML and writes robots, sitemap and build provenance output.
- `scripts/verify-routes.mjs` checks that every built route has distinct metadata and meaningful content.
- `scripts/generate-company-profile.py` reads the catalogue and generates `public/documents/bm-tech-services-company-profile.pdf`.
- `firebase.json` and `.firebaserc` retain the existing static Hosting configuration and project selection.

Keep text in the approved data source where possible. Page modules describe layout and page-specific narrative; controllers add browser behaviour. Changes to page structure must retain destinations used by navigation, contextual links, legacy links and the test suite.

The `contact`, `interests` and `enquiryTypes` exports live in `src/pages/enquiry.js`. The form controller imports them from that module; `src/site.js` re-exports them for compatibility. These are configuration and option data, not public contact-detail blocks.

## Progressive product discovery

The product catalogue ships all 20 entries in its initial HTML. The family and product links remain useful without JavaScript.

Search and filter controls are initially hidden. The catalogue controller reveals them when it can handle interaction, then applies product search and family selection with visible result feedback. A no-match state offers a way to clear filters. With JavaScript disabled, the full catalogue remains visible and the inactive controls remain hidden.

This enhancement must not make product content dependent on an API, a client-side fetch or a search action. Prerendered pages remain the source for visitors, crawlers and no-JavaScript navigation.

## Verification and review

Use the existing project commands:

```bash
npm ci
npm run test:seo
npm run build
npm run verify:routes
npx playwright install chromium
npm test
```

The Node suite exercises SEO configuration and metadata behaviour. The build and route verifier cover the 14 static routes. Browser review should cover:

- Responsive layouts at the widths defined in the Playwright suite, including narrow mobile screens.
- Navigation by pointer, touch and keyboard, with focus management and dismissal.
- All 20 entries on the catalogue and their correct product-family pages.
- Search, family filters, combined filtering, result feedback, clearing and no-match behaviour.
- JavaScript-disabled catalogue content and hidden enhancement controls.
- Unique headings and IDs, valid internal links, semantic and legacy fragments, and the PDF download.
- Form validation, allowed preselection, stale draft invalidation, draft encoding and copy fallback.
- One header demo link and the removal of public contact-detail and repeated CTA blocks.
- Screenshots of every page type, plus reduced-motion behaviour.

These are review requirements, not a record of passing results. Record the actual commands, commit, workflow run and visual-review findings in the rebuild pull request. GitHub Actions builds and tests pull requests and uploads the `website-browser-review` screenshot artifact; it does not deploy the site.

If the catalogue or company-profile generator changes, regenerate the PDF and render every page for visual review. Keep temporary PDF renders and browser-review crops outside the repository.

## Stacked pull request and merge sequence

The rebuild is the third layer of the existing pull-request stack:

| Layer | Branch | Review base |
| --- | --- | --- |
| [PR #4: brand and product experience](https://github.com/bmtechservicesDev/bmtech_website/pull/4) | `feat/brand-product-experience` | `main` |
| [PR #5: content and SEO](https://github.com/bmtechservicesDev/bmtech_website/pull/5) | `feat/industry-portfolio-seo-20261008` | `feat/brand-product-experience` |
| Frontend rebuild | `feat/bmtech-website-rebuild-20261008` | `feat/industry-portfolio-seo-20261008` |

Merge in the order **PR #4 → PR #5 → rebuild**. After PR #4 merges, confirm or retarget PR #5 to `main`, reconcile it with the resulting history and review the remaining content/SEO diff. After PR #5 merges, confirm or retarget the rebuild pull request to `main`, reconcile its history and review the remaining frontend diff. Keep each dependent pull request based on its immediate predecessor until that predecessor has merged.

If an earlier pull request is squash-merged, account for the changed commit ancestry so already-merged changes do not obscure the next review. Rerun the required checks after conflict resolution, base updates or material changes, and review the final commit before merging each layer.

No Firebase deployment was performed as part of this rebuild. The pull requests and CI checks concern repository code and review artifacts; deployment remains a separate operation.

## Hosting and search configuration

The rebuild preserves the Firebase project `bmtech-website`, static `dist/` hosting, route directories, trailing slashes, hashed-asset caching and the fresh-build predeploy hook. Do not overwrite this configuration with a new hosting initialization. No SPA catch-all rewrite is introduced.

Search indexing remains off by default:

```dotenv
SITE_URL=
SITE_INDEXABLE=false
```

An indexable build requires an explicitly verified HTTPS production origin in `SITE_URL` and `SITE_INDEXABLE=true`. The origin cannot contain credentials, a path, a query or a fragment, and cannot be a local origin. An unconfigured preview stays `noindex, follow` without a fabricated canonical or sitemap. A configured preview still stays `noindex` unless indexing is explicitly enabled.

For a later authorised review-channel deployment from a configured Firebase CLI session:

```bash
npm ci
SITE_INDEXABLE=false firebase hosting:channel:deploy review --expires 7d --project bmtech-website
```

Before a later authorised production release, set `SITE_URL` to the verified HTTPS origin and `SITE_INDEXABLE=true` in the build environment, then use the existing command:

```bash
firebase deploy --only hosting --project bmtech-website
```

With the default environment, that production command still publishes a noindex build. Check the returned deployment URL, all 14 routes, final metadata, robots file, sitemap, response headers and draft actions. Compare `/build-info.json` with the reviewed source commit. No credentials or service-account keys belong in the repository.
