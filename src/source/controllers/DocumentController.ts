import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import DocumentService from "@source/services/DocumentService";

export default class DocumentController extends Controller implements IController {
    prefix: string = 'documents';
    mainService = new DocumentService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getDocuments(req.query),
            res, 200, ""
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findDocument(Number(req.params.id), req.query),
            res, 200, ""
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createDocument(req.body),
            res, 201, ""
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateDocument(Number(req.params.id), req.body),
            res, 201, ""
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteDocument(Number(req.params.id)),
            res, 200, ""
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreDocument(Number(req.params.id)),
            res, 200, ""
        )
    }
}