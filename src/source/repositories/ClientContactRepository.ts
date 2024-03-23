import {BaseRepository} from "@/app/repositories/BaseRepository";
import {ClientContact} from "@source/models";

export default class ClientContactRepository extends BaseRepository<ClientContact> {
    constructor() {
        super(ClientContact);
    }

}
