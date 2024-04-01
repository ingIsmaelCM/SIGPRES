import {
    AmortizationView,
    ClientContact,
    ClientContactView,
    ClientView,
    ContactView,
    Document,
    Job,
    Loan,
    Mora,
    Payment,
    Social
} from "@source/models/index";
import Image from "@source/models/Image";
import {EDocumentable, EImageable} from "@app/interfaces/FileInterface";
import PaymentStatView from "@source/models/views/PaymentStatView";
import LawyerPayment from "@source/models/LawyerPayment";

/* TODO: Define relations for each Source Models */
export default class SourceRelation {
    static initRelation() {
        ClientView.initRelation();
        Loan.initRelations();
        ClientContact.initRelation();
        ContactView.initRelation();
        ClientContactView.initRelation();
        Payment.initRelation();
        PaymentStatView.initRelation();
        AmortizationView.initRelation();
        LawyerPayment.initRelation();
    }
}
