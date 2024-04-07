import Controller, {setAuthor} from "@app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@app/controllers/IController";
import UserService from "@source/services/UserService";

export default class UserController extends Controller implements IController {
    prefix: string = 'users';
    mainService = new UserService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getUsers(req.query),
            res, 200, "Lista de Usuarios"
        )
    }

    async indexAuthUsers(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getAuthUsers(req.query),
            res, 200, "Lista de Usuarios Autenticables"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findUser(req.params.id, req.query),
            res, 200, "Detalles del Usuario"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createUser(req.body),
            res, 201, "Usuario Registrado"
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateUser( req.body),
            res, 201, "Usuario actualizado"
        )
    }

    async sendVerification(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.sendVerificationCode(req.body.email),
            res, 201, "Código de Verificación Enviado"
        )
    }



    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteUser(req.params.id),
            res, 200, "Usuario Eliminado"
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreUser(req.params.id),
            res, 200, "Usuario Restaurado"
        )
    }
}