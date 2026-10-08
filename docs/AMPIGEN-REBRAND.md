# AMPIGEN brand refresh

The owner requested a new branch that replaces the website's public BMTech identity with AMPIGEN and supplied the AMPIGEN logo. The work is on `feat/ampigen-brand-refresh-20261008`, based on merged main commit `36399e8b3fd542b1b1d427f3bffcb58351460bf9`.

## Brand scope

The public-facing name is **AMPIGEN**. The approved tagline remains **Engineering Intelligence | Transforming Business**, and the capability line remains **AI • Cloud • IoT • Automation • Digital Transformation**. The supplied artwork uses navy, blue and cyan with small orange accents on white.

The refresh covers the shared website identity, page and social metadata, structured organisation information, company references in approved copy, enquiry draft wording, brand assets and the downloadable company profile. It introduces no new legal-entity claim, address, production domain, customer claim or product capability.

The 14 page routes, five product families and 20 offering entries remain in place. The seven business-solution categories, industry contexts, ten delivery capabilities, existing product/industry fragments, progressive catalogue filtering and visitor-sent enquiry drafts carry forward from the reviewed website. My School remains a compatibility identity within the education portfolio; PMS and SIS remain unexpanded.

The header retains Products, Industries, Solutions and Resources with one Book a demo link. About us and Contact us remain in the Company footer column. Public contact-detail blocks and repeated enquiry buttons remain removed.

## Supplied logo and profile

The source artwork is the supplied `Ampigen3.png`, preserved in the repository as `public/brand/ampigen-logo.png`. Do not redraw the lettering, recolour the artwork, replace the tagline, stretch the image or treat the white margins as part of the visible logo size.

Header and footer images use `public/brand/ampigen-logo.webp`, a lossless encoding with identical decoded RGBA pixels. It is 802,286 bytes compared with the original PNG's 2,025,075 bytes. The CSS placement viewport is `(x90, y250, width1480, height360)` within the original 1672 by 941 image. The complete emblem, orbit, wordmark and tagline fit inside it. The original PNG remains the social and structured-data image and the PDF source. `public/favicon.svg` is a compact native SVG adaptation of the orbital A emblem for the browser tab; obsolete public brand graphics are removed.

## Visual system

| Role | Treatment |
| --- | --- |
| Primary identity and headings | Logo navy `#073365` on white and pale-blue surfaces |
| Primary actions and links | Blue `#006DAD`; navy hover state and visible keyboard focus |
| Decorative connections | Cyan `#00B9EF` strokes, orbit motifs and icon surfaces |
| Small brand accents | Orange `#FF9300` dividers and nodes |
| Page structure | Light homepage and page introductions, distinct navy supporting panels, spacious cards and a light five-column footer |

Orange and bright cyan are decorative accents; primary button labels remain white on darker blue. Mobile placement scales the full supplied logo proportionally and retains the existing disclosure navigation, hover menus on desktop and reduced-motion support.

## Company profile

The six-page public profile is now `public/documents/ampigen-company-profile.pdf`, served at `/documents/ampigen-company-profile.pdf`. It replaces `public/documents/bm-tech-services-company-profile.pdf`. The generator remains `scripts/generate-company-profile.py` and continues to import the approved catalogue from `src/content.js`.

The obsolete PDF is removed from the public files. `firebase.json` maps its previous URL to the AMPIGEN PDF with a permanent 301 redirect, so existing download links continue to work after a Firebase deployment. The redirect follows [Firebase Hosting's documented configuration](https://firebase.google.com/docs/hosting/full-config#redirects). Local Vite/Python static previews do not emulate Firebase redirect rules.

The PDF embeds the complete original 1672 by 941 pixel PNG. A PDF clipping viewport from pixel `(90, 245)` to `(1582, 625)` removes only the outer white placement margins; uniform scaling preserves the artwork's proportions. The image file itself is not cropped or regenerated. A changed source-image size causes the generator to request a placement review instead of silently clipping a replacement logo.

Profile contents remain:

1. AMPIGEN identity and company positioning.
2. Five product families and all 20 offerings.
3. Seven business solutions.
4. Ten engineering and digital services.
5. Industry alignment and the startup/product-team audience.
6. Delivery approach and a focused project brief.

PDF metadata, page headers, footers and introductory company wording use AMPIGEN. The profile palette follows the logo and website: navy `#073365`, blue `#006DAD` and cyan `#00B9EF`, with darkened cyan `#007295` for readable small labels. No contact endpoint, speculative production URL or infrastructure identifier is added to the customer-facing PDF.

The private package display label changes to `ampigen-website` in `package.json` and the matching lockfile root entries. Dependency versions and integrity records are retained.

## Technical identifiers retained

| Identifier | Reason it remains |
| --- | --- |
| GitHub repository `bmtechservicesDev/bmtech_website` | Existing repository; renaming it is outside this brand branch. |
| Firebase project `bmtech-website`, project number `74431502417` | Existing Hosting infrastructure and deployment target. |
| Firebase review-channel identity and generated hostname | Existing review destination; a replacement public domain has not been supplied. |
| Existing email and WhatsApp destinations in `src/pages/enquiry.js` | The owner requested a brand refresh, not a change of message recipients. |
| Historical BMTech review documents and prior branch references | Dated implementation records retain their original context. |

Prepared message bodies use AMPIGEN while the existing delivery destinations remain unchanged. Forms still prepare a draft for the visitor to review and send; they do not transmit a request or reserve a demonstration time.

## SEO and hosting

No AMPIGEN production hostname is assumed. Preview builds remain `noindex, follow` by default, with `SITE_INDEXABLE=false`. Without `SITE_URL`, no canonical origin or sitemap is invented. An indexable production build requires a verified HTTPS origin in `SITE_URL` and an explicit `SITE_INDEXABLE=true`.

The existing Firebase `dist/` hosting configuration, route directories, trailing slashes, cache headers and fresh-build predeploy hook remain the release mechanism. GitHub Actions builds, validates and produces browser screenshots; it does not deploy. A branch or pull request does not change a Firebase deployment.

This brand-refresh work performs no Firebase deployment and does not migrate hosting, rename the Firebase project, create a new backend or change message recipients.

## Review evidence

The profile must be regenerated from the final shared catalogue, extracted to confirm its text and metadata, and rendered for visual inspection of all six pages. Check that every original logo element remains visible, all 20 products remain represented, page numbering is complete, and no legacy public brand text or clipped content remains.

The pull request records the final commit, its workflow URL and screenshot review against that same source. Record the actual Firebase URL and `/build-info.json` only if a deployment occurs. Prior main-branch CI results do not establish that the new branding branch has passed.

| Review item | Status |
| --- | --- |
| Company profile generation and six-page visual inspection | Passed: six pages regenerated; all 20 offerings present; AMPIGEN text and PDF metadata verified; original PNG bytes retained; all six rendered pages visually inspected with the final navy, blue and cyan palette. No clipping, overlap or distorted artwork found. |
| Local build, metadata and route checks | 10 SEO tests passed; all 14 built routes verified. The configured profile redirect points to an existing public PDF. |
| Browser CI and final logo/layout screenshots | The suite contains 38 cases and produces 121 review screenshots. Local Chromium installation was blocked by a truncated official download; use the branch pull request's CI and visual-review evidence for the final result. |
| Firebase deployment | Not performed by this brand-refresh task. |
