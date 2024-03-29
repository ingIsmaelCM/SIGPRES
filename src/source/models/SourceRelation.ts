import {
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

/* TODO: Define relations for each Source Models */
export default class SourceRelation {
    static initRelation() {
        ClientView.initRelation();
        Loan.initRelations();
        ClientContact.initRelation();
        ContactView.initRelation();
        ClientContactView.initRelation();
    }
}
