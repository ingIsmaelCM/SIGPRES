"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const response_1 = __importDefault(require("@app/utils/response"));
class BaseRequest {
    RequestCheck = {
        required: (field) => (0, express_validator_1.body)(field, 'required').exists().notEmpty(),
        isUrl: (field) => (0, express_validator_1.body)(field, `invalidType: {{url}} `).isURL(),
        isEmail: (field) => (0, express_validator_1.body)(field, `invalidType: {{email}} `).isEmail(),
        isDate: (field) => (0, express_validator_1.body)(field, `invalidType: {{date}} `).isISO8601().toDate(),
        isString: (field) => (0, express_validator_1.body)(field, `invalidType: {{texto}} `).isString(),
        isArray: (field) => (0, express_validator_1.body)(field, `invalidType: {{array}}`).isArray(),
        isFloat: (field, min, max) => (0, express_validator_1.body)(field, `isFloat: {{${min}}} {{${max}}} `)
            .isFloat({
            min: min || 0,
            max: max || Infinity
        }),
        isInt: (field) => (0, express_validator_1.body)(field, `invalidType: {{entero}} `).isInt(),
        isNumeric: (field, options) => (0, express_validator_1.body)(field, `invalidType: {{numérico}} `)
            .isNumeric(options),
        isLength: (field, min, max) => (0, express_validator_1.body)(field, `invalidLength: {{${min}}} {{${max}}}`)
            .isLength({ min, max }),
        isIn: (field, acepted, type) => (0, express_validator_1.body)(field, `invalidType: {{${acepted}}}`)
            .isIn(type)
    };
    validate(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const messages = {};
            Object.values(errors.mapped()).forEach((err) => {
                const msg = err.msg.split(':')[0];
                messages[err.path] = `${err.path}: ${message(req.t(msg), err.msg)}`;
            });
            response_1.default.error(res, 422, messages);
            return messages;
        }
        const fields = validatedFields(req['express-validator#contexts']);
        const cleanedBody = Object.fromEntries(Object.entries(req.body).filter(([key]) => fields.includes(key)));
        req.body = cleanedBody;
        next();
    }
    requireIdRequest() {
        return [
            (0, express_validator_1.param)("id", "Falta el parámetro id de la ruta").exists().isString(),
        ];
    }
}
exports.default = BaseRequest;
const message = (str1, str2) => {
    const match1 = str1.match(/{{(.*?)}}/g);
    const match2 = str2.match(/{{(.*?)}}/g);
    let result = str1;
    if (match2) {
        match2.forEach((res, index) => {
            if (match1 && match1[index]) {
                result = result.replace(match1[index], res);
            }
        });
    }
    return result.replace(/{/g, '').replace(/}/g, '');
};
const validatedFields = (context) => [...new Set(context.map((cntx) => cntx.fields[0]))];
//# sourceMappingURL=BaseRequest.js.map