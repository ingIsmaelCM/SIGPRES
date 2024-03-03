import { IParams } from "@/app/utils/AppInterfaces";
import ClientRepository from "../repositories/ClientRespository";
import { IClient } from "../utils/SourceInterfaces";
import TenantConnection from "@/app/db/TenantConnection";
import Service from "@/app/services/Service";

/*TODO deleteClient and restoreClient functions */
export default class ClientService extends Service {
  private clientRepo = new ClientRepository();

  async getClients(params: IParams): Promise<any> {
    return await this.safeRun(() => this.clientRepo.getAll(params));
  }
  async findClient(clientId: number, params: IParams): Promise<any> {
    return await this.safeRun(() => this.clientRepo.findById(clientId, params));
  }

  async createClient(client: IClient): Promise<any> {
    const trans = await TenantConnection.getTrans();
    return this.safeRun(
      async () => {
        const newClient = await this.clientRepo.create(client, trans);
        await trans.commit();
        return newClient;
      },
      async () => await trans.rollback()
    );
  }

  async updateClient(client: IClient, clientId: number): Promise<any> {
    const trans = await TenantConnection.getTrans();
    return this.safeRun(
      async () => {
        const updatedClient = await this.clientRepo.update(
          client,
          clientId,
          trans
        );
        await trans.commit();
        return updatedClient;
      },
      async () => await trans.rollback()
    );
  }
  async deleteClient(clientId: number): Promise<any> {
    const trans = await TenantConnection.getTrans();
    return this.safeRun(
      async () => {
        const deletedClient = await this.clientRepo.delete(clientId, trans);
        await trans.commit();
        return deletedClient;
      },
      async () => await trans.rollback()
    );
  }
}
