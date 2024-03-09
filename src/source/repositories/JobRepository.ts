import {BaseRepository} from "@app/repositories/BaseRepository";
import {Job} from "@source/models";

/**
 * @extends BaseRepository<Job>
 */
export default class JobRepository extends BaseRepository<Job> {

    constructor() {
        super(Job);
    }

}