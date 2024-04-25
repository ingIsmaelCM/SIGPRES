import {BaseRepository} from "@/app/repositories/BaseRepository";
import {Guarantee} from "@source/models";

export default class GuaranteeRepository extends BaseRepository<Guarantee> {
    constructor() {
        super(Guarantee);
    }

}
