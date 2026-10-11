# AMPIGEN website

AMPIGEN is an end-to-end digital solution provider. The website connects five named products with industry requirements, custom software, cloud, AI, embedded systems and implementation services. It is a Vite multi-page static site with plain JavaScript and CSS. Content and metadata are rendered into the initial HTML; the browser adds navigation, product discovery and enquiry preparation.

The [11 October testing-feedback implementation](docs/TESTING-FEEDBACK-20261011.md) records the current product contract, fixes, additional features and release evidence. Earlier reviews in `docs/` are historical records and may describe superseded portfolios or route counts.

## Local development

Requires Node.js 20.19+ or 22.12+ and npm.

```bash
npm ci
npm run dev
```

Open the URL printed by Vite. `npm run build` creates `dist/`; `npm run preview` serves that output. Each built route has its own HTML entry. The project has no runtime framework or submission backend.

## Products and industries

The public product catalogue contains **exactly these five products, in this order**. The homepage, header, footer, product hub, enquiry choices and company profile use the same inventory.

| Product | Canonical route | Domain icon |
| --- | --- | --- |
| Clinic Automation | `/products/clinic-automation/` | Healthcare |
| Restaurant Solution | `/products/restaurant-solution/` | Hospitality |
| My School | `/products/my-school/` | Education |
| Queue Management | `/products/queue-management/` | Queue and counter |
| Smart LED | `/products/smart-led/` | Display |

The industry hub at `/industries/` uses unnumbered cards, each linking to its own page. Industry pages explain workflows, relevant products or custom services, implementation considerations and FAQs.

| Industry or audience | Canonical route |
| --- | --- |
| Healthcare | `/industries/healthcare/` |
| Hospitality | `/industries/hospitality/` |
| Education | `/industries/education/` |
| Embedded Systems | `/industries/embedded-systems/` |
| Residential & Commercial Properties | `/industries/properties/` |
| Manufacturing & Engineering | `/industries/manufacturing/` |
| Retail & Commerce | `/industries/retail/` |
| Service Organizations | `/industries/services/` |
| Startups & Product Teams | `/industries/startups/` |

Other canonical pages are `/`, `/products/`, `/solutions/`, `/services/`, `/resources/`, `/about/`, `/contact/` and `/book-a-demo/`. Together with the industry hub and detail pages, there are **23 canonical pages**.

Products describe the five named offerings; seven Solutions connect business needs with relevant products and services; Industries explain the operating context; ten Services describe engineering and delivery capabilities. Wider healthcare, accommodation, workforce, home automation and parent-application requirements are scoped through solutions and services. Copy must not imply unverified product bundles, integrations, regulatory credentials, customer results or pricing. An additional parent application is not represented as an included part of My School.

The header remains **Products · Industries · Solutions · Resources · Book a demo** with one primary action. On a product or industry detail page, that action carries the relevant selection into the demo form. The footer retains five columns, with About us and Contact us under Company. Public contact-detail blocks remain removed.

## Discovery and backward compatibility

The product hub supports combined workflow search and industry filtering, a live result count, clear/reset actions, a useful empty state and **Copy search link**. The `q` and `industry` URL parameters restore a shared selection. Clipboard denial exposes a selectable link. Search controls appear only after initialization; without JavaScript, all five product cards and their links remain available.

Each product page includes workflow areas, an interactive implementation checklist, FAQs and related expertise. Checklist state stays in the current page; it is not saved or sent. Product industry filters and industry-page recommendations are checked for agreement.

Five previously published product-family URLs remain built as compatibility pages:

| Old route | Default destination |
| --- | --- |
| `/products/hospitality/` | `/industries/hospitality/` |
| `/products/healthcare/` | `/industries/healthcare/` |
| `/products/education/` | `/industries/education/` |
| `/products/embedded-systems/` | `/industries/embedded-systems/` |
| `/products/hr/` | `/solutions/#workforce-operations` |

Recognised product fragments on those URLs lead directly to the corresponding new product page. This mapping is deliberately handled in the browser because URL fragments are not sent to the server. With JavaScript disabled, each compatibility page provides explanatory links. Compatibility pages are `noindex, follow`, have an appropriate canonical target and are excluded from the sitemap. They do not accept arbitrary redirect destinations. The original product-hub and industry-hub fragment bookmarks remain usable.

