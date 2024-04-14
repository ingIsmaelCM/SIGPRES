import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import ClientRepository from "@source/repositories/ClientRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IClient, IClientRelation, IClientView, IInfo} from "@app/interfaces/SourceInterfaces";
import {EDocumentable, EImageable, IDocument, IImage} from "@app/interfaces/FileInterface";
import ImageService from "@source/services/ImageService";
import InfoService from "@source/services/InfoService";
import ClientViewRepository from "@source/repositories/ClientViewRepository";
import tools from "@app/utils/tools";
import CloudinaryService from "@app/services/CloudinaryService";
import DocumentService from "@source/services/DocumentService";

export default class ClientService extends Service {
    private mainRepo = new ClientRepository();
    private infoService = new InfoService();
    private clientViewRepo = new ClientViewRepository();
    private imageService = new ImageService();
    private documentService = new DocumentService();


    async getClients(params: IParams) {
        return this.safeRun(async () =>
            await this.clientViewRepo.getAll(params)
        )
    }

    async findClient(clientId: string, params: IParams) {
        return this.safeRun(async () =>
            await this.clientViewRepo.findById(clientId, params)
        )
    }

    async createClient(data: IClientView): Promise<IClient> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const newInfo = await this.infoService.setFromRelated(data as any, trans);
                const newClient = await this.mainRepo.create({...data, infoId: newInfo.id}, trans);
                await trans.commit();
                return {...newClient.dataValues, info: newInfo};
            },
            async () => await trans.rollback()
        )
    }

    async updateClient(clientId: string, data: IClient & IClientRelation): Promise<IClient> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const updatedClient = await this.mainRepo.update(data, clientId, trans);
                if (data.infoId) {
                    await this.infoService.updateFromRelated(data as any, data.infoId as any, trans);
                }
                await trans.commit();
                return updatedClient;
            },
            async () => await trans.rollback()
        )
    }

    async setInfoToClient(clientId: string, info: IInfo): Promise<IClient> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const client = await this.mainRepo.findById(clientId);
                if (client.infoId) {
                    return Promise.reject({
                        code: 422,
                        content: "El cliente ya tiene información registrada"
                    })
                }
                const newInfo = await this.infoService.createInfo(info);
                await this.mainRepo.update({infoId: newInfo.id}, clientId, trans)
                await trans.commit();
                return {...client, info: newInfo}
            },
            async () => await trans.rollback()
        )
    }

    async setProfilePhoto(clientId: string, data: any): Promise<IImage> {
        return this.safeRun(async () => {
                const res = await CloudinaryService.getInstance().uploadFilesToCloudinary<IImage>(data);
                const image: IImage = res[0]
                image.caption = "Perfil Cliente"
                return await this.imageService.createSingleImage(image,
                    EImageable.Client, clientId, true)
            }
        )
    }

    async setImagesToClient(clientId: string, data: any): Promise<IImage> {
        return this.safeRun(async () => {
                const res = await CloudinaryService.getInstance().uploadFilesToCloudinary<IImage>(data);
                return await this.imageService
                    .createMultipleImages(res, EImageable.Client, clientId)
            }
        )
    }

    async setDocumentsToClient(clientId: string, data: any): Promise<IImage> {
        return this.safeRun(async () => {
                const res = await CloudinaryService.getInstance().uploadFilesToCloudinary<IDocument>(data);
                return await this.documentService
                    .createMultipleDocuments(res, EDocumentable.Client, clientId)
            }
        )
    }

    async deleteClient(clientId: string): Promise<IClient> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const deletedClient = await this.mainRepo.delete(clientId, trans);
                await trans.commit();
                return deletedClient;
            },
            async () => await trans.rollback()
        )
    }

    async restoreClient(clientId: string): Promise<IClient> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const restoredClient = await this.mainRepo.restore(clientId, trans);
                await trans.commit();
                return restoredClient;
            },
            async () => await trans.rollback()
        )
    }


}