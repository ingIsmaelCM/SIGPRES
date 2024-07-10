import {NextFunction, Request, Response} from "express";
import {body, param, ValidationChain, validationResult} from "express-validator";

import response from "@app/utils/response";
import {IsNumericOptions} from "validator";
import moment from "moment-timezone";

export default class BaseRequest {
    RequestCheck = {
        required: (field: string) => body(field, 'required').exists().notEmpty(),
        isUrl: (field: string) => body(field, `invalidType: {{url}} `).isURL(),
        isEmail: (field: string) => body(field, `invalidType: {{email}} `).isEmail(),
        isDate: (field: string) => body(field, `invalidType: {{date}} `).isISO8601().toDate(),
        isString: (field: string) => body(field, `invalidType: {{texto}} `).isString(),
        isArray: (field: string, options?: any) => body(field, `invalidType: {{array}}`).isArray(options),
        isFloat: (field: string, min?: number, max?: number) => body(field, `isFloat: {{${min}}} {{${max}}} `)
            .isFloat({
                min: min || 0,
                max: max || Infinity
            }),
        isInt: (field: string) => body(field, `invalidType: {{entero}} `).isInt(),
        isNumeric: (field: string, options?: IsNumericOptions) =>
            body(field, `invalidType: {{numérico}} `)
                .isNumeric(options as any),
        isLength: (field: string, min: number, max: number) =>
            body(field, `invalidLength: {{${min}}} {{${max}}}`)
                .isLength({min, max}),
        isIn: (field: string, acepted: string, type: string[] | number[]) =>
            body(field, `invalidType: {{${acepted}}}`)
                .isIn(type)
    }

    public validate(req: Request, res: Response, next: NextFunction) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages: any = {};
            Object.values(errors.mapped()).forEach((err: any) => {
                const msg = err.msg.split(':')[0]
                //@ts-ignore
                messages[err.path] = `${err.path}: ${message(req.t(msg), err.msg)}`;
            });
            response.error(res, 422, messages);
            return messages;
        }
        //@ts-ignore
        const fields = validatedFields(req['express-validator#contexts'])

        const cleanedBody = Object.fromEntries(
            Object.entries(req.body).filter(([key]) => fields.includes(key))
        );

        req.body = cleanedBody;
        next();
    }

    requireIdRequest(): Array<ValidationChain> {
        return [
            param("id", "Falta el parámetro id de la ruta").exists().isString(),
        ]
    }
}

const message = (str1: string, str2: string) => {
    const match1 = str1.match(/{{(.*?)}}/g);
    const match2 = str2.match(/{{(.*?)}}/g);
    let result = str1;
    if (match2) {
        match2.forEach((res: string, index: number) => {
            if (match1 && match1[index]) {
                result = result.replace(match1[index], res);
            }
        })
    }
    return result.replace(/{/g, '').replace(/}/g, '')
}


const validatedFields = (context: Array<any>): Array<string> =>
    [...new Set(context.map((cntx: any) => cntx.fields[0]))]
