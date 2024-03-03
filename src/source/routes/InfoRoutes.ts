import Controller from "@/app/controllers/Controller";
import AbstractRoutes from "@/app/routes/AbstractRoutes";
import InfoRequest from "../middlewares/InfoRequest";
import { Request, Response } from "express";
import InfoController from "../controllers/InfoController";

export default class InfoRoutes extends AbstractRoutes<InfoController> {
  initRoutes(): void {
    this.router
      .route("/")
      .post(
        InfoRequest.createInfoRequest(),
        InfoRequest.validate,
        (req: Request, res: Response) => this.controller.createInfo(req, res)
      );
    this.router
      .route("/:id")
      .put(
        InfoRequest.createInfoRequest().slice(0, 6),
        InfoRequest.validate,
        (req: Request, res: Response) => this.controller.updateInfo(req, res)
      );
  }
}
