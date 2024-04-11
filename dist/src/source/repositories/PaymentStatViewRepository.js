"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@/app/repositories/BaseRepository");
const PaymentStatView_1 = __importDefault(require("@source/models/views/PaymentStatView"));
class PaymentStatViewRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(PaymentStatView_1.default);
    }
}
exports.default = PaymentStatViewRepository;
//# sourceMappingURL=PaymentStatViewRepository.js.map