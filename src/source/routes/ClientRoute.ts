import BaseRoutes from "@app/routes/BaseRoutes";
import ClientController from "@source/controllers/ClientController";
import {Request, Response} from "express";
import ClientRequest from "@source/requests/ClientRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";
import InfoRequest from "@source/requests/InfoRequest";
import ImageRequest from "@source/requests/ImageRequest";
import DocumentRequest from "@source/requests/DocumentRequest";

export default class ClientRoutes extends BaseRoutes<ClientController> {
    constructor() {
        super(new ClientController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getClients),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createClient),
                ClientRequest.clientCreateRequest(),
                InfoRequest.relatedInfoRequest(),
                ClientRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.post("/:id/profile",
            RoleMiddleware.hasAllPermission([PermissionEnums.createImage, PermissionEnums.editClient]),
            ImageRequest.imageSingleCreateRequest(),
            ImageRequest.requireIdRequest(),
            ImageRequest.validate,
            (req: Request, res: Response) => this.controller.setProfilePhoto(req, res)
        )

        this.controller.router.post("/:id/images",
            RoleMiddleware.hasAllPermission([PermissionEnums.createImage, PermissionEnums.editClient]),
            ImageRequest.imageSBulkCreateRequest(),
            ImageRequest.requireIdRequest(),
            ImageRequest.validate,
            (req: Request, res: Response) => this.controller.setImagesToClient(req, res)
        )

        this.controller.router.post("/:id/documents",
            RoleMiddleware.hasAllPermission([PermissionEnums.createDocument, PermissionEnums.editClient]),
            DocumentRequest.documentCreateRequest(),
            DocumentRequest.requireIdRequest(),
            DocumentRequest.validate,
            (req: Request, res: Response) => this.controller.setDocumentsToClient(req, res)
        )

        this.controller.router.post("/:id/info",
            RoleMiddleware.hasAllPermission([PermissionEnums.createInfo, PermissionEnums.editClient]),
            InfoRequest.relatedInfoRequest(),
            InfoRequest.requireIdRequest(),
            InfoRequest.validate,
            (req: Request, res: Response) => this.controller.setInfoToClient(req, res)
        )

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getClients),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editClient),
                ClientRequest.clientUpdateRequest(),
                InfoRequest.relatedInfoRequest(),
                ClientRequest.requireIdRequest(),
                ClientRequest.validate,
                (req: Request, res: Response) => this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteClient),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response) => this.controller.restore(req, res)
            );
    }

}