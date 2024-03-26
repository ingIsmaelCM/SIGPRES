import BaseRoutes from "@app/routes/BaseRoutes";
import ClientContactController from "@source/controllers/ClientContactController";
import {Request, Response} from "express";
import ClientContactRequest from "@source/requests/ClientContactRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class ClientContactRoutes extends BaseRoutes<ClientContactController> {
    constructor() {
        super(new ClientContactController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getClients),
                RoleMiddleware.hasPermission(PermissionEnums.getContacts),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.editClient),
                RoleMiddleware.hasPermission(PermissionEnums.editClient),
                ClientContactRequest.clientContactCreateRequest(),
                ClientContactRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.route("/:id")
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteContact),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.deleteContact),
                (req: Request, res: Response) => this.controller.restore(req, res)
            )

    }

}