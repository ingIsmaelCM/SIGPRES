import BaseRoutes from "@app/routes/BaseRoutes";
import PaymentController from "@source/controllers/PaymentController";
import {Request, Response} from "express";
import PaymentRequest from "@source/requests/PaymentRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class PaymentRoutes extends BaseRoutes<PaymentController> {
    constructor() {
        super(new PaymentController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getPayments),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createPayment),
                PaymentRequest.paymentCreateRequest(),
                PaymentRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );
        this.controller.router.post("/cuotas",
            RoleMiddleware.hasPermission(PermissionEnums.createPayment),
            PaymentRequest.paymentCreateCuotaRequest(),
            PaymentRequest.validate,
            (req: Request, res: Response) => this.controller.storePaymentCuota(req, res)
        )
        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getPayments),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editPayment),
                PaymentRequest.paymentUpdateRequest(),
                PaymentRequest.validate,
                (req: Request, res: Response) => this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deletePayment),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response) => this.controller.restore(req, res)
            );
    }

}