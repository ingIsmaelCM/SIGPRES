import Service from "@app/services/Service";
import {Stripe} from "stripe";
import appConfig from "@app/app.config";

export default class StripeService extends Service {

    protected static stripe: Stripe;
    private static instance: StripeService;

    private  constructor() {
        StripeService.stripe = new Stripe(appConfig.stripe.key);
        super();
    }
    static getInstance() {
        if(!StripeService.instance){
          StripeService.instance=  new StripeService();
        }
        return StripeService.instance;
    }

     async createCustomer() {
        const params: Stripe.CustomerCreateParams = {
            description: "Test client",
            balance: 25000*100
        };
        const customer: Stripe.Customer = await StripeService.stripe.customers.create(params);
        const payment=await StripeService.getInstance().createPayment(customer)
        return {customer: customer, payment: payment};
    }

    async createPayment(customer: Stripe.Customer){
       return await StripeService.stripe.paymentIntents.create({
            customer: customer.id,
            amount: 2500*100,
            currency: 'DOP',
           confirm: true,
        })
    }
}