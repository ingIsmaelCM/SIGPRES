import Service from "@/app/services/Service";
import { IParams } from "@/app/utils/AppInterfaces";
import WalletRepository from "../repositories/WalletRepository";

export default class WalletService extends Service {
  protected walletRepo = new WalletRepository();
  async getWallets(params: IParams): Promise<any> {
    return await this.safeRun(() => this.walletRepo.getAll(params));
  }
}
