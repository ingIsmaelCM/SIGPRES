import { Router } from "express";
import response from "../utils/response";
import tools from "../utils/tools";
import Service from "@app/services/Service";

export default abstract class Controller {
  router: Router = Router();
  abstract readonly mainService: Service
  protected async safeRun(method: () => Promise<any>, res: any, code: number=200, title?:string): Promise<any> {
    try {
      return response.success(res, code, await method(), title );
    } catch (error: any) {
      response.error(res, error.code, error.message);
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
