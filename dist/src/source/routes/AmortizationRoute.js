"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const AmortizationController_1 = __importDefault(require("@source/controllers/AmortizationController"));
const AmortizationRequest_1 = __importDefault(require("@source/requests/AmortizationRequest"));
const RoleMiddleware_1 = __importDefault(require("@/auth/middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
class AmortizationRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new AmortizationController_1.default());
    }
    initRoutes() {
        this.controller.router.route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getAmortizations), (req, res) => this.controller.index(req, res))
            .post(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createAmortization), AmortizationRequest_1.default.amortizationCreateRequest(), AmortizationRequest_1.default.validate, (req, res) => this.controller.store(req, res));
        this.controller.router.route("/:id")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getAmortizations), (req, res) => this.controller.show(req, res))
            .put(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.editAmortization), AmortizationRequest_1.default.amortizationUpdateRequest(), AmortizationRequest_1.default.validate, (req, res) => this.controller.update(req, res))
            .delete(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.deleteAmortization), (req, res) => this.controller.delete(req, res));
    }
}
exports.default = AmortizationRoutes;
//# sourceMappingURL=AmortizationRoute.js.map