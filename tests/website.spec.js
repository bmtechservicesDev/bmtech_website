import { test, expect } from '@playwright/test';
import { createHash } from 'node:crypto';

// Independent acceptance inventory from the 11 October testing feedback.
const approvedProducts = [
  ['clinic-automation', 'Clinic Automation', 'healthcare'],
  ['restaurant-solution', 'Restaurant Solution', 'hospitality'],
  ['my-school', 'My School', 'education'],
  ['queue-management', 'Queue Management', 'queue'],
  ['smart-led', 'Smart LED', 'display']
];
const industryInventory = [
  ['healthcare', 'Healthcare'], ['hospitality', 'Hospitality'], ['education', 'Education'],
  ['embedded-systems', 'Embedded Systems'], ['properties', 'Residential & Commercial Properties'],
  ['manufacturing', 'Manufacturing & Engineering'], ['retail', 'Retail & Commerce'],
  ['services', 'Service Organizations'], ['startups', 'Startups & Product Teams']
];
const routes = [
  '/', '/services/', '/solutions/', '/about/', '/contact/', '/book-a-demo/',
  '/products/', '/industries/', '/resources/',
  ...approvedProducts.map(([id]) => `/products/${id}/`),
  ...industryInventory.map(([id]) => `/industries/${id}/`)
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
      if ([375, 1440].includes(width)) await page.screenshot({ path: testInfo.outputPath(`${route.replaceAll('/', '') || 'home'}-${width}.png`), fullPage: true });
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
  await page.locator('#submenu-0').getByRole('link', {name:'Clinic Automation',exact:true}).click();
  await expect(page).toHaveURL(/\/products\/clinic-automation\/$/);
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

test('Mobile dropdowns expand by tap and the selected product page resolves', async ({ page }) => {
  await page.setViewportSize({width:375,height:844});
  await page.goto('/');
  await page.getByRole('button', {name:'Open navigation'}).click();
  const button = page.getByRole('button', {name:'Products submenu', exact:true});
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded','true');
  await page.locator('#submenu-0').getByRole('link',{name:'My School',exact:true}).click();
  await expect(page).toHaveURL(/\/products\/my-school\/$/);
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
    'Healthcare', 'Hospitality', 'Education', 'Embedded Systems', 'Residential & Commercial Properties',
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
    const product = approvedProducts.find(([id]) => route === `/products/${id}/`);
    const industry = industryInventory.find(([id]) => route === `/industries/${id}/`);
    const expectedHref = product
      ? `/book-a-demo/?service=${encodeURIComponent(product[1])}`
      : industry ? `/book-a-demo/?industry=${industry[0]}` : '/book-a-demo/';
    await expect(page.locator('.nav-cta')).toHaveAttribute('href', expectedHref);
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


test('Exactly five ordered products and relevant icons appear on every discovery surface', async ({ page }) => {
  const names = approvedProducts.map(([, name]) => name);
  const symbols = approvedProducts.map(([, , symbol]) => symbol);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('[data-map-product] strong')).toHaveText(names);
  await expect(page.locator('[data-home-product] h3')).toHaveText(names);
  expect(await page.locator('[data-home-product] .icon-badge svg').evaluateAll(nodes => nodes.map(node => node.dataset.icon))).toEqual(symbols);
  await page.getByRole('button', { name: 'Products submenu', exact: true }).hover();
  await expect(page.locator('#submenu-0 .mega-card strong')).toHaveText(names);
  expect(await page.locator('#submenu-0 .mega-icon svg').evaluateAll(nodes => nodes.map(node => node.dataset.icon))).toEqual(symbols);
  await expect(page.locator('footer .footer-column').first().locator('li a')).toHaveText(names);
  await page.goto('/products/');
  await expect(page.locator('[data-product-entry] h3')).toHaveText(names);
  expect(await page.locator('[data-product-entry] .icon-badge svg').evaluateAll(nodes => nodes.map(node => node.dataset.icon))).toEqual(symbols);
  for (const [id, name] of approvedProducts) {
    await expect(page.locator(`[data-product-entry="${id}"]`).getByRole('link', { name, exact: true })).toHaveAttribute('href', `/products/${id}/`);
  }
  await expect(page.locator('[data-product-family], .product-index, .family-number')).toHaveCount(0);
});

test('Product detail pages preserve selection in the single header CTA and show nested breadcrumbs', async ({ page }) => {
  for (const [id, name] of approvedProducts) {
    await page.goto(`/products/${id}/`);
    const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumb', exact: true });
    await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(name);
    await expect(breadcrumb.getByRole('link', { name: 'Products', exact: true })).toHaveAttribute('href', '/products/');
    await expect(page.locator('main .workflow-card')).toHaveCount(3);
    await expect(page.locator('main .faq-list details')).toHaveCount(2);
    await page.locator('.nav-cta').click();
    await expect(page.locator('[name="interest"]')).toHaveValue(name);
    expect(new URL(page.url()).searchParams.get('service')).toBe(name);
  }
});

test('Every industry card and navigation entry opens its own page without visible numbering', async ({ page }) => {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/industries/');
    await expect(page.locator('.industry-route-card')).toHaveCount(9);
    await expect(page.locator('main .numbered-label, main .family-number, main .product-index')).toHaveCount(0);
    for (const [id, name] of industryInventory) {
      await page.goto('/industries/');
      const card = page.getByRole('link', { name, exact: true }).filter({ has: page.locator('h3') });
      await expect(card).toHaveAttribute('href', `/industries/${id}/`);
      if (width === 1440) { await card.focus(); await page.keyboard.press('Enter'); }
      else await card.click();
      await expect(page).toHaveURL(new RegExp(`/industries/${id}/$`));
      await expect(page.locator('[data-industry]')).toHaveAttribute('data-industry', id);
      await expect(page.locator('.breadcrumbs [aria-current="page"]')).toHaveText(name);
      await expect(page.locator('.industry-faq-section details')).toHaveCount(2);
      await expect(page.locator('main .numbered-label, main .family-number, main .product-index')).toHaveCount(0);
      await expect(page.locator(`footer a[href="/industries/${id}/"]`)).toHaveCount(1);
      await expect(page.locator(`#submenu-1 a[href="/industries/${id}/"]`)).toHaveCount(1);
    }
  }
});

test('Industry context reaches the demo request and remains editable', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const [id] of industryInventory) {
    await page.goto(`/industries/${id}/`);
    await page.locator('.nav-cta').click();
    await expect(page.locator('[name="industry"]')).toHaveValue(id);
    await expect(page.locator('[name="interest"]')).toHaveValue('');
  }
  await page.locator('[name="industry"]').selectOption('education');
  await expect(page.locator('#preparation-industry')).toHaveText('Industry context: Education');
});

