const base = require('@playwright/test');
const { LoginPage } = require('../POM/LoginPage');


exports.fixtureTest = base.test.extend(
    {
    loginPageFixture: async({page}, use)=>{
        await use(new LoginPage(page));
    },

    testDataFixture: {
    
atcProd : "ZARA COAT 3",
country : "India",
userName : "new121nabil@yopmail.com",
password : "11992288Nn"

}

})