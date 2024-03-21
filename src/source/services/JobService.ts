import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import JobRepository from "@source/repositories/JobRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IJob} from "@app/interfaces/SourceInterfaces";

export default class JobService extends Service {
    private mainRepo = new JobRepository();

    async getJobs(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findJob(jobId: number, params: IParams) {
        return await this.mainRepo.findById(jobId, params)
    }

    async createJob(data: IJob): Promise<IJob> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async updateJob(jobId: number, data: IJob): Promise<IJob> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteJob(jobId: number): Promise<IJob> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreJob(jobId: number): Promise<IJob> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}