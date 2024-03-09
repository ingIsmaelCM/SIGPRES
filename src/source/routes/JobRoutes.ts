import AbstractRoutes from "@app/routes/AbstractRoutes";
import JobController from "@source/controllers/JobController";
import RoleMiddleware from "@auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/utils/PermissionEnums";
import {Request, Response} from "express"
import JobRequest from "@source/middlewares/JobRequest";

export default class JobRoutes extends AbstractRoutes<JobController> {


    constructor() {
        super(new JobController());
    }
    initRoutes() {
        this.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getJob),
                (req: Request, res: Response) => this.controller.getJobs(req, res)
            )
            .post(
                JobRequest.createJobRequest(),
                JobRequest.validate,
                RoleMiddleware.hasPermission(PermissionEnums.createJob),
                (req: Request, res: Response) => this.controller.createJob(req, res)
            )
    }
}