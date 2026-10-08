import { test, expect } from '@playwright/test';
import { createHash } from 'node:crypto';

const routes = [
  '/', '/services/', '/solutions/', '/about/', '/contact/', '/book-a-demo/',
  '/products/', '/industries/', '/resources/', '/products/hospitality/',
  '/products/healthcare/', '/products/education/', '/products/embedded-systems/', '/products/hr/'
];

// Independent business inventory: catches omitted products when the catalogue grows.
const portfolioFamilies = [
  { id: 'hospitality', label: 'Hospitality Software', products: [
    ['restaurant-solution', 'Restaurant Solution'], ['guest-house', 'Guest House'], ['hotel', 'Hotel'], ['lodge', 'Lodge']
  ] },
  { id: 'healthcare', label: 'Healthcare Software', products: [
    ['hospital', 'Hospital'], ['clinic-automation', 'Clinic Automation'], ['pharmacy', 'Pharmacy'],
    ['emr', 'EMR'], ['ehr', 'EHR'], ['pms', 'PMS'], ['lis', 'LIS'], ['ris', 'RIS'], ['sis', 'SIS']
  ] },
  { id: 'education', label: 'Education Software', products: [
    ['school-management-app', 'School Management App'], ['parent-app', 'Parent App']
  ] },
  { id: 'embedded-systems', label: 'Smart & Embedded Systems', products: [
    ['home-automation', 'Home Automation'], ['queue-management', 'Queue Management'], ['smart-led', 'Smart LED'], ['iot-gateway', 'IoT Gateway']
  ] },
  { id: 'hr', label: 'HR & Workforce Software', products: [['hr-solution', 'HR Solution']] }
];

