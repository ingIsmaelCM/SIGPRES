import {DataTypes, Model, ModelAttributeColumnOptions} from "sequelize";
import ITM from "@app/models/ITenantModel";
import {EMoraStatus, IMora, IMoraRelation} from "@app/interfaces/SourceInterfaces";

//TODO add setter for totalPayed if(status="Pagada")
@ITM.staticImplements<IMora, IMoraRelation>()
export default class Mora extends Model implements IMora {

    static tableName = "moras";
    static modelName: "Mora";
    static additionalOptions = {}
    static attributes: Record<keyof IMora, ModelAttributeColumnOptions> = {
        initAmount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        lateAmount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        mora: {
            type: DataTypes.VIRTUAL,
            get(this: Mora) {
                return (Number(this.getDataValue("initAmount"))
                    + Number(this.getDataValue("lateAmount"))).toFixed(2)
            }
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
    declare clientId: string;
    declare closedAt: string;
    declare dueAt: string;
    declare initAmount: number;
    declare lateAmount: number;
    declare mora: number;
    declare loanId: string;
    declare paymentId: string;
    declare status: EMoraStatus;
    declare id?: string;
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