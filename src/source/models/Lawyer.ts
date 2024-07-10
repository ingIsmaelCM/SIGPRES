import ITM from "@/app/models/ITenantModel";
import {DataTypes, Model, ModelAttributeColumnOptions} from "sequelize";
import {ELawyerPaymode, ILawyer, ILawyerRelation} from "@app/interfaces/SourceInterfaces";
import tools from "@app/utils/tools";

@ITM.staticImplements<ILawyer, ILawyerRelation>()
export default class Lawyer extends Model implements ILawyer {

    declare name: string;
    declare lastname: string;
    declare fullname?: string;
    declare infoId?: string;
    declare payMode: ELawyerPaymode;
    declare payPrice: number;

   static  getSearchables(): Array<keyof ILawyer> {
        return ["name", "lastname", "exequatur", "infoId"];
    }
   static getRelations(): (keyof ILawyerRelation)[] {
        return ["info", "loans", "payments", "expenses", "image", "document"];
    }

    static additionalOptions = {}
    static tableName = "lawyers";
    static modelName = "Lawyer";

    static attributes: Record<keyof ILawyer, ModelAttributeColumnOptions> = {
        ...ITM.commonAttributes,
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            set(this: Lawyer, value: string) {
                this.setDataValue("name", tools.initialToUpper(value))
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            set(this: Lawyer, value: string) {
                this.setDataValue("lastname", tools.initialToUpper(value))
            }
        },
        infoId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payMode: {
            type: DataTypes.ENUM(...Object.values(ELawyerPaymode)),
            allowNull: false
        },
        payPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            get(this: Lawyer){
                return Number(this.getDataValue("payPrice"))
            }
        },
        exequatur: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fullname: {
            type: DataTypes.VIRTUAL,
            get(this: Lawyer) {
                return `${this.name} ${this.lastname}`;
            },
        },
    };
}
