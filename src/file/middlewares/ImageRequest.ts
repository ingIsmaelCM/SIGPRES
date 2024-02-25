import BaseRequest from "@/app/middlewares/BaseRequest";
import { ValidationChain, body } from "express-validator";

class ImageRequest extends BaseRequest {
  createImageRequest(): Array<ValidationChain> {
    return [
      body("images", "Debe ingresar entre 1 y 5 imágenes")
        .exists()
        .isArray({ min: 1, max: 5 }),
      body("images.*.path", "Cada imagen debe contener una url válida")
        .exists()
        .notEmpty()
        .isURL(),
      body(
        "images.*.imageableType",
        "Cada imagen debe contener el nombre del modelo relacionado"
      )
        .exists()
        .notEmpty()
        .isString(),
      body(
        "images.*.imageableId",
        "Cada imagen debe contener el id del modelo relacionado"
      )
        .exists()
        .notEmpty()
        .isInt(),
      body("images.*.size", "Cada imagen debe tener un tamaño no mayor a 5.5mb")
        .exists()
        .notEmpty()
        .isFloat({ max: 5.5 }),
    ];
  }
}

export default new ImageRequest();
