import {test, expect, request} from '@playwright/test';
import { APIutils } from '../utils/APIutils';

let fakePayloadData = {data:[],message:"No Orders"},
noOrderMessage ='You have No Orders to show at this time. Please Visit Back Us';


test('Response Intercept', async({page})=>{
const apiContext = await request.newContext();
const apiUtils = new APIutils(apiContext, {userEmail:"new121nabil@yopmail.com",userPassword:"11992288Nn"})
const responseFromOrder = await apiUtils.createOrder({orders:[{country:"India",productOrderedId:"6960ea76c941646b7a8b3dd5"}]});
console.log('Created order ID: ',responseFromOrder)

await page.addInitScript(value=>{
window.localStorage.setItem('token', value);
}, responseFromOrder.token)

await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',async (route)=>{

   const response = await page.request.fetch(route.request());
    let body = JSON.stringify(fakePayloadData);
    route.fulfill(
        {response,
        body
    })
})

await page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders');
// await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
await expect(await page.locator('.mt-4').textContent()).toContain('You have No Orders');
await page.pause()
})