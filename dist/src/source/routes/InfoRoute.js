"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const InfoController_1 = __importDefault(require("@source/controllers/InfoController"));
const InfoRequest_1 = __importDefault(require("@source/requests/InfoRequest"));
const RoleMiddleware_1 = __importDefault(require("@/auth/middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
class InfoRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new InfoController_1.default());
    }
    initRoutes() {
        this.controller.router.route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getInfos), (req, res) => this.controller.index(req, res))
            .post(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createInfo), InfoRequest_1.default.infoCreateRequest(), InfoRequest_1.default.validate, (req, res) => this.controller.store(req, res));
        this.controller.router.route("/:id")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getInfos), (req, res) => this.controller.show(req, res))
            .put(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.editInfo), InfoRequest_1.default.infoUpdateRequest(), InfoRequest_1.default.requireIdRequest(), InfoRequest_1.default.validate, (req, res) => this.controller.update(req, res))
            .delete(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.deleteInfo), (req, res) => this.controller.delete(req, res))
            .patch(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.restoreData), (req, res) => this.controller.restore(req, res));
    }
}
exports.default = InfoRoutes;
//# sourceMappingURL=InfoRoute.js.map