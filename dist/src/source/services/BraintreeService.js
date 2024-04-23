"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const braintree_1 = require("braintree");
const app_config_1 = __importDefault(require("@app/app.config"));
class BraintreeService extends Service_1.default {
    static instance;
    gateway;
    constructor() {
        super();
        this.gateway = new braintree_1.BraintreeGateway(app_config_1.default.braintree);
    }
    static getInstance() {
        if (!BraintreeService.instance) {
            BraintreeService.instance = new BraintreeService();
        }
        return BraintreeService.instance;
    }
    async createToken() {
        return this.safeRun(async () => {
            const { customer } = await this.gateway.customer.create({
                firstName: "Jen",
                lastName: "Smith",
                company: "Braintree",
                email: "jen@example.com",
                phone: "312.555.1234",
                fax: "614.555.5678",
                website: "www.example.com",
                id: "alalaoaoas"
            });
            console.log(customer);
            const { clientToken } = await this.gateway.clientToken.generate({
                customerId: customer.id
            });
            return { clientToken, customer };
        });
    }
}
exports.default = BraintreeService;
//# sourceMappingURL=BraintreeService.js.map