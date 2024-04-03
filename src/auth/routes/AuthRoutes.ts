import AuthMiddleware from "../middlewares/AuthMiddleware";
import BaseRoutes from "@app/routes/BaseRoutes";
import AuthRequests from "@auth/requests/AuthRequest";
import {AuthController} from "@auth/controllers/AuthController";
import RoleMiddleware from "../middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class AuthRoutes extends BaseRoutes<AuthController> {

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
            "/verify",
            AuthRequests.validateRecoverPasswordAndVerifyAccount(),
            AuthRequests.validate,
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
            AuthRequests.validateRecoverAndVerifyEmail(),
            AuthRequests.validate,
            AuthMiddleware.emailExists,
            (req: any, res: any) => this.controller.sendRecoverLink(req, res)
        );

        this.router.post(
            "/verify/code",
            AuthMiddleware.auth,
            AuthRequests.validateRecoverAndVerifyEmail(),
            AuthRequests.validate,
            AuthMiddleware.emailExists,
            RoleMiddleware.hasPermission(PermissionEnums.verifyUser),
            (req: any, res: any) => this.controller.sendVerificationCode(req, res)
        );


        this.router.put(
            "/password/recover",
            AuthRequests.validateRecoverPasswordAndVerifyAccount(),
            AuthRequests.validate,
            (req: any, res: any) => this.controller.recoverPassword(req, res)
        );
    }
}
