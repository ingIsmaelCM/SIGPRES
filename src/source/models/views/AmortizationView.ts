import {DataTypes, Model} from "sequelize";
import ITM from "@app/models/ITenantModel";
import {IAmortizationRelation, IAmortizationView} from "@app/interfaces/SourceInterfaces";
import {Amortization, ClientView, Condition, Loan} from "@source/models";
import moment from "moment";
import amortization from "@app/utils/amortization";


@ITM.staticImplements<IAmortizationView, IAmortizationRelation>()
export default class AmortizationView extends Model {
    declare mora: number;
    static tableName = "amortizationView";
    static modelName = "AmortizationView";
    static additionalOptions = {}
    static attributes = {
        ...Amortization.attributes,
        ...Condition.attributes,
        expiresAt: {
            type: DataTypes.DATE
        },
        cuota:{
          type: DataTypes.DECIMAL,
          get(this:AmortizationView){
              return Number(this.getDataValue("cuota"))+Number(this.mora)
          }
        },
        mora: {
            type: DataTypes.VIRTUAL,
            get(this: AmortizationView) {
                const {mora} = amortization.getMora(this);
                return mora;
            }
        },
        initMora: {
            type: DataTypes.VIRTUAL,
            get(this: AmortizationView) {
                const {initMora} = amortization.getMora(this);
                return initMora;
            }
        },
        finalMora: {
            type: DataTypes.VIRTUAL,
            get(this: AmortizationView) {
                const {finalMora} = amortization.getMora(this);
                return finalMora;
            }
        },
        isExpired: {
            type: DataTypes.VIRTUAL,
            get(this: AmortizationView) {
                return moment().isAfter(moment(this.getDataValue("expiresAt")));
            }
        }

    };

    getSearchables(): Array<any> {
        return  [
            ...new Amortization().getSearchables(),
            "expiresAt"
        ]
    }

    getRelations(): Array<keyof IAmortizationRelation> {
        return new Amortization().getRelations()
    }

    static initRelation() {
        AmortizationView.belongsTo(Loan, {
            foreignKey: "loanId",
            as: "loan"
        })
        AmortizationView.belongsTo(ClientView, {
            foreignKey: "clientId",
            as: "client"
        })
    }
}