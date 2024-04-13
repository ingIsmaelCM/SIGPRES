import {Response} from "express";
import TenantConnection from "@app/db/TenantConnection";

export default {
    success(res: Response, status: number, body: any, title?: string): void {
        status = isNaN(Number(status)) ? 200 : Number(status);
        res.status(status).json({
            statusCode: status,
            title: title,
            content: body,
        });
    },

    error(res: Response, status: number, error: any, title?: string): void {
        status = isNaN(Number(status)) ? 500 : Number(status);
        res.status(status || 500).json({
            title: title,
            statusCode: status || 500,
            content: error,
        });
    },
};
