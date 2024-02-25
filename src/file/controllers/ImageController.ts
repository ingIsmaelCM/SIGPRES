import Controller from "@/app/controllers/Controller";
import IController from "@/app/controllers/IController";
import tools from "@/app/utils/tools";
import ImageService from "@file/services/ImageService";
import { IImage } from "@file/utils/FileInterface";
import response from "@/app/utils/response";
import ImageRoutes from "@file/routes/ImageRoutes";

export default class ImageController extends Controller implements IController {
  prefix: string = "files/images";
  private imageService: ImageService = new ImageService();

  constructor() {
    super();
    new ImageRoutes(this.router, this).initRoutes();
  }

  async createImages(req: any, res: any) {
    this.safeRun(async () => {
      const images = req.body.images.map((image: IImage) =>
        tools.setUserRelated(req, image)
      );
      const newImages = await this.imageService.createImages(images);
      response.success(res, 201, newImages, "Imagen(es) creada(s)");
    }, res);
  }
  async findImage(req: any, res: any) {
    this.safeRun(async () => {
      const imageId = req.params.id;
      const params = req.query;
      const image = await this.imageService.findImage(imageId, params);
      response.success(res, 200, image, "Resultado de la imagen");
    }, res);
  }
  async deleteImage(req: any, res: any) {
    this.safeRun(async () => {
      const imageId = req.params.id;
      const image = await this.imageService.deleteImage(imageId);
      response.success(res, 200, image, "Imagen eliminada");
    }, res);
  }
}
