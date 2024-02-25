import { BaseRepository } from "@/app/repositories/BaseRepository";
import Tenant from "../models/Tenant";

export default class TenantRepository extends BaseRepository<Tenant> {
  constructor() {
    super(Tenant);
  }
}
