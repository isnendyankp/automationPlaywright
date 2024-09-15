import { test } from '@playwright/test';

//  test input form
test('input form', async ({ page }) => {
  // Go to the page
  await page.goto('https://gitlab.com/');
  // ngehit element
  await page
    .locator('#be-navigation-desktop')
    .getByRole('link', { name: 'Get free trial' })
    .click();
  // input first name
  await page.locator('[data-testid="new-user-first-name-field"]').fill('John');
  // input last name
  await page.locator('[data-testid="new-user-last-name-field"]').fill('Doe');
  // submit form
  await page.locator('[data-testid="new-user-submit-button"]').click();
});
