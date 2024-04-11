"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const ClientContactRepository_1 = __importDefault(require("@source/repositories/ClientContactRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const ClientRepository_1 = __importDefault(require("@source/repositories/ClientRepository"));
const ContactRepository_1 = __importDefault(require("@source/repositories/ContactRepository"));
class ClientContactService extends Service_1.default {
    mainRepo = new ClientContactRepository_1.default();
    clientRepo = new ClientRepository_1.default();
    contactRepo = new ContactRepository_1.default();
    async getClientContacts(params) {
        if (params.include) {
            params.include += ",client,contact";
        }
        else {
            params.include = "client,contact";
        }
        return await this.mainRepo.getAll(params);
    }
    async createClientContact(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const { clientId, contactId } = data;
            const client = await this.clientRepo.findById(clientId);
            const contact = await this.contactRepo.findById(contactId);
            if (!client || !contact) {
                return Promise.reject({
                    code: 404,
                    message: "Recursos no encontrado"
                });
            }
            const newClientContact = await this.mainRepo
                .updateOrCreate({ ...data, deletedAt: null }, trans);
            await trans.commit();
            return newClientContact;
        }, async () => await trans.rollback());
    }
    async deleteFromRelation(relationId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const removedContact = await this.mainRepo.delete(relationId, trans);
            await trans.commit();
            return removedContact;
        }, async () => await trans.rollback());
    }
    async restoreFromRelation(relationId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const restoredContact = await this.mainRepo.restore(relationId, trans);
            await trans.commit();
            return restoredContact;
        }, async () => await trans.rollback());
    }
}
exports.default = ClientContactService;
//# sourceMappingURL=ClientContactService.js.map