import Auth from "../models/Auth";
import { AuthRepository } from "../repositories/AuthRepository";
import bcrypt from "bcrypt";
import AuthMailService from "@auth/services/AuthMailService";
import config from "@app/app.config";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { Response } from "express";
import tools from "@app/utils/tools";
import BaseConnection from "@app/db/BaseConnection";
import path from "path";
import { IAuth } from "@auth/utils/Interfaces";
import Permission from "../models/Permission";
import Role from "../models/Role";
import PreferenceRepository from "@/app/repositories/PrefenceRepository";
export default class AuthService {
  private authRepo: AuthRepository = new AuthRepository();
  private authMailService: AuthMailService = new AuthMailService();
  basePath: string = config.app.url;

  async createAuth(auth: IAuth) {
    BaseConnection.request == null;
    const trans: any = await BaseConnection.getTrans();
    try {
      const emailExists: any = await this.authRepo.find("email", auth.email);
      const usernameExists: any = await this.authRepo.find(
        "username",
        auth.username
      );
      if (emailExists || usernameExists) {
        throw {
          code: 422,
          message: "El correo ingresado ya está registrado",
        };
      }
      const hashedPWD = await bcrypt.hash(auth.password, 10);
      const newAuth: Auth = await this.authRepo.create(
        {
          ...auth,
          password: hashedPWD,
        },
        trans
      );

      await trans.commit();
      return newAuth;
    } catch (error: any) {
      await trans.rollback();
      throw { code: error.code, message: error.message };
    }
  }

  async login(auth: any, res: Response) {
    const trans = await BaseConnection.getTrans();
    try {
      let userAuth = await this.authRepo.find(
        config.auth.loginField,
        auth[config.auth.loginField],
        false,
        { include: "roles.permissions,permissions,tenants" }
      );
      if (
        userAuth &&
        (await this.validateAuthAccount(userAuth, auth.password))
      ) {
        if (!userAuth.tenants || userAuth.tenants.length == 0) {
          throw {
            code: 401,
            message: "El usuario no tiene una DB asociada",
          };
        }
        const updateData = { lastlogin: new Date(), status: 1 };
        await this.authRepo.update(updateData, userAuth.id, trans);
        const { token, refreshToken } = this.generateTokens(userAuth);
        this.setLoginCookies(res, refreshToken, token, userAuth);
        var {
          permissions,
          roles,
          company,
        }: { permissions: any[]; roles: any[]; company: any } =
          await this.setAuthFields(userAuth);
        await trans.commit();
        const result = {
          ...userAuth.dataValues,
          company: company,
          password: null,
          permissions: [...new Set(permissions)],
          roles,
        };
        return { userAuth: result, token };
      }
      throw {
        code: 401,
        message: "Credenciales incorrectas",
      };
    } catch (error: any) {
      await trans.rollback();
      throw { code: error.code, message: error.message };
    }
  }

  private setLoginCookies(
    res: Response<any, Record<string, any>>,
    refreshToken: String,
    token: String,
    userAuth: any
  ) {
    tools.setCookie(res, "refreshToken", `${refreshToken}`);
    tools.setCookie(res, "accessToken", `Bearer ${token}`);
    tools.setCookie(res, "tenant", userAuth.tenants[0].key);
    BaseConnection.request = { cookies: { tenant: userAuth.tenants[0].key } };
  }

  private async setAuthFields(userAuth: any) {
    let permissions: any[] = userAuth.permissions.map((p: Permission) => ({
      name: p.name,
      id: p.id,
    }));
    const rolePermissions: any[] = userAuth.roles.map((r: Role) =>
      r.permissions.map((p: Permission) => ({ name: p.name, id: p.id }))
    );
    rolePermissions.forEach((rP) => {
      permissions = permissions.concat(rP);
    });
    const roles = userAuth.roles.map((r: Role) => ({
      name: r.name,
      id: r.id,
    }));
    let company = await new PreferenceRepository().getAll({
      fields: "id,key,label,value",
      filter: ["key:eq:companyData"],
      limit: 1,
    });
    company = company.dataValues;
    return { permissions, roles, company };
  }