test('Old product and industry fragments still identify relevant current content', async ({ page }) => {
  const productTargets = ['Restaurant Solution', 'Clinic Automation', 'My School', 'Embedded Systems & IoT Development', 'Smart LED', 'Queue Management', 'Website Development & Hosting', 'Domain Training & Education'];
  const industryTargets = ['Education', 'Embedded Systems', 'Manufacturing & Engineering', 'Hospitality', 'Healthcare', 'Retail & Commerce', 'Startups & Product Teams', 'Service Organizations'];
  for (const [route, prefix, labels] of [['/products/', 'product', productTargets], ['/industries/', 'industry', industryTargets]]) {
    for (const [index, label] of labels.entries()) {
      await page.goto(`${route}#${prefix}-${index}`);
      const target = page.locator(`main [id="${prefix}-${index}"]`);
      await expect(target).toHaveCount(1);
      const text = await target.evaluate(node => (node.closest('article') || node.closest('li') || node.parentElement).textContent);
      expect(text).toContain(label);
    }
  }
});

test('Published family bookmarks move to relevant pages and never act as open redirects', async ({ page, request }) => {
  const cases = [
    ['/products/hospitality/#restaurant-solution', '/products/restaurant-solution/'],
    ['/products/healthcare/#clinic-automation', '/products/clinic-automation/'],
    ['/products/education/#school-management-app', '/products/my-school/'],
    ['/products/embedded-systems/#queue-management', '/products/queue-management/'],
    ['/products/embedded-systems/#smart-led', '/products/smart-led/'],
    ['/products/embedded-systems/#home-automation', '/industries/properties/'],
    ['/products/education/#parent-app', '/industries/education/'],
    ['/products/hr/', '/solutions/#workforce-operations'],
    ['/products/healthcare/#https://example.invalid', '/industries/healthcare/']
  ];
  for (const [old, target] of cases) {
    const response = await request.get(old.split('#')[0]);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain('name="robots" content="noindex, follow"');
    await page.goto(old);
    await expect(page).toHaveURL(new URL(target, page.url()).href);
    await expect(page.locator('h1')).toBeVisible();
  }
});

