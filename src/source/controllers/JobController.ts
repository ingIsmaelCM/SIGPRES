import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import JobService from "@source/services/JobService";

export default class JobController extends Controller implements IController {
    prefix: string = 'jobs';
    mainService = new JobService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getJobs(req.query),
            res, 200, "Lista de datos laborales"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findJob(Number(req.params.id), req.query),
            res, 200, "Detalles laborales"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createJob(req.body),
            res, 201, "Datos laborales registrados"
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateJob(Number(req.params.id), req.body),
            res, 201, "Datos laborales actualizados"
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteJob(Number(req.params.id)),
            res, 200, "Datos laborales eliminados"
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreJob(Number(req.params.id)),
            res, 200, "Datos laborales restaurados"
        )
    }
}