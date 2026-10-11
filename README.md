# AMPIGEN website

AMPIGEN is an end-to-end digital solution provider. The website presents industry software, smart and embedded systems, and the engineering services that connect them. It is a lightweight Vite multi-page static site with plain JavaScript and CSS, with no runtime framework or submission backend.

The AMPIGEN brand refresh on `feat/ampigen-brand-refresh-20261008` starts from merged main commit `36399e8b3fd542b1b1d427f3bffcb58351460bf9`. It applies the supplied AMPIGEN identity to the website and company profile while retaining the approved portfolio, 14 routes, interactions and existing Firebase Hosting project. See [AMPIGEN rebrand](docs/AMPIGEN-REBRAND.md) for the brand scope, preserved technical identifiers and release checks. [Website rebuild](docs/WEBSITE-REBUILD.md) records the preceding frontend architecture work.

## Local development

Requires Node.js 20.19+ or 22.12+.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. `npm run build` produces `dist/`; `npm run preview` serves the production output. Each route has its own HTML entry file. The build renders page content and metadata into the HTML, and browser JavaScript attaches navigation, product search/filter and enquiry interactions.

## Pages and portfolio

| Route | Purpose |
| --- | --- |
| `/` | Company positioning and the five portfolio families |
| `/products/` | Product catalogue organised by family, with enhanced search and filters |
| `/products/hospitality/` | Restaurant Solution, Guest House, Hotel and Lodge |
| `/products/healthcare/` | Hospital, Clinic Automation, Pharmacy, EMR, EHR, PMS, LIS, RIS and SIS |
| `/products/education/` | School Management App and Parent App, with the existing My School identity retained |
| `/products/embedded-systems/` | Home Automation, Queue Management, Smart LED and IoT Gateway |
| `/products/hr/` | HR Solution |
| `/solutions/` | Seven business needs connected to relevant products and services |
| `/industries/` | Industry context, including cross-industry embedded and workforce needs |
| `/services/` | Ten engineering and delivery capabilities |
| `/resources/` | Downloadable company profile and project planning guidance |
| `/about/` | Company positioning and delivery approach |
| `/contact/` | Enquiry brief and draft preparation |
| `/book-a-demo/` | Product demo request and draft preparation |

The catalogue contains 20 offering entries. This is an editorial inventory, not a claim that every entry is a separate packaged application or has the same maturity. PMS and SIS remain unexpanded pending owner confirmation. My School is retained without assuming how it relates commercially to the School Management App and Parent App. Published features are limited to the supplied scope and existing verified website descriptions.

The header remains **Products · Industries · Solutions · Resources · Book a demo**. Products are named offerings; Solutions describe business needs; Industries explain sector context; Services describe engineering work. The footer has five columns, with About us and Contact us under Company. Public contact-detail blocks remain removed.

The product catalogue uses progressive enhancement: the initial HTML contains all 20 entries and their family links. Search and family-filter controls remain hidden until their browser controller is ready. With JavaScript disabled, visitors can still read every offering and follow its links; no inactive search controls are shown.

## Content and source map

| File | Responsibility |
| --- | --- |
| `src/content.js` | Product families, offering descriptions, solutions, industries and service catalogue |
| `src/components.js` | Shared UI helpers, icons, navigation, footer, page introductions and delivery process |
| `src/site.js` | Home page, page registry and route rendering |
| `src/pages/portfolio.js` | Product catalogue, search/filter markup and five product-family pages |
| `src/pages/company.js` | Solutions, Industries, Services, Resources and About page templates |
| `src/pages/enquiry.js` | Contact/demo templates, shared enquiry choices and draft destinations |
| `src/navigation.js` | Desktop and mobile navigation behaviour |
| `src/catalogue.js` | Progressive product search and family filtering |
| `src/enquiry-controller.js` | Form validation, allowlisted preselection and visitor-sent draft preparation |
| `src/main.js` | Browser entry point that initialises the interaction modules |
| `src/styles.css` | Rebuilt visual system, responsive layouts, component and accessibility styles |
| `src/routes.js` | Shared registry of all 14 routes |
| `src/seo.js` | Environment validation, page metadata, canonical URLs, social tags and structured data |
| `scripts/prerender.mjs` | Static HTML rendering, robots/sitemap output and build provenance |
| `scripts/verify-routes.mjs` | Checks that every built route contains distinct metadata and meaningful content |
| `scripts/generate-company-profile.py` | Reproducible company profile generated from the shared content catalogue |
| `public/documents/ampigen-company-profile.pdf` | Publicly linked six-page AMPIGEN company profile |

