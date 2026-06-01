import {test, expect, request} from '@playwright/test';
import {APIutils} from '../utils/APIutils'

const loginPayload = {userEmail:"new121nabil@yopmail.com",userPassword:"11992288Nn"};
const createOrderPayload = {orders:[{country:"India",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};
let response; //it consists of login token & orderId 

test.beforeAll(async()=>{
const apiContext = await request.newContext(); 

const apiUtils = new APIutils(apiContext, loginPayload);

response = await apiUtils.createOrder(createOrderPayload);
console.log('Order ID: ',response.orderId);

})

test('End to End Flow', async ({page})=>{

const atcProd = 'ZARA COAT 3';

await page.addInitScript((value)=>{
    window.localStorage.setItem('token', value);
}, response.token);

await page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders');
await page.locator('tbody').waitFor();
const orderHistoryOrderIds = await page.locator('tbody tr');
const ohOidCount = await orderHistoryOrderIds.count();

console.log('Order Count for user: ',ohOidCount)

for(let i=0; i<ohOidCount; i++){
  if(await orderHistoryOrderIds.nth(i).locator('th').textContent() === response.orderId){
      await orderHistoryOrderIds.nth(i).locator('button:has-text("View")').click();
      break;
  }
}

expect(await page.locator('.row .col-text').textContent() === response.orderId).toBeTruthy();

console.log('Macthed Order ID on order details page: ', await page.locator('.row .col-text').textContent() , response.orderId);
console.log('---------- End to End finished ---------------')

})