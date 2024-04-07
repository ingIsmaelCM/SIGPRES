import Controller from "@/app/controllers/Controller";
import IController from "@/app/controllers/IController";
import TenantService from "../services/TenantService";
import response from "@/app/utils/response";
import {Itenant} from "@app/interfaces/AuthInterfaces";

export default class TenantController
    extends Controller
    implements IController {
    prefix = "tenants";

    mainService = new TenantService();


    async getTenants(req: any, res: any) {
        await this.safeRun(async () => {
            const params = req.query;
            return await this.mainService.getTenants(params);
        }, res, 200, "Inquilinos del sistema");
    }

    async createTenant(req: any, res: any) {
        await this.safeRun(async () => {
            const data: Itenant = req.body;
            return await this.mainService.createTenant(data);
        }, res, 201, "Nuevo Inquilino");
    }

    async updateTenant(req: any, res: any) {
        await this.safeRun(async () => {
            const data: Itenant = req.body;
            const tenantId = req.params.id;
            return await this.mainService.updateTenant(tenantId, data);
        }, res, 201, "Inquilino actualizado");
    }

    async assignToUser(req: any, res: any) {
        await this.safeRun(async () => {
            return await this.mainService.assignTenantToUser(req.params.id, req.body);
        }, res, 201, "Inquilino asignado");
    }
}
