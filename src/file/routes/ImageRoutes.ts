import AbstractRoutes from "@/app/routes/AbstractRoutes";
import ImageController from "@file/controllers/ImageController";
import AuthMiddleware from "@/auth/middlewares/AuthMiddleware";
import RoleMiddeware from "@/auth/middlewares/RoleMiddeware";
import PermissionEnums from "@/app/utils/PermissionEnums";
import ImageRequest from "../middlewares/ImageRequest";

export default class ImageRoutes extends AbstractRoutes<ImageController> {
  initRoutes(): void {
    this.router
      .route("/")
      .post(
        AuthMiddleware.auth,
        RoleMiddeware.hasPermission(PermissionEnums.createImages),
        ImageRequest.createImageRequest(),
        ImageRequest.validate,
        (req: any, res: any) => this.controller.createImages(req, res)
      );

    this.router
      .route("/:id")
      .get(
        AuthMiddleware.auth,
        RoleMiddeware.hasPermission("Ver Imágenes"),
        (req: any, res: any) => this.controller.findImage(req, res)
      )
      .delete(
        AuthMiddleware.auth,
        RoleMiddeware.hasPermission("Eliminar Imágenes"),
        (req: any, res: any) => this.controller.deleteImage(req, res)
      );
  }
}
