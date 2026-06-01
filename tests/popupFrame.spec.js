import {test, expect} from '@playwright/test';

// test('Pop Up Validation', async ({page})=>{
//     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
//     await page.locator('#alertbtn').click();
//     await page.pause();
//     page.on('dialog', dialog => dialog.accept());
// })

test('iFrame test', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  const framePage = page.frameLocator('#courses-iframe');

  await framePage
    .getByRole('link', { name: 'Courses', exact: true })
    .click();
// await page.pause();
});