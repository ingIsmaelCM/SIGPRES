import AbstractRoutes from "@app/routes/AbstractRoutes";
import RoleMiddleware from "@auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/utils/PermissionEnums";
import {Request, Response} from "express";
import ContactController from "@source/controllers/ContactController";
import ContactRequest from "@source/middlewares/ContactRequest";
import InfoRequest from "@source/middlewares/InfoRequest";
import ImageRequest from "@file/middlewares/ImageRequest";

export default class ContactRoutes extends AbstractRoutes<ContactController> {

    constructor() {
        super(new ContactController());
    }
    initRoutes() {

        this.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getContact),
                (req: Request, res: Response) => this.controller.getContacts(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createContact),
                ContactRequest.upsertContactRequest(),
                ContactRequest.validate,
                (req: Request, res: Response) => this.controller.createContact(req, res)
            )


        this.router.post("/:id/info",
            RoleMiddleware.hasPermission(PermissionEnums.createContact),
            InfoRequest.createInfoRequest(),
            InfoRequest.validate,
            (req: Request, res: Response) => this.controller.setContactInfo(req, res)
        )

        this.router.post("/:id/profile",
            ImageRequest.createImageRequest(),
            InfoRequest.validate,
            (req: Request, res: Response) => this.controller.setProfilePhoto(req, res)
        )

        this.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getContact),
                (req: Request, res: Response) => this.controller.findContact(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editContact),
                ContactRequest.upsertContactRequest(),
                ContactRequest.requireIdRequest(),
                ContactRequest.validate,
                (req: Request, res: Response) => this.controller.updateContact(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteContact),
                ContactRequest.requireIdRequest(),
                ContactRequest.validate,
                (req: Request, res: Response) => this.controller.deleteContact(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.deleteContact),
                ContactRequest.requireIdRequest(),
                ContactRequest.validate,
                (req: Request, res: Response) => this.controller.restoreContact(req, res)
            )
    }
}