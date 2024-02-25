import { Router } from "express";
import response from "../utils/response";

export default abstract class Controller {
  router: Router = Router();

  constructor() {}
  protected async safeRun(method: () => Promise<any>, res: any): Promise<any> {
    try {
      return await method();
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }
}
