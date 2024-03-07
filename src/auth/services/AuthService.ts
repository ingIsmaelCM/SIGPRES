import Auth from "../models/Auth";
import {AuthRepository} from "../repositories/AuthRepository";
import bcrypt from "bcrypt";
import AuthMailService from "@auth/services/AuthMailService";
import config from "@app/app.config";
import jwt from "jsonwebtoken";
import {v4 as uuidv4} from "uuid";
import {Response} from "express";
import tools from "@app/utils/tools";
import BaseConnection from "@app/db/BaseConnection";
import {IAuth} from "@/auth/utils/AuthInterfaces";
import Permission from "../models/Permission";
import Role from "../models/Role";
import Service from "@app/services/Service";

export default class AuthService extends  Service{
    private authRepo: AuthRepository = new AuthRepository();
    private authMailService: AuthMailService = new AuthMailService();


    async createAuth(auth: IAuth): Promise<Auth> {
        const trans: any = await BaseConnection.getTrans();
        try {
            const emailExists: any = await this.authRepo.find("email", auth.email);
            const usernameExists: any = await this.authRepo.find(
                "username",
                auth.username
            );
            if (emailExists || usernameExists) {
               await Promise.reject({
                   code: 422,
                   message: "The provided email or username is already in use.",
               })
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
            throw {code: error.code, message: error.message};
        }
    }


    async login(auth: any, res: Response) {
        const trans = await BaseConnection.getTrans();
        try {
            let userAuth = await this.authRepo.find(
                config.auth.loginField,
                auth[config.auth.loginField],
                false,
                {include: "roles.permissions,permissions,tenants"}
            );
            if (
                userAuth &&
                (await this.validateAuthAccount(userAuth, auth.password))
            ) {
                if (!userAuth.tenants || userAuth.tenants.length == 0) {
                    await Promise.reject ({
                        code: 401,
                            message: "The user does not have a DB associated with them",
                    });
                }
                const updateData = {lastlogin: new Date(), status: 1};
                await this.authRepo.update(updateData, userAuth.id, trans);
                const {token, refreshToken} = this.generateTokens(userAuth);
                this.setLoginCookies(res, refreshToken, token, userAuth);
                let {permissions, roles}: { permissions: any[]; roles: any[] } =
                    await this.setAuthFields(userAuth);
                await trans.commit();
                const result = {
                    ...userAuth.dataValues,
                    password: null,
                    permissions: [...new Set(permissions)],
                    roles,
                };
                return {userAuth: result, token};
            }
            await Promise.reject ({
                code: 401,
                message: "Invalid credentials",
            });
        } catch (error: any) {
            await trans.rollback();
            throw {code: error.code, message: error.message};
        }
    }

    private setLoginCookies(
        res: Response,
        refreshToken: String,
        token: String,
        userAuth: any
    ) {
        tools.setCookie(res, "refreshToken", `${refreshToken}`);
        tools.setCookie(res, "accessToken", `Bearer ${token}`);
        tools.setCookie(res, "tenant", userAuth.tenants[0].key);
    }


    private async setAuthFields(userAuth: any) {
        let permissions: any[] = userAuth.permissions.map((p: Permission) => ({
            name: p.name,
            id: p.id,
        }));
        const rolePermissions: any[] = userAuth.roles.map((r: Role) =>
            r.permissions.map((p: Permission) => ({name: p.name, id: p.id}))
        );
        rolePermissions.forEach((rP) => {
            permissions = permissions.concat(rP);
        });
        const roles = userAuth.roles.map((r: Role) => ({
            name: r.name,
            id: r.id,
        }));

        return {permissions, roles};
    }


    async verifyAuth(authId: number) {
        const trans = await BaseConnection.getTrans();
        try {
            const auth = await this.authRepo.findById(authId);
            if (!auth) {
                await Promise.reject ({
                    code: 404,
                    message: "No existe este usuario",
                });
            }
            await this.authRepo.update({verifiedAt: new Date()}, authId, trans);
            await trans.commit();
        } catch (error: any) {
            await trans.rollback();
            throw {code: error.code, message: error.message};
        }
    }


    public generateTokens(userAuth: any) {
        const token = tools.getToken(
            {...userAuth.dataValues, roles: undefined, permissions: undefined},
            config.auth.expiresIn
        );
        const refreshToken = tools.getToken(
            {email: userAuth.email},
            7 * 24 * 60 * 60
        );
        return {token, refreshToken};
    }


    private async validateAuthAccount(auth: any, pwd: string): Promise<Boolean> {
        const isValidPassword = await bcrypt.compare(
            pwd,
            auth["_previousDataValues"].password
        );
        const isAccountVerified = auth.verifiedAt != null;
        if (!isAccountVerified)
            throw {code: 401, message: "Cuenta no verificada"};
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
            const numbers=[]
            for (let i=0; i<2; i++){
                const num=Math.floor(Math.random() * 999)
                numbers.push(String(num).padStart(3, "0"))
            }
            const auth=await this.authRepo.find("email",authEmail);
            await auth.update({sessionId: numbers.join("")})
            const context = {
                email: authEmail,
                firstPart: numbers[0],
                secondPart: numbers[1],
            };

            await this.authMailService.sendRecoverLink(context);
            return "Código enviado exitosamente";
        } catch (error: any) {
            throw {
                code: 500,
                message: error.message,
            };
        }
    }



    async recoverPassword(data: any): Promise<any> {
     return this.safeRun(async()=>{
         const auth = await this.authRepo.find("email", data.email);
         if(auth.sessionId!=data.code){
             return Promise.reject({
                 code: 422,
                 message: "El código ingresado no es válido"
             })
         }
         await auth.update({sessionId: null})
         const password= this.generatePassword();
        await this.resetPassword(auth.id, password);
        return password;
     })
    }

    private generatePassword() {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyz@#$&()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 16;
        let password = "";
        for (let i = 0; i <= passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        return password;
    }

    public async refreshToken(req: any, res: Response): Promise<any> {
        try {
            const freshToken = tools.getCookies(req)?.refreshToken || "none";
            const decoded: any = await  new Promise((resolve: Function, reject: Function)=>{
                jwt.verify(
                    freshToken,
                    config.auth.secret,
                    (err: any, decoded: any) => {
                        if (err) {
                            reject({
                                code: 401,
                                message: "Refresh token expirado o inválido",
                            })
                        }
                        resolve(decoded);
                    }
                )
            });
            let userAuth = await this.authRepo.find("email", decoded.email, false, {
                include: "role,user.institute,user.image",
            });
            const {token, refreshToken} = this.generateTokens(userAuth);
            tools.setCookie(res, "refreshToken", `${refreshToken}`);
            tools.setCookie(res, "accessToken", `Bearer ${token}`);
            return {userAuth, token};
        } catch (error: any) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
}
