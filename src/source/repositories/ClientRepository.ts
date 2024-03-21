import { BaseRepository } from "@/app/repositories/BaseRepository";
import Client from "@source/models/Client";

export default class ClientRepository extends BaseRepository<Client> {
  constructor() {
    super(Client);
  }
}
