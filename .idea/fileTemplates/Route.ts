import BaseRoutes from "@app/routes/BaseRoutes";
import ${MODEL_NAME}Controller from "@source/controllers/${MODEL_NAME}Controller";
import {Request, Response} from "express";
import ${MODEL_NAME}Request from "@source/requests/${MODEL_NAME}Request";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@/app/utils/PermissionEnums";

export default class ${MODEL_NAME}Routes extends BaseRoutes<${MODEL_NAME}Controller> {
    constructor() {
        super(new ${MODEL_NAME}Controller());
    }
    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                 RoleMiddleware.hasPermission(PermissionEnums.get${MODEL_NAME}s),
                (req:Request, res: Response)=> this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.create${MODEL_NAME}),
                ${MODEL_NAME}Request.${MODEL_NAME_LOWER}CreateRequest(),
                ${MODEL_NAME}Request.validate,
                (req: Request, res: Response)=> this.controller.store(req, res)
            );
            
           this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.get${MODEL_NAME}s),
                (req:Request, res: Response)=> this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.edit${MODEL_NAME}),
                ${MODEL_NAME}Request.${MODEL_NAME_LOWER}UpdateRequest(),
                ${MODEL_NAME}Request.validate,
                (req: Request, res: Response)=> this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.delete${MODEL_NAME}),
                (req: Request, res: Response)=> this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response)=> this.controller.restore(req, res)
            );
    }

}