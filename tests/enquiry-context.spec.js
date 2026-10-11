import { test, expect } from '@playwright/test';

const productNames = ['Clinic Automation', 'Restaurant Solution', 'My School', 'Queue Management', 'Smart LED'];

async function fillContact(page) {
  await page.locator('[name="firstName"]').fill('Ananya &');
  await page.locator('[name="lastName"]').fill('Teacher');
  await page.locator('[name="email"]').fill('planning@example.com');
  await page.locator('[name="consent"]').check();
}

test('Enquiry offers exactly the five approved products and preserves product context', async ({ page }) => {
  for (const name of productNames) {
    await page.goto(`/book-a-demo/?service=${encodeURIComponent(name)}`);
    await expect(page.locator('[name="interest"]')).toHaveValue(name);
    await expect(page.locator('#preparation-title')).toHaveText(`Prepare for ${name}`);
    await expect(page.locator('#preparation-prompts li')).toHaveCount(3);
  }
  const productOptions = page.locator('[name="interest"] optgroup[label="Products"] option');
  await expect(productOptions).toHaveText(productNames);
  await expect(page.locator('[name="interest"] optgroup[label="Services & digital transformation"] option')).toHaveCount(10);
  await expect(page.locator('[name="interest"] option')).toHaveCount(17);
  await expect(page.locator('[name="interest"] option[value="My School"]')).toHaveCount(1);
  await expect(page.locator('[name="interest"] option[value="HR Solution"], [name="interest"] option[value="Pharmacy"], [name="interest"] option[value="Parent App"]')).toHaveCount(0);
  await page.locator('[name="interest"]').selectOption('Not sure yet');
  await expect(page.locator('#preparation-title')).toHaveText('Prepare a useful enquiry');
});

test('Industry context is editable and product changes refresh preparation prompts', async ({ page }) => {
  await page.goto('/book-a-demo/?industry=education');
  await expect(page.locator('[name="industry"]')).toHaveValue('education');
  await expect(page.locator('#preparation-industry')).toHaveText('Industry context: Education');
  await expect(page.locator('[name="interest"]')).toHaveValue('');
  await page.locator('[name="interest"]').selectOption('Queue Management');
  await expect(page.locator('#preparation-prompts')).toContainText('visitors join the queue');
  await expect(page.locator('[name="industry"]')).toHaveValue('education');
  await page.locator('[name="industry"]').selectOption('healthcare');
  await page.locator('[name="interest"]').selectOption('My School');
  await expect(page.locator('#preparation-prompts')).toContainText('parent communication');
  await expect(page.locator('#preparation-prompts')).not.toContainText('visitors join the queue');
  await expect(page.locator('#preparation-industry')).toHaveText('Industry context: Healthcare');

  await page.goto('/book-a-demo/?service=Clinic%20Automation');
  await expect(page.locator('[name="industry"]')).toHaveValue('healthcare');
  await page.locator('[name="interest"]').selectOption('Restaurant Solution');
  await expect(page.locator('[name="industry"]')).toHaveValue('hospitality');
  await expect(page.locator('#preparation-prompts')).toContainText('ordering, kitchen and billing');
  await page.locator('[name="interest"]').selectOption('Smart LED');
  await expect(page.locator('[name="industry"]')).toHaveValue('');
  await expect(page.locator('#preparation-industry')).toBeHidden();
});

test('Unknown and markup query values never become form content or draft context', async ({ page }) => {
  const payload = '<img src=x onerror="window.enquiryInjected=true">';
  for (const value of [payload, '__proto__', 'constructor', 'Unlisted Product']) {
    const params = new URLSearchParams({ service: value, industry: value, type: value });
    await page.goto(`/contact/?${params}`);
    await expect(page.locator('[name="interest"]')).toHaveValue('');
    await expect(page.locator('[name="industry"]')).toHaveValue('');
    await expect(page.locator('.enquiry-preparation img')).toHaveCount(0);
    await expect(page.locator('#enquiry-form')).not.toContainText(value);
    expect(await page.evaluate(() => window.enquiryInjected)).toBeUndefined();
    await fillContact(page);
    await page.getByRole('button', { name: 'Prepare enquiry', exact: true }).click();
    const brief = await page.locator('#brief-output').inputValue();
    expect(brief).toContain('Product or service: Not specified');
    expect(brief).toContain('Industry: Not specified');
    expect(brief).toContain('Enquiry type: General enquiry');
    expect(brief).not.toContain(value);
  }
});

test('Legacy family and service bookmarks map to supported choices without old product options', async ({ page }) => {
  const mappings = [
    ['Hospitality Software', 'Restaurant Solution'],
    ['Healthcare Software', 'Clinic Automation'],
    ['Education Software', 'My School'],
    ['School Management App', 'My School'],
    ['HR & Workforce Software', 'Business applications'],
    ['IoT Gateway', 'Embedded systems & IoT'],
    ['Website Development & Hosting', 'Website & digital experience']
  ];
  for (const [legacy, current] of mappings) {
    await page.goto(`/book-a-demo/?service=${encodeURIComponent(legacy)}`);
    await expect(page.locator('[name="interest"]')).toHaveValue(current);
    const optionValues = await page.locator('[name="interest"] option').evaluateAll(nodes => nodes.map(node => node.value));
    expect(optionValues).not.toContain(legacy);
  }
});

