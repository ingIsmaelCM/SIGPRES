import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import LawyerService from "@source/services/LawyerService";

export default class LawyerController extends Controller implements IController {
    prefix: string = 'lawyers';
    mainService = new LawyerService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getLawyers(req.query),
            res, 200, "Listado de abogados"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findLawyer(req.params.id, req.query),
            res, 200, "Detalles del abogado"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createLawyer(req.body),
            res, 201, "Abogado registrado"
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateLawyer(req.params.id, req.body),
            res, 201, "Abogado actualizado"
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteLawyer(req.params.id),
            res, 200, "Abogado eliminado"
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreLawyer(req.params.id),
            res, 200, "Abogado restaurado"
        )
    }
}