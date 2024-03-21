import Controller from "@app/controllers/Controller";
import IController from "@app/controllers/IController";
import ImageService from "@source/services/ImageService";


export default class ImageController extends Controller implements IController {
    prefix: string = "files/images";
    mainService = new ImageService();

    async show(req: any, res: any) {
        await this.safeRun(async () =>
                await this.mainService.findImage(Number(req.params.id), req.query),
            res, 200, "Detalles de la imagen");
    }

    async delete(req: any, res: any) {
        await this.safeRun(async () =>
                await this.mainService.deleteImage(Number(req.params.id)),
            res, 200, "Imagen Eliminada");
    }

    async restore(req: any, res: any) {
        await this.safeRun(async () =>
                await this.mainService.deleteImage(Number(req.params.id)),
            res, 200, "Imagen Eliminada");
    }
}
