import Service from "@app/services/Service";
import ContactRepository from "@source/repositories/ContactRepository";
import {IParams} from "@app/utils/AppInterfaces";
import {IContact} from "@source/utils/SourceInterfaces";
import {Contact} from "@source/models";
import TenantConnection from "@app/db/TenantConnection";
import {EImageable, IImage} from "@file/utils/FileInterface";
import ImageService from "@file/services/ImageService";

export default class ContactService extends Service {
    private contactRepo = new ContactRepository();

    async getContacts(params: IParams): Promise<any> {
        return this.safeRun(async () =>
            await this.contactRepo.getAll(params))
    }

    async findContact(contactId: number, params: IParams): Promise<IContact> {
        return this.safeRun(async () =>
            await this.contactRepo.findById(contactId, params))
    }

    async createContact(contact: IContact): Promise<Contact> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const newContact = await this.contactRepo.create(contact, trans)
                this.setToClient((contact as any).clientId, newContact);
                await trans.commit();
                return newContact;
            },
            async () => await trans.rollback())
    }


    async updateContact(contact: IContact, contactId: number): Promise<Contact> {
        const trans = await TenantConnection.getTrans();
        return await this.safeRun(async () => {
                const updatedClient = await this.contactRepo.update(contact, contactId, trans);
                await trans.commit();
                return updatedClient;
            },
            async () => await trans.rollback()
        )
    }

    async deleteContact(contactId: number): Promise<Contact> {
        const trans = await TenantConnection.getTrans();
        return await this.safeRun(async () => {
                const deletedContact = await this.contactRepo.delete(contactId, trans);
                await trans.commit();
                return deletedContact;
            },
            async () => await trans.rollback()
        )
    }

    async restoreContact(contactId: number): Promise<Contact> {
        const trans = await TenantConnection.getTrans();
        return await this.safeRun(async () => {
                const retoredContact = await this.contactRepo.restore(contactId, trans);
                await trans.commit();
                return retoredContact;
            },
            async () => await trans.rollback()
        )
    }


    private setToClient(clientId: number | undefined, newContact: Contact) {
        if (clientId) {
            newContact.addClient(clientId, {
                through: {
                    createdBy: newContact.createdBy,
                    updatedBy: newContact.updatedBy
                }
            })
        }
    }

    async setProfilePhoto(image: IImage, clientId: number) {
        return this.safeRun(async () => {
            image.caption = "Perfil Contacto";
            const existingImage = await ImageService.getImages({
                filter: [`imageableId:eq:${clientId}:and`,
                    `imageableType:eq:${EImageable.Client}:and`,
                    `caption:eq:${image.caption}:and`
                ],
                limit: 1
            })
            if (existingImage) {
                return await ImageService.updateImage(image, existingImage.id!);
            } else {
                return await ImageService.createImages([image], EImageable.Contact, Number(clientId));
            }
        })
    }

}