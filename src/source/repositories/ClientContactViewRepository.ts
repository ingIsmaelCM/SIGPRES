import {BaseRepository} from "@/app/repositories/BaseRepository";
import {ClientContactView} from "@source/models";

export default class ClientContactViewRepository extends BaseRepository<ClientContactView> {
    constructor() {
        super(ClientContactView);
    }

}
