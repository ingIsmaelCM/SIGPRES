import ImageRepository from "@file/repositories/ImageRepository";
import {IParams} from "@/app/utils/AppInterfaces";
import Image from "../models/Image";
import TenantConnection from "@/app/db/TenantConnection";
import {IImage} from "@file/utils/FileInterface";
import Service from "@app/services/Service";

//TODO Refactor to use `this.safeRun`
class ImageService extends Service {
    imageRepo: ImageRepository = new ImageRepository();

    async createImages(images: IImage[], imageableType: string, imageableId: number): Promise<any> {
        const trans = await TenantConnection.getTrans();
        return await this.safeRun(async () => {
                images = images.map(image => ({...image, imageableType, imageableId}))
                const newImages = await this.imageRepo.bulkCreate(images, trans);
                await trans.commit();
                return newImages;
            },
            async () => await trans.rollback())
    }

    async updateImage(image: IImage, imageId: number): Promise<any> {
        const trans = await TenantConnection.getTrans();
        try {
            const newImage = await this.imageRepo.update(image, imageId, trans);
            await trans.commit();
            return newImage;
        } catch (error: any) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    async findImage(imageId: number, params: IParams): Promise<Image> {
        try {
            return await this.imageRepo.findById(imageId, params);
        } catch (error: any) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    async getImages(params: IParams): Promise<Image> {
        try {
            return await this.imageRepo.getAll(params);
        } catch (error: any) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    async deleteImage(imageId: number): Promise<Image> {
        const trans = await TenantConnection.getTrans();
        try {
            const deletedImage = await this.imageRepo.delete(imageId, trans);
            await trans.commit();
            return deletedImage;
        } catch (error: any) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
}

export default new ImageService();
