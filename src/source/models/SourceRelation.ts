import {
    AmortizationView,
    Card,
    ClientContact,
    ClientContactView,
    ClientView,
    ContactView,
    Expense, Guarantee,
    Loan, LoanView,
    Payment,
    UserView
} from "@source/models/index";
import PaymentStatView from "@source/models/views/PaymentStatView";
import LawyerPayment from "@source/models/LawyerPayment";
import {Sequelize} from "sequelize";

/* TODO: Define relations for each Source Models */
export default class SourceRelation {
    static initRelation(sequelize: Sequelize) {
        ClientView.initRelation(sequelize);
        Loan.initRelations(sequelize);
        LoanView.initRelation(sequelize);
        ClientContact.initRelation(sequelize);
        ContactView.initRelation(sequelize);
        ClientContactView.initRelation(sequelize);
        Payment.initRelation(sequelize);
        PaymentStatView.initRelation(sequelize);
        AmortizationView.initRelation(sequelize);
        LawyerPayment.initRelation(sequelize);
        UserView.initRelation(sequelize);
        Expense.initRelation(sequelize);
        Card.initRelation(sequelize);
        Guarantee.initRelation(sequelize);
    }
}
