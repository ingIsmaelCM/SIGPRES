"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const LoanController_1 = __importDefault(require("@source/controllers/LoanController"));
const LoanRequest_1 = __importDefault(require("@source/requests/LoanRequest"));
const RoleMiddleware_1 = __importDefault(require("@/auth/middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
const ConditionRequest_1 = __importDefault(require("@source/requests/ConditionRequest"));
class LoanRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new LoanController_1.default());
    }
    initRoutes() {
        this.controller.router.route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getLoans), (req, res) => this.controller.index(req, res))
            .post(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createLoan), LoanRequest_1.default.loanCreateRequest(), ConditionRequest_1.default.conditionCreateRequest(), LoanRequest_1.default.validate, (req, res) => this.controller.store(req, res));
        this.controller.router.patch("/:id/confirm", RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.approveLoan), LoanRequest_1.default.loanConfirmRequest(), LoanRequest_1.default.requireIdRequest(), LoanRequest_1.default.validate, (req, res) => this.controller.confirm(req, res));
        this.controller.router.patch("/:id/decline", RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.declineLoan), LoanRequest_1.default.requireIdRequest(), LoanRequest_1.default.validate, (req, res) => this.controller.decline(req, res));
        this.controller.router.route("/:id")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getLoans), (req, res) => this.controller.show(req, res))
            .put(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.editLoan), LoanRequest_1.default.loanUpdateRequest(), LoanRequest_1.default.requireIdRequest(), ConditionRequest_1.default.conditionCreateRequest(), LoanRequest_1.default.validate, (req, res) => this.controller.update(req, res))
            .delete(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.deleteLoan), (req, res) => this.controller.delete(req, res))
            .patch(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.restoreData), (req, res) => this.controller.restore(req, res));
    }
}
exports.default = LoanRoutes;
//# sourceMappingURL=LoanRoute.js.map