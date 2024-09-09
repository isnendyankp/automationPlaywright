import {test} from '@playwright/test';


// basic navigation test
test('basic navigation test', async ({ page }) => {
    await page.goto('https://gitlab.com/');
    await page.waitForTimeout(3000);
    await page.reload();
});