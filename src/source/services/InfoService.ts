import InfoRepository from "../repositories/InfoRepository";
import {EInfoModels, IInfo} from "../utils/SourceInterfaces";
import TenantConnection from "@/app/db/TenantConnection";
import Service from "@app/services/Service";
import tools from "@app/utils/tools";
import {Info} from "@source/models";

/**
 * @extends Service
 * @property infoRepo
 */
export default class InfoService extends Service {
    infoRepo = new InfoRepository();

    async createInfo(info: IInfo): Promise<any> {
        const trans = await TenantConnection.getTrans();
        try {
            const exists = await this.infoRepo.getAll({
                filter: [`dni:eq:${info.dni}:or`, `email:eq:${info.email}:or`],
                limit: 1,
            });
            if (exists) {
                await Promise.reject({
                    code: 422,
                    message: "El DNI o el email ya existen",
                });
            }
            const newInfo = await this.infoRepo.create(info, trans);
            await trans.commit();
            return newInfo;
        } catch (error: any) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    /**
     * Create a new Info record and update related model's infoId column.
     *
     * @param info - Data set with fields for info
     * @param {EInfoModels} modelType - Name of related model
     * @param {Info} modelId - Id for related model instance
     * @return {Info} info
     */
    async addRelated(info: IInfo, modelType: EInfoModels, modelId: number): Promise<Info> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const methodName = `set${tools.uppercaseFirst(modelType)}`;
                const newInfo = await this.infoRepo.updateOrCreate(info, trans);
                await trans.commit();
                await newInfo[methodName](modelId);
                return newInfo;
            },
            async () => {
                await trans.rollback();
            })
    }

    async updateInfo(info: IInfo, infoId: number): Promise<any> {
        const trans = await TenantConnection.getTrans();
        try {
            const updatedInfo = await this.infoRepo.update(info, infoId, trans);
            await trans.commit();
            return updatedInfo;
        } catch (error: any) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
}
