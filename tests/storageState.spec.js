import{test,expect} from '@playwright/test';
let webContext;

test.beforeAll(async({browser})=>{
const context = await browser.newContext();
const page = await context.newPage();

await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

//Locators
const userNameField= await page.getByRole('textbox', { name: 'email@example.com' }),
passwordField= await page.getByRole('textbox', { name: 'enter your passsword' }),
signInButton= await page.getByRole('button', { name: 'Login' });
// await page.pause();

//Action
await userNameField.fill('new121nabil@yopmail.com');
await passwordField.fill('11992288Nn');
await signInButton.click();
await page.locator('#products').waitFor();
await context.storageState({path: 'state.json'})
webContext = await browser.newContext({storageState: 'state.json'})

})

test('End to End Flow', async ()=>{
  //Url
const page = await webContext.newPage({storageState: 'state.json'})
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

//Locators
// const userNameField= await page.getByRole('textbox', { name: 'email@example.com' }),
// passwordField= await page.getByRole('textbox', { name: 'enter your passsword' }),
// signInButton= await page.getByRole('button', { name: 'Login' });
// // await page.pause();

// //Action
// await userNameField.fill('new121nabil@yopmail.com');
// await passwordField.fill('11992288Nn');
// //Check
// const detailsFilled = Boolean(await userNameField.inputValue() + await passwordField.inputValue());
const atcProd = 'ZARA COAT 3';
// //Assert
// if(detailsFilled){
// await signInButton.click();
// }

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