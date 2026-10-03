import { test, expect } from '@playwright/test';

for (const width of [320, 375, 480, 768, 1024, 1280, 1440, 1920]) {
  test(`Pages render without overflow at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of ['/', '/services/', '/solutions/', '/about/', '/contact/', '/products/', '/industries/', '/resources/']) {
      const response = await page.goto(route);
      expect(response.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('main')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      await expect(page.locator('footer a[href="mailto:bmtechservices2025@gmail.com"]')).toHaveCount(1);
      await page.screenshot({ path: testInfo.outputPath(`${route.replaceAll('/', '') || 'home'}-${width}.png`), fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}

test('Mobile menu allows navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open navigation' });
  await toggle.click();
  await expect(page.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true');
  await page.locator('nav').getByRole('link', { name: 'Products', exact: true }).click();
  await expect(page).toHaveURL(/\/products\/$/);
  await expect(page.locator('nav a[aria-current="page"]')).toHaveText('Products');
});

test('Enquiry validates inputs and prepares an accurately encoded email draft', async ({ page }) => {
  await page.goto('/contact/');
  await page.getByRole('button', { name: 'Prepare enquiry' }).click();
  await expect(page.locator('#form-result')).toBeHidden();
  await expect(page.locator('#name-error')).toHaveText('Enter your name.');
  await expect(page.locator('[name="name"]')).toBeFocused();
  await page.locator('[name="name"]').fill('Test & User');
  await page.locator('[name="company"]').fill('Example Company');
  await page.locator('[name="email"]').fill('visitor@example.com');
  await page.locator('[name="interest"]').selectOption('Cloud & SaaS');
  await page.locator('[name="message"]').fill('We need an application for ordering & billing.');
  await page.getByRole('button', { name: 'Prepare enquiry' }).click();
  const draft = page.getByRole('link', { name: 'Open email draft' });
  await expect(draft).toBeVisible();
  const href = new URL(await draft.getAttribute('href'));
  expect(href.pathname).toBe('bmtechservices2025@gmail.com');
  expect(href.searchParams.get('subject')).toBe('Project enquiry — Cloud & SaaS');
  expect(href.searchParams.get('body')).toContain('Test & User');
  expect(href.searchParams.get('body')).toContain('ordering & billing.');
  const whatsapp = new URL(await page.getByRole('link', { name: 'Enquire on WhatsApp', exact: false }).getAttribute('href'));
  expect(whatsapp.origin).toBe('https://wa.me');
  expect(whatsapp.pathname).toBe('/919642668815');
  expect(whatsapp.searchParams.get('text')).toBe(href.searchParams.get('body'));
  await expect(page.locator('#form-result')).toContainText('Your enquiry has not been sent yet.');
});


test('Service enquiry carries the selected capability into the form', async ({ page }) => {
  await page.goto('/contact/?service=Embedded%20systems%20%26%20IoT');
  await expect(page.locator('[name="interest"]')).toHaveValue('Embedded systems & IoT');
  await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toContainText('Contact');
});

test('Mobile menu supports Escape, keyboard focus and outside dismissal', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const toggle = page.locator('.menu-toggle');
  await toggle.click();
  await page.keyboard.press('Tab');
  await expect(page.locator('nav a').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.locator('main').click({position:{x:10,y:650}});
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('Enquiry rejects whitespace and short messages, then clears stale draft', async ({ page }) => {
  await page.goto('/contact/?service=Cloud%20%26%20SaaS');
  await page.locator('[name="name"]').fill('   ');
  await page.locator('[name="email"]').fill('invalid');
  await page.locator('[name="message"]').fill('Too short');
  await page.getByRole('button', { name: 'Prepare enquiry' }).click();
  await expect(page.locator('#name-error')).toBeVisible();
  await expect(page.locator('#email-error')).toBeVisible();
  await expect(page.locator('#message-error')).toContainText('at least 20 characters');
  await page.locator('[name="name"]').fill('Review User');
  await page.locator('[name="email"]').fill('review@example.com');
  await page.locator('[name="message"]').fill('We need a cloud application for inventory.');
  await page.getByRole('button', { name: 'Prepare enquiry' }).click();
  await expect(page.locator('#result-heading')).toBeFocused();
  await expect(page.locator('#form-result')).toBeVisible();
  await page.locator('[name="message"]').fill('We need a cloud application for field teams.');
  await expect(page.locator('#form-result')).toBeHidden();
  await page.getByRole('button', { name: 'Prepare enquiry' }).click();
  await expect(page.locator('#brief-output')).toHaveValue(/field teams/);
});

test('Copy fallback and reduced motion remain usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/contact/');
  await page.locator('[name="name"]').fill('Review User');
  await page.locator('[name="email"]').fill('review@example.com');
  await page.locator('[name="interest"]').selectOption('Cloud & SaaS');
  await page.locator('[name="message"]').fill('We need a cloud application for inventory.');
  await page.getByRole('button', { name: 'Prepare enquiry' }).click();
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: async () => { throw new Error('Denied'); } }, configurable: true }));
  await page.getByRole('button', { name: 'Copy enquiry' }).click();
  await expect(page.locator('#copy-status')).toHaveText('Select and copy the highlighted text.');
  await expect(page.locator('#brief-output')).toBeFocused();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

test('Product demo selects product and enquiry type with approved branding', async ({ page }) => {
  await page.goto('/products/');
  await expect(page.locator('.brand img').first()).toHaveAttribute('src', '/brand/bmtech-logo.webp');
  await page.getByRole('link', { name: 'Book a demo', exact: true }).click();
  await page.locator('[name="interest"]').selectOption('My School');
  await expect(page.locator('[name="interest"]')).toHaveValue('My School');
  await expect(page.locator('[name="type"]')).toHaveValue('Product demo');
  await page.locator('[name="name"]').fill('Demo Review');
  await page.locator('[name="email"]').fill('demo@example.com');
  await page.locator('[name="phone"]').fill('+91 90000 00000');
  await page.locator('[name="message"]').fill('We would like to discuss a demonstration for our school.');
  await page.getByRole('button', { name: 'Prepare enquiry' }).click();
  await expect(page.locator('#brief-output')).toHaveValue(/Enquiry type: Product demo/);
  await expect(page.locator('#brief-output')).toHaveValue(/Phone: \+91 90000 00000/);
});

test('All local links, supplied brand assets and server rendered routes resolve', async ({ page, request }) => {
  const visited = new Set();
  for (const route of ['/', '/products/', '/industries/', '/solutions/', '/services/', '/resources/', '/about/', '/contact/']) {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    for (const href of await page.locator('a[href^="/"], img[src^="/"], link[rel="icon"]').evaluateAll(nodes => nodes.map(n=>n.getAttribute('href') || n.getAttribute('src')))) {
      if (visited.has(href)) continue;
      visited.add(href);
      const response = await request.get(href);
      expect(response.status(), href).toBe(200);
    }
    const html = await (await request.get(route)).text();
    expect(html).toContain('<main id="main">');
  }
});


test('Single header demo and screenshot removals', async ({ page }) => {
  for (const route of ['/', '/products/', '/solutions/', '/industries/', '/services/', '/resources/', '/about/', '/contact/']) {
    await page.goto(route);
    await expect(page.getByRole('link', { name: 'Book a demo', exact: true })).toHaveCount(1);
    await expect(page.locator('main')).not.toContainText('Discuss your project');
    await expect(page.locator('.engineering-board, .hero-bottom, .home-enquiry, .cta-band')).toHaveCount(0);
  }
});

test('Every desktop heading opens hover dropdown and supports keyboard dismissal', async ({ page }) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  for (const name of ['Products','Industries','Solutions','Resources','About','Contact']) {
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

test('Mobile dropdowns expand by tap and anchored product link resolves', async ({ page }) => {
  await page.setViewportSize({width:375,height:844});
  await page.goto('/');
  await page.getByRole('button', {name:'Open navigation'}).click();
  const button = page.getByRole('button', {name:'Products submenu', exact:true});
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded','true');
  await page.locator('#submenu-0').getByRole('link',{name:'My School',exact:true}).click();
  await expect(page).toHaveURL(/products\/#product-2$/);
  await expect(page.locator('#product-2')).toBeVisible();
});


test('Mega menu cards fit desktop and mobile viewports', async ({ page }, testInfo) => {
  for (const width of [375, 1024, 1440]) {
    await page.setViewportSize({width,height:900});
    await page.goto('/');
    if (width < 861) await page.getByRole('button',{name:'Open navigation'}).click();
    const button = page.getByRole('button',{name:'Solutions submenu',exact:true});
    if (width < 861) await button.click();
    else await button.hover();
    await expect(page.locator('#submenu-2 .mega-card')).toHaveCount(5);
    await expect(page.locator('#submenu-2 .mega-icon svg').first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.screenshot({path:testInfo.outputPath(`mega-menu-${width}.png`),fullPage:false});
  }
});
