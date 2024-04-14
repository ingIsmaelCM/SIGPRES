"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const AuthRequest_1 = __importDefault(require("@auth/requests/AuthRequest"));
const AuthController_1 = require("@auth/controllers/AuthController");
const RoleMiddleware_1 = __importDefault(require("../middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
const InfoRequest_1 = __importDefault(require("@source/requests/InfoRequest"));
class AuthRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new AuthController_1.AuthController());
    }
    initRoutes() {
        this.router.post("/register", AuthMiddleware_1.default.isUniqueEmail(), AuthRequest_1.default.validateAuthRegister(), AuthRequest_1.default.validate, (req, res) => this.controller.registerAuth(req, res));
        this.router.post("/login", AuthRequest_1.default.validateAuthLogin(), AuthRequest_1.default.validate, (req, res) => this.controller.loginAuth(req, res));
        this.router.post("/refreshtoken", (req, res) => this.controller.refreshToken(req, res));
        this.router.post("/verify", AuthRequest_1.default.validateRecoverPasswordAndVerifyAccount(), AuthRequest_1.default.validate, (req, res) => this.controller.verifyAuth(req, res));
        this.router.post("/logout", AuthMiddleware_1.default.auth, (req, res) => this.controller.logoutAuth(req, res));
        this.router.post("/logout/all", AuthMiddleware_1.default.auth, (req, res) => this.controller.logoutAllAuth(req, res));
        this.router.put("/password/reset", AuthMiddleware_1.default.auth, AuthRequest_1.default.validatePasswordReset(), AuthRequest_1.default.validate, (req, res) => this.controller.resetPassword(req, res));
        this.router.put("/profile/:id", AuthMiddleware_1.default.auth, InfoRequest_1.default.relatedInfoRequest(), InfoRequest_1.default.relatedInfoRequest(), InfoRequest_1.default.validate, (req, res) => this.controller.updateAuthInfo(req, res));
        this.router.post("/password/recover", AuthRequest_1.default.validateRecoverAndVerifyEmail(), AuthRequest_1.default.validate, AuthMiddleware_1.default.emailExists, (req, res) => this.controller.sendRecoverLink(req, res));
        this.router.post("/verify/code", AuthMiddleware_1.default.auth, AuthRequest_1.default.validateRecoverAndVerifyEmail(), AuthRequest_1.default.validate, AuthMiddleware_1.default.emailExists, RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.verifyUser), (req, res) => this.controller.sendVerificationCode(req, res));
        this.controller.router.post("/unauthorize/:id", AuthMiddleware_1.default.auth, RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.verifyUser), AuthRequest_1.default.requireIdRequest(), AuthRequest_1.default.validate, (req, res) => this.controller.unAuthorize(req, res));
        this.router.put("/password/recover", AuthRequest_1.default.validateRecoverPasswordAndVerifyAccount(), AuthRequest_1.default.validate, (req, res) => this.controller.recoverPassword(req, res));
    }
}
exports.default = AuthRoutes;
//# sourceMappingURL=AuthRoutes.js.map