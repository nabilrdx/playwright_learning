class OrderDetailsPage{
    constructor(page){
        this.page= page;
        this.orderDetailsOrderId= this.page.locator('.row .col-text');
    }

    async verifyOrderIdOnOrderDetailsPage(orderId){
        return await this.orderDetailsOrderId.textContent() === orderId;
    }

}
module.exports={OrderDetailsPage}