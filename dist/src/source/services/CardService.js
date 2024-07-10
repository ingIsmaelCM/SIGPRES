"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const CardRepository_1 = __importDefault(require("@source/repositories/CardRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class CardService extends Service_1.default {
    mainRepo = new CardRepository_1.default();
    async getCards(params) {
        return await this.mainRepo.getAll(params);
    }
    async findCard(cardId, params) {
        return await this.mainRepo.findById(cardId, params);
    }
    async createCard(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const storedReq = TenantConnection_1.default.requestNamespace.get('req');
            const tenant = storedReq.cookies.tenant;
            const token = jsonwebtoken_1.default.sign(data, tenant, { expiresIn: 60 * 60 * 1000 * 1000 });
            data.value = String(token);
            const newCard = await this.mainRepo.create(data, trans);
            await trans.commit();
            return newCard;
        }, async () => await trans.rollback());
    }
    async updateCard(cardId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async deleteCard(cardId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const deletedCard = await this.mainRepo.delete(cardId, trans);
            await trans.commit();
            return deletedCard;
        }, async () => await trans.rollback());
    }
    async restoreCard(cardId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const restoredCard = await this.mainRepo.restore(cardId, trans);
            await trans.commit();
            return restoredCard;
        }, async () => await trans.rollback());
    }
}
exports.default = CardService;
//# sourceMappingURL=CardService.js.map