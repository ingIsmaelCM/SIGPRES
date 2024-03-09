import Service from "@app/services/Service";
import JobRepository from "@source/repositories/JobRepository";
import {IParams} from "@app/utils/AppInterfaces";
import {Job} from "@source/models";
import {IJob} from "@source/utils/SourceInterfaces";
import TenantConnection from "@app/db/TenantConnection";

export default class JobService extends Service {
    private jobRepo = new JobRepository();


    /**
     *
     * @param params - Set of query params from `req.query`
     */
    async getJobs(params: IParams): Promise<Array<Job>> {
        return this.safeRun(async () =>
            this.jobRepo.getAll(params))
    }

    async createJob(job: IJob): Promise<Job> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const newJob = await this.jobRepo.create(job, trans);
                await trans.commit();
                return newJob;
            },
            async () => await trans.rollback()
        )
    }
}