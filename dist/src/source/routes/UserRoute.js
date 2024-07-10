"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const RoleMiddleware_1 = __importDefault(require("@auth/middlewares/RoleMiddleware"));
const UserController_1 = __importDefault(require("@source/controllers/UserController"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
const UserRequest_1 = __importDefault(require("@source/requests/UserRequest"));
const InfoRequest_1 = __importDefault(require("@source/requests/InfoRequest"));
class UserRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new UserController_1.default());
    }
    initRoutes() {
        this.controller.router.route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getUsers), (req, res) => this.controller.index(req, res))
            .post(InfoRequest_1.default.infoUpdateRequest(), UserRequest_1.default.userCreateRequest(), UserRequest_1.default.validate, (req, res) => this.controller.store(req, res));
        this.controller.router.get("/auths", RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.verifyUser), (req, res) => this.controller.indexAuthUsers(req, res));
        this.controller.router.post("/verification/send", RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.verifyUser), UserRequest_1.default.userSendVerificationRequest(), UserRequest_1.default.validate, (req, res) => this.controller.sendVerification(req, res));
        this.controller.router.route("/:id")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getUsers), (req, res) => this.controller.show(req, res))
            .put(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.editUser), UserRequest_1.default.userUpdateRequest(), UserRequest_1.default.validate, (req, res) => this.controller.update(req, res))
            .delete(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.deleteUser), (req, res) => this.controller.delete(req, res))
            .patch(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.restoreData), (req, res) => this.controller.restore(req, res));
    }
}
exports.default = UserRoutes;
//# sourceMappingURL=UserRoute.js.map