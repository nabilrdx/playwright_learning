const base = require('@playwright/test');

exports.customTest=base.test.extend({
    
    testDataFixture: {
    
atcProd : "ZARA COAT 3",
country : "India",
userName : "new121nabil@yopmail.com",
password : "11992288Nn"

}
}
)