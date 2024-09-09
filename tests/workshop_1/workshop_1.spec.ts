import {test} from '@playwright/test';
import { on } from 'events';


// basic navigation test
// can test with npx playwright test --ui
test('basic navigation test', async ({ page }) => {
    await page.goto('https://gitlab.com/');
    await page.waitForTimeout(3000);
    await page.reload();
});


// test interaction with the page
// test with npx playwright test --project chromium --headed for visual testing
test.only('test interaction with the page', async ({ page }) => {
    await page.goto('https://gitlab.com/');    
    await page.locator('#be-navigation-desktop').getByRole('link', {name: 'Get free trial'}).click();
    await page.locator('[data-testid="new-user-first-name-field"]').fill('John');
    await page.locator('[data-testid="new-user-last-name-field"]').fill('Doe');
});