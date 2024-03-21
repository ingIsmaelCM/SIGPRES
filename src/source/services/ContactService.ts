import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import ContactRepository from "@source/repositories/ContactRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IContact} from "@app/interfaces/SourceInterfaces";

export default class ContactService extends Service {
    private mainRepo = new ContactRepository();

    async getContacts(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findContact(contactId: number, params: IParams) {
        return await this.mainRepo.findById(contactId, params)
    }

    async createContact(data: IContact): Promise<IContact> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
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