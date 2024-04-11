"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const WalletRepository_1 = __importDefault(require("@source/repositories/WalletRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const PrefenceRepository_1 = __importDefault(require("@source/repositories/PrefenceRepository"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
class WalletService extends Service_1.default {
    mainRepo = new WalletRepository_1.default();
    preferenceRepo = new PrefenceRepository_1.default();
    async getWallets(params, req) {
        const canCreateWallet = req.auth.permissions
            .some((permission) => permission.name === PermissionEnums_1.default.createWallet);
        let wallets = await this.mainRepo.getAll(params);
        if (!canCreateWallet) {
            wallets.rows = wallets.rows.filter((wallet) => !wallet.authId || wallet.authId === req.auth.id);
        }
        return wallets;
    }
    async findWallet(walletId, params) {
        return await this.mainRepo.findById(walletId, params);
    }
    async createWallet(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const newWallet = await this.mainRepo.create(data, trans);
            if (data.sumBalance) {
                const preference = await this.preferenceRepo.find("key", "capitalCompany");
                const balance = Number(preference.value);
                const upatedPref = await this.preferenceRepo.update({ value: balance + data.balance }, preference.id, trans);
            }
            await trans.commit();
            return newWallet;
        }, async () => await trans.rollback());
    }
    async updateWallet(walletId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const updatedWallet = await this.mainRepo.update(data, walletId, trans);
            await trans.commit();
            return updatedWallet;
        }, async () => await trans.rollback());
    }
    async deleteWallet(walletId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const walletToDelete = await this.findWallet(walletId, {});
            if (walletToDelete && walletToDelete.balance > 0) {
                return Promise.reject({
                    code: 500,
                    message: "No puede eliminar billetera con saldo"
                });
            }
            const deletedWallet = await this.mainRepo.delete(walletId, trans);
            await trans.commit();
            return deletedWallet;
        }, async () => await trans.rollback());
    }
    async restoreWallet(walletId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const restoredWallet = await this.mainRepo.restore(walletId, trans);
            await trans.commit();
            return restoredWallet;
        }, async () => await trans.rollback());
    }
}
exports.default = WalletService;
//# sourceMappingURL=WalletService.js.map