import {IParams} from "@/app/utils/AppInterfaces";
import TenantRepository from "../repositories/TenantRepository";
import {Itenant} from "../utils/AuthInterfaces";
import BaseConnection from "@/app/db/BaseConnection";
import MigrateTenant from "@/app/db/migrations/tenants/MigrateTenant";
import Service from "@app/services/Service";

export default class TenantService extends  Service{
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
                    key: `sigpres_tenant_${newTenant.id}`,
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

    async updateTenant(tenantId: number, data: Itenant): Promise<any> {
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
}
