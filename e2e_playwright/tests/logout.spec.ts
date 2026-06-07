import { test, expect } from '@playwright/test';

test('user can logout successfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  // open menu
  await page.locator('#react-burger-menu-btn').click();

  // click logout
  await page.locator('#logout_sidebar_link').click();

  // verify back to login page
  await expect(page.getByPlaceholder('Username')).toBeVisible();
});