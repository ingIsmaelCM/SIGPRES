"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@/app/repositories/BaseRepository");
const models_1 = require("@source/models");
class WalletRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(models_1.Wallet);
    }
    async setBalance(newValue, walletId, trans) {
        return this.safeRun(async () => {
            const wallet = await super.findById(walletId);
            if (!wallet) {
                return Promise.reject({
                    code: 404,
                    message: "La billetera indicada no se encontró"
                });
            }
            const newBalance = Number(wallet.balance) + Number(newValue);
            if (newBalance < 0) {
                return Promise.reject({
                    code: 422,
                    message: "Balance insuficiente en la billetera"
                });
            }
            return await super.update({ balance: newBalance }, walletId, trans);
        });
    }
}
exports.default = WalletRepository;
//# sourceMappingURL=WalletRepository.js.map