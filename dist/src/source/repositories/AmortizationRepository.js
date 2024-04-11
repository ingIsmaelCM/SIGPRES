"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@/app/repositories/BaseRepository");
const models_1 = require("@source/models");
class AmortizationRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(models_1.Amortization);
    }
    async createFromLoan(data, loanId, clientId, trans) {
        data = data.map(amort => ({
            ...amort,
            loanId,
            clientId
        }));
        return super.bulkCreate(data, trans);
    }
}
exports.default = AmortizationRepository;
//# sourceMappingURL=AmortizationRepository.js.map