import {BaseRepository} from "@/app/repositories/BaseRepository";
import {ContactView} from "@source/models";

export default class ContactViewRepository extends BaseRepository<ContactView> {
    constructor() {
        super(ContactView);
    }

}
