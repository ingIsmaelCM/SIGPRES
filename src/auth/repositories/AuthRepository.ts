import Auth from "@auth/models/Auth";
import { BaseRepository } from "@app/repositories/BaseRepository";

export class AuthRepository extends BaseRepository<Auth> {
  constructor() {
    super(Auth);
  }

  public async assingRole(auth: Auth, role: Array<string>): Promise<any> {
    return this.safeRun(() => {
      return auth.addRoles(role);
    });
  }

  public async assingPermission(
    auth: Auth,
    permission: Array<string>
  ): Promise<any> {
    return this.safeRun(() => {
      return auth.addPermission(permission);
    });
  }
}
