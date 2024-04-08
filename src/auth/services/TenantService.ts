import {IParams} from "@app/interfaces/AppInterfaces";
import TenantRepository from "../repositories/TenantRepository";
import {Itenant} from "@app/interfaces/AuthInterfaces";
import BaseConnection from "@/app/db/BaseConnection";
import MigrateTenant from "@/app/db/migrations/tenants/MigrateTenant";
import Service from "@app/services/Service";
import Tenant from "@auth/models/Tenant";
import {request} from "express";
import tools from "@app/utils/tools";
import TenantConnection from "@app/db/TenantConnection";

export default class TenantService extends Service {
    tenantRepo = new TenantRepository();

    async getTenants(param: IParams): Promise<any> {
        try {
            return await this.tenantRepo.getAll(param);
        } catch (error: any) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    async createTenant(data: Itenant): Promise<any> {
        const trans = await BaseConnection.getTrans();
        try {
            data.key = new Date().getTime().toString();
            const newTenant = await this.tenantRepo.create(data, trans);
            const updated = await this.tenantRepo.update(
                {
                    ...newTenant,
                    key: `sigpres_tenant_${newTenant.key}`,
                },
                newTenant.id,
                trans
            );
            await new MigrateTenant(updated.key).createDatabase();
            await trans.commit();
            return updated;
        } catch (error: any) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    async updateTenant(tenantId: string, data: Itenant): Promise<any> {
        const trans = await BaseConnection.getTrans();
        try {
            const updatedTenant = await this.tenantRepo.update(data, tenantId, trans);
            await trans.commit();
            return updatedTenant;
        } catch (error: any) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    async assignTenantToUser(tenantId: string, data: Record<string, any>): Promise<any> {
        const trans = await BaseConnection.getTrans();
        try {
            const tenant: Tenant = await this.tenantRepo.findById(tenantId);
            if (!tenant) {
                return Promise.reject({
                    code: 404,
                    message: "No se encontró el inquilino"
                })
            }
            await tenant.setAuths(data.authIds, {transaction: trans});
            await trans.commit();
            return "Inquilinos asignados";
        } catch (error: any) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    async switchTenant(tenantKey: string, res: any): Promise<any> {
        return this.safeRun(async()=>{
            request.headers["tenant"]=tenantKey;
            tools.setCookie(res, "tenant", tenantKey);
            TenantConnection.initModels(TenantConnection.getConnection());
            return "Realizdo con éxito"
        })
    }
}
