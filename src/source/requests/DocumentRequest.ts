import BaseRequest from "@app/requests/BaseRequest";
import {body, param, ValidationChain} from "express-validator"

class DocumentRequest extends BaseRequest {

    documentCreateRequest(): Array<ValidationChain> {
        return [
            body("documents", "Debe ingresar entre 1 y 5 documentos")
                .exists()
                .isArray({min: 1, max: 5}),
            body("documents.*.path", "Cada documento debe contener una url válida")
                .exists()
                .notEmpty()
                .isURL(),
            param("id", "Ingrese el id del modelo").exists().isInt(),
            body("documents.*.title", "Cada documento debe contener un título").exists().notEmpty(),
            body("documents.*.title", "Hay documentos con título no válido").isString().isLength({max: 150}),
            body("documents.*.size", "Cada documento debe tener un tamaño no mayor a 5.5mb")
                .exists()
                .notEmpty()
                .isFloat({max: 5.5}),
        ];
    }
    documentUpdateRequest(): Array<ValidationChain> {
        return [
            body("documents", "Debe ingresar entre 1 y 5 documentos")
                .exists()
                .isArray({min: 1, max: 5}),
            body("documents.*.path", "Cada documento debe contener una url válida")
                .exists()
                .notEmpty()
                .isURL(),
            param("id", "Ingrese el id del modelo").exists().isInt(),
            body("documents.*.title", "Cada documento debe contener un título").exists().notEmpty(),
            body("documents.*.title", "Hay documentos con título no válido").isString().isLength({max: 150}),
            body("documents.*.size", "Cada documento debe tener un tamaño no mayor a 5.5mb")
                .exists()
                .notEmpty()
                .isFloat({max: 5.5}),
        ];
    }
}

export default new DocumentRequest();