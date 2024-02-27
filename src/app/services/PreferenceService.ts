import BaseConnection from "@app/db/BaseConnection";
import PreferenceRepository from "@app/repositories/PrefenceRepository";
import { IParams } from "@/app/utils/AppInterfaces";
import { IPreference } from "@/source/utils/SourceInterfaces";

export default class PreferenceService {
  private preferenceRepo = new PreferenceRepository();

  async setPreference(data: IPreference): Promise<any> {
    const trans = await BaseConnection.getTrans();
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
      const pref = await this.preferenceRepo.get(key, params);
      return pref;
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }

  async getPreferences(params: IParams): Promise<any> {
    try {
      const prefs = await this.preferenceRepo.getAll(params);
      return prefs;
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }
}
