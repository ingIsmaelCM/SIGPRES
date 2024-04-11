"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const ImageRepository_1 = __importDefault(require("@source/repositories/ImageRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const CloudinaryService_1 = __importDefault(require("@app/services/CloudinaryService"));
class ImageService extends Service_1.default {
    mainRepo = new ImageRepository_1.default();
    async getImages(params) {
        return this.safeRun(async () => this.mainRepo.getAll(params));
    }
    async uploadImageButNotSave(file) {
        return this.safeRun(async () => {
            const res = await CloudinaryService_1.default.getInstance().uploadFilesToCloudinary(file);
            return res[0];
        });
    }
    async createSingleImage(data, relatedModel, relatedId, upsert) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            let newImage = null;
            data = {
                ...data,
                imageableType: relatedModel,
                imageableId: relatedId
            };
            const oldImage = await this.checkOldImageExists(relatedModel, relatedId);
            if (oldImage && upsert) {
                newImage = await this.mainRepo.update(data, oldImage.id, trans);
                await CloudinaryService_1.default.getInstance().destroyFileFromCloudinary(oldImage.publicId);
            }
            else {
                newImage = await this.mainRepo.create(data, trans);
            }
            await trans.commit();
            return newImage;
        }, async () => await trans.rollback());
    }
    async createMultipleImages(data, relatedModel, relatedId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            data = data.map((image) => ({
                ...image,
                imageableType: relatedModel,
                imageableId: relatedId
            }));
            const newImage = await this.mainRepo.bulkCreate(data, trans);
            await trans.commit();
            return newImage;
        }, async () => await trans.rollback());
    }
    async findImage(imageId, params) {
        return await this.mainRepo.findById(imageId, params);
    }
    async deleteImage(imageId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const image = await this.mainRepo.findById(imageId);
            if (image) {
                await CloudinaryService_1.default.getInstance().destroyFileFromCloudinary(image.publicId);
            }
            const deletedImage = await this.mainRepo.delete(imageId, trans);
            await trans.commit();
            return deletedImage;
        }, async () => await trans.rollback());
    }
    async restoreImage(imageId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async checkOldImageExists(relatedModel, relatedId) {
        return await this.mainRepo.getAll({
            filter: [
                `imageableType:eq:${relatedModel}:and`,
                `imageableId:eq:${relatedId}:and`,
            ],
            limit: 1
        });
    }
}
exports.default = ImageService;
//# sourceMappingURL=ImageService.js.map