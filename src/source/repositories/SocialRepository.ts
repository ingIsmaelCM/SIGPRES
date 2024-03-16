import {BaseRepository} from "@app/repositories/BaseRepository";
import Social from "@source/models/Social";


export default class SocialRepository extends BaseRepository<Social>{
    constructor() {
        super(Social);

    }

}