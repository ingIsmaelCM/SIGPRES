import Controller from "@/app/controllers/Controller";
import IController from "@/app/controllers/IController";
import response from "@/app/utils/response";
import { Request, Response } from "express";
import WalletService from "../services/WalletService";
import WalletRoutes from "../routes/WalletRoutes";

export default class WalletController
  extends Controller
  implements IController
{
  prefix: string = "wallets";
  walletService = new WalletService();
  constructor() {
    super();
    new WalletRoutes(this.router, this).initRoutes();
  }

  async getWallets(req: Request, res: Response): Promise<any> {
    await this.safeRun(async () => {
      const wallets = await this.walletService.getWallets(req.query);
      response.success(res, 200, wallets, "Lista de cuentas");
    }, res);
  }
}
