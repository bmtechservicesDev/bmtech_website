# BM Tech Services website

Responsive company website based on the BM Tech Services Company Profile. Built as a lightweight Vite multi-page static site with plain JavaScript and CSS. There is no runtime framework or backend dependency.

## Local development

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Run `npm run build` to produce `dist/` and `npm run preview` to inspect the production output.

## Pages and content

- `/` — Home
- `/services/` — Capabilities
- `/solutions/` — Industry solution areas
- `/about/` — Company and process
- `/contact/` — Enquiry brief

Page copy, service cards, industry cards and the shared navigation/footer are in `src/main.js`. The visual system and responsive breakpoints are in `src/styles.css`. Each route has an HTML entry file so a static host can serve deep links without a rewrite rule. The build pre-renders content and route-specific metadata into each HTML file; JavaScript attaches navigation and enquiry interactions.

## Enquiry setup

The company profile does not provide a verified email address, phone number or enquiry endpoint. The current contact form validates inputs locally, prepares a formatted brief and lets visitors copy it. It **does not send or store enquiries**. Before public launch, supply a verified company contact channel and connect a secure form endpoint or managed form service, with spam protection, privacy notice, delivery monitoring, and clear success/error handling. Remove the interim explanatory copy after direct delivery works. Do not put API secrets in frontend code.

Also confirm the company domain, logo, address, social links and privacy policy before publishing. The included text-based mark and social image are interim brand assets, not an assertion that a formal logo was supplied.

## Deployment

Publish the contents of `dist/` to any static web host. The build generates `index.html` and `services/index.html`, `solutions/index.html`, `about/index.html`, and `contact/index.html`. Configure HTTPS, caching for versioned assets, and the canonical domain after those details are confirmed. The site assumes deployment at the domain root.
