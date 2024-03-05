import Role from "../models/Role";
import { BaseRepository } from "@app/repositories/BaseRepository";

export default class RoleRepository extends BaseRepository<Role> {
  constructor() {
    super(Role);
  }

  public async assingPermission(
    role: Role,
    permission: Array<number>
  ): Promise<any> {
    return this.safeRun(() => {
      return role.addPermissions(permission);
    });
  }
}
