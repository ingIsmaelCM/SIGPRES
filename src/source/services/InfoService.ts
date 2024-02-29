import { IParams } from "@/app/utils/AppInterfaces";
import InfoRepository from "../repositories/InfoRepository";
import { IInfo } from "../utils/SourceInterfaces";
import BaseConnection from "@/app/db/BaseConnection";

interface IInfoRelated extends IInfo {
  modelType: string;
  modelId: number;
}
export default class InfoService {
  infoRepo = new InfoRepository();

  async createInfo(info: IInfoRelated): Promise<any> {
    const trans = await BaseConnection.getTrans();
    try {
      const exists = await this.infoRepo.getAll({
        filter: [`dni:eq:${info.dni}:or`, `email:eq:${info.email}:or`],
        limit: 1,
      });
      if (exists) {
        throw {
          code: 422,
          message: "El DNI o el email ya existen",
        };
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
}
