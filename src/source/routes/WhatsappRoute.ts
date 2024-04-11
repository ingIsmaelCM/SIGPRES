import BaseRoutes from "@app/routes/BaseRoutes";
import WhatsappController from "@source/controllers/WhatsappController";
import {Request, Response} from "express";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import WhatsappMiddleware from "@auth/middlewares/WhatsappMiddleware";
import WhatsappRequest from "@source/requests/WhatsappRequest";

export default class WhatsappRoutes extends BaseRoutes<WhatsappController> {
    constructor() {
        super(new WhatsappController());
    }

    initRoutes(): void {
        this.controller.router
            .get(
                '/',
                (req: Request, res: Response) => this.controller.getClient(req, res)
            );
        this.controller.router
            .post(
                '/start',
                (req: Request, res: Response) => this.controller.startWS(req, res)
            );
        this.controller.router
            .post(
                '/end',
                WhatsappMiddleware.hasClient,
                (req: Request, res: Response) => this.controller.endWS(req, res)
            );
        this.controller.router
            .post(
                '/send/text',
                WhatsappMiddleware.hasClient,
                WhatsappRequest.textMessageRequest(),
                WhatsappRequest.validate,
                (req: Request, res: Response) => this.controller.sendMessage(req, res)
            );


    }

}