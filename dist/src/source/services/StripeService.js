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
    async createCustomer() {
        const params = {
            description: "Test client",
            balance: 25000 * 100
        };
        const customer = await StripeService.stripe.customers.create(params);
        const payment = await StripeService.getInstance().createPayment(customer);
        return { customer: customer, payment: payment };
    }
    async createPayment(customer) {
        return await StripeService.stripe.paymentIntents.create({
            customer: customer.id,
            amount: 2500 * 100,
            currency: 'DOP',
            confirm: true,
        });
    }
}
exports.default = StripeService;
//# sourceMappingURL=StripeService.js.map