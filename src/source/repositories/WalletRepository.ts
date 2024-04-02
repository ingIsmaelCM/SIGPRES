import {BaseRepository} from "@/app/repositories/BaseRepository";
import {Wallet} from "@source/models";
import {Transaction} from "sequelize";

export default class WalletRepository extends BaseRepository<Wallet> {
    constructor() {
        super(Wallet);
    }

    async setBalance(newValue: number, walletId: string, trans: Transaction) {
        const wallet = await super.findById(walletId);
        if (!wallet) {
            return Promise.reject({
                code: 404,
                message: "La billetera indicada no se encontró"
            })
        }
        const newBalance = wallet.balance + newValue;
        if (newBalance < 0) {
            return Promise.reject({
                code: 422,
                message: "Balance insuficiente en la billetera"
            })
        }
        return await super.update({balance: newBalance}, walletId, trans);

    }
}
