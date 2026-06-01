// const {test} = require('@playwright/test')
import {test, expect} from '@playwright/test'

test('This is my first test', async ({browser})=>{

const browser1 = await browser.newContext();
const page = await browser1.newPage();

await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
// await page.pause();
await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy');
await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2');
await page.getByRole('button', { name: 'Sign In' }).click();
await page.pause();
// await expect(page.getByRole('link', { name: 'ProtoCommerce Home' })).toHaveText('ProtoCommerce Home');
await expect(page).toHaveTitle('ProtoCommerce');

})

