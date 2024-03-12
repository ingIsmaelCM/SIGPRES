import AbstractRoutes from "@/app/routes/AbstractRoutes";
import ImageController from "@file/controllers/ImageController";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@/app/utils/PermissionEnums";
import ImageRequest from "../middlewares/ImageRequest";

export default class ImageRoutes extends AbstractRoutes<ImageController> {


  constructor() {
    super(new ImageController());
  }

  initRoutes(): void {
    this.router
      .route("/:id")
      .get(RoleMiddleware.hasPermission(PermissionEnums.getImages), (req: any, res: any) =>
        this.controller.findImage(req, res)
      )
      .delete(
        RoleMiddleware.hasPermission(PermissionEnums.deleteImages),
        (req: any, res: any) => this.controller.deleteImage(req, res)
      );
  }
}
