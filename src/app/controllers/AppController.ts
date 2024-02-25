import { Router } from "express";
import IController from "./IController";
import AppRoutes from "../routes/AppRoutes";
import AppService from "../services/AppService";
import response from "../utils/response";
import Controller from "./Controller";

export default class AppController extends Controller implements IController {
  prefix: string = "app";
  router: Router = Router();

  appService: AppService = new AppService();

  constructor() {
    super();
    new AppRoutes(this.router, this).initRoutes();
  }

  public async getCloudSignature(req: any, res: any) {
    try {
      const cloudinarySignature = await this.appService.getCloudSignature(
        `profile${req.auth.id}`
      );
      response.success(res, 200, cloudinarySignature, "Firma de Cloudinary");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }
}
