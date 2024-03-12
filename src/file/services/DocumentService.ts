import Service from "@app/services/Service";
import {IDocument} from "@file/utils/FileInterface";
import TenantConnection from "@app/db/TenantConnection";
import {IParams} from "@app/utils/AppInterfaces";
import Document from "@file/models/Document";
import DocumentRepository from "@source/repositories/DocumentRepository";

class DocumentService extends Service {
    documentRepo: DocumentRepository = new DocumentRepository();

    async createDocuments(documents: IDocument[], documentableType: string, documentableId: number): Promise<any> {
        const trans = await TenantConnection.getTrans();
        return await this.safeRun(async () => {
                documents = documents.map(document => ({...document, documentableType, documentableId}))
                const newDocuments = await this.documentRepo.bulkCreate(documents, trans);
                await trans.commit();
                return newDocuments;
            },
            async () => await trans.rollback())
    }

    async updateDocument(document: IDocument, documentId: number): Promise<any> {
        const trans = await TenantConnection.getTrans();
        try {
            const newDocument = await this.documentRepo.update(document, documentId, trans);
            await trans.commit();
            return newDocument;
        } catch (error: any) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    async findDocument(documentId: number, params: IParams): Promise<Document> {
        try {
            return await this.documentRepo.findById(documentId, params);
        } catch (error: any) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    async getDocuments(params: IParams): Promise<Document> {
        try {
            return await this.documentRepo.getAll(params);
        } catch (error: any) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    async deleteDocument(documentId: number): Promise<Document> {
        const trans = await TenantConnection.getTrans();
        try {
            const deletedDocument = await this.documentRepo.delete(documentId, trans);
            await trans.commit();
            return deletedDocument;
        } catch (error: any) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
}

export default new DocumentService();