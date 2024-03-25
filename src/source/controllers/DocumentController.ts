import Controller from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import DocumentService from "@source/services/DocumentService";

export default class DocumentController extends Controller implements IController {
    prefix: string = 'documents';
    mainService = new DocumentService()

    async index(req: Request, res: Response) {
        await this.safeRun(async () =>
                this.mainService.getDocuments(req.query)
            , res, 200, "Listado de Documentos")
    }

    async show(req: any, res: any) {
        await this.safeRun(async () =>
                await this.mainService.findDocument(Number(req.params.id), req.query),
            res, 200, "Detalles del documento");
    }

    async delete(req: any, res: any) {
        await this.safeRun(async () =>
                await this.mainService.deleteDocument(Number(req.params.id)),
            res, 200, "Documento Eliminada");
    }

    async restore(req: any, res: any) {
        await this.safeRun(async () =>
                await this.mainService.deleteDocument(Number(req.params.id)),
            res, 200, "Documento Eliminada");
    }
}