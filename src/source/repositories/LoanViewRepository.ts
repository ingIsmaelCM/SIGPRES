import {BaseRepository} from "@/app/repositories/BaseRepository";
import {LoanView} from "@source/models";

export default class LoanViewRepository extends BaseRepository<LoanView> {
    constructor() {
        super(LoanView);
    }

}
