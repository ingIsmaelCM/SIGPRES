import Controller from "@/app/controllers/Controller";
import IController from "@/app/controllers/IController";
import tools from "@/app/utils/tools";
import ImageService from "@file/services/ImageService";
import { IImage } from "@file/utils/FileInterface";
import response from "@/app/utils/response";
import ImageRoutes from "@file/routes/ImageRoutes";
import image from "@file/models/Image";

export default class ImageController extends Controller implements IController {
  prefix: string = "files/images";
  mainService= ImageService;
  constructor() {
    super();
    new ImageRoutes(this.router, this).initRoutes();
  }
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
