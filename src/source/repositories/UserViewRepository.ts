import {BaseRepository} from "@/app/repositories/BaseRepository";
import {UserView} from "@source/models";

export default class UserViewRepository extends BaseRepository<UserView> {
    constructor() {
        super(UserView);
    }

}
