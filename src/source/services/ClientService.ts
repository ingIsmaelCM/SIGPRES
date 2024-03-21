import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import ClientRepository from "@source/repositories/ClientRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IClient, IClientRelation, IInfo} from "@app/interfaces/SourceInterfaces";
import InfoRepository from "@source/repositories/InfoRepository";
import {EImageable, IImage} from "@app/interfaces/FileInterface";
import ImageService from "@source/services/ImageService";
import InfoService from "@source/services/InfoService";

export default class ClientService extends Service {
    private mainRepo = new ClientRepository();
    private infoRepo = new InfoRepository();
    private imageService = new ImageService();
    private infoService = new InfoService();

    async getClients(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findClient(clientId: number, params: IParams) {
        return await this.mainRepo.findById(clientId, params)
    }

    async createClient(data: IClient & IClientRelation): Promise<IClient> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                data.info.createdBy = data.createdBy;
                data.info.updatedBy = data.updatedBy;
                const newClient = await this.mainRepo.create(data, trans);
                const newInfo = await this.infoRepo.create(data.info, trans);
                await newClient.setInfo(Number(newInfo.id), {
                    transaction: trans
                });
                await trans.commit();
                return {...newClient.dataValues, info: newInfo};
            },
            async () => await trans.rollback()
        )
    }

    async updateClient(clientId: number, data: IClient): Promise<IClient> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const updatedClient = await this.mainRepo.update(data, clientId, trans);
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