test('Text download, email and WhatsApp drafts contain the same reviewed enquiry without sending', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto('/book-a-demo/?service=My%20School&industry=education');
  await fillContact(page);
  await page.locator('[name="company"]').fill('विद्यालय & Learning');
  await page.locator('[name="message"]').fill('Admission & parent communication\nTarget: next term.');
  const mutations = [];
  page.on('request', request => {
    if (!['GET', 'HEAD'].includes(request.method())) mutations.push(request.url());
  });
  await page.getByRole('button', { name: 'Prepare demo request', exact: true }).click();
  await expect(page.locator('#form-result')).toContainText('does not send it or reserve a demonstration time');
  await expect(page.locator('#result-heading')).toBeFocused();
  const brief = await page.locator('#brief-output').inputValue();
  expect(brief).toContain('Name: Ananya & Teacher');
  expect(brief).toContain('Company: विद्यालय & Learning');
  expect(brief).toContain('Product or service: My School');
  expect(brief).toContain('Industry: Education');
  const email = new URL(await page.locator('#email-brief').getAttribute('href'));
  const whatsapp = new URL(await page.locator('#whatsapp-brief').getAttribute('href'));
  expect(email.pathname).toBe('bmtechservices2025@gmail.com');
  expect(email.searchParams.get('subject')).toBe('Demo request — My School');
  expect(email.searchParams.get('body')).toBe(brief);
  expect(whatsapp.pathname).toBe('/919642668815');
  expect(whatsapp.searchParams.get('text')).toBe(brief);
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download enquiry (.txt)', exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('ampigen-demo-request.txt');
  const chunks = [];
  for await (const chunk of await download.createReadStream()) chunks.push(chunk);
  expect(Buffer.concat(chunks).toString('utf8')).toBe(brief + '\n');
  expect(mutations).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test('Editing invalidates the previous download and clipboard fallback keeps the latest text selectable', async ({ page }) => {
  await page.goto('/contact/?service=Queue%20Management&industry=retail');
  await fillContact(page);
  await page.locator('[name="message"]').fill('Three service counters.');
  await page.getByRole('button', { name: 'Prepare enquiry', exact: true }).click();
  const firstUrl = await page.locator('#download-brief').getAttribute('href');
  expect(firstUrl).toMatch(/^blob:/);
  await page.locator('[name="message"]').fill('Four service counters.');
  await expect(page.locator('#form-result')).toBeHidden();
  await expect(page.locator('#download-brief')).not.toHaveAttribute('href');
  await expect(page.locator('#brief-output')).toHaveValue('');
  await page.getByRole('button', { name: 'Prepare enquiry', exact: true }).click();
  expect(await page.locator('#download-brief').getAttribute('href')).not.toBe(firstUrl);
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Clipboard unavailable'); } } });
  });
  await page.getByRole('button', { name: 'Copy enquiry', exact: true }).click();
  await expect(page.locator('#copy-status')).toHaveText('Select and copy the highlighted text.');
  await expect(page.locator('#brief-output')).toBeFocused();
  const selected = await page.locator('#brief-output').evaluate(node => node.value.slice(node.selectionStart, node.selectionEnd));
  expect(selected).toContain('Four service counters.');
  expect(selected).not.toContain('Three service counters.');
});

test('Consent, bounded text and DOM-injected product or industry options cannot bypass validation', async ({ page }) => {
  await page.goto('/contact/');
  await page.getByRole('button', { name: 'Prepare enquiry', exact: true }).click();
  await expect(page.locator('[name="firstName"]')).toBeFocused();
  await expect(page.locator('#consent-error')).toBeVisible();
  await fillContact(page);
  await page.locator('[name="message"]').evaluate(node => {
    node.value = 'x'.repeat(3001);
    node.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.getByRole('button', { name: 'Prepare enquiry', exact: true }).click();
  await expect(page.locator('#message-error')).toHaveText('Use 3000 characters or fewer.');
  await expect(page.locator('#form-result')).toBeHidden();
  await page.locator('[name="message"]').fill('A concise requirements brief.');
  await expect(page.locator('#message-count')).toHaveText('29 / 3000');
  await page.locator('[name="interest"]').evaluate(select => select.add(new Option('Unlisted Product', 'Unlisted Product')));
  await page.locator('[name="interest"]').selectOption('Unlisted Product');
  await page.getByRole('button', { name: 'Prepare enquiry', exact: true }).click();
  await expect(page.locator('#interest-error')).toHaveText('Choose a product or service from the list.');
  await page.locator('[name="interest"]').selectOption('Clinic Automation');
  await page.locator('[name="industry"]').evaluate(select => select.add(new Option('Unlisted Industry', 'Unlisted Industry')));
  await page.locator('[name="industry"]').selectOption('Unlisted Industry');
  await page.getByRole('button', { name: 'Prepare enquiry', exact: true }).click();
  await expect(page.locator('#industry-error')).toHaveText('Choose an industry from the list.');
  await expect(page.locator('#form-result')).toBeHidden();
  await page.locator('[name="industry"]').selectOption('healthcare');
  await page.getByRole('button', { name: 'Prepare enquiry', exact: true }).click();
  await expect(page.locator('#form-result')).toBeVisible();
  await expect(page.locator('#brief-output')).not.toHaveValue(/Unlisted/);
});
