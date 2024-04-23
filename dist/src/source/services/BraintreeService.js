"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const braintree_1 = require("braintree");
const app_config_1 = __importDefault(require("@app/app.config"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const tools_1 = __importDefault(require("@app/utils/tools"));
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
    async createToken(clientId) {
        return this.safeRun(async () => {
            const { clientToken } = await this.gateway.clientToken.generate({
                customerId: clientId
            });
            return clientToken;
        });
    }
    async createClient(client) {
        return this.safeRun(async () => {
            const storedReq = TenantConnection_1.default.requestNamespace.get('req');
            const tenant = storedReq?.cookies.tenant;
            const { customer } = await this.gateway.customer.create({
                firstName: client.name,
                lastName: client.lastname,
                company: tenant,
                email: client.email || '',
                phone: client.phone,
                id: client.id
            });
            return customer;
        });
    }
    async createCreditCard(clientId, card) {
        return this.safeRun(async () => {
            const customer = await this.gateway.customer.find(clientId);
            console.log(card.cardNumber.replace(/ /g, ''));
            return await this.gateway.paymentMethod.create({
                customerId: customer.id,
                cvv: card.cardCvv,
                number: card.cardNumber.replace(/ /g, ''),
                cardholderName: tools_1.default.initialToUpper(card.cardName),
                expirationMonth: card.cardMonth,
                expirationYear: card.cardYear,
                paymentMethodNonce: "fake-valid-nonce",
            });
        });
    }
}
exports.default = BraintreeService;
//# sourceMappingURL=BraintreeService.js.map