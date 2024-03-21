import {BaseRepository} from "@/app/repositories/BaseRepository";
import {Mora} from "@source/models";

export default class MoraRepository extends BaseRepository<Mora> {
    constructor() {
        super(Mora);
    }

}
