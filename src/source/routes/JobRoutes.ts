import AbstractRoutes from "@app/routes/AbstractRoutes";
import JobController from "@source/controllers/JobController";
import RoleMiddleware from "@auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/utils/PermissionEnums";
import {Request, Response} from "express"
import JobRequest from "@source/middlewares/JobRequest";
import Role from "@auth/models/Role";
import InfoRequest from "@source/middlewares/InfoRequest";
import ImageRequest from "@file/middlewares/ImageRequest";

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
                RoleMiddleware.hasPermission(PermissionEnums.createJob),
                JobRequest.upsertJobRequest(),
                JobRequest.validate,
                (req: Request, res: Response) => this.controller.createJob(req, res)
            )

        this.router.post("/:id/job",
            RoleMiddleware.hasPermission(PermissionEnums.createJob),
            InfoRequest.upsertInfoRequest(),
            InfoRequest.requireIdRequest(),
            InfoRequest.validate,
            (req: Request, res: Response) => this.controller.setJobInfo(req, res)
        )
        this.router.post("/:id/images",
            RoleMiddleware.hasPermission(PermissionEnums.createImages),
            ImageRequest.createImageRequest(),
            ImageRequest.requireIdRequest(),
            ImageRequest.validate,
            (req: Request, res: Response) => this.controller.setJobImages(req, res)
        )
        this.router.patch("/:id/close",
            RoleMiddleware.hasPermission(PermissionEnums.editJob),
            JobRequest.closeJobRequest(),
            JobRequest.requireIdRequest(),
            JobRequest.validate,
            (req: Request, res: Response) => this.controller.closeJob(req, res)
        )

        this.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getJob),
                JobRequest.requireIdRequest(),
                JobRequest.validate,
                (req: Request, res: Response) => this.controller.findJob(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editJob),
                JobRequest.upsertJobRequest(),
                JobRequest.requireIdRequest(),
                JobRequest.validate,
                (req: Request, res: Response) => this.controller.findJob(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteJob),
                JobRequest.requireIdRequest(),
                JobRequest.validate,
                (req: Request, res: Response) => this.controller.deleteJob(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                JobRequest.requireIdRequest(),
                JobRequest.validate,
                (req: Request, res: Response) => this.controller.restoreJob(req, res)
            )

    }
}