for (const width of [320, 375, 480, 768, 1024, 1280, 1440, 1920]) {
  test(`Pages render without overflow at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('main')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      await expect(page.locator('footer .footer-contact, footer address, footer a[href^="mailto:"], footer a[href^="tel:"]')).toHaveCount(0);
      await page.screenshot({ path: testInfo.outputPath(`${route.replaceAll('/', '') || 'home'}-${width}.png`), fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}

test('AMPIGEN identity and supplied logo assets are consistent across every route', async ({ page, request }) => {
  const original = await request.get('/brand/ampigen-logo.png');
  expect(original.status()).toBe(200);
  expect(original.headers()['content-type']).toContain('image/png');
  // Independent fingerprint of the supplied Ampigen3.png: the source artwork stays intact.
  expect(createHash('sha256').update(await original.body()).digest('hex'))
    .toBe('9fa0667bf6260d26c311c4ca9965eccebdc3f8f4bf87bf34a8ace2fe10d0040a');

  for (const route of routes) {
    await page.goto(route);
    await expect(page).toHaveTitle(/AMPIGEN/);
    await expect(page.locator('body')).not.toContainText(/\bBM\s*Tech(?:\s+Services)?\b/i);
    await expect(page.locator('footer')).toContainText('AMPIGEN. All rights reserved.');
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'AMPIGEN');
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      await expect(page.locator(selector)).toHaveAttribute('content', await page.title());
    }
    const descriptions = await page.locator('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]')
      .evaluateAll(nodes => nodes.map(node => node.content).join('\n'));
    expect(descriptions, route).not.toMatch(/\bBM\s*Tech(?:\s+Services)?\b/i);

    const brands = page.locator('.site-header .brand, footer .brand');
    await expect(brands).toHaveCount(2);
    for (const brand of await brands.all()) {
      await expect(brand).toHaveAttribute('href', '/');
      await expect(brand).toHaveAttribute('aria-label', 'AMPIGEN home');
      const logo = brand.locator('img');
      await expect(logo).toHaveAttribute('src', '/brand/ampigen-logo.webp');
      await expect(logo).toHaveAttribute('alt', 'AMPIGEN — Engineering Intelligence | Transforming Business');
      await logo.evaluate(image => image.decode());
      expect(await logo.evaluate(image => [image.naturalWidth, image.naturalHeight])).toEqual([1672, 941]);
    }
  }
});

test('Responsive logo placement preserves the orbit, wordmark and tagline without distortion', async ({ page }) => {
  for (const width of [320, 375, 480, 768, 1024, 1101, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    for (const brand of await page.locator('.site-header .brand, footer .brand').all()) {
      await brand.locator('img').evaluate(image => image.decode());
      const placement = await brand.evaluate(container => {
        const image = container.querySelector('img');
        const frame = container.getBoundingClientRect();
        const rendered = image.getBoundingClientRect();
        // Measured artwork bounds in the original 1672×941 raster.
        return {
          frame: { left: frame.left, top: frame.top, right: frame.right, bottom: frame.bottom, width: frame.width, height: frame.height },
          artwork: {
            left: rendered.left + 107 / 1672 * rendered.width,
            top: rendered.top + 266 / 941 * rendered.height,
            right: rendered.left + 1544 / 1672 * rendered.width,
            bottom: rendered.top + 592 / 941 * rendered.height
          },
          imageRatio: rendered.width / rendered.height
        };
      });
      expect(placement.imageRatio, `${width}px raster proportions`).toBeCloseTo(1672 / 941, 2);
      expect(placement.frame.width / placement.frame.height, `${width}px placement proportions`).toBeGreaterThan(4);
      expect(placement.frame.width / placement.frame.height).toBeLessThan(4.3);
      expect(placement.artwork.left).toBeGreaterThanOrEqual(placement.frame.left - 1);
      expect(placement.artwork.top).toBeGreaterThanOrEqual(placement.frame.top - 1);
      expect(placement.artwork.right).toBeLessThanOrEqual(placement.frame.right + 1);
      expect(placement.artwork.bottom).toBeLessThanOrEqual(placement.frame.bottom + 1);
      expect(placement.frame.left).toBeGreaterThanOrEqual(0);
      expect(placement.frame.right).toBeLessThanOrEqual(width + 1);
    }
    const logo = await page.locator('.site-header .brand').boundingBox();
    const control = await page.locator(width < 1101 ? '.menu-toggle' : '.dropdown-toggle').first().boundingBox();
    expect(logo.x + logo.width + 8, `${width}px header spacing`).toBeLessThanOrEqual(control.x);
  }
});

test('Rebranded action and navigation text retain readable contrast and keyboard focus', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const contrast = locator => locator.evaluate(element => {
    const rgba = value => {
      const values = value.match(/[\d.]+/g).map(Number);
      return [values[0], values[1], values[2], values[3] ?? 1];
    };
    const luminance = rgb => rgb.slice(0, 3).map(value => {
      const channel = value / 255;
      return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
    }).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
    const ancestors = [];
    for (let node = element; node; node = node.parentElement) ancestors.unshift(node);
    let background = [255, 255, 255];
    for (const node of ancestors) {
      const layer = rgba(getComputedStyle(node).backgroundColor);
      background = background.map((value, index) => layer[index] * layer[3] + value * (1 - layer[3]));
    }
    const ink = luminance(rgba(getComputedStyle(element).color));
    const surface = luminance(background);
    return (Math.max(ink, surface) + .05) / (Math.min(ink, surface) + .05);
  });
  const demo = page.locator('.nav-cta');
  for (const selector of ['.nav-cta', '.dropdown-toggle', 'footer .footer-link']) {
    expect(await contrast(page.locator(selector).first()), selector).toBeGreaterThanOrEqual(4.5);
  }
  await demo.hover();
  expect(await contrast(demo), 'Hovered demo action').toBeGreaterThanOrEqual(4.5);
  await page.locator('.dropdown-toggle').last().focus();
  await page.keyboard.press('Tab');
  await expect(demo).toBeFocused();
  const focus = await demo.evaluate(element => ({
    width: parseFloat(getComputedStyle(element).outlineWidth),
    style: getComputedStyle(element).outlineStyle
  }));
  expect(focus.width).toBeGreaterThanOrEqual(2);
  expect(focus.style).not.toBe('none');
  const bounds = await demo.boundingBox();
  expect(bounds.width).toBeGreaterThanOrEqual(44);
  expect(bounds.height).toBeGreaterThanOrEqual(44);
});

test('Mobile menu allows navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open navigation' });
  await toggle.click();
  await expect(page.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('button', {name:'Products submenu',exact:true}).click();
  await page.locator('#submenu-0').getByRole('link', {name:'Hospitality Software',exact:true}).click();
  await expect(page).toHaveURL(/\/products\/hospitality\/$/);
  await expect(page.locator('nav button[aria-current="page"]')).toHaveText('Products');
});

test('Mobile menu supports Escape, keyboard focus and outside dismissal', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const toggle = page.locator('.menu-toggle');
  await toggle.click();
  await page.keyboard.press('Tab');
  await expect(page.locator('nav .dropdown-toggle').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.locator('main').click({position:{x:10,y:650}});
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');

  await page.goto('/products/');
  await toggle.click();
  await page.locator('.nav-cta').focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('navigation', { name: 'Breadcrumb', exact: true })
    .getByRole('link', { name: 'Home', exact: true })).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#site-nav')).toBeHidden();
});

test('Local links reach prerendered pages, real fragments and supplied assets', async ({ page, request }) => {
  await page.goto('/');
  const documents = new Map();
  const readDocument = async path => {
    if (documents.has(path)) return documents.get(path);
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(response.headers()['content-type'], path).toContain('text/html');
    const snapshot = await page.evaluate(html => {
      const document = new DOMParser().parseFromString(html, 'text/html');
      const ids = [...document.querySelectorAll('[id]')].map(node => node.id);
      return {
        title: document.title.trim(),
        description: document.querySelector('meta[name="description"]')?.content.trim(),
        h1: [...document.querySelectorAll('h1')].map(node => node.textContent.trim()),
        mainCount: document.querySelectorAll('main').length,
        ids,
        duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index)
      };
    }, await response.text());
    expect(snapshot.mainCount, path).toBe(1);
    expect(snapshot.h1, path).toHaveLength(1);
    expect(snapshot.h1[0], path).not.toBe('');
    expect(snapshot.title, path).not.toBe('');
    expect(snapshot.description, path).toBeTruthy();
    expect(snapshot.duplicateIds, path).toEqual([]);
    documents.set(path, snapshot);
    return snapshot;
  };

  for (const route of routes) await readDocument(route);
  // A missing nested HTML entry must not pass by returning the home-page fallback.
  expect(new Set([...documents.values()].map(document => document.title)).size).toBe(routes.length);
  expect(new Set([...documents.values()].map(document => document.description)).size).toBe(routes.length);

  const visited = new Set();
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    const references = await page.locator('a[href], img[src], link[rel~="icon"]').evaluateAll(nodes =>
      nodes.map(node => ({ kind: node.tagName, value: node.getAttribute('href') || node.getAttribute('src') }))
    );
    for (const { kind, value } of references) {
      const url = new URL(value, page.url());
      if (url.origin !== new URL(page.url()).origin) continue;
      const key = `${kind}:${url.href}`;
      if (visited.has(key)) continue;
      visited.add(key);
      if (kind === 'A' && !url.pathname.endsWith('.pdf')) {
        expect(routes, value).toContain(url.pathname);
        const target = await readDocument(url.pathname);
        if (url.hash) expect(target.ids, value).toContain(decodeURIComponent(url.hash.slice(1)));
      } else {
        const response = await request.get(url.pathname + url.search);
        expect(response.status(), value).toBe(200);
        expect(response.headers()['content-type'], value).toMatch(url.pathname.endsWith('.pdf') ? /application\/pdf/ : /^image\//);
      }
    }
  }
});


test('Single header demo and screenshot removals', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByRole('link', { name: 'Book a demo', exact: true })).toHaveCount(1);
    await expect(page.locator('main')).not.toContainText('Discuss your project');
    await expect(page.locator('.engineering-board, .hero-bottom, .home-enquiry, .cta-band')).toHaveCount(0);
  }
});

test('Every desktop heading opens hover dropdown and supports keyboard dismissal', async ({ page }) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  for (const name of ['Products','Industries','Solutions','Resources']) {
    const button = page.getByRole('button', {name: `${name} submenu`, exact:true});
    await button.hover();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    const panel = page.locator(`#${await button.getAttribute('aria-controls')}`);
    await expect(panel).toBeVisible();
    await button.press('ArrowDown');
    await expect(panel.locator('a').first()).toBeFocused();
    await panel.locator('a').first().press('Escape');
    await expect(panel).toBeHidden();
    await expect(button).toBeFocused();
  }
});

