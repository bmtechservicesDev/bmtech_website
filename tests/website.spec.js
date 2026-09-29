import { test, expect } from '@playwright/test';

for (const width of [320, 390, 768, 1024, 1440]) {
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
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.locator('nav').getByRole('link', { name: 'Services', exact: true }).click();
  await expect(page).toHaveURL(/\/services\/$/);
  await expect(page.locator('nav a[aria-current="page"]')).toHaveText('Services');
});

test('Enquiry validates inputs and prepares an accurately encoded email draft', async ({ page }) => {
  await page.goto('/contact/');
  await page.getByRole('button', { name: 'Prepare enquiry' }).click();
  await expect(page.locator('#form-result')).toBeHidden();
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
  await expect(page.locator('#form-result')).toContainText('Your enquiry has not been sent yet.');
});
