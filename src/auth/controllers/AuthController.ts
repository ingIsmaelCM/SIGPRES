import { NextFunction, Request, Response, Router } from "express";
import AuthService from "../services/AuthService";
import response from "@app/utils/response";
import IController from "@app/controllers/IController";
import path from "path";
import config from "@/app/app.config";
import AuthRoutes from "../routes/AuthRoutes";
import Controller from "@/app/controllers/Controller";

export class AuthController extends Controller implements IController {
  private authService: AuthService = new AuthService();
  public prefix: string = "auth";
  public router: Router = Router();
  constructor() {
    super();
    new AuthRoutes(this.router, this).initRoutes();
  }

  async registerAuth(req: Request, res: Response) {
    try {
      const newAuth = await this.authService.createAuth(req.body);
      response.success(res, 201, newAuth, "Cuenta creada exitosamente");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }

  async loginAuth(req: Request, res: Response) {
    try {
      const auth = await this.authService.login(req.body, res);
      response.success(res, 200, auth, "Sesión iniciada correctamente");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }
  async verifyAuth(req: Request, res: Response) {
    try {
      const authId = req.params.id;
      await this.authService.verifyAuth(Number(authId));
      response.success(res, 200, "Usuario verificado exitosamente");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }
  async refreshToken(req: Request, res: Response) {
    try {
      const auth = await this.authService.refreshToken(req, res);
      response.success(res, 200, auth, "Token actualizado con éxito");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }

  async logoutAuth(req: any, res: Response) {
    await this.authService.logout(res);
    response.success(res, 200, "Sesión cerrada exitosamente");
  }

  async logoutAllAuth(req: any, res: Response) {
    try {
      await this.authService.logoutAll(req, res);
      response.success(res, 200, "Se han cerrado todas las sesiones");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }

  async resetPassword(req: any, res: Response) {
    try {
      const updatedAuth = await this.authService.resetPassword(
        req.auth.id,
        req.body.password
      );
      await this.authService.logoutAll(req, res);
      response.success(res, 200, updatedAuth, "Contraseña actualizada");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }

  async sendRecoverLink(req: any, res: Response) {
    try {
      const context = await this.authService.sendRecoverLink(req.body.email);
      response.success(res, 200, context, "Correo de recuperación enviado");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }

  async renderRecoverForm(req: any, res: Response) {
    try {
      const recover = await this.authService.renderRecoverForm(
        req.params.token
      );
      res.sendFile(recover);
    } catch (error: any) {
      const errorConfirmation = path.join(
        config.app.views,
        "errorRecovering.html"
      );
      res.status(error.code).sendFile(errorConfirmation);
    }
  }

  async recoverPassword(req: any, res: Response) {
    try {
      const newData = req.body;
      await this.authService.recoverPassword(newData);
      response.success(res, 200, "Ha recuperado su contraseña exitosamente");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }
}
