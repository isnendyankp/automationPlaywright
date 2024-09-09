import {test} from '@playwright/test';
import { on } from 'events';


// basic navigation test
// can test with npx playwright test --ui
test.skip('basic navigation test', async ({ page }) => {
    await page.goto('https://gitlab.com/');
    await page.waitForTimeout(3000);
    await page.reload();
});


// test interaction with the page
// test with npx playwright test --project chromium --headed for visual testing
// Note:
// locator digunakan untuk mencari elemen pada halaman
test.skip('test interaction with the page', async ({ page }) => {
    await page.goto('https://gitlab.com/');
    // kode ini akan mencari elemen dengan role link dan nama Get free trial lalu melakukan klik
    await page.locator('#be-navigation-desktop').getByRole('link', {name: 'Get free trial'}).click();
    // kode ini mengetest input first name dan last name pada halaman
    // data-testid digunakan untuk memberikan nama pada elemen pada kasus ini first name dan last name menggunakan for 
    await page.locator('[data-testid="new-user-first-name-field"]').fill('John');
    await page.locator('[data-testid="new-user-last-name-field"]').fill('Doe');
});


// test interaction with the page by click button sign in at main menu dropdown
// test with npx playwright test --project chromium --headed for visual testing
test.only('test interaction with the page by click button sign in at main menu dropdown', async ({ page }) => {
    await page.goto('https://gitlab.com/');
    await page.getByRole('link', {name: 'Sign in'}).click();
});