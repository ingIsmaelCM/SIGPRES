import Controller, { setAuthor } from "@/app/controllers/Controller";
import IController from "@/app/controllers/IController";
import { Request, Response } from "express";
import InfoService from "../services/InfoService";
import InfoRoutes from "../routes/InfoRoutes";
import response from "@/app/utils/response";

export default class InfoController extends Controller implements IController {
  prefix: string = "infos";
  infoService = new InfoService();

  constructor() {
    super();
    new InfoRoutes(this.router, this).initRoutes();
  }

  @setAuthor
  async createInfo(req: Request, res: Response) {
    await this.safeRun(async () => {
      const data = req.body;
      const newInfo = await this.infoService.createInfo(data);
      response.success(res, 201, newInfo, "Información registrada");
    }, res);
  }
  @setAuthor
  async updateInfo(req: Request, res: Response) {
    await   this.safeRun(async () => {
      const data = req.body;
      const infoId = req.params.id;
      const updatedInfo = await this.infoService.updateInfo(
        data,
        Number(infoId)
      );
      response.success(res, 201, updatedInfo, "Información actualizada");
    }, res);
  }
}
