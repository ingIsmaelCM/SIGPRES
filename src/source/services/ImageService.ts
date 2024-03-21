import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import ImageRepository from "@source/repositories/ImageRepository";
import TenantConnection from "@app/db/TenantConnection";
import {EImageable, IImage} from "@app/interfaces/FileInterface";

export default class ImageService extends Service {
    private mainRepo = new ImageRepository();

    async createSingleImage(data: IImage, relatedModel: EImageable, relatedId: number, upsert?: boolean) {
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
                } else {
                    newImage = await this.mainRepo.create(data, trans);
                }
                await trans.commit();
                return newImage;
            },
            async () => await trans.rollback()
        )
    }

    async createMultipleImages(data: IImage[], relatedModel: EImageable, relatedId: number) {
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

    async findImage(imageId: number, params: IParams) {
        return await this.mainRepo.findById(imageId, params)
    }

    async deleteImage(imageId: number): Promise<IImage> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreImage(imageId: number): Promise<IImage> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    private async checkOldImageExists(relatedModel: EImageable, relatedId: number) {
        return await this.mainRepo.getAll({
            filter: [
                `imageableType:eq:${relatedModel}:and`,
                `imageableId:eq:${relatedId}:and`,
            ],
            limit: 1
        })
    }


}