test('Product search and industry filters combine, show useful empty results and reset', async ({ page }) => {
  await page.goto('/products/');
  const search = page.getByRole('searchbox', { name: 'Search products or workflows', exact: true });
  const industry = page.getByLabel('Your industry', { exact: true });
  const entries = page.locator('[data-product-entry]:visible');
  await expect(entries).toHaveCount(5);
  await expect(page.locator('#portfolio-status')).toHaveText('5 products');
  await search.fill('appointments');
  await expect(entries).toHaveCount(1);
  await expect(entries.getByRole('heading')).toHaveText('Clinic Automation');
  await search.fill('');
  await industry.selectOption('hospitality');
  await expect(entries.locator('h3')).toHaveText(['Restaurant Solution', 'Queue Management', 'Smart LED']);
  await search.fill('school');
  await expect(entries).toHaveCount(0);
  await expect(page.locator('#portfolio-empty')).toBeVisible();
  await page.locator('#portfolio-empty [data-clear-filters]').click();
  await expect(search).toBeFocused();
  await expect(search).toHaveValue('');
  await expect(industry).toHaveValue('all');
  await expect(entries).toHaveCount(5);
  await expect(page.locator('#portfolio-empty')).toBeHidden();
  await industry.selectOption('startups');
  await expect(entries).toHaveCount(0);
  await expect(page.locator('#portfolio-empty').getByRole('link', { name: 'Explore engineering services', exact: true })).toHaveAttribute('href', '/services/');
});

test('Search links restore filters and offer a usable clipboard fallback', async ({ page }) => {
  await page.goto('/products/?q=display&industry=healthcare');
  await expect(page.locator('#portfolio-search')).toHaveValue('display');
  await expect(page.locator('#portfolio-industry')).toHaveValue('healthcare');
  await expect(page.locator('[data-product-entry]:visible h3')).toHaveText(['Queue Management', 'Smart LED']);
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Unavailable'); } } }));
  await page.getByRole('button', { name: 'Copy search link', exact: true }).click();
  const copied = new URL(await page.locator('#product-search-link').inputValue());
  expect(copied.pathname).toBe('/products/');
  expect(copied.searchParams.get('q')).toBe('display');
  expect(copied.searchParams.get('industry')).toBe('healthcare');
  await expect(page.locator('#product-search-link')).toBeFocused();
  await page.reload();
  await expect(page.locator('[data-product-entry]:visible')).toHaveCount(2);
  await page.goto('/products/?industry=unknown&q=%3Cscript%3E');
  await expect(page.locator('#portfolio-industry')).toHaveValue('all');
  await expect(page.locator('#portfolio-empty')).toBeVisible();
  await expect(page.locator('main script')).toHaveCount(0);
});