The public-facing brand is **AMPIGEN**. Shared brand copy uses **Engineering Intelligence | Transforming Business** and **AI • Cloud • IoT • Automation • Digital Transformation**. The supplied original PNG is preserved at `public/brand/ampigen-logo.png`; brand assets are in `public/brand/`. The company-profile generator embeds that original image without distortion and uses a PDF clipping viewport around the artwork to remove its outer white placement margins. Fonts use the system stack and no external font request is required. The private npm package label is `ampigen-website`.

Edit approved offering copy in `src/content.js`; edit page structure in the appropriate `src/pages/` module or the home page in `src/site.js`. Shared UI changes belong in `src/components.js`, presentation in `src/styles.css` and browser interactions in their dedicated controller. Keep existing route and fragment destinations when reorganising content.

For the content rationale, scope decisions and remaining owner inputs, see [SEO and industry implementation](docs/SEO-INDUSTRY-IMPLEMENTATION.md). The [Website rebuild](docs/WEBSITE-REBUILD.md) describes the current frontend architecture. These and the earlier [UI/UX](docs/UI-UX-REVIEW.md), [brand enhancement](docs/BRAND-UX-ENHANCEMENT.md) and [market-readiness](docs/MARKET-READINESS-REVIEW.md) reviews are historical records. They retain the brand names, route counts and source references that applied when written; the [AMPIGEN rebrand](docs/AMPIGEN-REBRAND.md) documents the current identity.

## SEO environment

No production hostname is assumed. Copy the keys in `.env.example` into the build environment when a domain has been verified:

```dotenv
SITE_URL=
SITE_INDEXABLE=false
```

`SITE_URL`, when supplied, must be a valid HTTPS origin without credentials, a path, a query or a fragment. A trailing slash is normalised. `SITE_INDEXABLE` accepts only `true` or `false`; it defaults to `false`. An indexable build fails if its origin is missing or local.

| Build configuration | Search behaviour |
| --- | --- |
| No origin, default settings | `noindex, follow`; no invented canonical, sitemap or absolute social image URLs |
| Verified origin, `SITE_INDEXABLE=false` | Preview stays `noindex`; canonical, social and applicable structured metadata use the configured origin; no sitemap |
| Verified origin, `SITE_INDEXABLE=true` | Indexable metadata, canonical URLs, absolute social URLs, applicable structured data, a 14-route sitemap and a robots sitemap declaration |

Robots rules allow crawlers to fetch pages and read their `noindex` directive. Do not block crawling as a substitute for preview `noindex`. Hosting response headers may also restrict indexing; verify those separately before any future production launch. Canonicals do not override a `noindex` response header or HTML directive.

Every page has a distinct title, description and H1 in its initial HTML. Product family pages have their own routes and contextual internal links. Structured data describes the organisation and applicable breadcrumb trails without ratings, prices or unverified credentials.

## Enquiry and demo behaviour

The forms validate inputs locally and **prepare a draft**. They do not submit to a server, confirm delivery or reserve a demo slot. The action labels are **Prepare enquiry** and **Prepare demo request**.

Both forms offer the shared product/service choices. Demo requests require a selection; general enquiries allow an optional selection. Query parameters are allowlisted. Editing a source field hides a stale prepared draft. The visitor can open an email draft, prepare a WhatsApp message or copy the enquiry, and must complete sending in the chosen application.

Draft destinations are held in the `contact` object in `src/pages/enquiry.js` and imported by `src/enquiry-controller.js`. The contact and choice exports are also re-exported by `src/site.js` for compatibility. The brand refresh retains the existing email and WhatsApp destinations; replacement endpoints have not been supplied. They are not presented as public contact-detail blocks. No visitor database, automated email delivery or live AI service is introduced. If server-side delivery is implemented later, use a secure endpoint and appropriate privacy information. Never put API secrets in frontend code.

## Verification

```bash
npm run test:seo
npm run build
npm run verify:routes
npx playwright install chromium
npm test
```

