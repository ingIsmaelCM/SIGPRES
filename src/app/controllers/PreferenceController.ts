import Controller from "@app/controllers/Controller";
import IController from "@app/controllers/IController";
import PreferenceService from "../services/PreferenceService";
import response from "../utils/response";
import PreferenceRoutes from "../routes/PreferenceRoutes";
import tools from "../utils/tools";
import { IPreference } from "../utils/Interfaces";

export default class PreferenceController
  extends Controller
  implements IController
{
  prefix: string = "app/preferences";
  private preferenceService: PreferenceService = new PreferenceService();

  constructor() {
    super();
    new PreferenceRoutes(this.router, this).initRoutes();
  }

  async getPreference(req: any, res: any) {
    this.safeRun(async () => {
      const pref = await this.preferenceService.getPreference(req.params.key);
      response.success(res, 200, pref, "Preferencia");
    }, res);
  }

  async setPreference(req: any, res: any) {
    this.safeRun(async () => {
      const key = req.params.key;
      const value = req.body.value;
      const data = tools.setUserRelated(req, { key, value });
      const pref = await this.preferenceService.setPreference(
        data as IPreference
      );
      response.success(res, 201, pref, "Preferencia registrada");
    }, res);
  }
}
