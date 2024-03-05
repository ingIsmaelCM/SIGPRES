import InfoRepository from "../repositories/InfoRepository";
import { IInfo } from "../utils/SourceInterfaces";
import TenantConnection from "@/app/db/TenantConnection";

interface IInfoRelated extends IInfo {
  modelType: string;
  modelId: number;
}
export default class InfoService {
  infoRepo = new InfoRepository();

  async createInfo(info: IInfoRelated): Promise<any> {
    const trans = await TenantConnection.getTrans();
    try {
      const exists = await this.infoRepo.getAll({
        filter: [`dni:eq:${info.dni}:or`, `email:eq:${info.email}:or`],
        limit: 1,
      });
      if (exists) {
        await Promise.reject( {
          code: 422,
          message: "El DNI o el email ya existen",
        });
      }
      const newInfo = await this.infoRepo.create(info, trans);
      await trans.commit();
      await this.infoRepo.addRelated(newInfo, info);
      return newInfo;
    } catch (error: any) {
      await trans.rollback();
      throw {
        code: error.code,
        message: error.message,
      };
    }
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
