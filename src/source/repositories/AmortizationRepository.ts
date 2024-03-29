import {BaseRepository} from "@/app/repositories/BaseRepository";
import {Amortization} from "@source/models";
import {Transaction} from "sequelize";

export default class AmortizationRepository extends BaseRepository<Amortization> {
    constructor() {
        super(Amortization);
    }

    async createFromLoan(data: any[], loanId: number, clientId: number, trans: Transaction)
        : Promise<Amortization[]> {
        data = data.map(amort => ({
            ...amort,
            loanId,
            clientId
        }))
        return super.bulkCreate(data, trans);
    }
}
