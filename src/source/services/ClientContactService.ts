import Service from "@app/services/Service";
import ClientContactRepository from "@source/repositories/ClientContactRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IParams} from "@app/interfaces/AppInterfaces";
import {IClientContact} from "@app/interfaces/SourceInterfaces";
import ClientRepository from "@source/repositories/ClientRepository";
import ContactRepository from "@source/repositories/ContactRepository";

export default class ClientContactService extends Service {
    private mainRepo = new ClientContactRepository();
    private clientRepo=new ClientRepository();
    private contactRepo= new ContactRepository();

    async getClientContacts(params: IParams) {
        if (params.include){
            params.include+=",client,contact"
        } else{
            params.include="client,contact"
        }
        return await this.mainRepo.getAll(params)
    }

    async createClientContact(data: IClientContact): Promise<IClientContact> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            const {clientId, contactId}= data;
                const client=await this.clientRepo.findById(clientId);
                const contact=await this.contactRepo.findById(contactId);
                if(!client || !contact){
                    return Promise.reject({
                        code: 404,
                        message: "Recursos no encontrado"
                    })
                }
                const newClientContact=await this.mainRepo.create(data, trans);
                await trans.commit();
                return newClientContact;
            },
            async () => await trans.rollback()
        )
    }


}