"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const PaymentController_1 = __importDefault(require("@source/controllers/PaymentController"));
const PaymentRequest_1 = __importDefault(require("@source/requests/PaymentRequest"));
const RoleMiddleware_1 = __importDefault(require("@/auth/middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
class PaymentRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new PaymentController_1.default());
    }
    initRoutes() {
        this.controller.router.route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getPayments), (req, res) => this.controller.index(req, res))
            .post(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createPayment), PaymentRequest_1.default.paymentCreateRequest(), PaymentRequest_1.default.validate, (req, res) => this.controller.store(req, res));
        this.controller.router.get("/stats", RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getPayments), RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getPaymentReports), (req, res) => this.controller.getPaymentStat(req, res));
        this.controller.router.post("/cuotas", RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createPayment), PaymentRequest_1.default.paymentCreateCuotaRequest(), PaymentRequest_1.default.validate, (req, res) => this.controller.storePaymentCuota(req, res));
        this.controller.router.post("/capital", RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createPayment), PaymentRequest_1.default.paymentCreateCapitalRequest(), PaymentRequest_1.default.validate, (req, res) => this.controller.storePaymentCapital(req, res));
        this.controller.router.route("/:id")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getPayments), (req, res) => this.controller.show(req, res))
            .put(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.editPayment), PaymentRequest_1.default.paymentUpdateRequest(), PaymentRequest_1.default.validate, (req, res) => this.controller.update(req, res))
            .delete(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.deletePayment), (req, res) => this.controller.delete(req, res))
            .patch(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.restoreData), (req, res) => this.controller.restore(req, res));
    }
}
exports.default = PaymentRoutes;
//# sourceMappingURL=PaymentRoute.js.map