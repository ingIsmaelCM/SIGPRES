import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import CardService from "@source/services/CardService";

export default class CardController extends Controller implements IController {
    prefix: string = 'cards';
    mainService = new CardService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getCards(req.query),
            res, 200, "Listado de tarjetas"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findCard(req.params.id, req.query),
            res, 200, "Detalles de la tarjeta"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createCard(req.body),
            res, 201, "Tarjeta Registrada"
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateCard(req.params.id, req.body),
            res, 201, ""
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteCard(req.params.id),
            res, 200, "Tarjeta eliminada"
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreCard(req.params.id),
            res, 200, "Tarjeta restaurada"
        )
    }
}