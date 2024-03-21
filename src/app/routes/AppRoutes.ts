import BaseRoutes from "@app/routes/BaseRoutes";
import AppController from "@app/controllers/AppController";
import AuthMiddleware from "@auth/middlewares/AuthMiddleware";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "../interfaces/PermissionEnums";

export default class AppRoutes extends BaseRoutes<AppController> {

    constructor() {
        super(new AppController());
    }
    initRoutes(): void {
        this.router.post(
            "/cloudinary/signature",
            AuthMiddleware.auth,
            RoleMiddleware.hasPermission(PermissionEnums.getCloudinarySigns),
            (req: any, res: any) =>
                this.controller.getCloudSignature(req, res)
        );
    }
}