## Content and source map

| File | Responsibility |
| --- | --- |
| `src/products.js` | Five products, industry associations, SEO copy, workflows, checklists and FAQs |
| `src/industry-content.js` | Nine industry/audience records, recommendations and sector-specific content |
| `src/content.js` | Seven solutions, ten services and shared catalogue exports |
| `src/components.js` | Shared icons, navigation, footer, breadcrumbs and reusable UI |
| `src/site.js` | Homepage, page registry and renderer |
| `src/pages/portfolio.js` | Product hub and five product detail pages |
| `src/pages/industries.js` | Industry hub and nine detail pages |
| `src/pages/company.js` | Solutions, Services, Resources and About templates |
| `src/pages/enquiry.js` | Contact/demo forms and existing draft destinations |
| `src/enquiry-context.js` | Allowlisted choices, legacy interest mappings, limits and preparation prompts |
| `src/pages/legacy.js`, `src/legacy-routes.js` | Compatibility pages and fixed destination mappings |
| `src/navigation.js` | Desktop hover/keyboard and mobile disclosure navigation |
| `src/catalogue.js` | Search, industry filtering, shareable state and product checklists |
| `src/enquiry-controller.js` | Validation, contextual preselection and draft/copy/download actions |
| `src/main.js` | Browser entry, compatibility routing and controller initialization |
| `src/styles.css` | Shared brand, layout, responsive and accessibility styles |
| `src/product-styles.css`, `src/industry-styles.css`, `src/enquiry-styles.css` | Focused styles for the new journeys |
| `src/routes.js` | 23 canonical routes and 28 total build routes |
| `src/seo.js` | Environment validation, metadata, canonical URLs, social tags and structured data |
| `scripts/prerender.mjs` | Initial HTML, robots/sitemap generation and build provenance |
| `scripts/verify-routes.mjs` | Built-route metadata and content checks |
| `scripts/generate-company-profile.py` | Reproducible six-page company profile |
| `public/documents/ampigen-company-profile.pdf` | Public profile aligned with the approved catalogue |

The brand is **AMPIGEN**, with **Engineering Intelligence | Transforming Business** and **AI • Cloud • IoT • Automation • Digital Transformation**. The supplied artwork is preserved at `public/brand/ampigen-logo.png`; the browser uses the existing WebP asset. The logo's orbit, wordmark, tagline and proportions remain intact. Typography uses the system stack without an external font request.

Edit product and industry content in their central records. Keep recommendations and filters aligned, and retain published URL/fragment compatibility when reorganizing content. The company-profile generator reads the same catalogue and checks the exact five product IDs, names and order.

## SEO environment

Unconfigured builds default to a non-indexable preview. `.env.example` contains:

```dotenv
SITE_URL=
SITE_INDEXABLE=false
```

`SITE_URL`, when supplied, must be an HTTPS origin without credentials, a path, query or fragment. The SEO helper normalizes a trailing slash. `SITE_INDEXABLE` accepts only `true` or `false` and defaults to `false`. An indexable build rejects a missing or local origin.

| Build configuration | Search behaviour |
| --- | --- |
| No origin, default settings | `noindex, follow`; no invented canonical, sitemap or absolute social-image URL |
| Verified origin, `SITE_INDEXABLE=false` | Preview remains `noindex`; metadata uses the origin; no sitemap |
| Verified origin, `SITE_INDEXABLE=true` | Canonical pages are indexable; sitemap contains 23 canonical URLs; compatibility pages remain `noindex` |

Every built page has its own title, description and H1 in the initial HTML. Canonical pages have contextual internal links. Organization and applicable BreadcrumbList structured data avoid fabricated ratings, prices, customers or credentials. Robots rules permit crawlers to read `noindex`; they do not use crawl blocking as a substitute. Canonical tags do not override a `noindex` directive or response header.

The established production origin is `https://ampigen.web.app`. Use the explicit production environment values below for a release; keep temporary review channels non-indexable.

## Enquiry and demo behaviour

Forms validate locally and **prepare a visitor-sent draft**. They do not submit to a server, confirm delivery or reserve a time slot. Actions are labelled **Prepare enquiry** and **Prepare demo request**.