test('Product search, filters and preparation checklist work from the keyboard', async ({ page }) => {
  await page.goto('/products/');
  await page.locator('#portfolio-search').focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('#portfolio-industry')).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(page.locator('#portfolio-industry')).toHaveValue('healthcare');
  await expect(page.locator('[data-product-entry]:visible')).toHaveCount(3);
  await page.locator('#portfolio-search').focus();
  await page.keyboard.type('appointments');
  await expect(page.locator('[data-product-entry]:visible')).toHaveCount(1);
  await page.goto('/products/clinic-automation/');
  await expect(page.locator('[data-preparation-status]')).toHaveText('0 of 4 points reviewed');
  await page.locator('[data-preparation-item]').first().focus();
  await page.keyboard.press('Space');
  await expect(page.locator('[data-preparation-status]')).toHaveText('1 of 4 points reviewed');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await expect(page.locator('[data-preparation-status]')).toHaveText('2 of 4 points reviewed');
});

test('Legacy hash navigation reveals a product hidden by active search filters', async ({ page }) => {
  await page.goto('/products/?q=restaurant&industry=hospitality');
  await expect(page.locator('[data-product-entry]:visible')).toHaveCount(1);
  await page.evaluate(() => { window.location.hash = 'product-1'; });
  await expect(page.locator('#portfolio-search')).toHaveValue('');
  await expect(page.locator('#portfolio-industry')).toHaveValue('all');
  await expect(page.locator('[data-product-entry]:visible')).toHaveCount(5);
  await expect(page.locator('[data-product-entry="clinic-automation"]')).toBeInViewport();
});

test('Without JavaScript products, industry routes and legacy fallbacks remain usable', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('/products/');
    await expect(page.locator('[data-catalogue-controls]')).toBeHidden();
    await expect(page.locator('[data-product-entry]:visible h3')).toHaveText(approvedProducts.map(([, name]) => name));
    await page.locator('[data-product-entry="clinic-automation"] a').click();
    await expect(page).toHaveURL(/\/products\/clinic-automation\/$/);
    await expect(page.locator('h1')).toContainText('Clinic Automation');
    await page.goto('/industries/');
    await page.locator('.industry-route-card[href="/industries/education/"]').click();
    await expect(page.locator('[data-industry="education"]')).toBeVisible();
    await page.goto('/products/education/');
    await page.getByRole('link', { name: 'Explore Education', exact: true }).click();
    await expect(page).toHaveURL(/\/industries\/education\/$/);
  } finally { await context.close(); }
});

test('Contact preselection preserves the enquiry type and rejects unsupported choices', async ({ page }) => {
  const fill = async () => {
    await page.locator('[name="firstName"]').fill('Portfolio');
    await page.locator('[name="lastName"]').fill('Buyer');
    await page.locator('[name="email"]').fill('portfolio@example.com');
    await page.locator('[name="consent"]').check();
  };
  await page.goto('/contact/?service=HR%20Solution&type=Digital%20transformation');
  await expect(page.locator('[name="interest"]')).toHaveValue('Business applications');
  await fill();
  await page.getByRole('button', { name: 'Prepare enquiry', exact: true }).click();
  const supported = new URL(await page.locator('#email-brief').getAttribute('href'));
  expect(supported.searchParams.get('body')).toContain('Product or service: Business applications');
  expect(supported.searchParams.get('body')).toContain('Enquiry type: Digital transformation');
  await page.goto('/contact/?service=Unlisted%20Product&type=Unlisted%20Type');
  await expect(page.locator('[name="interest"]')).toHaveValue('');
  await fill();
  await page.getByRole('button', { name: 'Prepare enquiry', exact: true }).click();
  const fallback = new URL(await page.locator('#email-brief').getAttribute('href'));
  expect(fallback.searchParams.get('body')).toContain('Product or service: Not specified');
  expect(fallback.searchParams.get('body')).toContain('Enquiry type: General enquiry');
  expect(fallback.searchParams.get('body')).not.toContain('Unlisted');
});
