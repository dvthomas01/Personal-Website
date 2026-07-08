import { test, expect } from '@playwright/test';

test('home prerenders and loads', async ({ page }) => {
  await page.goto('./');
  await expect(page).toHaveTitle('Dami Thomas');
});
