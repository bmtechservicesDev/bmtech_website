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

The supplied contact screenshots authorize these public company details:

- Email: `bmtechservices2025@gmail.com`
- Phone: `096426 68815` (international call link: `+91 96426 68815`)
- Address: Flat No. 35001, Block 3, Wing A, Janapriya Utopia, Janapriya Utopia Road, Attapur, in front of Apollo Pharmacy, Hyderguda, Rajendranagar, Rangareddy – 500048, Telangana.

Update these in the `contact` object in `src/main.js`. The second personal email in the screenshot is intentionally excluded because the instruction specified the BMTech Gmail address.

The contact form validates inputs locally and prepares a formatted enquiry. **Open email draft** opens the visitor's configured email app with recipient, subject and body filled in; the visitor must send the email. Copying the enquiry is available as a fallback. The website does not claim delivery or store enquiries. If introducing server-side submissions later, configure a secure endpoint, delivery monitoring and appropriate privacy information. Do not put API secrets in frontend code.

Confirm the company domain, formal logo, social links and privacy policy before publishing. The included text-based mark and social image are interim brand assets.

## Deployment

Publish the contents of `dist/` to any static web host. The build generates `index.html` and `services/index.html`, `solutions/index.html`, `about/index.html`, and `contact/index.html`. Configure HTTPS, caching for versioned assets, and the canonical domain after those details are confirmed. The site assumes deployment at the domain root.
