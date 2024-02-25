import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import response from "@app/utils/response";
export default class BaseRequest {
  public validate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages: any = {};
      Object.values(errors.mapped()).forEach((err: any) => {
        messages[err.path] = err.msg;
      });
      response.error(res, 422, messages);
      return messages;
    }
    next();
  }
}
