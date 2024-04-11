import BaseRoutes from "@app/routes/BaseRoutes";
import WhatsappController from "@source/controllers/WhatsappController";
import {Request, Response} from "express";
import WhatsappRequest from "@source/requests/WhatsappRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@/app/utils/PermissionEnums";

export default class WhatsappRoutes extends BaseRoutes<WhatsappController> {
    constructor() {
        super(new WhatsappController());
    }
    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                 RoleMiddleware.hasPermission(PermissionEnums.getWhatsapps),
                (req:Request, res: Response)=> this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createWhatsapp),
                WhatsappRequest.whatsappCreateRequest(),
                WhatsappRequest.validate,
                (req: Request, res: Response)=> this.controller.store(req, res)
            );
            
           this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getWhatsapps),
                (req:Request, res: Response)=> this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editWhatsapp),
                WhatsappRequest.whatsappUpdateRequest(),
                WhatsappRequest.validate,
                (req: Request, res: Response)=> this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteWhatsapp),
                (req: Request, res: Response)=> this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response)=> this.controller.restore(req, res)
            );
    }

}