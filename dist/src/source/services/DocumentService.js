"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const DocumentRepository_1 = __importDefault(require("@source/repositories/DocumentRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const CloudinaryService_1 = __importDefault(require("@app/services/CloudinaryService"));
class DocumentService extends Service_1.default {
    mainRepo = new DocumentRepository_1.default();
    async getDocuments(params) {
        return this.safeRun(async () => this.mainRepo.getAll(params));
    }
    async createSingleDocument(data, relatedModel, relatedId, upsert) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            let newDocument = null;
            data = {
                ...data,
                documentableType: relatedModel,
                documentableId: relatedId
            };
            const oldDocument = await this.checkOldDocumentExists(relatedModel, relatedId);
            if (oldDocument && upsert) {
                newDocument = await this.mainRepo.update(data, oldDocument.id, trans);
            }
            else {
                newDocument = await this.mainRepo.create(data, trans);
            }
            await trans.commit();
            return newDocument;
        }, async () => await trans.rollback());
    }
    async createMultipleDocuments(data, relatedModel, relatedId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            data = data.map((document) => ({
                ...document,
                documentableType: relatedModel,
                documentableId: relatedId
            }));
            const newDocument = await this.mainRepo.bulkCreate(data, trans);
            await trans.commit();
            return newDocument;
        }, async () => await trans.rollback());
    }
    async findDocument(documentId, params) {
        return await this.mainRepo.findById(documentId, params);
    }
    async deleteDocument(documentId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const document = await this.mainRepo.findById(documentId);
            if (document) {
                await CloudinaryService_1.default.getInstance().destroyFileFromCloudinary(document.publicId);
            }
            const deletedDocument = await this.mainRepo.delete(documentId, trans);
            await trans.commit();
            return deletedDocument;
        }, async () => await trans.rollback());
    }
    async restoreDocument(documentId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async checkOldDocumentExists(relatedModel, relatedId) {
        return await this.mainRepo.getAll({
            filter: [
                `documentableType:eq:${relatedModel}:and`,
                `documentableId:eq:${relatedId}:and`,
            ],
            limit: 1
        });
    }
}
exports.default = DocumentService;
//# sourceMappingURL=DocumentService.js.map