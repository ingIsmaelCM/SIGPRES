import {BaseRepository} from "@/app/repositories/BaseRepository";
import {GuaranteeAttribute} from "@source/models";

export default class GuaranteeAttributeRepository extends BaseRepository<GuaranteeAttribute> {
    constructor() {
        super(GuaranteeAttribute);
    }

}
