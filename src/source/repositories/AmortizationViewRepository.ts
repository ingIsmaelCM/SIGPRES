import {BaseRepository} from "@/app/repositories/BaseRepository";
import {AmortizationView} from "@source/models";

export default class AmortizationViewRepository extends BaseRepository<AmortizationView> {
    constructor() {
        super(AmortizationView);
    }

}
