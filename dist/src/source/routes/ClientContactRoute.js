"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const ClientContactController_1 = __importDefault(require("@source/controllers/ClientContactController"));
const ClientContactRequest_1 = __importDefault(require("@source/requests/ClientContactRequest"));
const RoleMiddleware_1 = __importDefault(require("@/auth/middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
class ClientContactRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new ClientContactController_1.default());
    }
    initRoutes() {
        this.controller.router.route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getClients), RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getContacts), (req, res) => this.controller.index(req, res))
            .post(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.editClient), RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.editClient), ClientContactRequest_1.default.clientContactCreateRequest(), ClientContactRequest_1.default.validate, (req, res) => this.controller.store(req, res));
        this.controller.router.route("/:id")
            .delete(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.deleteContact), (req, res) => this.controller.delete(req, res))
            .patch(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.deleteContact), (req, res) => this.controller.restore(req, res));
    }
}
exports.default = ClientContactRoutes;
//# sourceMappingURL=ClientContactRoute.js.map