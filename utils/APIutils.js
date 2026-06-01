class APIutils{
constructor(apiContext, loginPayload){
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
}
response = {};

async getToken(){
    
    const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data:this.loginPayload});
    const respJson = await loginResponse.json();
    return respJson.token;
}

async createOrder(createOrderPayload){

     this.response.token= await this.getToken();

    const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            headers: {
                'Authorization': this.response.token
            },
            data: createOrderPayload
        }
    );
    
    const orderJsonResp = await orderResponse.json();
    this.response.orderId = orderJsonResp.orders[0];
    return this.response;

}

}

module.exports ={APIutils};