The 10 Node tests cover SEO configuration validation, metadata replacement, URL escaping, sitemap output, structured data and cross-route AMPIGEN identity. The route verifier checks all 14 built pages. The 38 Playwright cases cover responsive pages at 320, 375, 480, 768, 1024, 1280, 1440 and 1920 pixels, navigation, local link destinations, the portfolio, legacy anchors and enquiry interactions. They also verify the original logo fingerprint, responsive artwork placement, action text contrast, keyboard focus, product search/filter and the JavaScript-disabled catalogue. The suite produces 121 screenshots for visual review. See the pull request and its workflow run for results; the commands listed here do not establish that a particular commit has passed.

GitHub Actions runs on pull requests and pushes to `main`, builds the website, runs these checks and uploads the `website-browser-review` screenshot artifact. The workflow does not deploy. A feature-branch push alone does not trigger this workflow; a draft pull request can run the same review checks.

To regenerate the company profile with Node.js, Python, ReportLab and Pillow installed:

```bash
python3 scripts/generate-company-profile.py
```

The generator writes `public/documents/ampigen-company-profile.pdf` and enforces six pages and the expected 20-entry portfolio. Render and visually review all PDF pages after changing the generator or catalogue before replacing the public asset. The previous BM Tech Services PDF is removed; Firebase redirects its old URL to the AMPIGEN download with a 301 response after deployment. Local static previews do not emulate that Hosting rule. Keep intermediate renders outside the repository.

## Hosting and release

The Firebase project remains `bmtech-website` (project number `74431502417`) and the GitHub repository remains `bmtechservicesDev/bmtech_website`. The requested production address is `https://ampigen.web.app`, served by an additional Hosting site with ID `ampigen` in this existing project. Firebase hosts static files only. Route directories and trailing slashes are preserved, there is no SPA catch-all rewrite, and hashed assets have immutable caching. The predeploy hook builds fresh output. Do not run `firebase init hosting` over the existing configuration.

`firebase.json` retains the original default Hosting site and review-channel configuration. `firebase.ampigen.json` selects only the `ampigen` target, whose site mapping is checked into `.firebaserc`. The production configuration retains the same routes, cache headers and company-profile redirect.

Deployment is a separate requested action. For a later authorised review-channel update from a configured Firebase CLI session:

```bash
npm ci
SITE_URL="" SITE_INDEXABLE=false firebase hosting:channel:deploy review --expires 7d --project bmtech-website
```

That command returns the actual temporary review URL. Review all 14 routes and the email/WhatsApp draft actions.

### AMPIGEN production deployment

An authenticated Firebase CLI account must have access to the existing project. Check the project number and list its Hosting sites before deployment. If `ampigen` is already listed, reuse it. Otherwise create it once with `firebase hosting:sites:create ampigen --project bmtech-website`. Site IDs are globally unique; a public "Site Not Found" page does not prove availability. Stop if Firebase reports that the name is unavailable or access is denied. This repository configuration does not create or reserve the site.

Deploy the verified source revision using the separate production configuration:

```bash
npm ci
SITE_URL=https://ampigen.web.app SITE_INDEXABLE=true \
  firebase deploy --only hosting:ampigen \
  --config firebase.ampigen.json --project bmtech-website
```

Both environment values must be set on the **deploy command**, because its predeploy hook rebuilds the site. The production guard rejects missing or mismatched values before the build. Production HTML, canonical URLs, social URLs, structured data and the 14-route sitemap use `https://ampigen.web.app`. Confirm `/build-info.json` matches the reviewed source commit with `sourceState: "clean"`; then verify all routes, the AMPIGEN assets, the old-PDF 301 redirect, and that HTML and response headers permit indexing. Keep the original review channel `noindex`.

The `firebase.ampigen.json` file must be selected explicitly. Using the original `firebase.json` deploys to the original Hosting site. Site creation and production deployment still require an authenticated, authorised execution; checked-in configuration and green CI do not establish that the website has been deployed.

No Firebase credentials or service-account keys belong in the repository. The frontend rebuild does not introduce Sites, Hercules, a new hosting project, backend or database. `/build-info.json` records the source commit, whether tracked files were modified at build time, and the UTC build timestamp; compare it with the reviewed commit when validating a deployed build.
