import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import InfoRepository from "@source/repositories/InfoRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IInfo} from "@app/interfaces/SourceInterfaces";
import {Transaction} from "sequelize";
import {Info} from "@source/models";

export default class InfoService extends Service {
    private mainRepo = new InfoRepository();

    async getInfos(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findInfo(infoId: string, params: IParams) {
        return await this.mainRepo.findById(infoId, params)
    }

    async createInfo(data: IInfo): Promise<IInfo> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const newInfo = await this.mainRepo.create(data, trans);
                await trans.commit();
                return newInfo;
            },
            async () => await trans.rollback()
        )
    }

    async setFromRelated(data: any, trans: Transaction): Promise<Info> {
        return this.safeRun(async () => {
                return await this.mainRepo.create(data, trans);
            }
        )
    }

    async updateFromRelated(data: any, infoId: string|string, trans: Transaction): Promise<Info> {
        return this.safeRun(async () => {
                return await this.mainRepo.update(data, infoId, trans);
            }
        )
    }

    async updateInfo(infoId: string, data: IInfo): Promise<IInfo> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const updatedInfo = await this.mainRepo.update(data, infoId, trans);
                await trans.commit();
                return updatedInfo;
            },
            async () => await trans.rollback()
        )
    }


    async deleteInfo(infoId: string): Promise<IInfo> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreInfo(infoId: string): Promise<IInfo> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}