Both forms offer five Products, ten Services & digital transformation choices, and **Not sure yet**. Demo requests require an interest; general enquiries allow an optional interest. Industry is editable and optional. Product/industry query values are allowlisted; unknown or markup-bearing values cannot become injected form options. Legacy interest links map to appropriate current product or service choices.

Product- and industry-specific prompts help visitors describe their workflow. Required fields, consent, length limits, optional-field limits and invalid selections are checked before preparing a brief. The message field shows its character count. Changing a source field invalidates the previous brief and download link.

Visitors can open an email draft, prepare a WhatsApp message, copy the enquiry or **download the same brief as a `.txt` file**. Sending remains a visitor action in the chosen application. Clipboard failure exposes selectable text. Download object URLs are revoked when a draft changes. Preparation, copying and downloading do not transmit the details or persist them in browser storage.

Draft destinations remain in the `contact` object in `src/pages/enquiry.js`. The established email/WhatsApp destinations are unchanged and are not shown as standalone contact blocks. No visitor database, automatic email delivery, analytics tracking or live AI service is introduced. A future automated lead flow requires an approved endpoint, operational ownership and suitable privacy information. API secrets must never be embedded in frontend code.

## Verification

```bash
npm ci
npm run test:seo
npm run build
npm run verify:routes
npx playwright install chromium
npx playwright test
```

The **12 Node tests** cover preview/production SEO settings, safe metadata, structured data, route inventory, exact product order, product/industry agreement and legacy URL handling. The route verifier checks **28 built pages: 23 canonical and 5 compatibility pages**.

The **47 Playwright cases** cover all canonical pages at 320, 375, 480, 768, 1024, 1280, 1440 and 1920 pixels; navigation and keyboard behaviour; the original logo fingerprint and placement; action contrast; local links and fragments; catalogue discovery and sharing; contextual enquiries, downloads and stale-draft handling; and JavaScript-disabled access. Full-page screenshots at 375 and 1440 pixels and targeted navigation captures support visual review. Passing these checks does not certify complete accessibility or measure production Core Web Vitals.

GitHub Actions runs on pull requests and pushes to `main`, performs the checks and uploads a `website-browser-review` artifact. A feature-branch push alone does not trigger the workflow. CI does not deploy. See the specific PR/run for results; this command list is not evidence that a later commit has passed.

To regenerate the profile with Node.js, Python, ReportLab and Pillow installed:

```bash
python3 scripts/generate-company-profile.py
```

The generator enforces six pages and the exact five-product inventory. Render and visually inspect all six pages after changing the generator or its content. The old BM Tech Services PDF URL has an existing Firebase 301 redirect to the AMPIGEN profile; local static previews do not emulate that Hosting rule. Keep intermediate render files outside the repository.

## Hosting and release

The Firebase project is `bmtech-website` (project number `74431502417`), the Hosting site/target is `ampigen`, and the repository is `bmtechservicesDev/bmtech_website`. The existing production site is `https://ampigen.web.app`. Reuse it; do not initialize a replacement project or recreate the site.

`firebase.json` retains the original Hosting/review configuration. `firebase.ampigen.json` selects only the `ampigen` target mapped in `.firebaserc`. Static route directories, trailing slashes, immutable hashed assets and the company-profile redirect are preserved. There is no SPA catch-all rewrite. `/build-info.json` uses `no-store` and records the source revision, source state and UTC build time.

For an authorized temporary review-channel deployment from the existing authenticated Firebase session:

```bash
npm ci
SITE_URL="" SITE_INDEXABLE=false firebase hosting:channel:deploy review --expires 7d --project bmtech-website
```

Use the review URL returned by Firebase and check the current route inventory and draft actions.

For a separately authorized production release of the reviewed source:

```bash
npm ci
SITE_URL=https://ampigen.web.app SITE_INDEXABLE=true \
  firebase deploy --only hosting:ampigen \
  --config firebase.ampigen.json --project bmtech-website
```

Both environment values must be on the deploy command because the predeploy hook builds fresh output. The production guard requires these exact values before building. Confirm that deployed `/build-info.json` matches the reviewed source commit with `sourceState: "clean"`; then verify canonical/compatibility routes, logo assets, the PDF redirect, sitemap, robots and response headers. Green CI and checked-in configuration alone do not establish deployment.

Do not commit Firebase credentials or service-account keys. This release does not add a hosting project, database or backend, and does not migrate the website to another platform.
