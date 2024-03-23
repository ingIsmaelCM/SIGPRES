import {BaseRepository} from "@/app/repositories/BaseRepository";
import {JobView} from "@source/models";

export default class JobViewRepository extends BaseRepository<JobView> {
    constructor() {
        super(JobView);
    }

    async create(data: any, trans: any): Promise<JobView> {
        return Promise.reject({
            code: 500,
            message: "No puede guardar datos en una vista"
        })
    }

}
