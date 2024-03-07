import AbstractRoutes from "@/app/routes/AbstractRoutes";
import ImageController from "@file/controllers/ImageController";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@/app/utils/PermissionEnums";
import ImageRequest from "../middlewares/ImageRequest";

export default class ImageRoutes extends AbstractRoutes<ImageController> {
  initRoutes(): void {

    this.router
      .route("/:id")
      .get(RoleMiddleware.hasPermission("Ver Imágenes"), (req: any, res: any) =>
        this.controller.findImage(req, res)
      )
      .delete(
        RoleMiddleware.hasPermission("Eliminar Imágenes"),
        (req: any, res: any) => this.controller.deleteImage(req, res)
      );
  }
}
