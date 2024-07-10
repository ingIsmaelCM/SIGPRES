"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importDefault(require("@app/controllers/Controller"));
const ImageService_1 = __importDefault(require("@source/services/ImageService"));
class ImageController extends Controller_1.default {
    prefix = "images";
    mainService = new ImageService_1.default();
    async index(req, res) {
        await this.safeRun(async () => this.mainService.getImages(req.query), res, 200, "Listado de Imágenes");
    }
    async show(req, res) {
        await this.safeRun(async () => await this.mainService.findImage(req.params.id, req.query), res, 200, "Detalles de la imagen");
    }
    async uploadNotSave(req, res) {
        await this.safeRun(async () => await this.mainService.uploadImageButNotSave(req.files), res, 200, "Imagen subida al servidor");
    }
    async delete(req, res) {
        await this.safeRun(async () => await this.mainService.deleteImage(req.params.id), res, 200, "Imagen Eliminada");
    }
    async restore(req, res) {
        await this.safeRun(async () => await this.mainService.deleteImage(req.params.id), res, 200, "Imagen Eliminada");
    }
}
exports.default = ImageController;
//# sourceMappingURL=ImageController.js.map