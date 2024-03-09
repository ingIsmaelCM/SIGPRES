import { Router } from "express";
import response from "../utils/response";
import tools from "../utils/tools";
import Service from "@app/services/Service";
import {EStatusCode} from "@app/utils/AppInterfaces";


//TODO: Remove title parameter from each call to this method

export default abstract class Controller {
  router: Router = Router();
  abstract readonly mainService: Service
  protected async safeRun(method: () => Promise<any>, res: any, code: EStatusCode=200, title?: string): Promise<any> {
    try {
      return response.success(res, code, await method(), title||mensajesEstado[code] );
    } catch (error: any) {
      response.error(res, error.code, error.message, mensajesEstado[code]);
      return error;
    }
  }
}

export function setAuthor(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): any {
  const originalMethod = descriptor.value;
  descriptor.value = function (req: any, res: any) {
    req.body = tools.setUserRelated(req, req.body);
    return originalMethod.apply(this, [req, res]);
  };
}

const mensajesEstado: { [codigo: number]: string } = {
  200: "Operación realizada con éxito",
  201: "Recurso creado/actualizado",
  401: "No autorizado",
  403: "No tienes permiso para esto",
  404: "No encontrado",
  422: "Error de Validación",
  500: "Error interno del servidor"
};
