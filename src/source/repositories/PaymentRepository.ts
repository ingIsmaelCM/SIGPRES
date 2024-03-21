import {BaseRepository} from "@/app/repositories/BaseRepository";
import {Payment} from "@source/models";

export default class PaymentRepository extends BaseRepository<Payment> {
    constructor() {
        super(Payment);
    }

}
