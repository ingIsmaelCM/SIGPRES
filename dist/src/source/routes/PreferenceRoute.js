"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const PreferenceController_1 = __importDefault(require("@source/controllers/PreferenceController"));
const PreferenceRequest_1 = __importDefault(require("@source/requests/PreferenceRequest"));
const RoleMiddleware_1 = __importDefault(require("@/auth/middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
class PreferenceRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new PreferenceController_1.default());
    }
    initRoutes() {
        this.controller.router.route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getPreferences), (req, res) => this.controller.index(req, res));
        this.controller.router.route("/:key")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getPreferences), (req, res) => this.controller.show(req, res))
            .put(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.setPreference), PreferenceRequest_1.default.preferenceUpdateRequest(), PreferenceRequest_1.default.validate, (req, res) => this.controller.update(req, res));
    }
}
exports.default = PreferenceRoutes;
//# sourceMappingURL=PreferenceRoute.js.map