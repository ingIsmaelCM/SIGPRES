"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const GuaranteeController_1 = __importDefault(require("@source/controllers/GuaranteeController"));
const GuaranteeRequest_1 = __importDefault(require("@source/requests/GuaranteeRequest"));
const RoleMiddleware_1 = __importDefault(require("@/auth/middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@/app/interfaces/PermissionEnums"));
class GuaranteeRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new GuaranteeController_1.default());
    }
    initRoutes() {
        this.controller.router.route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getGuarantees), (req, res) => this.controller.index(req, res))
            .post(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createGuarantee), GuaranteeRequest_1.default.guaranteeCreateRequest(), GuaranteeRequest_1.default.validate, (req, res) => this.controller.store(req, res));
        this.controller.router.route("/:id")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getGuarantees), (req, res) => this.controller.show(req, res))
            .put(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.editGuarantee), GuaranteeRequest_1.default.guaranteeUpdateRequest(), GuaranteeRequest_1.default.validate, (req, res) => this.controller.update(req, res))
            .delete(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.deleteGuarantee), (req, res) => this.controller.delete(req, res))
            .patch(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.restoreData), (req, res) => this.controller.restore(req, res));
    }
}
exports.default = GuaranteeRoutes;
//# sourceMappingURL=GuaranteeRoute.js.map