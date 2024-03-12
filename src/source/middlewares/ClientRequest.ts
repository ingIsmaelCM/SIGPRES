import BaseRequest from "@/app/middlewares/BaseRequest";
import { ValidationChain, body, param } from "express-validator";
import {EClientType, EInfoGender} from "../utils/SourceInterfaces";

class ClientRequest extends BaseRequest {
  upsertClientRequest(): Array<ValidationChain> {
    return [
      body("name", "El nombre es requerido").exists().notEmpty(),
      body("name", "El nombre es muy extenso").isLength({
        min: 1,
        max: 30,
      }),
      body("lastname", "El apellido es requerido").exists().notEmpty(),
      body("clienttype","El tipo de cliente no es válido").optional().isIn(Object.values(EClientType)),
      body("lastname", "El apellido es muy extenso").isLength({
        min: 1,
        max: 50,
      }),
    ];
  }

}

export default new ClientRequest();
