import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import ContactRepository from "@source/repositories/ContactRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IContact, IContactRelation} from "@app/interfaces/SourceInterfaces";
import InfoRepository from "@source/repositories/InfoRepository";

export default class ContactService extends Service {
    private mainRepo = new ContactRepository();
    private infoRepo = new InfoRepository();

    async getContacts(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findContact(contactId: number, params: IParams) {
        return await this.mainRepo.findById(contactId, params)
    }

    /**
     * PREVBUG: Timeout when trying set contact info.
     * FIXED: Setted trans on setInfo method
     * @param data
     */
    async createContact(data: IContact & IContactRelation & { clientId: number }): Promise<IContact> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                data.info.createdBy = data.createdBy;
                data.info.updatedBy = data.updatedBy;
                const newContact = await this.mainRepo.create(data, trans);
                const newInfo = await this.infoRepo.create(data.info, trans);
                await newContact.setInfo(Number(newInfo.id), {
                    transaction: trans
                });

                if (data.clientId) {
                    await this.mainRepo.addClient(Number(data.clientId), newContact, trans)
                }
                await trans.commit();

                return {...newContact.dataValues, info: newInfo};
            },
            async () => await trans.rollback()
        )
    }

    async updateContact(contactId: number, data: IContact): Promise<IContact> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteContact(contactId: number): Promise<IContact> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreContact(contactId: number): Promise<IContact> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}