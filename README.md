# BM Tech Services website

BM Tech Services is an end-to-end digital solution provider. The website presents industry software, smart and embedded systems, and the engineering services that connect them. It is a lightweight Vite multi-page static site with plain JavaScript and CSS, with no runtime framework or submission backend.

## Local development

Requires Node.js 20.19+ or 22.12+.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. `npm run build` produces `dist/`; `npm run preview` serves the production output. Each route has its own HTML entry file. The build renders page content and metadata into the HTML, and browser JavaScript attaches menu and enquiry interactions.

## Pages and portfolio

| Route | Purpose |
| --- | --- |
| `/` | Company positioning and the five portfolio families |
| `/products/` | Product catalogue organised by family |
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

## Content and source map

| File | Responsibility |
| --- | --- |
| `src/content.js` | Product families, offering descriptions, solutions, industries and service catalogue |
| `src/site.js` | Page templates, shared navigation/footer, enquiry options and draft destinations |
| `src/main.js` | Browser menus, validation, allowlisted preselection and enquiry draft interactions |
| `src/styles.css` | Approved brand palette, layout, responsive behaviour and accessibility styles |
| `src/routes.js` | Shared registry of all 14 routes |
| `src/seo.js` | Environment validation, page metadata, canonical URLs, social tags and structured data |
| `scripts/prerender.mjs` | Static HTML rendering, robots/sitemap output and build provenance |
| `scripts/verify-routes.mjs` | Checks that every built route contains distinct metadata and meaningful content |
| `scripts/generate-company-profile.py` | Reproducible company profile generated from the shared content catalogue |
| `public/documents/bm-tech-services-company-profile.pdf` | Publicly linked company profile |

The approved company name is **BM Tech Services**, with **BMTech** as the short form. Shared brand copy uses **Engineering Intelligence | Transforming Business** and **AI • Cloud • IoT • Automation • Digital Transformation**. Approved logo derivatives are in `public/brand/`; the artwork is preserved. Fonts use the system stack and no external font request is required.

For the rationale, scope decisions and remaining owner inputs, see [SEO and industry implementation](docs/SEO-INDUSTRY-IMPLEMENTATION.md). Earlier [UI/UX](docs/UI-UX-REVIEW.md) and [market-readiness](docs/MARKET-READINESS-REVIEW.md) reviews are historical records; their route counts and editor instructions may describe earlier versions.

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

Draft destinations are held in the `contact` object in `src/site.js`; they are not presented as public contact-detail blocks. No visitor database, automated email delivery or live AI service is introduced. If server-side delivery is implemented later, use a secure endpoint and appropriate privacy information. Never put API secrets in frontend code.

## Verification

```bash
npm run test:seo
npm run build
npm run verify:routes
npx playwright install chromium
npm test
```

The Node tests cover SEO configuration validation, metadata replacement, URL escaping, sitemap output and structured data. The route verifier checks all 14 built pages. Playwright checks the pages at 320, 375, 480, 768, 1024, 1280, 1440 and 1920 pixels, plus navigation, local link destinations, all 20 portfolio entries, legacy anchors, form validation, preselection, stale drafts, encoded draft links, clipboard fallback and reduced motion.

GitHub Actions runs on pull requests and pushes to `main`, builds the website, runs these checks and uploads the `website-browser-review` screenshot artifact. The workflow does not deploy. A feature-branch push alone does not trigger this workflow; a draft pull request can run the same review checks.

To regenerate the company profile with Node.js, Python, ReportLab and Pillow installed:

```bash
python3 scripts/generate-company-profile.py
```

Render and visually review all PDF pages after changing the generator or catalogue before replacing the public asset. Keep intermediate renders outside the repository.

## Hosting and release

The existing Firebase Hosting target is `bmtech-website` (project number `74431502417`). It hosts static files only. Route directories and trailing slashes are preserved, there is no SPA catch-all rewrite, and hashed assets have immutable caching. The predeploy hook builds fresh output. Do not run `firebase init hosting` over the existing configuration.

Deployment is a separate requested action. For a later authorised review-channel update from a configured Firebase CLI session:

```bash
npm ci
SITE_INDEXABLE=false firebase hosting:channel:deploy review --expires 7d --project bmtech-website
```

That command returns the actual temporary review URL. Review all 14 routes and the email/WhatsApp draft actions.

Before a later authorised production release, verify the production origin and set **both** `SITE_URL` to that HTTPS origin and `SITE_INDEXABLE=true` in the build environment. Then use the existing `firebase deploy --only hosting --project bmtech-website` command. Running that command with default settings publishes a **noindex** build. Confirm the final HTML, canonical URLs, robots file, sitemap and response headers on the returned production URL.

No Firebase credentials or service-account keys belong in the repository. No new project, backend or database is needed for these content changes. `/build-info.json` records the source commit, whether tracked files were modified at build time, and the UTC build timestamp; compare it with the reviewed commit when validating a deployed build.
