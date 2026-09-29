import { test, expect } from '@playwright/test';

for (const width of [320, 375, 480, 768, 1024, 1280, 1440, 1920]) {
  test(`Pages render without overflow at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of ['/', '/services/', '/solutions/', '/about/', '/contact/']) {
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
  await page.locator('nav').getByRole('link', { name: 'Services', exact: true }).click();
  await expect(page).toHaveURL(/\/services\/$/);
  await expect(page.locator('nav a[aria-current="page"]')).toHaveText('Services');
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
  await page.goto('/services/');
  await page.getByRole('link', { name: 'Discuss Embedded systems & IoT', exact: true }).click();
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
  await page.locator('.hero-note').click();
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
