import Service from "@app/services/Service";
import {BraintreeGateway} from "braintree"
import appConfig from "@app/app.config";

export default class BraintreeService extends Service {

    protected static instance: BraintreeService;

    public readonly gateway: BraintreeGateway;

    private constructor() {
        super();
        this.gateway = new BraintreeGateway(appConfig.braintree)
    }

    public static getInstance(): BraintreeService {
        if (!BraintreeService.instance) {
            BraintreeService.instance = new BraintreeService();
        }
        return BraintreeService.instance;
    }

    public async createToken() {
        return this.safeRun(async () => {
            const {customer} = await this.gateway.customer.create({
                firstName: "Jen",
                lastName: "Smith",
                company: "Braintree",
                email: "jen@example.com",
                phone: "312.555.1234",
                fax: "614.555.5678",
                website: "www.example.com",
                id: "alalaoaoas"
            })
            console.log(customer)
            const {clientToken} = await this.gateway.clientToken.generate({
                customerId: customer.id
            })

            return {clientToken, customer}
        })
    }


}