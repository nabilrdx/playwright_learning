import { test, expect, request } from '@playwright/test';
import { APIutils } from '../utils/APIutils';
import { url } from 'node:inspector';
let token;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIutils(apiContext, {userEmail:"new121nabil@yopmail.com",userPassword:"11992288Nn"});
    token = await apiUtils.getToken()
    console.log(token);
})

test('Intercepting the request even before the NW call is made to the server', async ({ page }) => {
// page.on('request', request => {

//         console.log('Outgoing:', request.url());

//     });
    
//Commented code is a listener, it is not async since it works on page level & tell playwright whenever the event occurs, execute this code

    await page.addInitScript(value=>{
    window.localStorage.setItem('token', value);
}, token)

await page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders');

await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',async route=>{
    await route.continue({url: 'https://rahulshettyacademy.com/client/#/dashboard/order-details/6a0f702017ee3e78ba8f988d'})
})



await page.locator('button', {
    hasText: "View"
}).first().click();



// await page.pause();

})