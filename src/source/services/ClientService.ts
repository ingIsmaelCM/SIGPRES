import {IParams} from "@/app/utils/AppInterfaces";
import ClientRepository from "../repositories/ClientRespository";
import {IClient} from "../utils/SourceInterfaces";
import TenantConnection from "@/app/db/TenantConnection";
import Service from "@/app/services/Service";
import {EDocumentable, EImageable, IDocument, IImage} from "@file/utils/FileInterface";
import ImageService from "@file/services/ImageService";
import ImageRepository from "@file/repositories/ImageRepository";
import DocumentRepository from "@source/repositories/DocumentRepository";
import DocumentService from "@file/services/DocumentService";
import config from "@app/app.config";

/*TODO deleteClient and restoreClient functions */
export default class ClientService extends Service {
    private clientRepo = new ClientRepository();

    async getClients(params: IParams): Promise<any> {
        return await this.safeRun(() =>
            this.clientRepo.getAll(params));
    }

    async findClient(clientId: number, params: IParams): Promise<any> {
        return await this.safeRun(() =>
            this.clientRepo.findById(clientId, params));
    }

    async createClient(client: IClient): Promise<any> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(
            async () => {
                const newClient = await this.clientRepo.create(client, trans);
                await trans.commit();
                return newClient;
            },
            async () => await trans.rollback()
        );
    }

    async updateClient(client: IClient, clientId: number): Promise<any> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(
            async () => {
                const updatedClient = await this.clientRepo.update(
                    client,
                    clientId,
                    trans
                );
                await trans.commit();
                return updatedClient;
            },
            async () => await trans.rollback()
        );
    }

    async deleteClient(clientId: number): Promise<any> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(
            async () => {
                const deletedClient = await this.clientRepo.delete(clientId, trans);
                await trans.commit();
                return deletedClient;
            },
            async () => await trans.rollback()
        );
    }

    async restoreClient(clientId: number): Promise<any> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(
            async () => {
                const deletedClient = await this.clientRepo.restore(clientId, trans);
                await trans.commit();
                return deletedClient;
            },
            async () => await trans.rollback()
        );
    }

    async setProfilePhoto(image: IImage, clientId: number) {
        return this.safeRun(async () => {
            image.caption = "Perfil Cliente";
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
                return await ImageService.createImages([image], EImageable.Client, Number(clientId));
            }
        })
    }

    async setClientImages(images: IImage[], clientId: number): Promise<Array<IImage>> {
        return this.safeRun(async () =>
            await ImageService.createImages(images,
                EImageable.Client, clientId)
        )
    }

    async setClientDocuments(documents: IDocument[], clientId: number): Promise<Array<IImage>> {
        return this.safeRun(async () =>
            await DocumentService.createDocuments(documents,
                EDocumentable.Client, clientId)
        )
    }
}
