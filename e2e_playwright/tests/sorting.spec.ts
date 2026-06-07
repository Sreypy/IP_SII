import { test, expect } from '@playwright/test';

test('sort products by price low to high', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  // select sorting
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  // get all prices
  const prices = await page.locator('.inventory_item_price').allTextContents();

  const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

  // check sorting
  for (let i = 1; i < numericPrices.length; i++) {
    expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i - 1]);
  }
});