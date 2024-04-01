import BaseRoutes from "@app/routes/BaseRoutes";
import {Request, Response} from "express";
import RoleMiddleware from "@auth/middlewares/RoleMiddleware";
import UserController from "@source/controllers/UserController";
import PermissionEnums from "@app/interfaces/PermissionEnums";
import UserRequest from "@source/requests/UserRequest";

export default class UserRoutes extends BaseRoutes<UserController> {
    constructor() {
        super(new UserController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getUsers),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createUser),
                UserRequest.userCreateRequest(),
                UserRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.post("/verification/send",
            RoleMiddleware.hasPermission(PermissionEnums.verifyUser),
            UserRequest.userSendVerificationRequest(),
            UserRequest.validate,
            (req: Request, res: Response) => this.controller.sendVerifiction(req, res))

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getUsers),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editUser),
                UserRequest.userUpdateRequest(),
                UserRequest.validate,
                (req: Request, res: Response) => this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteUser),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response) => this.controller.restore(req, res)
            );
    }

}