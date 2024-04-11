"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const SocialController_1 = __importDefault(require("@source/controllers/SocialController"));
const SocialRequest_1 = __importDefault(require("@source/requests/SocialRequest"));
const RoleMiddleware_1 = __importDefault(require("@/auth/middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
class SocialRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new SocialController_1.default());
    }
    initRoutes() {
        this.controller.router.route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getSocials), (req, res) => this.controller.index(req, res))
            .post(RoleMiddleware_1.default.hasAllPermission([PermissionEnums_1.default.createSocial, PermissionEnums_1.default.editSocial]), SocialRequest_1.default.socialCreateRequest(), SocialRequest_1.default.validate, (req, res) => this.controller.store(req, res));
        this.controller.router.route("/:id")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getSocials), (req, res) => this.controller.show(req, res));
    }
}
exports.default = SocialRoutes;
//# sourceMappingURL=SocialRoute.js.map