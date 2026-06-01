class LoginPage {
    constructor(page) {
        this.page = page;
        this.userNameField = page.getByRole('textbox', { name: 'email@example.com' });
        this.passwordField = page.getByRole('textbox', { name: 'enter your passsword' });
            this.signInButton = page.getByRole('button', { name: 'Login' });

    }

    async validLogin(userName, password){
        await this.userNameField.fill(userName);
await this.passwordField.fill(password);
//Check
const detailsFilled = Boolean(await this.userNameField.inputValue() + await this.passwordField.inputValue());
const atcProd = 'ZARA COAT 3';
//Assert
if(detailsFilled){
await this.signInButton.click();
}

    }
}

module.exports = {LoginPage}