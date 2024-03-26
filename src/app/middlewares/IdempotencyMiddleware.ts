import {NextFunction, Request, Response} from "express";
import bcrypt from "bcrypt";
import response from "@app/utils/response";

export default class IdempotencyMiddleware {
    private static contentHashed: Record<string, string> = {};

    /**
     * Validate current request, in order to prevent duplicate requests
     * @param req
     * @param res
     * @param next
     */
    static async idempotent(req: Request, res: Response, next: NextFunction) {
        const bodyString = JSON.stringify(req.body);
        const prevContent = IdempotencyMiddleware.contentHashed[req.cookies['tenant']];
        IdempotencyMiddleware.contentHashed[req.cookies['tenant']] = await bcrypt.hash(bodyString, 10);
        if (await IdempotencyMiddleware.isRunning(bodyString, prevContent)) {
            return response.success(res, 200, "Por favor, espere mientras su petición se procesa", "Procesando")
        }
        IdempotencyMiddleware.resetIdempotent(req.cookies["tenant"])
        next();
    }

    /**
     * Checks if current request is running according hashed body and stored on contentHashed object
     * @param bodyString
     * @param prevContent
     * @private
     */
    private static async isRunning(bodyString: string, prevContent: string = "none"): Promise<boolean> {
        return await bcrypt.compare(bodyString, prevContent)

    }

    /**
     * Deletes content from contentHashed object according given key after 3 seconds
     * @param key
     * @private
     */
    private static resetIdempotent(key: string) {
        setTimeout(() => {
            delete IdempotencyMiddleware.contentHashed[key]
        }, 3000)
    }
}
