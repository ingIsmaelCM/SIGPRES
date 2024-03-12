import { Response } from "express";

export default {
  success(res: Response, status: number, body: any, title?: string): void {
    res.status(status).json({
      statusCode: status,
      title: title,
      content: body,
    });
  },

  error(res: Response, status: number, error: any, title?:string): void {
    res.status(status || 500).json({
      title: title,
      statusCode: status||500,
      content: error,
    });
  },
};
