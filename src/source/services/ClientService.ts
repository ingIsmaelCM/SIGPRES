import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import ClientRepository from "@source/repositories/ClientRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IClient, IClientRelation, IClientView, IInfo} from "@app/interfaces/SourceInterfaces";
import {EImageable, IImage} from "@app/interfaces/FileInterface";
import ImageService from "@source/services/ImageService";
import InfoService from "@source/services/InfoService";
import ClientViewRepository from "@source/repositories/ClientViewRepository";
import moment from "moment";

export default class ClientService extends Service {
    private mainRepo = new ClientRepository();
    private infoService = new InfoService();
    private clientViewRepo = new ClientViewRepository();
    private imageService = new ImageService();


    async getClients(params: IParams) {
        return await this.clientViewRepo.getAll(params)
    }

    async findClient(clientId: number, params: IParams) {
        return await this.clientViewRepo.findById(clientId, params)
    }

    async createClient(data: IClientView): Promise<IClient> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const newInfo = await this.infoService.setFromRelated(data, trans);
                const newClient = await this.mainRepo.create({...data, infoId: newInfo.id}, trans);
                await trans.commit();
                return {...newClient.dataValues, info: newInfo};
            },
            async () => await trans.rollback()
        )
    }

    async updateClient(clientId: number, data: IClient & IClientRelation): Promise<IClient> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const updatedClient = await this.mainRepo.update(data, clientId, trans);
                if (data.infoId) {
                    await this.infoService.updateFromRelated(data, data.infoId, trans);
                }
                await trans.commit();
                return updatedClient;
            },
            async () => await trans.rollback()
        )
    }

    async setInfoToClient(clientId: number, info: IInfo): Promise<IClient> {
        return this.safeRun(async () => {
                const client = await this.mainRepo.findById(clientId);
                if (client.infoId) {
                    return Promise.reject({
                        code: 422,
                        content: "El cliente ya tiene información registrada"
                    })
                }
                const newInfo = await this.infoService.createInfo(info);
                await client.setInfo(newInfo.id!);
                return {...client, info: newInfo}
            }
        )
    }

    async setProfilePhoto(clientId: number, data: IImage): Promise<IImage> {
        return this.safeRun(async () => {

                data.caption = "Perfil Cliente"
                return await this.imageService.createSingleImage(data,
                    EImageable.Client, clientId, true)
            }
        )
    }

    async setClientImages(clientId: number, data: IImage[]): Promise<IImage> {
        return this.safeRun(async () => {

                data = data.map((image: IImage) => ({
                    ...image,
                    caption: moment().format("YYYYMMDDHHiSS")

                }))
                return await this.imageService
                    .createMultipleImages(data, EImageable.Client, clientId)
            }
        )
    }

    async deleteClient(clientId: number): Promise<IClient> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const deletedClient = await this.mainRepo.delete(clientId, trans);
                await trans.commit();
                return deletedClient;
            },
            async () => await trans.rollback()
        )
    }

    async restoreClient(clientId: number): Promise<IClient> {
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