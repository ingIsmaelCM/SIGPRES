import BaseRequest from "@app/requests/BaseRequest";
import {ValidationChain, body, param} from "express-validator";
import tenant from "@auth/models/Tenant";

class TenantRequest extends BaseRequest {
    createTenantRequest(): Array<ValidationChain> {
        return [
            body("name", "Indique el nombre del Inquilino").exists().notEmpty(),
        ];
    }

    updateTenantRequest(): Array<ValidationChain> {
        return [
            body("name", "Indique el nombre del Inquilino").exists().notEmpty(),
        ];
    }

    assignTenantRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("authIds"),
            body("authIds", "Indique al menos un usuario")
                .isArray({min: 1, max: 100})
        ];
    }

    switchTenantRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("tenant"),
            body("tenant", "Este inquilino no es válido").custom((value: string, meta: any) => {
                const tenants = meta.req.auth.tenants;
                return !(!tenants || !tenants.some((tenant: any) => tenant.key === value));

            })

        ];
    }
}

export default new TenantRequest();
