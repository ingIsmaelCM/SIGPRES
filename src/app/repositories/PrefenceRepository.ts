import Preference from "@app/models/Preference";
import { BaseRepository } from "@app/repositories/BaseRepository";

export default class PreferenceRepository extends BaseRepository<Preference> {
  constructor() {
    super(Preference);
  }

  async set(newPref: any, trans: any) {
    try {
      const data = await this.get(newPref.key);
      if (data) {
        return await this.update(
          { ...newPref, createdBy: undefined },
          newPref.key,
          trans,
          "key"
        );
      } else {
        return await this.create(newPref, trans);
      }
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }

  async get(key: string) {
    try {
      const pref = await this.find("key", key);
      if (!pref) return null;

      return {
        [key]: pref.value,
      };
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }
}
