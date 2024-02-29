import AbstractRoutes from "@/app/routes/AbstractRoutes";
import ClientController from "../controllers/ClientController";
import AuthMiddleware from "@/auth/middlewares/AuthMiddleware";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@/app/utils/PermissionEnums";
import ClientRequest from "../middlewares/ClientRequest";

export default class ClientRoutes extends AbstractRoutes<ClientController> {
  initRoutes(): void {
    this.router
      .route("/")
      .get(
        RoleMiddleware.hasPermission(PermissionEnums.getClients),
        (req: any, res: any) => this.controller.getClients(req, res)
      )
      .post(
        RoleMiddleware.hasPermission(PermissionEnums.createClients),
        ClientRequest.createClientRequest(),
        ClientRequest.validate,
        (req: any, res: any) => this.controller.createClient(req, res)
      );

    this.router
      .route("/:id")
      .get(
        RoleMiddleware.hasPermission(PermissionEnums.getClients),
        (req: any, res: any) => this.controller.findClient(req, res)
      )
      .put(
        RoleMiddleware.hasPermission(PermissionEnums.editClients),
        ClientRequest.createClientRequest(),
        ClientRequest.validate,
        (req: any, res: any) => this.controller.updateClient(req, res)
      )
      .delete(
        RoleMiddleware.hasPermission(PermissionEnums.deleteClients),
        (req: any, res: any) => this.controller.deleteClient(req, res)
      );
  }
}
