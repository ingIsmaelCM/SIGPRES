import Service from "@app/services/Service";
import LawyerPaymentRepository from "@source/repositories/LawyerPaymentRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IParams} from "@app/interfaces/AppInterfaces";
import {ILawyerPayment} from "@app/interfaces/SourceInterfaces";

export default class LawyerPaymentService extends Service {
    private mainRepo = new LawyerPaymentRepository();

    async getLawyerPayments(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findLawyerPayment(lawyerPaymentId: string, params: IParams) {
        return await this.mainRepo.findById(lawyerPaymentId, params)
    }

    async createLawyerPayment(data: ILawyerPayment): Promise<ILawyerPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async updateLawyerPayment(lawyerPaymentId: string, data: ILawyerPayment): Promise<ILawyerPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteLawyerPayment(lawyerPaymentId: string): Promise<ILawyerPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreLawyerPayment(lawyerPaymentId: string): Promise<ILawyerPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}