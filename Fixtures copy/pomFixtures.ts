import {test as base, Page} from '@playwright/test'
import { LoginPage } from '../POM/LoginPage';

type data={
    atcProd: string,
    country: string,
    userName: string,
    password: string
}

type MyFixture={
    loginPageFixture: LoginPage,
    testDataFixture: data
}

exports.fixtureTest = base.extend<MyFixture>(
    {
    loginPageFixture: async({page}:{page:Page}, use: any)=>{
        await use(new LoginPage(page));
    },

    testDataFixture: {
    
atcProd : "ZARA COAT 3",
country : "India",
userName : "new121nabil@yopmail.com",
password : "11992288Nn"

}

})