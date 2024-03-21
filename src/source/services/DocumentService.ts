import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import DocumentRepository from "@source/repositories/DocumentRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IDocument} from "@app/interfaces/FileInterface";

export default class DocumentService extends Service {
    private mainRepo = new DocumentRepository();

    async getDocuments(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findDocument(documentId: number, params: IParams) {
        return await this.mainRepo.findById(documentId, params)
    }

    async createDocument(data: IDocument): Promise<IDocument> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async updateDocument(documentId: number, data: IDocument): Promise<IDocument> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteDocument(documentId: number): Promise<IDocument> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
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


}