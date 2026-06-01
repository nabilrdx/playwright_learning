class ThankYouPage{
    constructor(page){
        this.page= page;
        this.orderId= this.page.locator('label.ng-star-inserted');
        this.orderHistoryPageCta= this.page.getByText('Orders History Page');
    }

    async captureOrderIdFromTYPage(){
        
        console.log(String(await this.orderId.textContent()).split('|')[1].trim(), ':::Order ID')
        return String(await this.orderId.textContent()).split('|')[1].trim();

    }

    async gotoOrderHistoryPage(){
        await this.orderHistoryPageCta.click()
    }

}
module.exports={ThankYouPage}