import Service from "@app/services/Service";
import {BraintreeGateway} from "braintree"
import appConfig from "@app/app.config";
import {IClientView} from "@app/interfaces/SourceInterfaces";
import TenantConnection from "@app/db/TenantConnection";
import tools from "@app/utils/tools";

interface ICard {
    cardName: string;
    cardNumber: string;
    cardMonth: string;
    cardYear: string;
    cardCvv: string;
    brand: string;

}

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

    public async createToken(clientId: string) {
        return this.safeRun(async () => {
            const {clientToken} = await this.gateway.clientToken.generate({
                customerId: clientId
            })
            return clientToken
        })
    }

    public async createClient(client: IClientView): Promise<any> {
        return this.safeRun(async () => {
            const storedReq = TenantConnection.requestNamespace.get('req')
            const tenant = storedReq?.cookies.tenant;
            const {customer} = await this.gateway.customer.create({
                firstName: client.name,
                lastName: client.lastname,
                company: tenant,
                email: client.email || '',
                phone: client.phone,
                id: client.id
            })
            return customer
        })
    }

    public async createCreditCard(clientId: string, card: ICard) {
        return this.safeRun(async () => {
            const customer = await this.gateway.customer.find(clientId);
            console.log(card.cardNumber.replace(/ /g,''))
            return await  this.gateway.paymentMethod.create({
                customerId: customer.id,
                cvv: card.cardCvv,
                number: card.cardNumber.replace(/ /g,''),
                cardholderName: tools.initialToUpper(card.cardName),
                expirationMonth: card.cardMonth,
                expirationYear: card.cardYear,
                paymentMethodNonce: "fake-valid-nonce",
            })

        })
    }


}