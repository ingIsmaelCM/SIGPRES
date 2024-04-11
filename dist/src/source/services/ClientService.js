"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const ClientRepository_1 = __importDefault(require("@source/repositories/ClientRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const FileInterface_1 = require("@app/interfaces/FileInterface");
const ImageService_1 = __importDefault(require("@source/services/ImageService"));
const InfoService_1 = __importDefault(require("@source/services/InfoService"));
const ClientViewRepository_1 = __importDefault(require("@source/repositories/ClientViewRepository"));
const CloudinaryService_1 = __importDefault(require("@app/services/CloudinaryService"));
const DocumentService_1 = __importDefault(require("@source/services/DocumentService"));
class ClientService extends Service_1.default {
    mainRepo = new ClientRepository_1.default();
    infoService = new InfoService_1.default();
    clientViewRepo = new ClientViewRepository_1.default();
    imageService = new ImageService_1.default();
    documentService = new DocumentService_1.default();
    async getClients(params) {
        return await this.clientViewRepo.getAll(params);
    }
    async findClient(clientId, params) {
        return await this.clientViewRepo.findById(clientId, params);
    }
    async createClient(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const newInfo = await this.infoService.setFromRelated(data, trans);
            const newClient = await this.mainRepo.create({ ...data, infoId: newInfo.id }, trans);
            await trans.commit();
            return { ...newClient.dataValues, info: newInfo };
        }, async () => await trans.rollback());
    }
    async updateClient(clientId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const updatedClient = await this.mainRepo.update(data, clientId, trans);
            if (data.infoId) {
                await this.infoService.updateFromRelated(data, data.infoId, trans);
            }
            await trans.commit();
            return updatedClient;
        }, async () => await trans.rollback());
    }
    async setInfoToClient(clientId, info) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const client = await this.mainRepo.findById(clientId);
            if (client.infoId) {
                return Promise.reject({
                    code: 422,
                    content: "El cliente ya tiene información registrada"
                });
            }
            const newInfo = await this.infoService.createInfo(info);
            await this.mainRepo.update({ infoId: newInfo.id }, clientId, trans);
            await trans.commit();
            return { ...client, info: newInfo };
        }, async () => await trans.rollback());
    }
    async setProfilePhoto(clientId, data) {
        return this.safeRun(async () => {
            const res = await CloudinaryService_1.default.getInstance().uploadFilesToCloudinary(data);
            const image = res[0];
            image.caption = "Perfil Cliente";
            return await this.imageService.createSingleImage(image, FileInterface_1.EImageable.Client, clientId, true);
        });
    }
    async setImagesToClient(clientId, data) {
        return this.safeRun(async () => {
            const res = await CloudinaryService_1.default.getInstance().uploadFilesToCloudinary(data);
            return await this.imageService
                .createMultipleImages(res, FileInterface_1.EImageable.Client, clientId);
        });
    }
    async setDocumentsToClient(clientId, data) {
        return this.safeRun(async () => {
            const res = await CloudinaryService_1.default.getInstance().uploadFilesToCloudinary(data);
            return await this.documentService
                .createMultipleDocuments(res, FileInterface_1.EDocumentable.Client, clientId);
        });
    }
    async deleteClient(clientId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const deletedClient = await this.mainRepo.delete(clientId, trans);
            await trans.commit();
            return deletedClient;
        }, async () => await trans.rollback());
    }
    async restoreClient(clientId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const restoredClient = await this.mainRepo.restore(clientId, trans);
            await trans.commit();
            return restoredClient;
        }, async () => await trans.rollback());
    }
}
exports.default = ClientService;
//# sourceMappingURL=ClientService.js.map