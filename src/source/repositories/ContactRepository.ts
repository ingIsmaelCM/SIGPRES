import {BaseRepository} from "@/app/repositories/BaseRepository";
import Contact from "@source/models/Contact";
import {Transaction} from "sequelize";

export default class ContactRepository extends BaseRepository<Contact> {
    constructor() {
        super(Contact);


    }

    async addClient(clientId: number, contact: Contact, trans: Transaction) {
       return await this.safeRun(async () => {
            return await contact.addClient(clientId, {
                through: {
                    createdBy: contact.createdBy,
                    updatedBy: contact.updatedBy
                },
                transaction: trans
            })
        })
    }
}
