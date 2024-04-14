"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const WalletController_1 = __importDefault(require("@source/controllers/WalletController"));
const WalletRequest_1 = __importDefault(require("@source/requests/WalletRequest"));
const RoleMiddleware_1 = __importDefault(require("@/auth/middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
class WalletRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new WalletController_1.default());
    }
    initRoutes() {
        this.controller.router.route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getWallets), (req, res) => this.controller.index(req, res))
            .post(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createWallet), WalletRequest_1.default.walletCreateRequest(), WalletRequest_1.default.validate, (req, res) => this.controller.store(req, res));
        this.controller.router.put("/:id/balance/add", RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createWallet), WalletRequest_1.default.walletAddBalanceRequest(), WalletRequest_1.default.requireIdRequest(), WalletRequest_1.default.validate, (req, res) => this.controller.addBalance(req, res));
        this.controller.router.route("/:id")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getWallets), (req, res) => this.controller.show(req, res))
            .put(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.editWallet), WalletRequest_1.default.walletUpdateRequest(), WalletRequest_1.default.validate, (req, res) => this.controller.update(req, res))
            .delete(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.deleteWallet), (req, res) => this.controller.delete(req, res))
            .patch(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.restoreData), (req, res) => this.controller.restore(req, res));
    }
}
exports.default = WalletRoutes;
//# sourceMappingURL=WalletRoute.js.map