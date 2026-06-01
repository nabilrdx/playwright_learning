class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.selectCountryInput = page.getByRole('textbox', { name: 'Select Country' });
        this.placeOrderCta = page.locator('.actions a');
    }

    async selectCountryFromDropdown(country) {
        await this.selectCountryInput.pressSequentially(country);
        await this.page.locator('.ta-results').waitFor();
        const drpdown = await this.page.locator('.ta-results').locator('button');
        const dropDownCount = await drpdown.count();
        for (let i = 0; i < dropDownCount; i++) {
            if (String(await drpdown.nth(i).textContent()).trim() === country) {
                await drpdown.nth(i).click();
                break;
            }
        }
    }

    async placeOrder(){
        await this.placeOrderCta.click();
    }
    

}

module.exports={CheckoutPage};