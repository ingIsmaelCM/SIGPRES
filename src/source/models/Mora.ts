import {DataTypes, Model, ModelAttributeColumnOptions} from "sequelize";
import ITM from "@app/models/ITenantModel";
import {EMoraStatus, IMora, IMoraRelation} from "@app/interfaces/SourceInterfaces";


@ITM.staticImplements<IMora, IMoraRelation>()
export default class Mora extends Model implements IMora {

    static tableName = "moras";
    static modelName: "Mora";
    static attributes: Record<keyof IMora, ModelAttributeColumnOptions> = {
        initAmount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        lateAmount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM(...Object.values(EMoraStatus)),
            allowNull: false,
        },
        dueAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        closedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        loanId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        paymentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ...ITM.commonAttributes
    }
    declare clientId: number;
    declare closedAt: string;
    declare dueAt: string;
    declare initAmount: number;
    declare lateAmount: number;
    declare loanId: number;
    declare paymentId: number;
    declare status: EMoraStatus;
    declare id?: number;
    declare createdBy?: number;
    declare updatedBy?: number;
    declare createdAt?: string;
    declare updatedAt?: string;
    declare deletedAt?: string;

    getSearchables(): Array<keyof IMora> {
        return [
            "dueAt", "closedAt", "initAmount", "lateAmount", "status", "clientId", "paymentId", "loanId"
        ];
    }

    getRelations(): (keyof IMoraRelation)[] {
        return ["loan", "client", "payment"];
    }

}