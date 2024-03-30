import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import WalletRepository from "@source/repositories/WalletRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IWallet} from "@app/interfaces/SourceInterfaces";
import PreferenceRepository from "@source/repositories/PrefenceRepository";

export default class WalletService extends Service {
    private mainRepo = new WalletRepository();
    private preferenceRepo = new PreferenceRepository();

    async getWallets(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findWallet(walletId: number, params: IParams) {
        return await this.mainRepo.findById(walletId, params)
    }

    async createWallet(data: IWallet & {sumBalance: boolean}): Promise<IWallet> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const newWallet = await this.mainRepo.create(data, trans);
                if(data.sumBalance){
                    const preference=await this.preferenceRepo.find("key","capitalCompany");
                    const balance=Number(preference.value)
                    const upatedPref=await this.preferenceRepo.update({value: balance+data.balance}, preference.id, trans);
                }
                await trans.commit();
               return newWallet;
            },
            async () => await trans.rollback()
        )
    }

    async updateWallet(walletId: number, data: IWallet ): Promise<IWallet> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const updatedWallet = await this.mainRepo.update(data, walletId, trans);
                await trans.commit();
                return updatedWallet;
            },
            async () => await trans.rollback()
        )
    }


    async deleteWallet(walletId: number): Promise<IWallet> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const walletToDelete = await this.findWallet(walletId, {});
                if (walletToDelete && walletToDelete.balance > 0) {
                    return Promise.reject({
                        code: 500,
                        message: "No puede eliminar billetera con saldo"
                    })
                }

                const deletedWallet = await this.mainRepo.delete(walletId, trans);
                await trans.commit();
                return deletedWallet;
            },
            async () => await trans.rollback()
        )
    }

    async restoreWallet(walletId: number): Promise<IWallet> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const restoredWallet = await this.mainRepo.restore(walletId, trans);
                await trans.commit();
                return restoredWallet;
            },
            async () => await trans.rollback()
        )
    }


}