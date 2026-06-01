import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
//   await page.getByRole('textbox', { name: 'Username:' }).click();
//   await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy');
//   await page.getByRole('textbox', { name: 'Username:' }).press('Tab');
//   await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2');
//   await page.locator('span').nth(4).click();
//   await page.getByRole('button', { name: 'Okay' }).click();
//   // await page.pause();
//   await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).check();
//   await page.getByRole('combobox').selectOption('teach');
//   await page.getByRole('button', { name: 'Sign In' }).click();
//   // await expect(page.locator('h1')).toContainText('Shop Name');
//   // await page.locator(".card-title a").first().textContent()
//   await page.locator(".card-title a").first().waitFor();
//   const items = await page.locator(".card-title a").allTextContents();
// // console.log(await items);

// });

// test('New page & back', async ({ browser})=>{
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
//   // await page.pause();
//   const [newPage] = await Promise.all([
//     context.waitForEvent('page'),
//     page.getByRole('link', { name: 'Free Access to InterviewQues/' }).click()
//   ])

//   const email =  await newPage.getByRole('link', { name: 'mentor@rahulshettyacademy.com' }).textContent();
//   const emailStr =  email?.split('@')[1].split('.')[0];
//   const password = await page.getByText('Learning@830$3mK2').getByText('Learning@830$3mK2').textContent();

//   await page.getByRole('textbox', { name: 'Username:' }).fill(emailStr)
//   await page.getByRole('textbox', { name: 'Password:' }).fill(password);
//   await page.getByRole('button', { name: 'Sign In' }).click();
//   await expect(page).toHaveTitle('ProtoCommerce');



// })

test('End to End Flow', async ({page})=>{
  //Url
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

//Locators
const userNameField= await page.getByRole('textbox', { name: 'email@example.com' }),
passwordField= await page.getByRole('textbox', { name: 'enter your passsword' }),
signInButton= await page.getByRole('button', { name: 'Login' });
// await page.pause();

//Action
await userNameField.fill('new121nabil@yopmail.com');
await passwordField.fill('11992288Nn');
//Check
const detailsFilled = Boolean(await userNameField.inputValue() + await passwordField.inputValue());
const atcProd = 'ZARA COAT 3';
//Assert
if(detailsFilled){
await signInButton.click();
}

await page.locator('#products').waitFor();

console.log(await page.locator('.card').count())

const i= await page.locator('.card').count();
const cardElems = await page.locator('.card');


for(let j=0; j<i; j++){
  if(await page.locator('.card').nth(j).locator('b').textContent() === atcProd){
        // console.log('match found');
        await page.locator('.card').nth(j).getByRole('button', { name: 'Add To Cart' }).click();
        break;
  }
}
await page.getByRole('button', { name: 'Cart' }).nth(0).click();
await page.locator('.cartWrap .items').waitFor();
// await page.pause();

const prodInCart = await page.locator(`h3:has-text("${atcProd}")`).isVisible();
console.log(prodInCart)
await expect(prodInCart).toBeTruthy();
await page.locator('.btn:has-text("Checkout")').click();
// await page.pause();
await page.getByRole('textbox', { name: 'Select Country' }).pressSequentially('Ind');
await page.locator('.ta-results').waitFor();
const drpdown= await page.locator('.ta-results').locator('button');
const dropDownCount = await drpdown.count();
for(let i=0; i<dropDownCount; i++){
  if(await drpdown.nth(i).textContent()===' India'){
    await drpdown.nth(i).click();
    break;
  }
}
await page.locator('.actions a').click();
const orderId = String(await page.locator('label.ng-star-inserted').textContent()).split('|')[1].trim();
console.log(orderId, '::::Order ID');
// await page.pause();
await page.getByText('Orders History Page').click();
// await page.pause();

await page.locator('tbody').waitFor();
const orderHistoryOrderIds = await page.locator('tbody tr');
const ohOidCount = await orderHistoryOrderIds.count();
let result = false;
console.log(ohOidCount)

for(let i=0; i<ohOidCount; i++){
  if(await orderHistoryOrderIds.nth(i).locator('th').textContent() === orderId){
      await orderHistoryOrderIds.nth(i).locator('button:has-text("View")').click();
      break;
  }
}
// await page.pause();

expect(await page.locator('.row .col-text').textContent() === orderId).toBeTruthy();
console.log('Macthed:::::::', await page.locator('.row .col-text').textContent() , orderId);


// await expect(result).toBe(true)
console.log('---------- End to End finished ---------------')
// await page.pause();
})