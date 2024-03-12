import BaseRequest from "@/app/middlewares/BaseRequest";
import {ValidationChain, body, param} from "express-validator";

class ImageRequest extends BaseRequest {
    createImageRequest(): Array<ValidationChain> {
        return [
            body("images", "Debe ingresar entre 1 y 5 imágenes")
                .exists()
                .isArray({min: 1, max: 5}),
            body("images.*.path", "Cada imagen debe contener una url válida")
                .exists()
                .notEmpty()
                .isURL(),
            param("id", "Ingrese el id del modelo").exists().isInt(),
            body("caption", "Ingrese una caption válida").optional().isString().isLength({max: 150}),
            body("images.*.size", "Cada imagen debe tener un tamaño no mayor a 5.5mb")
                .exists()
                .notEmpty()
                .isFloat({max: 5.5}),
        ];
    }
}

export default new ImageRequest();