  async verifyAuth(authId: number) {
    const trans = await BaseConnection.getTrans();
    try {
      const auth = await this.authRepo.findById(authId);
      if (!auth) {
        throw {
          code: 404,
          message: "No existe este usuario",
        };
      }
      await this.authRepo.update({ verifiedAt: new Date() }, authId, trans);
      await trans.commit();
    } catch (error: any) {
      await trans.rollback();
      throw { code: error.code, message: error.message };
    }
  }

  public generateTokens(userAuth: any) {
    const token = tools.getToken(
      { ...userAuth.dataValues, roles: undefined, permissions: undefined },
      config.auth.expiresIn
    );
    const refreshToken = tools.getToken(
      { email: userAuth.email },
      7 * 24 * 60 * 60
    );
    return { token, refreshToken };
  }

  private async validateAuthAccount(auth: any, pwd: string): Promise<Boolean> {
    const isValidPassword = await bcrypt.compare(
      pwd,
      auth._previousDataValues.password
    );
    const isAccountVerified = auth.verifiedAt != null;
    if (!isAccountVerified)
      throw { code: 401, message: "Cuenta no verificada" };
    return isValidPassword;
  }

  public async logout(res: Response) {
    tools.setCookie(res, "accessToken", "null");
  }

  public async logoutAll(req: any, res: Response) {
    const trans = await BaseConnection.getTrans();
    try {
      await this.authRepo.update(
        {
          sessionId: uuidv4(),
        },
        req.auth.id,
        trans
      );
      tools.setCookie(res, "accessToken", "null");
      await trans.commit();
    } catch (error: any) {
      await trans.rollback();
      throw {
        code: 500,
        message: error.message,
      };
    }
  }

  public async resetPassword(
    authId: number,
    newPassword: string
  ): Promise<any> {
    const trans = await BaseConnection.getTrans();
    try {
      const hashedPWD = await bcrypt.hash(newPassword, 10);
      const updatedAuth = await this.authRepo.update(
        {
          password: hashedPWD,
        },
        authId,
        trans
      );
      await trans.commit();
      return updatedAuth;
    } catch (error: any) {
      await trans.rollback();
      throw {
        code: 500,
        message: error.message,
      };
    }
  }

  public async sendRecoverLink(authEmail: string): Promise<any> {
    try {
      const token = tools.getToken(
        {
          email: authEmail,
        },
        600
      );
      const context = {
        email: authEmail,
        recoverURL: `${this.basePath}/api/auth/password/recover/${token}`,
      };
      await this.authMailService.sendRecoverLink(context);

      return context;
    } catch (error: any) {
      throw {
        code: 500,
        message: error.message,
      };
    }
  }

  async renderRecoverForm(token: string) {
    try {
      const recover = path.join(config.app.views, "recoverPassword.html");
      jwt.verify(token, config.auth.secret, (err: any, decoded: any) => {
        if (err) {
          throw {
            code: 401,
            message: "El token ya no es válido",
          };
        }
      });
      return recover;
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }

  async recoverPassword(newData: any): Promise<any> {
    try {
      const decoded: any = jwt.verify(
        newData.token,
        config.auth.secret,
        (err: any, decoded: any) => {
          if (err) {
            throw {
              code: 401,
              message: "El token ya no es válido",
            };
          }
          return decoded;
        }
      );
      const auth = await this.authRepo.find("email", decoded.email);
      await this.resetPassword(auth.id, newData.password);
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }

  public async refreshToken(req: any, res: Response): Promise<any> {
    try {
      const freshToken = tools.getCookies(req)?.refreshToken || "none";
      const decoded: any = jwt.verify(
        freshToken,
        config.auth.secret,
        (err: any, decoded: any) => {
          if (err) {
            throw {
              code: 401,
              message: "Refresh token expirado o inválido",
            };
          }
          return decoded;
        }
      );
      let userAuth = await this.authRepo.find("email", decoded.email, false, {
        include: "role,user.institute,user.image",
      });
      const { token, refreshToken } = this.generateTokens(userAuth);
      tools.setCookie(res, "refreshToken", `${refreshToken}`);
      tools.setCookie(res, "accessToken", `Bearer ${token}`);
      return { userAuth, token };
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }
}
