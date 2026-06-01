import {LoginPage} from '../POM/LoginPage';
import { PlpPage } from '../POM/PlpPage';
import { CartPage } from '../POM/CartPage';
import { CheckoutPage } from '../POM/checkoutPage';
import { ThankYouPage } from '../POM/ThankYouPage';
import { OrderHistoryPage } from '../POM/OrderHistoryPage';
import { OrderDetailsPage } from '../POM/OrderDetailsPage';
class POManager {
    constructor(page) {
        this.page= page;
        this.loginPage = new LoginPage(this.page);
        this.plpPage = new PlpPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.thankYouPage = new ThankYouPage(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page);
        this.orderDetailsPage = new OrderDetailsPage(this.page);
    }

getLoginPage(){
    return this.loginPage;
}
getPlpPage(){
    return this.plpPage;
}
getCartPage(){
    return this.cartPage;
}
getCheckoutPage(){
    return this.checkoutPage;
}
getThankYouPage(){
    return this.thankYouPage;
}
getOrderHistoryPage(){
return this.orderHistoryPage;
}
getOrderDetailsPage(){
return this.orderDetailsPage;
}
}
module.exports = { POManager }