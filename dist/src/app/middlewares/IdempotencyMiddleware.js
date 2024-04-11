"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_1 = __importDefault(require("@app/utils/response"));
class IdempotencyMiddleware {
    static contentHashed = {};
    static async idempotent(req, res, next) {
        const bodyString = JSON.stringify(req.body);
        const prevContent = IdempotencyMiddleware.contentHashed[req.cookies['tenant']];
        IdempotencyMiddleware.contentHashed[req.cookies['tenant']] = await bcrypt_1.default.hash(bodyString, 10);
        if (await IdempotencyMiddleware.isRunning(bodyString, prevContent)) {
            return response_1.default.success(res, 200, "Por favor, espere mientras su petición se procesa", "Procesando");
        }
        IdempotencyMiddleware.resetIdempotent(req.cookies["tenant"]);
        next();
    }
    static async isRunning(bodyString, prevContent = "none") {
        return await bcrypt_1.default.compare(bodyString, prevContent);
    }
    static resetIdempotent(key) {
        setTimeout(() => {
            delete IdempotencyMiddleware.contentHashed[key];
        }, 3000);
    }
}
exports.default = IdempotencyMiddleware;
//# sourceMappingURL=IdempotencyMiddleware.js.map