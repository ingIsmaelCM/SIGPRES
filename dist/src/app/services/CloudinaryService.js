"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const app_config_1 = __importDefault(require("@app/app.config"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("@/logger"));
class CloudinaryService extends Service_1.default {
    static instance;
    cloud = null;
    constructor() {
        super();
        cloudinary_1.default.v2.config({
            cloud_name: app_config_1.default.cloudinary.cloud_name,
            api_key: app_config_1.default.cloudinary.api_key,
            api_secret: app_config_1.default.cloudinary.api_secret,
            secure: true
        });
        this.cloud = cloudinary_1.default.v2;
        CloudinaryService.instance = this;
    }
    static getInstance() {
        if (!this.instance) {
            new CloudinaryService();
        }
        return this.instance;
    }
    async uploadFilesToCloudinary(files) {
        try {
            const results = [];
            for (const file of files) {
                const res = await this.cloud.uploader.upload(file.path, {
                    upload_preset: app_config_1.default.cloudinary.upload_preset,
                    eager: [
                        { width: 400, height: 300, crop: "fill" }
                    ],
                });
                results.push({
                    path: res.url,
                    size: (res.bytes * 0.000001).toFixed(2),
                    publicId: res.public_id,
                    caption: res.original_filename,
                    title: res.original_filename,
                });
                fs_1.default.unlink(file.path, (err) => {
                    logger_1.default.error(err);
                });
            }
            return results;
        }
        catch (error) {
            return Promise.reject({
                code: 500,
                message: error.message
            });
        }
    }
    async destroyFileFromCloudinary(publicId) {
        try {
            return await this.cloud.uploader
                .destroy(publicId, {});
        }
        catch (error) {
            return Promise.reject({
                code: 500,
                message: error.message
            });
        }
    }
}
exports.default = CloudinaryService;
//# sourceMappingURL=CloudinaryService.js.map