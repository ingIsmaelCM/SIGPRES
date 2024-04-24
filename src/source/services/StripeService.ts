import Service from "@app/services/Service";
import {Stripe} from "stripe";
import appConfig from "@app/app.config";
import {IClientView} from "@app/interfaces/SourceInterfaces";

export default class StripeService extends Service {

    protected static stripe: Stripe;
    private static instance: StripeService;

    private constructor() {
        StripeService.stripe = new Stripe(appConfig.stripe.key);
        super();
    }

    static getInstance() {
        if (!StripeService.instance) {
            StripeService.instance = new StripeService();
        }
        return StripeService.instance;
    }

    async createCustomer(client: IClientView) {
        const params: Stripe.CustomerCreateParams = {
            name: client.fullname,
            email: client.email,
            phone: client.phone,
            shipping:{
              name: client.fullname!,
              address: {
                 line1:  client.address,
                  country: client.country
              },
              phone: client.phone
            },
            address: {
                line1: client.address,
                country: client.country
            },
            balance: 25000 * 100,

        };
        const customer: Stripe.Customer = await StripeService.stripe.customers.create(params);
        return {customer: customer};
    }

    async createPaymentMethod(card: any){
        
        // const newCard=await  StripeService.stripe.paymentMethods.create({
        //     card:{
        //       cvc: "314",
        //       number: "4242424242424242",
        //       exp_month: 12,
        //       exp_year: 2026,
        //     },
        //     type: 'card'
        // })
        // console.log(newCard);
    }

    async createPayment(client: IClientView) {
      const {customer}=await this.createCustomer(client);
        return await StripeService.stripe.paymentIntents.create({
            amount: 4500 * 100,
            currency: 'dop',
            confirm: true,
            description: "Prueba de pago",
            payment_method: "pm_card_visa",
            customer: customer.id,
            setup_future_usage: 'on_session',
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never"
            }
        });
    }
}