import {BaseRepository} from "@/app/repositories/BaseRepository";
import {Amortization} from "@source/models";
import {DestroyOptions, Transaction} from "sequelize";

export default class AmortizationRepository extends BaseRepository<Amortization> {
    constructor() {
        super(Amortization);
    }

    async createFromLoan(data: any[], loanId: string, clientId: string, trans: Transaction)
        : Promise<Amortization[]> {
        return await this.safeRun(async () => {
            data = data.map(amort => ({
                ...amort,
                loanId,
                clientId
            }))
            return await super.bulkCreate(data, trans);
        })
    }


}
