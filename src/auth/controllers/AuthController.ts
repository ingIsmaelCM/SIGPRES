import {Request, Response, Router} from "express";
import AuthService from "../services/AuthService";
import response from "@app/utils/response";
import IController from "@app/controllers/IController";
import path from "path";
import config from "@/app/app.config";
import AuthRoutes from "../routes/AuthRoutes";
import Controller from "@/app/controllers/Controller";

export class AuthController extends Controller implements IController {
    mainService: AuthService = new AuthService();
    public prefix: string = "auth";

    constructor() {
        super();
        new AuthRoutes(this.router, this).initRoutes();
    }

    async registerAuth(req: Request, res: Response) {
        return await this.safeRun(async () => {
            return await this.mainService.createAuth(req.body);
        }, res, 201, "Cuenta registrada exitosamente")
    }

    async loginAuth(req: Request, res: Response) {
        return await this.safeRun(async () => await this.mainService.login(req.body, res),
            res, 200, "Sesión iniciada correctamente")
    }

    async verifyAuth(req: Request, res: Response) {
        return await this.safeRun(async () => {
            const authId = req.params.id;
            return await this.mainService.verifyAuth(Number(authId));
        }, res, 200, "Usuario verificado exitosamente")
    }

    async refreshToken(req: Request, res: Response) {
        return await this.safeRun(async () =>
                await this.mainService.refreshToken(req, res),
            res, 200, "Token actualizado con éxito")
    }

    async logoutAuth(req: any, res: Response) {
        return await this.safeRun(async () =>
                await this.mainService.logout(res),
            res, 200, "Sesión cerrada exitosamente")
    }

    async logoutAllAuth(req: any, res: Response) {
        return await this.safeRun(async () =>
                await this.mainService.logoutAll(req, res),
            res, 200, "Se han cerrado todas las sesiones")
    }

    async resetPassword(req: any, res: Response) {

        return this.safeRun(async () => {
            const updatedAuth = await this.mainService.resetPassword(
                req.auth.id,
                req.body.password
            );
            return await this.mainService.logoutAll(req, res)
        }, res, 201, "Contraseña Actualizada")
    }

    async sendRecoverLink(req: any, res: Response) {
        return await this.safeRun(async () =>
                await this.mainService.sendRecoverLink(req.body.email),
            res, 200, "Correo de recuperación enviado")
    }


    async recoverPassword(req: any, res: Response) {
        return await this.safeRun(async()=> await this.mainService.recoverPassword(req.body),
            res, 200, "Su contraseña ha sido cambiada")

    }
}
