import Controller, {setAuthor} from "@/app/controllers/Controller";
import response from "@/app/utils/response";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import JobService from "@source/services/JobService";
import JobRoutes from "@source/routes/JobRoutes";
import {EInfoModels} from "@source/utils/SourceInterfaces";
import InfoService from "@source/services/InfoService";

export default class JobController extends Controller implements IController {
    prefix: string = "jobs";
    mainService = new JobService();
    infoService = new InfoService();

    async getJobs(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getJobs(req.query),
            res, 200, "Lista de puestos laborales")
    }

    async findJob(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findJob(Number(req.params.id), req.query),
            res, 200, "Detalles del trabajo")
    }


    @setAuthor
    async createJob(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createJob(req.body),
            res, 201, "Datos laborales registrados")
    }

    @setAuthor
    async updateJob(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateJob(req.body, Number(req.params.id)),
            res, 201, "Datos laborales actualizados")
    }

    async deleteJob(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteJob(Number(req.params.id)),
            res, 201, "Datos laborales eliminados")
    }

    async restoreJob(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreJob(Number(req.params.id)),
            res, 201, "Datos laborales recuperados")
    }

    @setAuthor
    async closeJob(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.closeJob(req.body, Number(req.params.id)),
            res, 201, "Empleo cerrado")
    }

    @setAuthor
    async setJobInfo(req: Request, res: Response) {
        await this.safeRun(async () => {
            return await this.infoService.addRelated(req.body,
                EInfoModels.Job,
                Number(req.params.id));
        }, res, 201, "Información Registrada");
    }

    async setJobImages(req: Request, res: Response) {
        return this.safeRun(async () =>
                await this.mainService.setJobImages(req.body.images, Number(req.params.id)),
            res, 201, "Imágenes Guardadas")
    }

}