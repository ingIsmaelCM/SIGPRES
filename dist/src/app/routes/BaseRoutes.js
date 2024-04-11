"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRoutes {
    router;
    controller;
    constructor(controller) {
        this.router = controller.router;
        this.controller = controller;
        this.initRoutes();
    }
}
exports.default = BaseRoutes;
//# sourceMappingURL=BaseRoutes.js.map