import { v2 as cloudinary } from "cloudinary";
import config from "@app/app.config";
import BaseConnection from "../db/BaseConnection";

export default class AppService {
  public async getCloudSignature(publicId: number | string): Promise<any> {
    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      cloudinary.config(config.cloudinary);
      const params = {
        eager: "w_400,h_300,c_fill",
        public_id: publicId,
        timestamp: timestamp,
        upload_preset: "oucbxfou",
      };
      const signature = cloudinary.utils.api_sign_request(
        params,
        cloudinary.config().api_secret!
      );

      const result = {
        signature: signature,
        timestamp: timestamp,
        api_key: config.cloudinary.api_key,
      };
      return result;
    } catch (error: any) {
      throw {
        code: 500,
        message: error.message,
      };
    }
  }
}