test('Mobile dropdowns expand by tap and the product portfolio link resolves', async ({ page }) => {
  await page.setViewportSize({width:375,height:844});
  await page.goto('/');
  await page.getByRole('button', {name:'Open navigation'}).click();
  const button = page.getByRole('button', {name:'Products submenu', exact:true});
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded','true');
  await page.locator('#submenu-0').getByRole('link',{name:'Product portfolio',exact:true}).click();
  await expect(page).toHaveURL(/\/products\/$/);
  await expect(page.locator('main h1')).toBeVisible();
});


test('Mega menu cards fit desktop and mobile viewports', async ({ page }, testInfo) => {
  for (const width of [375, 1024, 1101, 1440]) {
    await page.setViewportSize({width,height:900});
    await page.goto('/');
    if (width < 1101) await page.getByRole('button',{name:'Open navigation'}).click();
    const button = page.getByRole('button',{name:'Solutions submenu',exact:true});
    if (width < 1101) await button.click();
    else await button.hover();
    await expect(page.locator('#submenu-2 .mega-card')).toHaveCount(8);
    await expect(page.locator('#submenu-2 .mega-card').first()).toBeVisible();
    // On touch layouts, expanded cards scroll inside the navigation panel.
    if (width > 1100) {
      const demo = page.getByRole('link', { name: 'Book a demo', exact: true });
      await expect(demo).toBeInViewport();
      const bounds = await demo.boundingBox();
      expect(bounds.height).toBeLessThanOrEqual(52);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width + 1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.screenshot({path:testInfo.outputPath(`mega-menu-${width}.png`),fullPage:false});
  }
});

test('Company profile is a real downloadable PDF reachable through resources', async ({ page, request }) => {
  await page.goto('/resources/');
  const download = page.locator('main a[href="/documents/ampigen-company-profile.pdf"]');
  await expect(download).toBeVisible();
  const response = await request.get(await download.getAttribute('href'));
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
});

test('First pointer click keeps a hover-open desktop submenu usable', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Products submenu', exact: true });
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await button.press('Enter');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
});

