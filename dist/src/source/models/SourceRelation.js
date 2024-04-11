"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("@source/models/index");
const PaymentStatView_1 = __importDefault(require("@source/models/views/PaymentStatView"));
const LawyerPayment_1 = __importDefault(require("@source/models/LawyerPayment"));
class SourceRelation {
    static initRelation() {
        index_1.ClientView.initRelation();
        index_1.Loan.initRelations();
        index_1.ClientContact.initRelation();
        index_1.ContactView.initRelation();
        index_1.ClientContactView.initRelation();
        index_1.Payment.initRelation();
        PaymentStatView_1.default.initRelation();
        index_1.AmortizationView.initRelation();
        LawyerPayment_1.default.initRelation();
        index_1.UserView.initRelation();
        index_1.Expense.initRelation();
    }
}
exports.default = SourceRelation;
//# sourceMappingURL=SourceRelation.js.map