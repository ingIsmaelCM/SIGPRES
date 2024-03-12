import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import DocumentService from "@file/services/DocumentService";

export default class DocumentController extends Controller implements IController {
    prefix: string = "";
    mainService = DocumentService;


    async findDocument(req: Request, res: Response) {
        await this.safeRun(async () =>
                await this.mainService.findDocument(Number(req.params.id), req.query),
            res, 200, "Detalles de la documentn");
    }

    async deleteDocument(req: Request, res: Response) {
        await this.safeRun(async () =>
                await this.mainService.deleteDocument(Number(req.params.id)),
            res, 200, "Documentn Eliminada")
    }

}