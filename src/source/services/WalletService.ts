import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import WalletRepository from "@source/repositories/WalletRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IWallet} from "@app/interfaces/SourceInterfaces";

export default class WalletService extends Service {
    private mainRepo = new WalletRepository();

    async getWallets(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findWallet(walletId: number, params: IParams) {
        return await this.mainRepo.findById(walletId, params)
    }

    async createWallet(data: IWallet): Promise<IWallet> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async updateWallet(walletId: number, data: IWallet): Promise<IWallet> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteWallet(walletId: number): Promise<IWallet> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreWallet(walletId: number): Promise<IWallet> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}