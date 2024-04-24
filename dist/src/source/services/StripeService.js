"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const stripe_1 = require("stripe");
const app_config_1 = __importDefault(require("@app/app.config"));
class StripeService extends Service_1.default {
    static stripe;
    static instance;
    constructor() {
        StripeService.stripe = new stripe_1.Stripe(app_config_1.default.stripe.key);
        super();
    }
    static getInstance() {
        if (!StripeService.instance) {
            StripeService.instance = new StripeService();
        }
        return StripeService.instance;
    }
    async createCustomer(client) {
        const params = {
            name: client.fullname,
            email: client.email,
            phone: client.phone,
            shipping: {
                name: client.fullname,
                address: {
                    line1: client.address,
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
        const customer = await StripeService.stripe.customers.create(params);
        return { customer: customer };
    }
    async createPaymentMethod(card) {
    }
    async createPayment(client) {
        const { customer } = await this.createCustomer(client);
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
exports.default = StripeService;
//# sourceMappingURL=StripeService.js.map