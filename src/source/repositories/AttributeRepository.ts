import {BaseRepository} from "@/app/repositories/BaseRepository";
import {Attribute} from "@source/models";

export default class AttributeRepository extends BaseRepository<Attribute> {
    constructor() {
        super(Attribute);
    }

}
