"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const app_config_1 = __importDefault(require("@app/app.config"));
const Service_1 = __importDefault(require("@app/services/Service"));
class AppService extends Service_1.default {
    async getCloudSignature() {
        try {
            const timestamp = Math.round(new Date().getTime() / 1000);
            cloudinary_1.v2.config(app_config_1.default.cloudinary);
            const params = {
                eager: "w_400,h_300,c_fill",
                timestamp: timestamp,
                upload_preset: "oucbxfou",
            };
            const signature = cloudinary_1.v2.utils.api_sign_request(params, cloudinary_1.v2.config().api_secret);
            return {
                signature: signature,
                timestamp: timestamp,
                api_key: app_config_1.default.cloudinary.api_key,
            };
        }
        catch (error) {
            throw {
                code: 500,
                message: error.message,
            };
        }
    }
}
exports.default = AppService;
//# sourceMappingURL=AppService.js.map