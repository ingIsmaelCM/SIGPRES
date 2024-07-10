"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const LawyerController_1 = __importDefault(require("@source/controllers/LawyerController"));
const LawyerRequest_1 = __importDefault(require("@source/requests/LawyerRequest"));
const RoleMiddleware_1 = __importDefault(require("@/auth/middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
const InfoRequest_1 = __importDefault(require("@source/requests/InfoRequest"));
class LawyerRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new LawyerController_1.default());
    }
    initRoutes() {
        this.controller.router.route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getLawyers), (req, res) => this.controller.index(req, res))
            .post(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createLawyer), LawyerRequest_1.default.lawyerCreateRequest(), InfoRequest_1.default.relatedInfoRequest(), LawyerRequest_1.default.validate, (req, res) => this.controller.store(req, res));
        this.controller.router.route("/:id")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getLawyers), (req, res) => this.controller.show(req, res))
            .put(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.editLawyer), LawyerRequest_1.default.lawyerUpdateRequest(), InfoRequest_1.default.relatedInfoRequest(), LawyerRequest_1.default.validate, (req, res) => this.controller.update(req, res))
            .delete(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.deleteLawyer), (req, res) => this.controller.delete(req, res))
            .patch(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.restoreData), (req, res) => this.controller.restore(req, res));
    }
}
exports.default = LawyerRoutes;
//# sourceMappingURL=LawyerRoute.js.map