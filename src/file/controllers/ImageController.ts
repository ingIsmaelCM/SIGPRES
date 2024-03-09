import Controller from "@/app/controllers/Controller";
import IController from "@/app/controllers/IController";
import ImageService from "@file/services/ImageService";


export default class ImageController extends Controller implements IController {
  prefix: string = "files/images";
  mainService= ImageService;

  async findImage(req: any, res: any) {
    await this.safeRun(async () => {
      const imageId = req.params.id;
      const params = req.query;
     return await this.mainService.findImage(imageId, params);
    }, res, 200, "Detalles de la imagen");
  }
  async deleteImage(req: any, res: any) {
    await this.safeRun(async () => {
      const imageId = req.params.id;
      return await this.mainService.deleteImage(imageId);
    }, res, 200, "Imagen Eliminada");
  }
}
