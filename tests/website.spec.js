import { test, expect } from '@playwright/test';

for (const width of [320, 375, 480, 768, 1024, 1280, 1440, 1920]) {
  test(`Pages render without overflow at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of ['/', '/services/', '/solutions/', '/about/', '/contact/', '/book-a-demo/', '/products/', '/industries/', '/resources/']) {
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

test('Mobile menu allows navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open navigation' });
  await toggle.click();
  await expect(page.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('button', {name:'Products submenu',exact:true}).click();
  await page.locator('#submenu-0').getByRole('link', {name:'Restaurant Solution',exact:true}).click();
  await expect(page).toHaveURL(/\/products\/#product-0$/);
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
});

test('All local links, supplied brand assets and server rendered routes resolve', async ({ page, request }) => {
  const visited = new Set();
  for (const route of ['/', '/products/', '/industries/', '/solutions/', '/services/', '/resources/', '/about/', '/contact/', '/book-a-demo/']) {
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
  for (const route of ['/', '/products/', '/solutions/', '/industries/', '/services/', '/resources/', '/about/', '/contact/', '/book-a-demo/']) {
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
  for (const width of [375, 1024, 1101, 1440]) {
    await page.setViewportSize({width,height:900});
    await page.goto('/');
    if (width < 1101) await page.getByRole('button',{name:'Open navigation'}).click();
    const button = page.getByRole('button',{name:'Solutions submenu',exact:true});
    if (width < 1101) await button.click();
    else await button.hover();
    await expect(page.locator('#submenu-2 .mega-card')).toHaveCount(5);
    await expect(page.locator('#submenu-2 .mega-icon svg').first()).toBeVisible();
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
  const download = page.getByRole('link', { name: 'Download company profile', exact: false });
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
  for (const route of ['/', '/products/', '/industries/', '/solutions/', '/services/', '/resources/', '/about/', '/contact/', '/book-a-demo/']) {
    await page.goto(route);
    await expect(page.locator('.card-action')).toHaveCount(0);
    await expect(page.getByRole('link', {name:/Request details|Enquire about this solution|Enquire about this service/})).toHaveCount(0);
    await expect(page.locator('.nav-cta')).toHaveCount(1);
    await expect(page.locator('.nav-cta')).toHaveAttribute('href','/book-a-demo/');
  }
});

test('Shared footer and page links follow the reference cleanup', async ({ page }) => {
  for (const route of ['/', '/products/', '/industries/', '/solutions/', '/services/', '/resources/', '/about/', '/contact/', '/book-a-demo/']) {
    await page.goto(route);
    await expect(page.locator('main .section-end')).toHaveCount(0);
    await expect(page.locator('.offering-card strong')).toHaveCount(0);
    await expect(page.locator('footer .footer-column')).toHaveCount(5);
    await expect(page.locator('footer .button')).toHaveCount(0);
  }
});

test('Company footer replaces all visible contact blocks', async ({page}) => {
  for (const route of ['/', '/contact/', '/book-a-demo/']) {
    await page.goto(route);
    const company = page.locator('.footer-column').filter({has:page.getByRole('heading',{name:'Company',exact:true})});
    await expect(company.getByRole('link',{name:'About us',exact:true})).toHaveAttribute('href','/about/');
    await expect(company.getByRole('link',{name:'Contact us',exact:true})).toHaveAttribute('href','/contact/');
    await expect(page.locator('main, footer')).not.toContainText('bmtechservices2025@gmail.com');
    await expect(page.locator('main, footer')).not.toContainText('Janapriya Utopia');
    await expect(page.locator('main .contact-details')).toHaveCount(0);
  }
});
test('Header opens dedicated demo and product selection stays meaningful', async ({page}) => {
  await page.goto('/');
  await page.locator('.nav-cta').click();
  await expect(page).toHaveURL(/book-a-demo\/$/);
  await expect(page.getByRole('heading',{name:'Book a Demo',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Book Demo',exact:true}).click();
  await expect(page.locator('#interest-error')).toBeVisible();
  await page.locator('[name="interest"]').selectOption('My School');
  await page.locator('[name="firstName"]').fill('Demo');
  await page.locator('[name="lastName"]').fill('User');
  await page.locator('[name="email"]').fill('demo@example.com');
  await page.locator('[name="company"]').fill('Example School');
  await page.locator('[name="consent"]').check();
  await page.getByRole('button',{name:'Book Demo',exact:true}).click();
  await expect(page.locator('#form-result')).toBeVisible();
  const draft = new URL(await page.locator('#email-brief').getAttribute('href'));
  expect(draft.searchParams.get('subject')).toBe('Demo request — My School');
  expect(draft.searchParams.get('body')).toContain('Name: Demo User');
  expect(draft.searchParams.get('body')).toContain('Company: Example School');
});
test('Contact validates names email and consent and prepares accurate draft', async ({page}) => {
  await page.goto('/contact/');
  await page.getByRole('button',{name:'Submit',exact:true}).click();
  await expect(page.locator('[name="firstName"]')).toBeFocused();
  await expect(page.locator('#consent-error')).toBeVisible();
  await page.locator('[name="firstName"]').fill('Test &');
  await page.locator('[name="lastName"]').fill('User');
  await page.locator('[name="email"]').fill('invalid');
  await page.locator('[name="consent"]').check();
  await page.getByRole('button',{name:'Submit',exact:true}).click();
  await expect(page.locator('#email-error')).toContainText('valid email');
  await page.locator('[name="email"]').fill('visitor@example.com');
  await page.locator('[name="message"]').fill('Ordering & billing enquiry.');
  await page.getByRole('button',{name:'Submit',exact:true}).click();
  const draft = new URL(await page.locator('#email-brief').getAttribute('href'));
  expect(draft.searchParams.get('body')).toContain('Test & User');
  expect(draft.searchParams.get('body')).toContain('Ordering & billing enquiry.');
  const whatsapp = new URL(await page.locator('#whatsapp-brief').getAttribute('href'));
  expect(whatsapp.searchParams.get('text')).toBe(draft.searchParams.get('body'));
  await expect(page.locator('#form-result')).toContainText('Your enquiry has not been sent yet.');
  await page.locator('[name="message"]').fill('Changed message');
  await expect(page.locator('#form-result')).toBeHidden();
});
