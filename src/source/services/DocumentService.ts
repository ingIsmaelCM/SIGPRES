import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import DocumentRepository from "@source/repositories/DocumentRepository";
import TenantConnection from "@app/db/TenantConnection";
import CloudinaryService from "@app/services/CloudinaryService";
import {EDocumentable, IDocument} from "@app/interfaces/FileInterface";

export default class DocumentService extends Service {
    private mainRepo = new DocumentRepository();

    async getDocuments(params: IParams): Promise<any> {
        return this.safeRun(async () =>
            this.mainRepo.getAll(params))
    }

    async createSingleDocument(data: IDocument, relatedModel: EDocumentable, relatedId: number, upsert?: boolean) {
        const trans = await TenantConnection.getTrans();
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
                } else {
                    newDocument = await this.mainRepo.create(data, trans);
                }
                await trans.commit();
                return newDocument;
            },
            async () => await trans.rollback()
        )
    }

    async createMultipleDocuments(data: IDocument[], relatedModel: EDocumentable, relatedId: number) {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                data = data.map((document: IDocument) => ({
                    ...document,
                    documentableType: relatedModel,
                    documentableId: relatedId
                }))
                const newDocument = await this.mainRepo.bulkCreate(data, trans);
                await trans.commit();
                return newDocument;
            },
            async () => await trans.rollback()
        )
    }

    async findDocument(documentId: number, params: IParams) {
        return await this.mainRepo.findById(documentId, params)
    }

    async deleteDocument(documentId: number): Promise<IDocument> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const document = await this.mainRepo.findById(documentId);
                if (document) {
                    await CloudinaryService.getInstance().destroyFileFromCloudinary(document.publicId);
                }
                const deletedDocument = await this.mainRepo.delete(documentId, trans)
                await trans.commit();
                return deletedDocument;
            },
            async () => await trans.rollback()
        )
    }

    async restoreDocument(documentId: number): Promise<IDocument> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    private async checkOldDocumentExists(relatedModel: EDocumentable, relatedId: number) {
        return await this.mainRepo.getAll({
            filter: [
                `documentableType:eq:${relatedModel}:and`,
                `documentableId:eq:${relatedId}:and`,
            ],
            limit: 1
        })
    }

}