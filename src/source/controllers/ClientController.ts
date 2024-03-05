import Controller, { setAuthor } from "@/app/controllers/Controller";
import IController from "@/app/controllers/IController";
import ClientService from "../services/ClientService";
import response from "@/app/utils/response";
import ClientRoutes from "../routes/ClientRoutes";

export default class ClientController
  extends Controller
  implements IController
{
  prefix: string = "clients";
  private clientService = new ClientService();

  constructor() {
    super();
    new ClientRoutes(this.router, this).initRoutes();
  }

  async getClients(req: any, res: any) {
    await this.safeRun(async () => {
      const clients = await this.clientService.getClients(req.query);
      response.success(res, 200, clients, "Lista de clientes");
    }, res);
  }
  async findClient(req: any, res: any) {
    await this.safeRun(async () => {
      const clientId = req.params.id;
      const params = req.query;
      const client = await this.clientService.findClient(clientId, params);
      response.success(res, 200, client, "Detalles del Cliente");
    }, res);
  }

  @setAuthor
  async createClient(req: any, res: any) {
    await this.safeRun(async () => {
      const client = await this.clientService.createClient(req.body);
      response.success(res, 201, client, "Cliente Registrado");
    }, res);
  }

  @setAuthor
  async updateClient(req: any, res: any) {
   await  this.safeRun(async () => {
      const oldClient = req.body;
      const clientId = req.params.id;
      const client = await this.clientService.updateClient(oldClient, clientId);
      response.success(res, 201, client, "Cliente Actualizado");
    }, res);
  }

  async deleteClient(req: any, res: any) {
   await this.safeRun(async () => {
      const clientId = req.params.id;
      const client = await this.clientService.deleteClient(clientId);
      response.success(res, 201, client, "Cliente Eliminado");
    }, res);
  }
}
