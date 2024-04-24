import {Request, Response} from "express";
import AuthService from "../services/AuthService";
import IController from "@app/controllers/IController";

import Controller, {setAuthor} from "@/app/controllers/Controller";

export class AuthController extends Controller implements IController {
    mainService: AuthService = new AuthService();
    public prefix: string = "auth";

    async registerAuth(req: Request, res: Response) {
        return await this.safeRun(async () => {
            return await this.mainService.createAuth(req.body);
        }, res, 201, "Cuenta registrada exitosamente")
    }

    @setAuthor
    async updateAuthInfo(req: Request, res: Response) {
        return await this.safeRun(async () => {
            return await this.mainService.updateAuthInfo(req.params.id, req.body);
        }, res, 201, "Perfil Actualizado Correctamente")
    }

    async loginAuth(req: Request, res: Response) {
        return await this.safeRun(async () => await this.mainService.login(req.body, res, req),
            res, 200, "Sesión iniciada correctamente")
    }

    async verifyAuth(req: Request, res: Response) {
        return await this.safeRun(async () => {
            return await this.mainService.verifyAuth(req.body);
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

    async sendVerificationCode(req: any, res: Response) {
        return await this.safeRun(async () =>
                await this.mainService.sendVerificationCode(req.body.email),
            res, 200, "Correo de verificación enviado")
    }

    async unAuthorize(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.unAuthorizeUser(req.params.id),
            res, 201, "Código de desautorizado"
        )
    }

    async recoverPassword(req: any, res: Response) {
        return await this.safeRun(async () =>
                await this.mainService.recoverPassword(req.body, res),
            res, 200, "Código Verificado correctamente")

    }
}
