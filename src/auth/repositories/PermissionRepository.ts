import { BaseRepository } from "@app/repositories/BaseRepository";
import Permission from "../models/Permission";

export default class PermissionRepository extends BaseRepository<Permission> {
  constructor() {
    super(Permission);
  }
}
