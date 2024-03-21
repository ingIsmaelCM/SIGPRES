import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import PaymentRepository from "@source/repositories/PaymentRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IPayment} from "@app/interfaces/SourceInterfaces";

export default class PaymentService extends Service {
    private mainRepo = new PaymentRepository();

    async getPayments(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findPayment(paymentId: number, params: IParams) {
        return await this.mainRepo.findById(paymentId, params)
    }

    async createPayment(data: IPayment): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async updatePayment(paymentId: number, data: IPayment): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deletePayment(paymentId: number): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restorePayment(paymentId: number): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}