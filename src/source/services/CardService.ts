import Service from "@app/services/Service";
import CardRepository from "@source/repositories/CardRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IParams} from "@app/interfaces/AppInterfaces";
import {ICard} from "@app/interfaces/SourceInterfaces";
import tools from "@app/utils/tools";
import jwt from "jsonwebtoken";
import ClientService from "@source/services/ClientService";
import BraintreeService from "@source/services/BraintreeService";
import appConfig from "@app/app.config";
import {Json} from "sequelize/types/utils";

export default class CardService extends Service {
    private mainRepo = new CardRepository();

    async getCards(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findCard(cardId: string, params: IParams) {
        return await this.mainRepo.findById(cardId, params)
    }

    async createCard(data: ICard): Promise<ICard> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const storedReq = TenantConnection.requestNamespace.get('req')
                const tenant = storedReq.cookies.tenant;
                const token = jwt.sign(data, tenant, {expiresIn: 60 * 60 * 1000 * 1000});
                data.value = String(token);
                const newCard = await this.mainRepo.create(data, trans);
                await trans.commit();
                return newCard;
            },
            async () => await trans.rollback()
        )
    }


    async updateCard(cardId: string, data: ICard): Promise<ICard> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {

            },
            async () => await trans.rollback()
        )
    }


    async deleteCard(cardId: string): Promise<ICard> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const deletedCard = await this.mainRepo.delete(cardId, trans);
                await trans.commit();
                return deletedCard;
            },
            async () => await trans.rollback()
        )
    }

    async restoreCard(cardId: string): Promise<ICard> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const restoredCard = await this.mainRepo.restore(cardId, trans);
                await trans.commit();
                return restoredCard;
            },
            async () => await trans.rollback()
        )
    }


}