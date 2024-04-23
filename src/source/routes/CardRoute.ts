import BaseRoutes from "@app/routes/BaseRoutes";
import CardController from "@source/controllers/CardController";
import {Request, Response} from "express";
import CardRequest from "@source/requests/CardRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class CardRoutes extends BaseRoutes<CardController> {
    constructor() {
        super(new CardController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getCards),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createCard),
                CardRequest.cardCreateRequest(),
                CardRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getCards),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editCard),
                CardRequest.cardUpdateRequest(),
                CardRequest.validate,
                (req: Request, res: Response) => this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteCard),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response) => this.controller.restore(req, res)
            );
    }

}