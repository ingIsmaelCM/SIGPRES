import {
    AmortizationView, Card,
    ClientContact,
    ClientContactView,
    ClientView,
    ContactView,
    Document, Expense,
    Job,
    Loan,
    Mora,
    Payment,
    Social, UserView
} from "@source/models/index";
import Image from "@source/models/Image";
import {EDocumentable, EImageable} from "@app/interfaces/FileInterface";
import PaymentStatView from "@source/models/views/PaymentStatView";
import LawyerPayment from "@source/models/LawyerPayment";
import {Sequelize} from "sequelize";

/* TODO: Define relations for each Source Models */
export default class SourceRelation {
    static initRelation(sequelize: Sequelize) {
        ClientView.initRelation(sequelize);
        Loan.initRelations(sequelize);
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
    }
}
