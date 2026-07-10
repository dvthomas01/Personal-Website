import { test, expect } from '@playwright/test';

const HEADLINE = 'Hello, I build machines and the software that drives them.';

test('home loads and hero decrypts to the exact headline', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(HEADLINE, { timeout: 15000 });
  await expect(page.getByText('dami@home:~$')).toBeVisible();
});

test('projects page filters work', async ({ page }) => {
  await page.goto('./projects/');
  await expect(page.getByRole('heading', { name: 'Projects', exact: true })).toBeVisible();
  await page.getByRole('button', { name: /Research · 3/ }).click();
  await expect(page.getByText(/Fast Breaks Fast/)).toBeVisible();
  await expect(page.getByText('PS70 Portfolio')).toHaveCount(0);
});

test('photos lightbox opens, navigates, and closes', async ({ page }) => {
  await page.goto('./photos/');
  await expect(page.getByRole('heading', { name: 'Photos', exact: true })).toBeVisible();
  await page.locator('.columns-2 button').first().click();
  const dialog = page.getByRole('dialog', { name: 'Photo viewer' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
});

test('site loads in light mode and dark is session-only', async ({ page }) => {
  await page.goto('./');
  const html = page.locator('html');
  await expect(html).not.toHaveClass(/dark/);
  await page.getByRole('button', { name: /toggle theme/i }).click();
  await expect(html).toHaveClass(/dark/);
  await page.reload();
  await expect(html).not.toHaveClass(/dark/);
});

test('prerendered projects HTML contains real content', async ({ request }) => {
  const res = await request.get('/Personal-Website/projects/');
  const body = await res.text();
  expect(body).toContain('PS70 Portfolio');
});

test('project card opens the in-app detail page', async ({ page }) => {
  await page.goto('./projects/');
  await page.getByRole('link', { name: /Autonomous Navigation Robot/ }).first().click();
  await expect(page).toHaveURL(/\/projects\/autobot/);
  await expect(page.getByRole('heading', { name: 'Autonomous Navigation Robot' })).toBeVisible();
  await expect(page.getByText(/bang-bang control/i)).toBeVisible();
});

test('prerendered detail HTML contains real content', async ({ request }) => {
  const res = await request.get('/Personal-Website/projects/fitclassifier/');
  expect(await res.text()).toContain('FitClassifier');
});

test('detail gallery opens the lightbox', async ({ page }) => {
  await page.goto('./projects/fitclassifier/');
  await page.locator('main button:has(img)').first().click();
  await expect(page.getByRole('dialog', { name: 'Photo viewer' })).toBeVisible();
});
