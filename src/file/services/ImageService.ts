import ImageRepository from "@file/repositories/ImageRepository";
import BaseConnection from "@app/db/BaseConnection";
import { IParams } from "@/app/utils/Interfaces";
import Image from "../models/Image";

export default class ImageService {
  imageRepo: ImageRepository = new ImageRepository();

  async createImages(images: Image[]): Promise<any> {
    const trans = await BaseConnection.getTrans();
    try {
      const newImages = await this.imageRepo.bulkCreate(images, trans);
      await trans.commit();
      return newImages;
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
      const image = await this.imageRepo.findById(imageId, params);
      return image;
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }

  async deleteImage(imageId: number): Promise<Image> {
    const trans = await BaseConnection.getTrans();
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
