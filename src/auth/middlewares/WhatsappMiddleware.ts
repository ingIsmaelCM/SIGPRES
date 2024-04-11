import Middleware from "@app/middlewares/Middleware";
import {NextFunction, Response} from "express";
import response from "@app/utils/response";
import WhatsappManagement from "@source/services/WhatsappManagement";

class WhatsappMiddleware extends Middleware{
    hasClient(req: any, res: Response, next: NextFunction) {
       if(WhatsappManagement.checkClient(req.auth.id)){
           next()
       } else{
           response.error(res, 419, 'No ha iniciado un cliente de whatsapp', "No autorizado");
           return;
       }
    }
}

export  default new WhatsappMiddleware();