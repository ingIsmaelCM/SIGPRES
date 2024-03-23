import {BaseRepository} from "@/app/repositories/BaseRepository";
import Contact from "@source/models/Contact";
import {Transaction} from "sequelize";

export default class ContactRepository extends BaseRepository<Contact> {
    constructor() {
        super(Contact);


    }


}
