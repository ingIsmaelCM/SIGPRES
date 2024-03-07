import Controller, {setAuthor} from "@/app/controllers/Controller";
import IController from "@/app/controllers/IController";
import {Request, Response} from "express";
import InfoService from "../services/InfoService";
import InfoRoutes from "../routes/InfoRoutes";

export default class InfoController extends Controller implements IController {
    prefix: string = "infos";
    mainService = new InfoService();

    constructor() {
        super();
        new InfoRoutes(this.router, this).initRoutes();
    }

    @setAuthor
    async createInfo(req: Request, res: Response) {
        await this.safeRun(async () => {
            const data = req.body;
            return await this.mainService.createInfo(data);
        }, res, 201, "Información Registrada");
    }

    @setAuthor
    async updateInfo(req: Request, res: Response) {
        await this.safeRun(async () => {
            const data = req.body;
            const infoId = req.params.id;
            return await this.mainService.updateInfo(
                data,
                Number(infoId)
            );

        }, res, 201, "Información actualizada");
    }
}
