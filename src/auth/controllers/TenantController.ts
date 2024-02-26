import Controller from "@/app/controllers/Controller";
import IController from "@/app/controllers/IController";
import TenantService from "../services/TenantService";
import response from "@/app/utils/response";
import TenantRoutes from "../routes/TenantRoutes";
import { Itenant } from "../utils/AuthInterfaces";

export default class TenantController
  extends Controller
  implements IController
{
  prefix = "tenants";

  tenantService = new TenantService();

  constructor() {
    super();
    new TenantRoutes(this.router, this).initRoutes();
  }

  async getTenants(req: any, res: any) {
    this.safeRun(async () => {
      const params = req.query;
      const tenants = await this.tenantService.getTenants(params);
      response.success(res, 200, tenants, "Inquilinos del sistema");
    }, res);
  }
  async createTenant(req: any, res: any) {
    this.safeRun(async () => {
      const data: Itenant = req.body;
      const tenants = await this.tenantService.createTenant(data);
      response.success(res, 200, tenants, "Nuevo Inquilino");
    }, res);
  }
  async updateTenant(req: any, res: any) {
    this.safeRun(async () => {
      const data: Itenant = req.body;
      const tenantId = req.params.id;
      const tenants = await this.tenantService.updateTenant(tenantId, data);
      response.success(res, 200, tenants, "Inquilino actualizado");
    }, res);
  }
}
