import BaseRoutes from "@app/routes/BaseRoutes";
import LawyerController from "@source/controllers/LawyerController";
import {Request, Response} from "express";
import LawyerRequest from "@source/requests/LawyerRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class LawyerRoutes extends BaseRoutes<LawyerController> {
    constructor() {
        super(new LawyerController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getLawyers),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createLawyer),
                LawyerRequest.lawyerCreateRequest(),
                LawyerRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getLawyers),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editLawyer),
                LawyerRequest.lawyerUpdateRequest(),
                LawyerRequest.validate,
                (req: Request, res: Response) => this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteLawyer),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response) => this.controller.restore(req, res)
            );
    }

}