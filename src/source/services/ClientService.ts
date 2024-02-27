import { IParams } from "@/app/utils/AppInterfaces";
import ClientRepository from "../repositories/ClientRespository";
import { IClient } from "../utils/SourceInterfaces";
import BaseConnection from "@/app/db/BaseConnection";

/*TODO deleteClient and restoreClient functions */
export default class ClientService {
  private clientRepo = new ClientRepository();

  async getClients(params: IParams): Promise<any> {
    try {
      const clients = await this.clientRepo.getAll(params);
      return clients;
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }
  async findClient(clientId: number, params: IParams): Promise<any> {
    try {
      const client = await this.clientRepo.findById(clientId, params);
      return client;
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }

  async createClient(client: IClient): Promise<any> {
    const trans = await BaseConnection.getTrans();
    try {
      const newClient = await this.clientRepo.create(client, trans);
      await trans.commit();
      return newClient;
    } catch (error: any) {
      await trans.rollback();
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }

  async updateClient(client: IClient, clientId: number): Promise<any> {
    const trans = await BaseConnection.getTrans();
    try {
      const updatedClient = await this.clientRepo.update(
        client,
        clientId,
        trans
      );
      await trans.commit();
      return updatedClient;
    } catch (error: any) {
      await trans.rollback();
      console.log(error);
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }
}
