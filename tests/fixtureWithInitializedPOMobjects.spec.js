import { test, expect } from '@playwright/test';
import { POManager } from '../POM/POManager';
import { customTest } from '../Fixtures/testFixture';
import { fixtureTest } from '../Fixtures/pomFixtures';
const dataSet= JSON.parse(JSON.stringify(require('../utils/pomPracticeTest_testData.json')));



fixtureTest(`@smoke End to End Flow via custom created fixture`, async ({page, testDataFixture, loginPageFixture})=>{
  //Url
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

const atcProd = testDataFixture.atcProd;
const country = testDataFixture.country;
const userName= testDataFixture.userName, passsword= testDataFixture.password;

//Creating object of login class POM & using them
const poManager= new POManager(page);
// const loginPage = poManager.getLoginPage()
const plpPage= poManager.getPlpPage();
const cartPage= poManager.getCartPage();
const checkoutPage = poManager.getCheckoutPage();
const thankYouPage= poManager.getThankYouPage();
const orderHistoryPage= poManager.getOrderHistoryPage();
const orderDetailsPage= poManager.getOrderDetailsPage();

//Login the user from login page
await loginPageFixture.validLogin(userName, passsword);
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
