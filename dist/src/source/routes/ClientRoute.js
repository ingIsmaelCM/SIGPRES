"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const ClientController_1 = __importDefault(require("@source/controllers/ClientController"));
const ClientRequest_1 = __importDefault(require("@source/requests/ClientRequest"));
const RoleMiddleware_1 = __importDefault(require("@/auth/middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
const InfoRequest_1 = __importDefault(require("@source/requests/InfoRequest"));
const ImageRequest_1 = __importDefault(require("@source/requests/ImageRequest"));
const DocumentRequest_1 = __importDefault(require("@source/requests/DocumentRequest"));
class ClientRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new ClientController_1.default());
    }
    initRoutes() {
        this.controller.router.route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getClients), (req, res) => this.controller.index(req, res))
            .post(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createClient), ClientRequest_1.default.clientCreateRequest(), InfoRequest_1.default.relatedInfoRequest(), ClientRequest_1.default.validate, (req, res) => this.controller.store(req, res));
        this.controller.router.post("/:id/profile", RoleMiddleware_1.default.hasAllPermission([PermissionEnums_1.default.createImage, PermissionEnums_1.default.editClient]), ImageRequest_1.default.imageSingleCreateRequest(), ImageRequest_1.default.requireIdRequest(), ImageRequest_1.default.validate, (req, res) => this.controller.setProfilePhoto(req, res));
        this.controller.router.post("/:id/images", RoleMiddleware_1.default.hasAllPermission([PermissionEnums_1.default.createImage, PermissionEnums_1.default.editClient]), ImageRequest_1.default.imageSBulkCreateRequest(), ImageRequest_1.default.requireIdRequest(), ImageRequest_1.default.validate, (req, res) => this.controller.setImagesToClient(req, res));
        this.controller.router.post("/:id/documents", RoleMiddleware_1.default.hasAllPermission([PermissionEnums_1.default.createDocument, PermissionEnums_1.default.editClient]), DocumentRequest_1.default.documentCreateRequest(), DocumentRequest_1.default.requireIdRequest(), DocumentRequest_1.default.validate, (req, res) => this.controller.setDocumentsToClient(req, res));
        this.controller.router.post("/:id/info", RoleMiddleware_1.default.hasAllPermission([PermissionEnums_1.default.createInfo, PermissionEnums_1.default.editClient]), InfoRequest_1.default.relatedInfoRequest(), InfoRequest_1.default.requireIdRequest(), InfoRequest_1.default.validate, (req, res) => this.controller.setInfoToClient(req, res));
        this.controller.router.route("/:id")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getClients), (req, res) => this.controller.show(req, res))
            .put(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.editClient), ClientRequest_1.default.clientUpdateRequest(), InfoRequest_1.default.relatedInfoRequest(), ClientRequest_1.default.requireIdRequest(), ClientRequest_1.default.validate, (req, res) => this.controller.update(req, res))
            .delete(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.deleteClient), (req, res) => this.controller.delete(req, res))
            .patch(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.restoreData), (req, res) => this.controller.restore(req, res));
    }
}
exports.default = ClientRoutes;
//# sourceMappingURL=ClientRoute.js.map