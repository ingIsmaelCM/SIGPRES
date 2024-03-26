import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import UserService from "@auth/services/UserService";

export default class UserController extends Controller implements IController {
    prefix: string = 'users';
    mainService = new UserService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getUsers(req.query),
            res, 200, "Lista de Usuarios"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findUser(Number(req.params.id), req.query),
            res, 200, "Detalles del Usuario"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createUser(req.body),
            res, 201, ""
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateUser(Number(req.params.id), req.body),
            res, 201, ""
        )
    }

    async sendVerifiction(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.sendVerificationCode(req.body.email),
            res, 201, "Código de Verificación Enviado"
        )
    }


    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteUser(Number(req.params.id)),
            res, 200, ""
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreUser(Number(req.params.id)),
            res, 200, ""
        )
    }
}