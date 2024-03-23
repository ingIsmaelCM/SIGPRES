import {BaseRepository} from "@/app/repositories/BaseRepository";
import {LawyerView} from "@source/models";

export default class LawyerViewRepository extends BaseRepository<LawyerView> {
    constructor() {
        super(LawyerView);
    }

}
