import Controller from "@/app/controllers/Controller";
import IController from "@/app/controllers/IController";
import { Request, Response } from "express";
import WalletService from "../services/WalletService";

export default class WalletController
  extends Controller
  implements IController
{
  prefix: string = "wallets";
  mainService = new WalletService();
  async getWallets(req: Request, res: Response): Promise<any> {
    await this.safeRun(async () => {
     return await this.mainService.getWallets(req.query);
    }, res, 200, "Lista de billeteras");
  }
}
