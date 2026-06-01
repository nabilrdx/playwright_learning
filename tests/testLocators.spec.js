import {test, expect } from "@playwright/test";

test('Special Locators available in Playwright', async ({page})=>{

await page.goto('https://rahulshettyacademy.com/angularpractice/');
await page.getByLabel('Check me out if you Love IceCreams!').check();
// await page.getByLabel('Gender').selectOption('Female');
await page.locator('#exampleFormControlSelect1').selectOption('Female');
await page.getByLabel('Employed').check();
await page.getByRole("link", {name: "Shop"}).click();
// await page.locator('.card').filter({hasText:"Nokia Edge"}).getByRole('button').filter({hasText: "Add"}).click();
await page.locator('.card', {hasText:"Nokia Edge", exact: true}).getByRole('button',{hasText: "Add"}).click();
await page.pause();


// await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
// await page.locator('.react-date-picker__inputGroup__month').fill('12');
// await page.locator('.react-date-picker__inputGroup__day').fill('3')
// await page.locator('.react-date-picker__inputGroup__year').fill('2020');
// await page.locator('.react-calendar__tile--active').click();
// await page.pause()

})