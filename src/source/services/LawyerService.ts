import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import LawyerRepository from "@source/repositories/LawyerRepository";
import TenantConnection from "@app/db/TenantConnection";
import {ILawyer, ILawyerRelation} from "@app/interfaces/SourceInterfaces";
import LawyerViewRepository from "@source/repositories/LawyerViewRepository";
import InfoService from "@source/services/InfoService";

export default class LawyerService extends Service {
    private mainRepo = new LawyerRepository();
    private infoService = new InfoService();
    private lawyerViewRepo= new LawyerViewRepository();

    async getLawyers(params: IParams) {
        return await this.lawyerViewRepo.getAll(params)
    }

    async findLawyer(lawyerId: number, params: IParams) {
        return await this.lawyerViewRepo.findById(lawyerId, params)
    }

    async createLawyer(data: ILawyer & ILawyerRelation): Promise<ILawyer> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            const newInfo = await this.infoService.setFromRelated(data, trans);
            const  newLawyer=await this.mainRepo.create({...data, infoId: newInfo.id}, trans);
            await  trans.commit();
            return {...newInfo.dataValues, ...newLawyer.dataValues};
            },
            async () => await trans.rollback()
        )
    }

    async updateLawyer(lawyerId: number, data: ILawyer): Promise<ILawyer> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            const updatedLawyer=await this.mainRepo.update(data, lawyerId, trans);
                if(data.infoId){
                    await this.infoService.updateFromRelated(data, data.infoId, trans);
                }
            await trans.commit();
            return updatedLawyer;
            },
            async () => await trans.rollback()
        )
    }


    async deleteLawyer(lawyerId: number): Promise<ILawyer> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            const deletedLawyer=await this.mainRepo.delete(lawyerId, trans);
            await trans.commit();
            return deletedLawyer;
            },
            async () => await trans.rollback()
        )
    }

    async restoreLawyer(lawyerId: number): Promise<ILawyer> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const restoredLawyer=await this.mainRepo.restore(lawyerId, trans);
                await trans.commit();
                return restoredLawyer;
            },
            async () => await trans.rollback()
        )
    }


}