import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import JobRepository from "@source/repositories/JobRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IJob, IJobRelation} from "@app/interfaces/SourceInterfaces";
import InfoService from "@source/services/InfoService";
import {Client} from "@source/models";
import JobViewRepository from "@source/repositories/JobViewRepository";

export default class JobService extends Service {
    private mainRepo = new JobRepository();
    private jobViewRepo = new JobViewRepository();
    private infoService = new InfoService();

    async getJobs(params: IParams) {
        return await this.jobViewRepo.getAll(params)
    }

    async findJob(jobId: number, params: IParams) {
        return await this.jobViewRepo.findById(jobId, params)
    }

    async createJob(data: IJob & IJobRelation): Promise<IJob> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                await this.mainRepo.validateBeforeInsertRelation(Client, data.clientId);
                const newInfo = await this.infoService.setFromRelated(data, trans);
                const newJob = await this.mainRepo.create({...data, infoId: newInfo.id}, trans);
                const result = {...newInfo.dataValues, ...newJob.dataValues}
                await trans.commit();
                return result;
            },
            async () => await trans.rollback()
        )
    }

    async updateJob(jobId: number, data: IJob): Promise<IJob> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                await this.mainRepo.validateBeforeInsertRelation(Client, data.clientId);
                const updatedJob = await this.mainRepo.update(data, jobId, trans);
                if(data.infoId){
                    await this.infoService.updateFromRelated(data, data.infoId, trans);
                }
                await trans.commit();
                return updatedJob;
            },
            async () => await trans.rollback()
        )
    }


    async deleteJob(jobId: number): Promise<IJob> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const deletedJob = await this.mainRepo.delete(jobId, trans);
                await trans.commit();
                return deletedJob;
            },
            async () => await trans.rollback()
        )
    }

    async restoreJob(jobId: number): Promise<IJob> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const restoredJob = await this.mainRepo.restore(jobId, trans);
                await trans.commit();
                return restoredJob;
            },
            async () => await trans.rollback()
        )
    }


}