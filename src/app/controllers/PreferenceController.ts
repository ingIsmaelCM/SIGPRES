import Controller from "@app/controllers/Controller";
import IController from "@app/controllers/IController";
import PreferenceService from "@app/services/PreferenceService";
import response from "@app/utils/response";
import PreferenceRoutes from "@app/routes/PreferenceRoutes";
import tools from "@app/utils/tools";
import {IPreference} from "@/source/utils/SourceInterfaces";

export default class PreferenceController
    extends Controller
    implements IController {
    prefix: string = "app/preferences";
    mainService: PreferenceService = new PreferenceService();

    constructor() {
        super();
        new PreferenceRoutes(this.router, this).initRoutes();
    }

    async getPreference(req: any, res: any) {
        return this.safeRun(async () => {
            return await this.mainService.getPreference(
                req.params.key,
                req.query
            );
        }, res, 200, "Preferencia");
    }

    async getPreferences(req: any, res: any) {
        return this.safeRun(async () => await this.mainService.getPreferences(req.query),
            res, 200, "Lista de Preferencias");
    }

    async setPreference(req: any, res: any) {
        return  this.safeRun(async () => {
            const key = req.params.key;
            const value = req.body.value;
            const data = tools.setUserRelated(req, {key, value});
            return  await this.mainService.setPreference(
                data as IPreference
            );
        }, res, 201, "Preferencia registrada");
    }
}
