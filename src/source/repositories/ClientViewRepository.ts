import {BaseRepository} from "@/app/repositories/BaseRepository";
import {ClientView} from "@source/models";
import {IParams} from "@app/interfaces/AppInterfaces";

export default class ClientViewRepository extends BaseRepository<ClientView> {
    constructor() {
        super(ClientView);
    }


}
