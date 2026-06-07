import { test, expect } from '@playwright/test';

test('locked out user cannot login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  const error = page.locator('[data-test="error"]');

  await expect(error).toBeVisible();
  await expect(error).toContainText('locked out');
});