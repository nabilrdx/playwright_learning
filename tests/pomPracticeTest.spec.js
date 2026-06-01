import { test, expect } from '@playwright/test';
import { POManager } from '../POM/POManager';
const dataSet= JSON.parse(JSON.stringify(require('../utils/pomPracticeTest_testData.json')));


for(let data of dataSet){
test(`End to End Flow for ${data.atcProd}`, async ({page})=>{
  //Url
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

const atcProd = data.atcProd;
const country = data.country;
const userName= data.userName, passsword= data.password;

//Creating object of login class POM & using them
const poManager= new POManager(page);
const loginPage = poManager.getLoginPage()
const plpPage= poManager.getPlpPage();
const cartPage= poManager.getCartPage();
const checkoutPage = poManager.getCheckoutPage();
const thankYouPage= poManager.getThankYouPage();
const orderHistoryPage= poManager.getOrderHistoryPage();
const orderDetailsPage= poManager.getOrderDetailsPage();

//Login the user from login page
await loginPage.validLogin(userName, passsword);
//PLP Actions
await plpPage.productsLoaded();
await plpPage.atcMatchedProduct(atcProd);
await plpPage.goTOCartFromPlp();
//Cart Actions
await cartPage.itemsInCartSectionLoaded();
await expect(await cartPage.verifyAtcProductPresentInCart(atcProd)).toBeTruthy();
await cartPage.clickCheckoutCta()
//Checkout Actions
await checkoutPage.selectCountryFromDropdown(country);
await checkoutPage.placeOrder();
//Thank You Actions
const orderId= await thankYouPage.captureOrderIdFromTYPage();
await thankYouPage.gotoOrderHistoryPage();
//Order History Actions
await orderHistoryPage.ordersLoaded();
await orderHistoryPage.verifyPlacedOrderInOrderHistoryAndView(orderId);
//Order Details & Assertion to confirm order placed successfully & it's order details page is available
expect(await orderDetailsPage.verifyOrderIdOnOrderDetailsPage(orderId)).toBeTruthy();

console.log('Macthed:::::::', await page.locator('.row .col-text').textContent() , orderId);
console.log('---------- End to End finished ---------------')

})
}