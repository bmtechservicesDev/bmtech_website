# BM Tech Services UI/UX review

## Scope and discovery

Reviewed the live Firebase review channel supplied by the owner on 29 September 2026. Captured Home, capabilities, Services, Solutions, About and Contact. The supplied URL is the current deployed website; no separate visual reference was provided. Comparisons therefore describe current versus enhanced behaviour, not a different reference company.

The repository is a Vite multi-page static site with plain JavaScript, shared render helpers, native HTML entry files, a prerender script, custom CSS, and Playwright browser checks. Five routes exist: Home, Services, Solutions, About and Contact. No authentication, dashboards, data tables, CRUD backend or asynchronous data loading exists. Loading skeletons and dashboard controls are not relevant to this site. Existing company positioning, contact channels, illustration, page routes and honest message preparation flow are retained.

## Audit and priorities

| Area | Current deployed experience | Priority | Enhancement |
| --- | --- | --- | --- |
| Navigation | Header disappears on long pages; mobile menu lacks Escape dismissal | High | Sticky header, active underline, Escape with returned focus, outside click and breakpoint reset |
| Services | Cards repeat capabilities without a next action; direct H1-to-H3 hierarchy | High | Explicit service enquiry links, preselected form topic, native jump navigation and correct H2 headings |
| Industries | Decorative arrows imply action without being links | Medium | Meaningful enquiry links with distinct accessible names |
| Contact | Native validation popups; minimum detail requirement undisclosed; no form title | High | Persistent field errors, error summary, visible detail guidance and named form |
| Prepared draft | Draft remains visible after source fields change | High | Hide stale draft; regenerate before presenting sending actions |
| Page hierarchy | Large inner-page hero pushes useful content down | Medium | Compact hero, breadcrumbs and a consistent heading scale |
| Typography and spacing | Multiple later CSS overrides; muted small-text labels | Medium | Consolidated stylesheet, semantic tokens, stronger text contrast and consistent rhythm |
| Actions | Different action sizes; copy status has no dedicated live region | Medium | Minimum 44–48 px actions, wrapping result actions and announced copy status |
| Performance | Lightweight static output | Preserve | No runtime framework or new dependency; only small CSS/JS growth |

No critical outage was observed. Browser console entries encountered in the source audit came from the browser extension, not the website; build-specific page errors are checked separately in CI.

## Design system

- Ink `#152b3a`; secondary text `#526873`; primary `#0d695c`; primary hover `#0a5349`; mint accent `#79dfc5`; dark canvas `#071b2c`; soft surface `#f3f7f6`; border `#dce6e3`; error `#a62932`; success `#146b42`; focus `#137f6b` (mint focus on dark surfaces).
- DM Sans body, Manrope headings, system fallback. Fluid heading scales, readable 1.75 body line-height and smaller tracking on labels.
- Spacing tokens: 4, 8, 12, 16, 24, 32, 48 and 64 px. Fluid section spacing. Shared 8 px radius, restrained borders and minimal shadows.
- Shared buttons, card headings/tags/actions, breadcrumbs, capability navigation, labels/help/errors and draft action group.
- Desktop three-column capabilities; tablet two columns; phone one column. Navigation changes at 860 px; single-column content/forms at 600 px. Sticky header offsets anchors and results. Reduced motion removes scrolling and transitions.

## Significant changes and rationale

### Global navigation

Problem: returning to another page on a long scroll requires returning to the top; an open mobile menu cannot be dismissed with Escape.
Change: sticky header and synchronized menu state with keyboard/outside dismissal.
Benefit: faster navigation and clearer keyboard focus. Implementation: shared header CSS and menu handlers in `src/main.js`.

### Service and industry cards

Problem: content has no direct conversion path, and decorative arrows do not perform an action.
Change: real links with descriptive accessible names; service links carry an allowlisted query parameter. Replace decorative Unicode service glyphs with consistent numbered headers and capability tags.
Benefit: easier scanning and less effort to begin a relevant conversation. Implementation: reusable grids, page-appropriate heading levels and card CSS.

### Inner-page heroes

Problem: very large titles and generous hero height delay access to capabilities or the enquiry form.
Change: reduce heading scale and hero height; add Home breadcrumb.
Benefit: improved orientation and earlier access to useful content while preserving the existing visual language.

### Enquiry form

Problem: validation messages are transient, the minimum message length is not explained, and prepared output can become stale after edits.
Change: persistent inline errors using native constraints, named form heading, detail guidance, focus first invalid field or prepared-result heading, and hide output after edits.
Benefit: visitors can correct errors and send the current message. No automatic email or WhatsApp transmission is added. Copy fallback and delivery notice remain.

## Files and behaviour

- Modified: `src/main.js`, `src/styles.css`, `tests/website.spec.js`, `README.md`.
- Added: this report. Existing Firebase Hosting setup remains in the same feature branch.
- Reusable helpers: breadcrumbs; page-appropriate grid heading levels.
- All five pages enhanced through shared styles and components.
- Dependencies added/removed: none.
- Functional frontend improvements: menu dismissal, service preselection, persistent validation, whitespace rejection, stale-draft prevention and focus management.
- Backend changes: none. Company facts and contact destinations remain the supplied ones.

## Validation and limits

Local production build, JavaScript syntax and whitespace checks pass. GitHub CI verifies all five routes at 320, 375, 480, 768, 1024, 1280, 1440 and 1920 px, overflow, page errors, mobile keyboard navigation, topic preselection, email/WhatsApp message encoding, short/whitespace validation, stale-draft regeneration, copy fallback and reduced motion. Screenshots are attached to the CI run as `website-browser-review`.

Inspect the browser screenshots after CI completes and check the updated Firebase preview after the owner deploys it. This review does not claim complete WCAG conformance or real message delivery; screen-reader testing and sending actual messages remain separate checks. Google Fonts remains an external dependency with system fallbacks. A formal company logo, approved domain and privacy policy still require owner input. No production deployment is automatic.
