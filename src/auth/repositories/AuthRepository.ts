import Auth from "@auth/models/Auth";
import {BaseRepository} from "@app/repositories/BaseRepository";
import ModelPermission from "@auth/models/ModelPermission";
import {Transaction} from "sequelize";

export class AuthRepository extends BaseRepository<Auth> {
    constructor() {
        super(Auth);
    }

    public async assignRole(auth: Auth, role: Array<string>): Promise<any> {
        return this.safeRun(() => {
            return auth.addRoles(role);
        });
    }

    public async assignPermission(
        auth: Auth,
        permissions: Array<string>,
        trans: Transaction
    ): Promise<any> {
        return this.safeRun(async () => {
            await auth.setPermissions([])
            await auth.setPermissions(permissions)
        });
    }
}
