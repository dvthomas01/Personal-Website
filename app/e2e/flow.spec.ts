import { test, expect } from '@playwright/test';

test('desktop: boot -> enter -> open About', async ({ page }) => {
  await page.goto('/Personal-Website/');
  await page.getByRole('button', { name: /enter/i }).click();
  // wait out the zoom animation, then open About from the dock
  await page.getByLabel('Open About Me').click({ timeout: 10000 });
  // "About Me" also appears as a desktop-icon label, so assert the opened
  // window's unique close control instead of the ambiguous title text
  await expect(page.getByLabel('Close About Me')).toBeVisible();
});

test('mobile: launcher opens a sheet', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/Personal-Website/');
  await page.getByRole('button', { name: /enter/i }).click();
  await page.getByRole('button', { name: /About Me/i }).click({ timeout: 10000 });
  await expect(page.getByText(/Decision Making/i)).toBeVisible();
});
