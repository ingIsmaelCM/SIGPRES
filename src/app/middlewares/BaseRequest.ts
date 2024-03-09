import {NextFunction, Request, Response} from "express";
import {validationResult, param, ValidationChain} from "express-validator";
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
        //@ts-ignore
        const fields = validatedFields(req['express-validator#contexts'])
        req.body = Object.fromEntries(
            Object.entries(req.body).filter(([key]) => fields.includes(key))
        );
        next();
    }


    requireIdRequest(): Array<ValidationChain> {
        return [
            param("id", "El parámetro de ruta debe ser un entero").exists().isInt({min:1}),
        ]
    }
}

const validatedFields = (context: Array<any>): Array<string> =>
    [...new Set(context.map((cntx: any) => cntx.fields[0]))]
