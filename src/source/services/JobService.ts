import Service from "@app/services/Service";
import JobRepository from "@source/repositories/JobRepository";
import {IParams} from "@app/utils/AppInterfaces";
import {Job} from "@source/models";
import {EJobStatus, IJob} from "@source/utils/SourceInterfaces";
import TenantConnection from "@app/db/TenantConnection";
import {EImageable, IImage} from "@file/utils/FileInterface";
import ImageRepository from "@file/repositories/ImageRepository";
import ImageService from "@file/services/ImageService";

export default class JobService extends Service {
    private jobRepo = new JobRepository();
    private imageRepo = new ImageRepository();

    /**
     *
     * @param params - Set of query params from `req.query`
     */
    async getJobs(params: IParams): Promise<Array<Job>> {
        return this.safeRun(async () =>
            this.jobRepo.getAll(params))
    }

    async findJob(jobId: number, params: IParams): Promise<Job> {
        return this.safeRun(async () =>
            this.jobRepo.findById(jobId, params))
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

    async updateJob(job: IJob, jobId: number): Promise<Job> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const newJob = await this.jobRepo.update(job, jobId, trans);
                await trans.commit();
                return newJob;
            },
            async () => await trans.rollback()
        )
    }

    async deleteJob(jobId: number): Promise<Job> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const newJob = await this.jobRepo.delete(jobId, trans);
                await trans.commit();
                return newJob;
            },
            async () => await trans.rollback()
        )
    }

    async restoreJob(jobId: number): Promise<Job> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const newJob = await this.jobRepo.restore(jobId, trans);
                await trans.commit();
                return newJob;
            },
            async () => await trans.rollback()
        )
    }

    async closeJob(job: IJob, jobId: number): Promise<Job> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const closedJob = await this.jobRepo.update({
                        endtAt: job.endAt,
                        status: EJobStatus.Anterior,
                        updatedBy: job.updatedBy
                    },
                    jobId,
                    trans
                );
                await trans.commit();
                return closedJob;
            },
            async () => await trans.rollback()
        )
    }

    async setJobImages(images: IImage[], jobId: number): Promise<Array<IImage>> {
        return this.safeRun(async () =>
            await ImageService.createImages(images,
                EImageable.Job, jobId)
        )
    }
}