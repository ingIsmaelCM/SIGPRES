import {Request, Response, Router} from "express";
import IController from "./IController";
import AppService from "../services/AppService";
import response from "../utils/response";
import Controller from "./Controller";
import StripeService from "@source/services/StripeService";
import BraintreeService from "@source/services/BraintreeService";

export default class AppController extends Controller implements IController {
    prefix: string = "app";
    router: Router = Router();

    mainService: AppService = new AppService();

    public async getCloudSignature(req: any, res: any) {
        try {
            const cloudinarySignature = await this.mainService.getCloudSignature();
            response.success(res, 200, cloudinarySignature, "Firma de Cloudinary");
        } catch (error: any) {
            response.error(res, error.code, error.message);
        }
    }

    public async testRoute(req: Request, res: Response) {
        return this.safeRun(async () =>
                await BraintreeService.getInstance().createToken()
            , res, 200, "Prueba Exitosa")
    }
}
