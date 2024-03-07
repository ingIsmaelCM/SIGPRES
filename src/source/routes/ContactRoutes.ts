import AbstractRoutes from "@app/routes/AbstractRoutes";
import RoleMiddleware from "@auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/utils/PermissionEnums";
import {Request, Response} from "express";
import ContactController from "@source/controllers/ContactController";

export default class ContactRoutes extends AbstractRoutes<ContactController> {
    initRoutes() {

        this.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getContact),
                (req: Request, res: Response) => this.controller.getContacts(req, res)
            )
    }
}