import Controller from "@app/controllers/Controller";
import IController from "@app/controllers/IController";
import ImageService from "@source/services/ImageService";
import {Request, Response} from "express"

export default class ImageController extends Controller implements IController {
    prefix: string = "images";
    mainService = new ImageService();

    async index(req: Request, res: Response){
        await  this.safeRun(async()=>
            this.mainService.getImages(req.query)
        , res, 200, "Listado de Imágenes")
    }


    async show(req: any, res: any) {
        await this.safeRun(async () =>
                await this.mainService.findImage(Number(req.params.id), req.query),
            res, 200, "Detalles de la imagen");
    }

    async uploadNotSave(req: Request, res: Response){
        await this.safeRun(async () =>
                await this.mainService.uploadImageButNotSave(req.files),
            res, 200, "Imagen subida al servidor");
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
