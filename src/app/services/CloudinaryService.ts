import Service from "@app/services/Service";
import cloudinary from "cloudinary";
import appConfig from "@app/app.config";
import AppService from "@app/services/AppService";
import fs from "fs";
import logger from "@/logger";

interface FileCloudOptions {
    api_key: string;
    signature: string;
    timestamp: string
}
export default class CloudinaryService extends Service {
    private static instance: CloudinaryService | null;
    public cloud: any = null;

    private constructor() {
        super();
        cloudinary.v2.config({
            cloud_name: appConfig.cloudinary.cloud_name,
            api_key: appConfig.cloudinary.api_key,
            api_secret: appConfig.cloudinary.api_secret,
            secure: true
        })
        this.cloud=cloudinary.v2;
        CloudinaryService.instance = this;
    }

    static getInstance(): CloudinaryService {
        if (!this.instance) {
            new CloudinaryService();
        }
        return this.instance!;
    }

    async uploadFilesToCloudinary<T>(files: any[]) {
        try {
            const results: T[] = [];
            for (const file of files) {
                const res = await this.cloud.uploader.upload(file.path, {
                    upload_preset: appConfig.cloudinary.upload_preset,
                    eager: [
                        {width: 400, height: 300, crop: "fill"}
                    ],

                })
                results.push({
                    path: res.url,
                    size: (res.bytes * 0.000001).toFixed(2),
                    publicId: res.public_id,
                    caption: res.original_filename,
                    title: res.original_filename,

                } as T);

                fs.unlink(file.path, (err) => {
                    logger.error(err);
                })
            }
            return results;
        }catch (error:any){
            return Promise.reject({
                code: 500,
                message: error.message
            })
        }

    }

    async destroyFileFromCloudinary(publicId: string){
        try {
            return await this.cloud.uploader
                .destroy(publicId, {

                });
        }catch (error:any){
            return Promise.reject({
                code: 500,
                message: error.message
            })
        }
    }
}