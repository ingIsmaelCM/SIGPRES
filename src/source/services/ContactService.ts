import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import ContactRepository from "@source/repositories/ContactRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IContact, IContactView} from "@app/interfaces/SourceInterfaces";
import ClientContactRepository from "@source/repositories/ClientContactRepository";
import ContactViewRepository from "@source/repositories/ContactViewRepository";
import InfoService from "@source/services/InfoService";
import ClientContactViewRepository from "@source/repositories/ClientContactViewRepository";
import {EImageable, IImage} from "@app/interfaces/FileInterface";
import ImageService from "@source/services/ImageService";
import CloudinaryService from "@app/services/CloudinaryService";

export default class ContactService extends Service {
    private mainRepo = new ContactRepository();
    private contactViewRepo = new ContactViewRepository();
    private infoService = new InfoService();
    private clientContactRepo = new ClientContactRepository();
    private clientContactViewRepo = new ClientContactViewRepository();
    private imageService = new ImageService();

    async getContacts(params: IParams) {
        return await this.contactViewRepo.getAll(params)
    }

    async findContact(contactId: number, params: IParams) {
        return await this.contactViewRepo.findById(contactId, params)
    }

    async getContactFromRelation(params: IParams) {
        return await this.clientContactViewRepo.getAll(params)
    }

    async createContact(data: IContactView & { clientId: number }): Promise<IContact> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const newInfo = await this.infoService.setFromRelated(data, trans);
                let newContact = await this.mainRepo.create({...data, infoId: newInfo.id}, trans);
                if (data.clientId) {
                    await this.clientContactRepo.create({
                        ...data,
                        contactId: newContact.id
                    }, trans)
                }
                const result = {...newInfo.dataValues, ...newContact.dataValues}
                await trans.commit();

                return result;
            },
            async () => await trans.rollback()
        )
    }

    async updateContact(contactId: number, data: IContactView & { clientId: number }): Promise<IContact> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const updatedContact = await this.mainRepo.update(data, contactId, trans);
                if (data.infoId) {
                    await this.infoService.updateFromRelated(data, data.infoId, trans);
                }
                if ((data as any).relationId) {
                    await this.clientContactRepo.update(data, (data as any).relationId, trans)
                }
                await trans.commit();
                return updatedContact;
            },
            async () => await trans.rollback()
        )
    }

    async setProfilePhoto(contactId: number, data: any): Promise<IImage> {
        return this.safeRun(async () => {
                const res = await CloudinaryService.getInstance().uploadFilesToCloudinary<IImage>(data)
                const image: IImage = res[0]
                image.caption = "Perfil Contacto"
                return await this.imageService.createSingleImage(image,
                    EImageable.Contact, contactId, true)
            }
        )
    }

    async deleteContact(contactId: number): Promise<IContact> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const deletedContact = await this.mainRepo.delete(contactId, trans);
                await trans.commit();
                return deletedContact;
            },
            async () => await trans.rollback()
        )
    }

    async restoreContact(contactId: number): Promise<IContact> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const restoredContact = await this.mainRepo.restore(contactId, trans);
                await trans.commit();
                return restoredContact;
            },
            async () => await trans.rollback()
        )
    }


}