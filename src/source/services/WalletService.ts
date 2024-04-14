import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import WalletRepository from "@source/repositories/WalletRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IWallet} from "@app/interfaces/SourceInterfaces";
import PreferenceRepository from "@source/repositories/PrefenceRepository";
import RoleMiddleware from "@auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";
import permissionEnums from "@app/interfaces/PermissionEnums";

export default class WalletService extends Service {
    private mainRepo = new WalletRepository();
    private preferenceRepo = new PreferenceRepository();

    async getWallets(params: IParams, req: any) {
        const canCreateWallet = req.auth.permissions
            .some((permission: any) =>
                permission.name === permissionEnums.createWallet)
        let wallets = await this.mainRepo.getAll(params)
        if (!canCreateWallet) {
            wallets.rows = wallets.rows.filter((wallet: IWallet) =>
                !wallet.authId || wallet.authId === req.auth.id)
        }
        return wallets;
    }

    async findWallet(walletId: string, params: IParams) {
        return await this.mainRepo.findById(walletId, params)
    }

    async createWallet(data: IWallet & { sumBalance: boolean }): Promise<IWallet> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const newWallet = await this.mainRepo.create(data, trans);
                if (data.sumBalance) {
                    const preference = await this.preferenceRepo.find("key", "capitalCompany");
                    const balance = Number(preference.value)
                    await this.preferenceRepo.update({value: balance + data.balance}, preference.id, trans);
                }
                await trans.commit();
                return newWallet;
            },
            async () => await trans.rollback()
        )
    }

    async updateWallet(walletId: string, data: IWallet): Promise<IWallet> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const updatedWallet = await this.mainRepo.update(data, walletId, trans);
                await trans.commit();
                return updatedWallet;
            },
            async () => await trans.rollback()
        )
    }

    async addBalanceToWallet(walletId: string, data: Record<string, any>): Promise<IWallet> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const updatedWallet = await this.mainRepo.setBalance(data.newBalance, walletId, trans);
                if (data.sumBalance) {
                    const preference = await this.preferenceRepo.find("key", "capitalCompany");
                    const balance = Number(preference.value)
                    await this.preferenceRepo.update({value: balance + data.newBalance}, preference.id, trans);
                }
                await this.mainRepo.update({updatedBy: data.updatedBy}, walletId, trans);
                await trans.commit();
                return updatedWallet;
            },
            async () => await trans.rollback()
        )
    }


    async deleteWallet(walletId: string): Promise<IWallet> {
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

    async restoreWallet(walletId: string): Promise<IWallet> {
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