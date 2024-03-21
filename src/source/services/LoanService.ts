import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import LoanRepository from "@source/repositories/LoanRepository";
import TenantConnection from "@app/db/TenantConnection";
import {ILoan} from "@app/interfaces/SourceInterfaces";

export default class LoanService extends Service {
    private mainRepo = new LoanRepository();

    async getLoans(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findLoan(loanId: number, params: IParams) {
        return await this.mainRepo.findById(loanId, params)
    }

    async createLoan(data: ILoan): Promise<ILoan> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async updateLoan(loanId: number, data: ILoan): Promise<ILoan> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteLoan(loanId: number): Promise<ILoan> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreLoan(loanId: number): Promise<ILoan> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}