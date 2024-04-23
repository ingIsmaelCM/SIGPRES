"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("@source/models/index");
const PaymentStatView_1 = __importDefault(require("@source/models/views/PaymentStatView"));
const LawyerPayment_1 = __importDefault(require("@source/models/LawyerPayment"));
class SourceRelation {
    static initRelation(sequelize) {
        index_1.ClientView.initRelation(sequelize);
        index_1.Loan.initRelations(sequelize);
        index_1.ClientContact.initRelation(sequelize);
        index_1.ContactView.initRelation(sequelize);
        index_1.ClientContactView.initRelation(sequelize);
        index_1.Payment.initRelation(sequelize);
        PaymentStatView_1.default.initRelation(sequelize);
        index_1.AmortizationView.initRelation(sequelize);
        LawyerPayment_1.default.initRelation(sequelize);
        index_1.UserView.initRelation(sequelize);
        index_1.Expense.initRelation(sequelize);
        index_1.Card.initRelation(sequelize);
    }
}
exports.default = SourceRelation;
//# sourceMappingURL=SourceRelation.js.map