import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import ImageRepository from "@source/repositories/ImageRepository";
import TenantConnection from "@app/db/TenantConnection";
import {EImageable, IImage} from "@app/interfaces/FileInterface";
import tools from "@app/utils/tools";
import CloudinaryService from "@app/services/CloudinaryService";

export default class ImageService extends Service {
    private mainRepo = new ImageRepository();


    async getImages(params: IParams): Promise<any> {
        return this.safeRun(async () =>
            this.mainRepo.getAll(params))
    }


    async uploadImageButNotSave(file: any){
        return this.safeRun(async()=>{
            const res = await CloudinaryService.getInstance().uploadFilesToCloudinary<IImage>(file);
            return res[0]
        })
    }

    async createSingleImage(data: IImage, relatedModel: EImageable, relatedId: string, upsert?: boolean) {
        const trans = await TenantConnection.getTrans();
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
                    await  CloudinaryService.getInstance().destroyFileFromCloudinary(oldImage.publicId)
                } else {
                    newImage = await this.mainRepo.create(data, trans);
                }
                await trans.commit();
                return newImage;
            },
            async () => await trans.rollback()
        )
    }

    async createMultipleImages(data: IImage[], relatedModel: EImageable, relatedId: string) {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                data = data.map((image: IImage) => ({
                    ...image,
                    imageableType: relatedModel,
                    imageableId: relatedId
                }))
                const newImage = await this.mainRepo.bulkCreate(data, trans);
                await trans.commit();
                return newImage;
            },
            async () => await trans.rollback()
        )
    }

    async findImage(imageId: string, params: IParams) {
        return await this.mainRepo.findById(imageId, params)
    }

    async deleteImage(imageId: string): Promise<IImage> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const image = await this.mainRepo.findById(imageId);
                if (image) {
                    await CloudinaryService.getInstance().destroyFileFromCloudinary(image.publicId);
                }
                const deletedImage = await this.mainRepo.delete(imageId, trans)
                await trans.commit();
                return deletedImage;
            },
            async () => await trans.rollback()
        )
    }



    async restoreImage(imageId: string): Promise<IImage> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    private async checkOldImageExists(relatedModel: EImageable, relatedId: string) {
        return await this.mainRepo.getAll({
            filter: [
                `imageableType:eq:${relatedModel}:and`,
                `imageableId:eq:${relatedId}:and`,
            ],
            limit: 1
        })
    }


}