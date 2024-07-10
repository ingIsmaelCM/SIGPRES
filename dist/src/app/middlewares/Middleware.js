"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Middleware {
    constructor() {
        const prototype = Object.getPrototypeOf(this);
        const methodNames = Object.getOwnPropertyNames(prototype);
        for (const methodName of methodNames) {
            const method = this[methodName];
            if (methodName !== "constructor" && typeof method === "function") {
                this[methodName] = method.bind(this);
            }
        }
    }
}
exports.default = Middleware;
//# sourceMappingURL=Middleware.js.map