"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const LawyerPaymentController_1 = __importDefault(require("@source/controllers/LawyerPaymentController"));
const LawyerPaymentRequest_1 = __importDefault(require("@source/requests/LawyerPaymentRequest"));
const RoleMiddleware_1 = __importDefault(require("@/auth/middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
class LawyerPaymentRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new LawyerPaymentController_1.default());
    }
    initRoutes() {
        this.controller.router.route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getExpenses), (req, res) => this.controller.index(req, res))
            .post(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createExpense), LawyerPaymentRequest_1.default.lawyerPaymentCreateRequest(), LawyerPaymentRequest_1.default.validate, (req, res) => this.controller.store(req, res));
        this.controller.router.route("/:id")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getExpenses), (req, res) => this.controller.show(req, res))
            .put(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.editExpense), LawyerPaymentRequest_1.default.lawyerPaymentUpdateRequest(), LawyerPaymentRequest_1.default.validate, (req, res) => this.controller.update(req, res))
            .delete(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.deleteExpense), (req, res) => this.controller.delete(req, res))
            .patch(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.restoreData), (req, res) => this.controller.restore(req, res));
    }
}
exports.default = LawyerPaymentRoutes;
//# sourceMappingURL=LawyerPaymentRoute.js.map