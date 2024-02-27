import Preference from "@/source/models/Preference";
import { BaseRepository } from "@app/repositories/BaseRepository";
import { IParams } from "../utils/AppInterfaces";

export default class PreferenceRepository extends BaseRepository<Preference> {
  constructor() {
    super(Preference);
  }

  async set(newPref: any, trans: any) {
    return this.safeRun(async () => {
      const data = await this.get(newPref.key, {});
      if (data) {
        return await this.update(
          { ...newPref, createdBy: undefined },
          newPref.key,
          trans,
          "key"
        );
      } else {
        throw {
          code: 404,
          message: `No se encontró la clave ${newPref.key}`,
        };
      }
    });
  }

  async get(key: string, params: IParams) {
    return this.safeRun(async () => {
      const pref = await this.find("key", key, false, params);
      if (!pref) return null;

      return {
        [key]: pref.value,
      };
    });
  }
}
