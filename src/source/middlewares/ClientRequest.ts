import BaseRequest from "@/app/middlewares/BaseRequest";
import { ValidationChain, body, param } from "express-validator";

class ClientRequest extends BaseRequest {
  createClientRequest(): Array<ValidationChain> {
    return [
      body("name", "El nombre es requerido").exists().notEmpty(),
      body("name", "El nombre es muy extenso").isLength({
        min: 1,
        max: 30,
      }),
      body("lastname", "El apellido es requerido").exists().notEmpty(),
      body("lastname", "El apellido es muy extenso").isLength({
        min: 1,
        max: 50,
      }),
    ];
  }
  updateClientRequest(): Array<ValidationChain> {
    return [
      body("name", "El nombre es requerido").exists().notEmpty(),
      body("name", "El nombre es muy extenso").isLength({
        min: 1,
        max: 30,
      }),
      body("lastname", "El apellido es requerido").exists().notEmpty(),
      body("lastname", "El apellido es muy extenso").isLength({
        min: 1,
        max: 50,
      }),
      param("id", "El parámetro de ruta debe ser un entero").exists().isInt(),
    ];
  }
}

export default new ClientRequest();
