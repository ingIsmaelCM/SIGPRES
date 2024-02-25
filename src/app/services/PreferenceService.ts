import BaseConnection from "@app/db/BaseConnection";
import PreferenceRepository from "@app/repositories/PrefenceRepository";
import { IPreference } from "@app/utils/Interfaces";

export default class PreferenceService {
  private preferenceRepo = new PreferenceRepository();

  async setPreference(data: IPreference): Promise<any> {
    const trans = await BaseConnection.getTrans();
    try {
      const { key, value } = data;
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

  async getPreference(key: string): Promise<any> {
    try {
      const pref = await this.preferenceRepo.get(key);
      return pref;
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }
}