test('Tablet navigation supports tap and a compact contact form stays near the top', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open navigation' });
  await toggle.click();
  const products = page.getByRole('button', { name: 'Products submenu', exact: true });
  await products.click();
  await expect(page.locator('#submenu-0')).toBeVisible();
  await products.press('Escape');
  await expect(products).toBeFocused();
  await expect(page.locator('#submenu-0')).toBeHidden();
  await page.goto('/contact/');
  await expect(page.locator('[name="firstName"]')).toBeInViewport();
});

test('Reference header contains four plain headings and one demo CTA', async ({page}, testInfo) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  await expect(page.locator('.nav-heading')).toHaveCount(4);
  await expect(page.locator('.dropdown-toggle')).toHaveText(['Products','Industries','Solutions','Resources']);
  await expect(page.locator('.site-nav')).not.toContainText('About');
  await expect(page.locator('.site-nav')).not.toContainText('Contact');
  await expect(page.locator('.nav-cta')).toHaveCount(1);
  await expect(page.locator('#submenu-1 .mega-card strong')).toHaveText([
    'Hospitality', 'Healthcare', 'Education', 'Residential & Commercial Properties',
    'Manufacturing & Engineering', 'Retail & Commerce', 'Service Organizations', 'Startups & Product Teams'
  ]);
  await expect(page.locator('#submenu-3 .mega-card')).toHaveCount(5);
  await page.getByRole('button',{name:'Products submenu',exact:true}).hover();
  await expect(page.locator('#submenu-0')).toBeVisible();
  await page.screenshot({path:testInfo.outputPath('reference-header.png'),fullPage:false});
});

test('Dropdowns start with cards without an Explore row', async ({page},testInfo) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  for(const label of ['Products','Industries','Solutions','Resources']) {
    await page.getByRole('button',{name:label+' submenu',exact:true}).hover();
    const panel=page.locator('.nav-dropdown:not([hidden])');
    await expect(panel.locator('.dropdown-overview')).toHaveCount(0);
    await expect(panel.locator('.mega-card').first()).toBeVisible();
    expect(await panel.evaluate(el=>el.firstElementChild.classList.contains('mega-card'))).toBe(true);
    await page.screenshot({path:testInfo.outputPath(label.toLowerCase()+'-compact-dropdown.png'),fullPage:false});
  }
});

test('Repeated card enquiry actions are removed on every page', async ({page}) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('.card-action')).toHaveCount(0);
    await expect(page.getByRole('link', {name:/Request details|Enquire about this solution|Enquire about this service/})).toHaveCount(0);
    await expect(page.locator('.nav-cta')).toHaveCount(1);
    await expect(page.locator('.nav-cta')).toHaveAttribute('href','/book-a-demo/');
  }
});

test('Shared footer preserves brand wording and the five navigation columns', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('main .section-end')).toHaveCount(0);
    await expect(page.locator('footer .footer-column')).toHaveCount(5);
    await expect(page.locator('footer .footer-column').getByRole('heading'))
      .toHaveText(['Products', 'Industries', 'Solutions', 'Resources', 'Company']);
    await expect(page.locator('footer')).toContainText('Engineering Intelligence | Transforming Business');
    await expect(page.locator('footer')).toContainText(/AI\s*•\s*Cloud\s*•\s*IoT\s*•\s*Automation\s*•\s*Digital Transformation/);
    await expect(page.locator('.site-header .brand')).toHaveAttribute('href', '/');
    await expect(page.locator('footer .button')).toHaveCount(0);
  }
});

