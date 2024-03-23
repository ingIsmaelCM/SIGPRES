import {BaseRepository} from "@/app/repositories/BaseRepository";
import {ClientView} from "@source/models";

export default class ClientViewRepository extends BaseRepository<ClientView> {
    constructor() {
        super(ClientView);
    }

}
