class CartPage{
    constructor(page){
        this.page= page;
        this.itemInCartSection= page.locator('.cartWrap .items');
        this.checkoutCta= page.locator('.btn:has-text("Checkout")');
    }

    async itemsInCartSectionLoaded(){
        await this.itemInCartSection.waitFor();
    }

    async verifyAtcProductPresentInCart(atcProd){
        const prodInCart = await this.page.locator(`h3:has-text("${atcProd}")`).isVisible();
        console.log(prodInCart)
        return prodInCart;
    }

    async clickCheckoutCta(){
        await this.checkoutCta.click();
    }


}

module.exports={CartPage}