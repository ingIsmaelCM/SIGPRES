import BaseRequest from "@app/middlewares/BaseRequest";
import {ValidationChain, body} from "express-validator"

 class JobRequest extends BaseRequest {

    upsertJobRequest(): Array<ValidationChain>{
        return [
            body("startAt", "Ingrese una fecha de inicio").exists().notEmpty(),
            body("startAt", "La fecha de inicio es inválida").isISO8601().toDate(),
            body("salary","Ingrese un salario").exists().notEmpty(),
            body("salary","El salario no es válido").isFloat({min: 1, max: 9*1000*1000}),
            body("position","Indique el nombre del puesto").exists().notEmpty(),
            body("company","Indique el nombre de la empresa").exists().notEmpty(),
            body("clientId","Indique el Id del cliente").exists().notEmpty(),
            body("clientId","El Id de cliente no es válido").isInt({min:1}),

        ]
    }

    closeJobRequest(): Array<ValidationChain>{
        return [
            body("endAt", "Ingrese una fecha de cierre").exists().notEmpty(),
            body("endAt", "La fecha de cierre es inválida").isISO8601().toDate(),
        ]
    }
}

export default new JobRequest();