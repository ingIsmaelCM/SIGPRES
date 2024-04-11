"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importDefault(require("@/app/controllers/Controller"));
const DocumentService_1 = __importDefault(require("@source/services/DocumentService"));
class DocumentController extends Controller_1.default {
    prefix = 'documents';
    mainService = new DocumentService_1.default();
    async index(req, res) {
        await this.safeRun(async () => this.mainService.getDocuments(req.query), res, 200, "Listado de Documentos");
    }
    async show(req, res) {
        await this.safeRun(async () => await this.mainService.findDocument(req.params.id, req.query), res, 200, "Detalles del documento");
    }
    async delete(req, res) {
        await this.safeRun(async () => await this.mainService.deleteDocument(req.params.id), res, 200, "Documento Eliminada");
    }
    async restore(req, res) {
        await this.safeRun(async () => await this.mainService.deleteDocument(req.params.id), res, 200, "Documento Eliminada");
    }
}
exports.default = DocumentController;
//# sourceMappingURL=DocumentController.js.map