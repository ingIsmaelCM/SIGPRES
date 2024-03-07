import Service from "@app/services/Service";
import ContactRepository from "@source/repositories/ContactRepository";
import {IParams} from "@app/utils/AppInterfaces";


export default class ContactService extends Service{
    private contactRepo=new ContactRepository();


    async getContacts(params: IParams): Promise<any>{
        return this.safeRun(async ()=>{
            return await this.contactRepo.getAll(params);
        })
    }
}