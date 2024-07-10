import Role from "../models/Role";
import { BaseRepository } from "@app/repositories/BaseRepository";

export default class RoleRepository extends BaseRepository<Role> {
  constructor() {
    super(Role);
  }

  public async assignPermission(
    role: Role,
    permission: Array<string>
  ): Promise<any> {
    return this.safeRun(() => {
      return role.addPermissions(permission);
    });
  }
}
