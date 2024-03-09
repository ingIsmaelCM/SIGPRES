import AuthMiddleware from "../middlewares/AuthMiddleware";
import AbstractRoutes from "@app/routes/AbstractRoutes";
import AuthRequests from "@/auth/middlewares/AuthRequest";
import {AuthController} from "@auth/controllers/AuthController";
import RoleMiddleware from "../middlewares/RoleMiddleware";

export default class AuthRoutes extends AbstractRoutes<AuthController> {

    constructor() {
        super(new AuthController());
    }
    public initRoutes() {
        this.router.post(
            "/register",
            AuthMiddleware.isUniqueEmail(),
            AuthRequests.validateAuthRegister(),
            AuthRequests.validate,
            (req: any, res: any) => this.controller.registerAuth(req, res)
        );

        this.router.post(
            "/login",
            AuthRequests.validateAuthLogin(),
            AuthRequests.validate,
            (req: any, res: any) => this.controller.loginAuth(req, res)
        );
        this.router.post(
            "/refreshtoken",
            (req: any, res: any) => this.controller.refreshToken(req, res)
        );
        this.router.post(
            "/verify/:id",
            AuthMiddleware.auth,
            RoleMiddleware.hasPermission("Verificar Usuario"),
            (req: any, res: any) => this.controller.verifyAuth(req, res)
        );
        this.router.post("/logout", AuthMiddleware.auth, (req: any, res: any) =>
            this.controller.logoutAuth(req, res)
        );
        this.router.post("/logout/all", AuthMiddleware.auth, (req: any, res: any) =>
            this.controller.logoutAllAuth(req, res)
        );
        this.router.put(
            "/password/reset",
            AuthMiddleware.auth,
            AuthRequests.validatePasswordReset(),
            AuthRequests.validate,
            (req: any, res: any) => this.controller.resetPassword(req, res)
        );

        this.router.post(
            "/password/recover",
            AuthRequests.validateRecoverEmail(),
            AuthRequests.validate,
            AuthMiddleware.emailExists,
            (req: any, res: any) => this.controller.sendRecoverLink(req, res)
        );


        this.router.put(
            "/password/recover",
            AuthRequests.validateRecoverPassword(),
            AuthRequests.validate,
            (req: any, res: any) => this.controller.recoverPassword(req, res)
        );
    }
}
