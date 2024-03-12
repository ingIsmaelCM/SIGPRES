import AbstractRoutes from "@app/routes/AbstractRoutes";
import DocumentController from "@file/controllers/DocumentController";
import RoleMiddleware from "@auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/utils/PermissionEnums";

export default class DocumentRoutes extends AbstractRoutes<DocumentController> {
    constructor() {
        super(new DocumentController());
    }
    initRoutes() {
        this.router.get("/",
            RoleMiddleware.hasPermission(PermissionEnums.getDocument)
            )
    }
}