test('Company footer replaces all visible contact blocks', async ({page}) => {
  for (const route of ['/', '/contact/', '/book-a-demo/']) {
    await page.goto(route);
    const company = page.locator('.footer-column').filter({has:page.getByRole('heading',{name:'Company',exact:true})});
    await expect(company.getByRole('link',{name:'About us',exact:true})).toHaveAttribute('href','/about/');
    await expect(company.getByRole('link',{name:'Contact us',exact:true})).toHaveAttribute('href','/contact/');
    await expect(page.locator('body')).not.toContainText('bmtechservices2025@gmail.com');
    await expect(page.locator('body')).not.toContainText('Janapriya Utopia');
    await expect(page.locator('main .contact-details')).toHaveCount(0);
  }
});
test('Header opens dedicated demo and product selection stays meaningful', async ({page}) => {
  await page.goto('/');
  await page.locator('.nav-cta').click();
  await expect(page).toHaveURL(/book-a-demo\/$/);
  await expect(page.getByRole('heading',{name:'Book a Product Demo',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Prepare demo request',exact:true}).click();
  await expect(page.locator('#interest-error')).toBeVisible();
  await page.locator('[name="interest"]').selectOption('My School');
  await page.locator('[name="firstName"]').fill('Demo');
  await page.locator('[name="lastName"]').fill('User');
  await page.locator('[name="email"]').fill('demo@example.com');
  await page.locator('[name="company"]').fill('Example School');
  await page.locator('[name="consent"]').check();
  await page.getByRole('button',{name:'Prepare demo request',exact:true}).click();
  await expect(page.locator('#form-result')).toBeVisible();
  const draft = new URL(await page.locator('#email-brief').getAttribute('href'));
  expect(draft.searchParams.get('subject')).toBe('Demo request — My School');
  expect(draft.searchParams.get('body')).toMatch(/^AMPIGEN — Demo Request\n/);
  expect(draft.searchParams.get('body')).toContain('Name: Demo User');
  expect(draft.searchParams.get('body')).toContain('Company: Example School');
});
test('Contact validates names email and consent and prepares accurate draft', async ({page}) => {
  await page.goto('/contact/');
  await expect(page.getByRole('heading',{name:'Contact AMPIGEN',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Prepare enquiry',exact:true}).click();
  await expect(page.locator('[name="firstName"]')).toBeFocused();
  await expect(page.locator('#consent-error')).toBeVisible();
  await page.locator('[name="firstName"]').fill('Test &');
  await page.locator('[name="lastName"]').fill('User');
  await page.locator('[name="email"]').fill('invalid');
  await page.locator('[name="consent"]').check();
  await page.getByRole('button',{name:'Prepare enquiry',exact:true}).click();
  await expect(page.locator('#email-error')).toContainText('valid email');
  await page.locator('[name="email"]').fill('visitor@example.com');
  await page.locator('[name="message"]').fill('Ordering & billing enquiry.');
  await page.getByRole('button',{name:'Prepare enquiry',exact:true}).click();
  const draft = new URL(await page.locator('#email-brief').getAttribute('href'));
  expect(draft.searchParams.get('body')).toMatch(/^AMPIGEN — Enquiry\n/);
  expect(draft.searchParams.get('body')).toContain('Test & User');
  expect(draft.searchParams.get('body')).toContain('Ordering & billing enquiry.');
  const whatsapp = new URL(await page.locator('#whatsapp-brief').getAttribute('href'));
  expect(whatsapp.searchParams.get('text')).toBe(draft.searchParams.get('body'));
  await expect(page.locator('#form-result')).toContainText('Your enquiry has not been sent yet.');
  await page.locator('[name="message"]').fill('Changed message');
  await expect(page.locator('#form-result')).toBeHidden();
});

test('Every portfolio entry is visible on the hub and its family page', async ({ page }) => {
  await page.goto('/products/');
  const main = page.locator('main');
  await expect(main.locator('[data-product-family]')).toHaveCount(5);
  await expect(main.locator('.portfolio-links a')).toHaveCount(20);
  for (const family of portfolioFamilies) {
    const group = main.locator(`[data-product-family="${family.id}"]`);
    await expect(group).toHaveCount(1);
    await expect(group.getByRole('link', { name: family.label, exact: true })).toHaveAttribute('href', `/products/${family.id}/`);
    await expect(group.locator('.portfolio-links a')).toHaveCount(family.products.length);
    for (const [id, name] of family.products) {
      const product = group.getByRole('link', { name, exact: true });
      await expect(product).toBeVisible();
      await expect(product).toHaveAttribute('href', `/products/${family.id}/#${id}`);
    }
  }
  for (const family of portfolioFamilies) {
    await page.goto(`/products/${family.id}/`);
    await expect(main.locator('.product-card[data-product]')).toHaveCount(family.products.length);
    for (const [id, name] of family.products) {
      const product = main.locator(`.product-card[data-product="${id}"]`);
      await expect(product).toHaveAttribute('id', id);
      await expect(product.getByRole('heading', { name, exact: true })).toBeVisible();
    }
  }
});

test('Homepage and product menu lead to all five families with nested breadcrumbs', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  for (const family of portfolioFamilies) {
    await expect(page.locator('main .family-grid').getByRole('link', { name: family.label, exact: true }))
      .toHaveAttribute('href', `/products/${family.id}/`);
  }
  await page.getByRole('button', { name: 'Products submenu', exact: true }).hover();
  await expect(page.locator('#submenu-0 .mega-card')).toHaveCount(6);
  for (const family of portfolioFamilies) {
    await expect(page.locator('#submenu-0').getByRole('link', { name: family.label, exact: true }))
      .toHaveAttribute('href', `/products/${family.id}/`);
  }
  await expect(page.locator('#submenu-0').getByRole('link', { name: 'Product portfolio', exact: true }))
    .toHaveAttribute('href', '/products/');

  for (const family of portfolioFamilies) {
    await page.goto(`/products/${family.id}/`);
    const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumb', exact: true });
    await expect(breadcrumb.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('href', '/');
    await expect(breadcrumb.getByRole('link', { name: 'Products', exact: true })).toHaveAttribute('href', '/products/');
    await expect(breadcrumb.locator('[aria-current="page"]')).toHaveCount(1);
    const currentLabel = { hospitality: 'Hospitality', healthcare: 'Healthcare', education: 'Education', 'embedded-systems': 'Embedded Systems', hr: 'HR' }[family.id];
    await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(currentLabel);
    await breadcrumb.getByRole('link', { name: 'Products', exact: true }).click();
    await expect(page).toHaveURL(/\/products\/$/);
  }
});

test('Old product and industry fragments retain relevant destinations', async ({ page }) => {
  const productTargets = [
    'Restaurant Solution', 'Clinic Automation', 'School Management App', 'IoT Gateway',
    'Smart LED', 'Queue Management', 'Website Development & Hosting', 'Domain Training & Education'
  ];
  const industryTargets = [
    'Education', 'Smart & Embedded Systems', 'Manufacturing & Engineering', 'Hospitality',
    'Healthcare', 'Retail & Commerce', 'Startups & Product Teams', 'Service Organizations'
  ];
  for (const [route, prefix, labels] of [
    ['/products/', 'product', productTargets], ['/industries/', 'industry', industryTargets]
  ]) {
    for (const [index, label] of labels.entries()) {
      await page.goto(`${route}#${prefix}-${index}`);
      const target = page.locator(`main [id="${prefix}-${index}"]`);
      await expect(target).toHaveCount(1);
      const context = await target.evaluate(node => (node.closest('article') || node.closest('section') || node.parentElement).textContent);
      expect(context, `${route}#${prefix}-${index}`).toContain(label);
    }
  }
});

test('Demo selection groups cover the actual portfolio and retain My School compatibility', async ({ page }) => {
  await page.goto('/book-a-demo/');
  const options = await page.locator('select[name="interest"] option').evaluateAll(nodes => nodes.map(node => ({
    value: node.value,
    label: node.textContent.trim(),
    group: node.parentElement.tagName === 'OPTGROUP' ? node.parentElement.label : null
  })));
  const familyGroups = new Set();
  for (const family of portfolioFamilies) {
    const groups = new Set();
    for (const [, name] of family.products) {
      const matches = options.filter(option => option.value === name);
      expect(matches, name).toHaveLength(1);
      expect(matches[0].label).toBe(name);
      expect(matches[0].group, name).toBeTruthy();
      groups.add(matches[0].group);
    }
    expect(groups.size, family.label).toBe(1);
    familyGroups.add([...groups][0]);
  }
  expect(familyGroups.size).toBe(5);
  expect(options.filter(option => option.value === 'My School')).toEqual([
    { value: 'My School', label: 'My School', group: 'Existing product enquiry' }
  ]);
});

test('Demo preselection supports a new offering and rejects an unknown option', async ({ page }) => {
  await page.goto('/book-a-demo/?service=HR%20Solution');
  await expect(page.locator('[name="interest"]')).toHaveValue('HR Solution');
  await page.locator('[name="firstName"]').fill('Workforce');
  await page.locator('[name="lastName"]').fill('Buyer');
  await page.locator('[name="email"]').fill('buyer@example.com');
  await page.locator('[name="company"]').fill('Example Organization');
  await page.locator('[name="consent"]').check();
  await page.getByRole('button', { name: 'Prepare demo request', exact: true }).click();
  const draft = new URL(await page.locator('#email-brief').getAttribute('href'));
  expect(draft.searchParams.get('subject')).toBe('Demo request — HR Solution');
  expect(draft.searchParams.get('body')).toContain('HR Solution');
  await page.locator('[name="interest"]').selectOption('Parent App');
  await expect(page.locator('#form-result')).toBeHidden();

  await page.goto('/book-a-demo/?service=Unknown%20Product');
  await expect(page.locator('[name="interest"]')).toHaveValue('');
});

test('Catalogue search and family filters combine and clear restores the full portfolio', async ({ page }) => {
  await page.goto('/products/');
  const controls = page.locator('[data-catalogue-controls]');
  const search = page.getByRole('searchbox', { name: 'Search products', exact: true });
  const entries = page.locator('main [data-product-entry]:visible');
  const families = page.locator('main [data-product-family]:visible');
  const status = page.locator('#portfolio-status');
  const empty = page.locator('#portfolio-empty');
  await expect(controls).toBeVisible();
  await expect(search).toHaveAttribute('id', 'portfolio-search');
  await expect(status).toHaveAttribute('role', 'status');
  await expect(entries).toHaveCount(20);
  await expect(families).toHaveCount(5);
  await expect(status).toContainText(/^20 offerings\b/);
  await expect(empty).toBeHidden();

  await search.fill('Clinic Automation');
  await expect(entries).toHaveCount(1);
  await expect(entries.getByRole('link', { name: 'Clinic Automation', exact: true })).toBeVisible();
  await expect(families).toHaveCount(1);
  await expect(families).toHaveAttribute('data-product-family', 'healthcare');
  await expect(status).toContainText(/^1 offering\b/);
  // The search index includes the approved product description, not just its name.
  await search.fill('after a visit');
  await expect(entries).toHaveCount(1);
  await expect(entries.getByRole('link', { name: 'Clinic Automation', exact: true })).toBeVisible();

  await search.fill('');
  await page.locator('[data-family-filter="hospitality"]').click();
  await expect(page.locator('[data-family-filter="hospitality"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-family-filter="all"]')).toHaveAttribute('aria-pressed', 'false');
  await expect(entries).toHaveCount(4);
  await expect(families).toHaveCount(1);
  await expect(families).toHaveAttribute('data-product-family', 'hospitality');
  await expect(status).toContainText(/^4 offerings\b/);

  await search.fill('pharmacy');
  await expect(entries).toHaveCount(0);
  await expect(families).toHaveCount(0);
  await expect(empty).toBeVisible();
  await expect(status).toContainText(/^No offerings\b/i);
  await empty.locator('[data-clear-filters]').click();
  await expect(search).toHaveValue('');
  await expect(page.locator('[data-family-filter="all"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-family-filter="hospitality"]')).toHaveAttribute('aria-pressed', 'false');
  await expect(entries).toHaveCount(20);
  await expect(families).toHaveCount(5);
  await expect(empty).toBeHidden();
  await expect(status).toContainText(/^20 offerings\b/);
});

test('Catalogue filters and search are usable from the keyboard', async ({ page }) => {
  await page.goto('/products/');
  const entries = page.locator('main [data-product-entry]:visible');
  const all = page.locator('[data-family-filter="all"]');
  const hospitality = page.locator('[data-family-filter="hospitality"]');
  const healthcare = page.locator('[data-family-filter="healthcare"]');
  const search = page.getByRole('searchbox', { name: 'Search products', exact: true });
  await all.focus();
  await page.keyboard.press('Tab');
  await expect(hospitality).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(hospitality).toHaveAttribute('aria-pressed', 'true');
  await expect(entries).toHaveCount(4);
  await page.keyboard.press('Tab');
  await expect(healthcare).toBeFocused();
  await page.keyboard.press('Space');
  await expect(healthcare).toHaveAttribute('aria-pressed', 'true');
  await expect(hospitality).toHaveAttribute('aria-pressed', 'false');
  await expect(entries).toHaveCount(9);
  await search.focus();
  await page.keyboard.type('Clinic Automation');
  await expect(entries).toHaveCount(1);
  await expect(entries.getByRole('link', { name: 'Clinic Automation', exact: true })).toBeVisible();
  await page.keyboard.press('ControlOrMeta+A');
  await page.keyboard.press('Backspace');
  await expect(search).toHaveValue('');
  await expect(entries).toHaveCount(9);
});

test('Legacy product hash navigation reveals destinations hidden by catalogue filters', async ({ page }) => {
  await page.goto('/products/');
  const search = page.getByRole('searchbox', { name: 'Search products', exact: true });
  await page.locator('[data-family-filter="hospitality"]').click();
  await search.fill('restaurant');
  await expect(page.locator('main [data-product-entry]:visible')).toHaveCount(1);
  await expect(page.locator('main [data-product-family="healthcare"]')).toBeHidden();
  // A same-document fragment change must recover a previously hidden destination.
  await page.evaluate(() => { window.location.hash = 'product-1'; });
  await expect(page).toHaveURL(/\/products\/#product-1$/);
  await expect(search).toHaveValue('');
  await expect(page.locator('[data-family-filter="all"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('main [data-product-entry]:visible')).toHaveCount(20);
  await expect(page.locator('main [data-product-family="healthcare"]')).toBeVisible();
  const clinic = page.locator('main .portfolio-links').getByRole('link', { name: 'Clinic Automation', exact: true });
  await expect(clinic).toBeVisible();
  await expect(clinic).toBeInViewport();
});

test('Without JavaScript the complete portfolio remains readable and filtering stays hidden', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('/products/');
    await expect(page.locator('[data-catalogue-controls]')).toHaveCount(1);
    await expect(page.locator('[data-catalogue-controls]')).toBeHidden();
    await expect(page.locator('main [data-product-entry]:visible')).toHaveCount(20);
    await expect(page.locator('main [data-product-family]:visible')).toHaveCount(5);
    for (const family of portfolioFamilies) {
      const group = page.locator(`main [data-product-family="${family.id}"]`);
      for (const [, name] of family.products) {
        await expect(group.getByRole('link', { name, exact: true })).toBeVisible();
      }
    }
    await page.locator('main .portfolio-links').getByRole('link', { name: 'Clinic Automation', exact: true }).click();
    await expect(page).toHaveURL(/\/products\/healthcare\/#clinic-automation$/);
    await expect(page.locator('[data-product="clinic-automation"]').getByRole('heading', { name: 'Clinic Automation', exact: true })).toBeVisible();
  } finally {
    await context.close();
  }
});

test('Contact preselection and draft values accept only the supported enquiry choices', async ({ page }) => {
  const fillContact = async () => {
    await page.locator('[name="firstName"]').fill('Portfolio');
    await page.locator('[name="lastName"]').fill('Buyer');
    await page.locator('[name="email"]').fill('portfolio@example.com');
    await page.locator('[name="consent"]').check();
  };
  await page.goto('/contact/?service=HR%20Solution&type=Digital%20transformation');
  await expect(page.locator('[name="interest"]')).toHaveValue('HR Solution');
  await fillContact();
  await page.getByRole('button', { name: 'Prepare enquiry', exact: true }).click();
  const supported = new URL(await page.locator('#email-brief').getAttribute('href'));
  expect(supported.searchParams.get('body')).toContain('Product or service: HR Solution');
  expect(supported.searchParams.get('body')).toContain('Enquiry type: Digital transformation');

  await page.goto('/contact/?service=Unlisted%20Product&type=Unlisted%20Type');
  await expect(page.locator('[name="interest"]')).toHaveValue('');
  await fillContact();
  await page.getByRole('button', { name: 'Prepare enquiry', exact: true }).click();
  const fallback = new URL(await page.locator('#email-brief').getAttribute('href'));
  expect(fallback.searchParams.get('body')).toContain('Product or service: Not specified');
  expect(fallback.searchParams.get('body')).toContain('Enquiry type: General enquiry');
  expect(fallback.searchParams.get('body')).not.toContain('Unlisted');

  // A DOM-injected option must not bypass the draft generator's allowlist.
  await page.locator('[name="interest"]').evaluate(select => {
    select.add(new Option('Unlisted Product', 'Unlisted Product'));
  });
  await page.locator('[name="interest"]').selectOption('Unlisted Product');
  await expect(page.locator('#form-result')).toBeHidden();
  await page.getByRole('button', { name: 'Prepare enquiry', exact: true }).click();
  await expect(page.locator('#interest-error')).toContainText('Choose a product or service from the list.');
  await expect(page.locator('[name="interest"]')).toBeFocused();
  await expect(page.locator('#form-result')).toBeHidden();
});
