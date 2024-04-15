"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const ExpenseController_1 = __importDefault(require("@source/controllers/ExpenseController"));
const ExpenseRequest_1 = __importDefault(require("@source/requests/ExpenseRequest"));
const RoleMiddleware_1 = __importDefault(require("@/auth/middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
class ExpenseRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new ExpenseController_1.default());
    }
    initRoutes() {
        this.controller.router.route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getExpenses), (req, res) => this.controller.index(req, res))
            .post(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createExpense), ExpenseRequest_1.default.expenseCreateRequest(), ExpenseRequest_1.default.validate, (req, res) => this.controller.store(req, res));
        this.controller.router.post('/lawyer', RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createExpense), ExpenseRequest_1.default.expenseCreateRequest(), ExpenseRequest_1.default.expenseCreateFromLawyerRequest(), ExpenseRequest_1.default.validate, (req, res) => this.controller.storeFromLawyer(req, res));
        this.controller.router.route("/:id")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getExpenses), (req, res) => this.controller.show(req, res))
            .put(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.editExpense), ExpenseRequest_1.default.expenseUpdateRequest(), ExpenseRequest_1.default.validate, (req, res) => this.controller.update(req, res))
            .delete(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.deleteExpense), (req, res) => this.controller.delete(req, res))
            .patch(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.restoreData), (req, res) => this.controller.restore(req, res));
    }
}
exports.default = ExpenseRoutes;
//# sourceMappingURL=ExpenseRoute.js.map