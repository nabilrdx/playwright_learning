class OrderHistoryPage {
    constructor(page) {
        this.page = page;
        this.orderHistoryPageTable = page.locator('tbody');

    }

    async ordersLoaded(){
        await this.orderHistoryPageTable.waitFor();
    }

    async verifyPlacedOrderInOrderHistoryAndView(orderId) {
        const orderHistoryOrderIds = await this.page.locator('tbody tr');
        const ohOidCount = await orderHistoryOrderIds.count();
        let result = false;
        console.log(ohOidCount)

        for (let i = 0; i < ohOidCount; i++) {
            if (await orderHistoryOrderIds.nth(i).locator('th').textContent() === orderId) {
                await orderHistoryOrderIds.nth(i).locator('button:has-text("View")').click();
                break;
            }
        }
    }
}
module.exports = { OrderHistoryPage }