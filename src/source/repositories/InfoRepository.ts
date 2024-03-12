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
}
