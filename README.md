# BM Tech Services website

Responsive company website based on the BM Tech Services Company Profile. Built as a lightweight Vite multi-page static site with plain JavaScript and CSS. There is no runtime framework or backend dependency.

## Local development

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Run `npm run build` to produce `dist/` and `npm run preview` to inspect the production output.

## Browser review

GitHub Actions runs Chromium checks for all pages at 320, 375, 480, 768, 1024, 1280, 1440 and 1920 pixels, checks keyboard menu dismissal, service preselection, validation, draft freshness, email/WhatsApp encoding, copy fallback and reduced motion, and uploads full-page screenshots as the `website-browser-review` artifact. To run locally after building: `npx playwright install chromium`, then `npx playwright test`.

## Pages and content

- `/` — Home
- `/services/` — Capabilities
- `/solutions/` — Custom development and transformation
- `/products/` — Restaurant Solution, Clinic Automation, My School and IoT Gateway
- `/industries/` — Industry context and possibilities
- `/resources/` — Project planning prompts and FAQs
- `/about/` — Company and process
- `/contact/` — Enquiry brief

Page copy, service cards, industry cards and the shared navigation/footer are in `src/main.js`. The visual system and responsive breakpoints are in `src/styles.css`. Each route has an HTML entry file so a static host can serve deep links without a rewrite rule. The build pre-renders content and route-specific metadata into each HTML file; JavaScript attaches navigation and enquiry interactions.

## Enquiry setup

The supplied contact screenshots authorize these public company details:

- Email: `bmtechservices2025@gmail.com`
- Phone: `096426 68815` (international call link: `+91 96426 68815`)
- Address: Flat No. 35001, Block 3, Wing A, Janapriya Utopia, Janapriya Utopia Road, Attapur, in front of Apollo Pharmacy, Hyderguda, Rajendranagar, Rangareddy – 500048, Telangana.

Update these in the `contact` object in `src/main.js`. The second personal email in the screenshot is intentionally excluded because the instruction specified the BMTech Gmail address.

The contact form validates inputs locally and prepares a formatted enquiry. **Open email draft** opens the visitor's configured email app with recipient, subject and body filled in; the visitor must send the email. **Enquire on WhatsApp** opens the same enquiry as a prepared message to +91 96426 68815; the visitor reviews and sends it in WhatsApp. Direct WhatsApp links are also available on Contact and in the footer. Copying the enquiry is available as a fallback. The website does not claim delivery or store enquiries. If introducing server-side submissions later, configure a secure endpoint, delivery monitoring and appropriate privacy information. Do not put API secrets in frontend code.

The approved logo and favicon are supplied by the owner. Optimized derivatives are in `public/brand/`. The full supplied square artwork is used for favicon sizes, preserving the design; fine wording is naturally unreadable at small tab-icon sizes. Confirm the company domain, product scope/availability, social links and privacy policy before adding public claims.

## Deployment

### Google Cloud / Firebase Hosting

Target project: `bmtech-website` (project number `74431502417`). This configuration deploys only static Firebase Hosting files; it does not provision a backend or database. Native page directories remain intact, with trailing slashes and no SPA catch-all rewrite. Hashed assets receive immutable caching. The predeploy hook builds fresh output.

From Google Cloud Shell, use Node.js 22.12+ and an account with access to this project. Install the official Firebase CLI:

```bash
npm install -g firebase-tools
firebase login --no-localhost
firebase projects:list
```

If `bmtech-website` is not yet a Firebase project, add Firebase to the existing Google Cloud project (do not create a second project):

```bash
firebase projects:addfirebase bmtech-website
```

If Firebase asks for acceptance of terms or reports missing permissions, complete the required setup with the project owner in the Firebase console. Then, from this repository:

```bash
npm ci
firebase hosting:channel:deploy review --expires 7d --project bmtech-website
```

That command builds the website and returns a temporary, publicly accessible preview URL. Check all eight pages, plus the email and WhatsApp draft actions. To publish the production site after review:

```bash
firebase deploy --only hosting --project bmtech-website
```

Use the exact Hosting URL returned by the CLI. Future updates use the same command after pulling approved changes. Do not run `firebase init hosting` over this configuration, because it can overwrite the Hosting settings. No Firebase credentials or service account keys belong in the repository. GitHub CI remains build/test only and does not automatically publish.

Publish the contents of `dist/` to any static web host. The build generates `index.html` and `services/index.html`, `solutions/index.html`, `about/index.html`, `contact/index.html`, `products/index.html`, `industries/index.html` and `resources/index.html`. Configure HTTPS, caching for versioned assets, and the canonical domain after those details are confirmed. The site assumes deployment at the domain root.


## UI/UX review

The audit, priorities, design tokens, before/after rationale and validation limits are documented in [docs/UI-UX-REVIEW.md](docs/UI-UX-REVIEW.md). The October enhancement uses the approved navy/cyan/blue/orange logo palette and a CSS engineering roadmap illustration, with shared semantic color, spacing and radius tokens. Service cards link to Contact with an allowlisted service parameter. The browser validates locally and prepares messages; no delivery backend or visitor data storage was introduced.

## October brand and UX enhancement

Source: owner’s `change_request1.jpeg`, `BMTech-Logo.jpeg`, `BMTech-Favicon.jpeg`, and retrieved decisions from “Website UX Brief”. The site separates products, industries, solutions and planning resources. Product descriptions invite a scope/demo discussion and make no availability, pricing or unverified feature claims.

Edit `products`, `solutionGroups`, `industries`, and page templates in `src/main.js`. Demo links allowlist `type` and `service` query values; form fields include optional phone and enquiry type. All source fields hide stale drafts when edited.

AI is presented as an engineering capability with practical workflow discussion prompts. There is no live AI model, chatbot or automated recommendation service. Activating one requires a secure server endpoint, provider configuration, evaluation, privacy information and abuse/rate controls; credentials must stay server-side.

Fonts use a system stack with no external font request. No new runtime dependency was added. Brand image dimensions are explicit and the logo is compressed WebP. All eight routes are prerendered for static delivery and search visibility.

To review this feature before merging, pull `feat/brand-product-experience` and run `npm ci` then `firebase hosting:channel:deploy review --expires 7d --project bmtech-website`. Production deployment remains a separate owner action.
