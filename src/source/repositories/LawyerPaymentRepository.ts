import {BaseRepository} from "@/app/repositories/BaseRepository";
import {LawyerPayment} from "@source/models";

export default class LawyerPaymentRepository extends BaseRepository<LawyerPayment> {
    constructor() {
        super(LawyerPayment);
    }

}
