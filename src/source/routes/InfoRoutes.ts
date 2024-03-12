import AbstractRoutes from "@/app/routes/AbstractRoutes";
import InfoRequest from "../middlewares/InfoRequest";
import { Request, Response } from "express";
import InfoController from "../controllers/InfoController";

export default class InfoRoutes extends AbstractRoutes<InfoController> {

  constructor() {
    super(new InfoController());
  }
  initRoutes(): void {
    this.router
      .route("/")
      .post(
        InfoRequest.upsertInfoRequest(),
        InfoRequest.validate,
        (req: Request, res: Response) => this.controller.createInfo(req, res)
      );
    this.router
      .route("/:id")
      .put(
        InfoRequest.upsertInfoRequest(),
        InfoRequest.validate,
        (req: Request, res: Response) => this.controller.updateInfo(req, res)
      );
  }
}
