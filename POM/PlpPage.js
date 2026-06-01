class PlpPage{
    constructor(page){
        this.page= page;
        this.productTile = page.locator('#products');
        this.productCards=  page.locator('.card');
        this.plpTOCartButtonHeader= page.getByRole('button', { name: 'Cart' }).nth(0);
    }

    async productsLoaded(){
        await this.productTile.waitFor();
    }

    async atcMatchedProduct(atcProd){
        for(let j=0; j<await this.productCards.count(); j++){
  if(await this.productCards.nth(j).locator('b').textContent() === atcProd){
        // console.log('match found');
        await this.productCards.nth(j).getByRole('button', { name: 'Add To Cart' }).click();
        break;
  }
}
    }

    async goTOCartFromPlp(){
        await this.plpTOCartButtonHeader.click();
    }
}

module.exports={PlpPage}