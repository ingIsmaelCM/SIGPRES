"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const ContactRepository_1 = __importDefault(require("@source/repositories/ContactRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const ClientContactRepository_1 = __importDefault(require("@source/repositories/ClientContactRepository"));
const ContactViewRepository_1 = __importDefault(require("@source/repositories/ContactViewRepository"));
const InfoService_1 = __importDefault(require("@source/services/InfoService"));
const ClientContactViewRepository_1 = __importDefault(require("@source/repositories/ClientContactViewRepository"));
const FileInterface_1 = require("@app/interfaces/FileInterface");
const ImageService_1 = __importDefault(require("@source/services/ImageService"));
const CloudinaryService_1 = __importDefault(require("@app/services/CloudinaryService"));
class ContactService extends Service_1.default {
    mainRepo = new ContactRepository_1.default();
    contactViewRepo = new ContactViewRepository_1.default();
    infoService = new InfoService_1.default();
    clientContactRepo = new ClientContactRepository_1.default();
    clientContactViewRepo = new ClientContactViewRepository_1.default();
    imageService = new ImageService_1.default();
    async getContacts(params) {
        return await this.contactViewRepo.getAll(params);
    }
    async findContact(contactId, params) {
        return await this.contactViewRepo.findById(contactId, params);
    }
    async getContactFromRelation(params) {
        return await this.clientContactViewRepo.getAll(params);
    }
    async createContact(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const newInfo = await this.infoService.setFromRelated(data, trans);
            let newContact = await this.mainRepo.create({ ...data, infoId: newInfo.id }, trans);
            if (data.clientId) {
                await this.clientContactRepo.create({
                    ...data,
                    contactId: newContact.id
                }, trans);
            }
            const result = { ...newInfo.dataValues, ...newContact.dataValues };
            await trans.commit();
            return result;
        }, async () => await trans.rollback());
    }
    async updateContact(contactId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const updatedContact = await this.mainRepo.update(data, contactId, trans);
            if (data.infoId) {
                await this.infoService.updateFromRelated(data, data.infoId, trans);
            }
            if (data.relationId) {
                await this.clientContactRepo.update(data, data.relationId, trans);
            }
            await trans.commit();
            return updatedContact;
        }, async () => await trans.rollback());
    }
    async setProfilePhoto(contactId, data) {
        return this.safeRun(async () => {
            const res = await CloudinaryService_1.default.getInstance().uploadFilesToCloudinary(data);
            const image = res[0];
            image.caption = "Perfil Contacto";
            return await this.imageService.createSingleImage(image, FileInterface_1.EImageable.Contact, contactId, true);
        });
    }
    async deleteContact(contactId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const deletedContact = await this.mainRepo.delete(contactId, trans);
            await trans.commit();
            return deletedContact;
        }, async () => await trans.rollback());
    }
    async restoreContact(contactId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const restoredContact = await this.mainRepo.restore(contactId, trans);
            await trans.commit();
            return restoredContact;
        }, async () => await trans.rollback());
    }
}
exports.default = ContactService;
//# sourceMappingURL=ContactService.js.map