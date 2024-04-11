"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const ContactController_1 = __importDefault(require("@source/controllers/ContactController"));
const ContactRequest_1 = __importDefault(require("@source/requests/ContactRequest"));
const RoleMiddleware_1 = __importDefault(require("@/auth/middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
const InfoRequest_1 = __importDefault(require("@source/requests/InfoRequest"));
const ImageRequest_1 = __importDefault(require("@source/requests/ImageRequest"));
class ContactRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new ContactController_1.default());
    }
    initRoutes() {
        this.controller.router.route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getContacts), (req, res) => this.controller.index(req, res))
            .post(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createContact), ContactRequest_1.default.contactCreateRequest(), InfoRequest_1.default.relatedInfoRequest(), ContactRequest_1.default.validate, (req, res) => this.controller.store(req, res));
        this.controller.router.get("/from_relation", RoleMiddleware_1.default.hasAllPermission([PermissionEnums_1.default.getContacts, PermissionEnums_1.default.getClients]), (req, res) => this.controller.fromRelation(req, res));
        this.controller.router.post("/:id/profile", RoleMiddleware_1.default.hasAllPermission([PermissionEnums_1.default.createImage, PermissionEnums_1.default.editContact]), ImageRequest_1.default.imageSingleCreateRequest(), ImageRequest_1.default.requireIdRequest(), ImageRequest_1.default.validate, (req, res) => this.controller.setProfilePhoto(req, res));
        this.controller.router.route("/:id")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getContacts), (req, res) => this.controller.show(req, res))
            .put(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.editContact), ContactRequest_1.default.contactUpdateRequest(), InfoRequest_1.default.relatedInfoRequest(), ContactRequest_1.default.validate, (req, res) => this.controller.update(req, res))
            .delete(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.deleteContact), (req, res) => this.controller.delete(req, res))
            .patch(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.restoreData), (req, res) => this.controller.restore(req, res));
    }
}
exports.default = ContactRoutes;
//# sourceMappingURL=ContactRoute.js.map