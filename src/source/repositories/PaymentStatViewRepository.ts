import {BaseRepository} from "@/app/repositories/BaseRepository";
import PaymentStatView from "@source/models/views/PaymentStatView";

export default class PaymentStatViewRepository extends BaseRepository<PaymentStatView> {
    constructor() {
        super(PaymentStatView);
    }

}
