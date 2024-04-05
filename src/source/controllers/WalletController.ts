import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import WalletService from "@source/services/WalletService";

export default class WalletController extends Controller implements IController {
    prefix: string = 'wallets';
    mainService = new WalletService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getWallets(req.query, req),
            res, 200, "Listado de Billeteras"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findWallet(req.params.id, req.query),
            res, 200, "Detalles de la billetera"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createWallet(req.body),
            res, 201, "Billetera registrada"
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateWallet(req.params.id, req.body),
            res, 201, "Billetera Actualizada"
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteWallet(req.params.id),
            res, 200, "Billetera Eliminada"
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreWallet(req.params.id),
            res, 200, "Billetera Restaurada"
        )
    }
}