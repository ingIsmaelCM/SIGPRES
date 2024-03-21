import BaseRoutes from "@app/routes/BaseRoutes";
import ContactController from "@source/controllers/ContactController";
import {Request, Response} from "express";
import ContactRequest from "@source/requests/ContactRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";
import InfoRequest from "@source/requests/InfoRequest";

export default class ContactRoutes extends BaseRoutes<ContactController> {
    constructor() {
        super(new ContactController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getContacts),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createContact),
                ContactRequest.contactCreateRequest(),
                InfoRequest.relatedInfoRequest(),
                ContactRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getContacts),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editContact),
                ContactRequest.contactUpdateRequest(),
                ContactRequest.validate,
                (req: Request, res: Response) => this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteContact),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response) => this.controller.restore(req, res)
            );
    }

}