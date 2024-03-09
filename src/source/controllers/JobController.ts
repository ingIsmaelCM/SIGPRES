import Controller, {setAuthor} from "@/app/controllers/Controller";
import response from "@/app/utils/response";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import JobService from "@source/services/JobService";
import JobRoutes from "@source/routes/JobRoutes";

export default class JobController extends Controller implements IController {
    prefix: string = "jobs";
    mainService = new JobService()

    async getJobs(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getJobs(req.query),
            res, 200, "Lista de puestos laborales")
    }

    @setAuthor
    async createJob(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createJob(req.body),
            res, 201, "Datos laborales registrados")
    }
}