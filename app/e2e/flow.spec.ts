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

test('theme toggle flips and persists across reload', async ({ page }) => {
  await page.goto('./');
  const html = page.locator('html');
  const wasDark = await html.evaluate((el) => el.classList.contains('dark'));
  await page.getByRole('button', { name: /toggle theme/i }).click();
  await expect(html).toHaveClass(wasDark ? /^(?!.*dark).*$/ : /dark/);
  await page.reload();
  const isDarkAfterReload = await html.evaluate((el) => el.classList.contains('dark'));
  expect(isDarkAfterReload).toBe(!wasDark);
});

test('prerendered projects HTML contains real content', async ({ request }) => {
  const res = await request.get('/Personal-Website/projects/');
  const body = await res.text();
  expect(body).toContain('PS70 Portfolio');
});
