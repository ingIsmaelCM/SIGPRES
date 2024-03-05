import { BaseRepository } from "@/app/repositories/BaseRepository";
import { Info } from "../models";
import { EInfoModels } from "../utils/SourceInterfaces";
export default class InfoRepository extends BaseRepository<Info> {
  constructor() {
    super(Info);
  }

  async create(data: any, trans: any): Promise<Info> {
    return await super.create(data, trans);
  }

  async addRelated(newInfo: Info, data: any): Promise<any> {
    return this.safeRun(async () => {
      switch (data.modelType) {
        case EInfoModels.Client:
          await newInfo.setClient(data.modelId);
          break;
        default:
          throw {
            code: 500,
            message: `Hay algo mal el modelo ${data.modelType}`,
          };
      }
    });
  }
}
