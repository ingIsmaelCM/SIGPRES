"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AppService_1 = __importDefault(require("../services/AppService"));
const response_1 = __importDefault(require("../utils/response"));
const Controller_1 = __importDefault(require("./Controller"));
const BraintreeService_1 = __importDefault(require("@source/services/BraintreeService"));
class AppController extends Controller_1.default {
    prefix = "app";
    router = (0, express_1.Router)();
    mainService = new AppService_1.default();
    async getCloudSignature(req, res) {
        try {
            const cloudinarySignature = await this.mainService.getCloudSignature();
            response_1.default.success(res, 200, cloudinarySignature, "Firma de Cloudinary");
        }
        catch (error) {
            response_1.default.error(res, error.code, error.message);
        }
    }
    async testRoute(req, res) {
        return this.safeRun(async () => await BraintreeService_1.default.getInstance().createToken(), res, 200, "Prueba Exitosa");
    }
}
exports.default = AppController;
//# sourceMappingURL=AppController.js.map