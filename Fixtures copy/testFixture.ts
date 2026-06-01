import {test as base} from '@playwright/test'

type data={
    atcProd: string,
    country: string,
    userName: string,
    password: string
}
type MyFixture={
    testDataFixture: data
}
exports.customTest=base.extend<MyFixture>({
    
    testDataFixture: {
    
atcProd : "ZARA COAT 3",
country : "India",
userName : "new121nabil@yopmail.com",
password : "11992288Nn"

}
}
)