import { Router } from "express";
import response from "../utils/response";
import tools from "../utils/tools";

export default abstract class Controller {
  router: Router = Router();

  protected async safeRun(method: () => Promise<any>, res: any): Promise<any> {
    try {
      return await method();
    } catch (error: any) {
      response.error(res, error.code, error.message);
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
