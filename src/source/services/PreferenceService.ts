import PreferenceRepository from "@source/repositories/PrefenceRepository";
import { IParams } from "@app/interfaces/AppInterfaces";
import { IPreference } from "@app/interfaces/SourceInterfaces";
import Service from "@app/services/Service";
import TenantConnection from "@app/db/TenantConnection";

export default class PreferenceService extends  Service{
  private preferenceRepo = new PreferenceRepository();

  async setPreference(data: IPreference): Promise<any> {
    const trans = await TenantConnection.getTrans();
    try {
      const pref = await this.preferenceRepo.set(data, trans);

      await trans.commit();
      return pref;
    } catch (error: any) {
      await trans.rollback();
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }

  async getPreference(key: string, params: IParams): Promise<any> {
    try {
      return await this.preferenceRepo.get(key, params);
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }

  async getPreferences(params: IParams): Promise<any> {
    try {
     return await this.preferenceRepo.getAll(params);
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }
}
