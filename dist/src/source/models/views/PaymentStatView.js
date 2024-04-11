"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var PaymentStatView_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ITenantModel_1 = __importDefault(require("@app/models/ITenantModel"));
const models_1 = require("@source/models");
let PaymentStatView = class PaymentStatView extends sequelize_1.Model {
    static { PaymentStatView_1 = this; }
    static tableName = "paymentStatView";
    static modelName = "PaymentStatView";
    static additionalOptions = {
        paranoid: false,
        timestamps: false
    };
    getSearchables() {
        return ["clientId", "loanId", "onTime", "averageAbonoCapital", "averageDiffInDay",
            "finalMora", "initialMora", "loanAmount", "loanBalance", "loanCode", "modaWallet",
            "mora", "outTime", "totalAbonoCapital", "totalAmount", "totalCapital",
            "totalCapitalOnCuota", "totalInterest"];
    }
    getRelations() {
        return [];
    }
    static attributes = {
        loanCode: {
            type: sequelize_1.DataTypes.STRING
        },
        averageAbonoCapital: {
            type: sequelize_1.DataTypes.DECIMAL
        },
        averageDiffInDay: {
            type: sequelize_1.DataTypes.DECIMAL
        },
        clientId: {
            type: sequelize_1.DataTypes.INTEGER
        },
        finalMora: {
            type: sequelize_1.DataTypes.DECIMAL
        },
        initialMora: {
            type: sequelize_1.DataTypes.DECIMAL
        },
        loanId: {
            type: sequelize_1.DataTypes.INTEGER
        },
        modaWallet: {
            type: sequelize_1.DataTypes.STRING
        },
        mora: {
            type: sequelize_1.DataTypes.DECIMAL
        },
        onTime: {
            type: sequelize_1.DataTypes.DECIMAL
        },
        outTime: {
            type: sequelize_1.DataTypes.DECIMAL
        },
        percentOnTime: {
            type: sequelize_1.DataTypes.VIRTUAL,
            get() {
                const percent = Number(this.getDataValue("onTime") || 0.01) /
                    ((this.getDataValue("onTime")) + this.getDataValue("outTime"));
                return Number((percent * 100).toFixed(2));
            }
        },
        percentOutTime: {
            type: sequelize_1.DataTypes.VIRTUAL,
            get() {
                const percent = Number(this.getDataValue("outTime")) || 0.01 /
                    (this.getDataValue("onTime") + this.getDataValue("outTime"));
                return Number((percent * 100).toFixed(2));
            }
        },
        totalAbonoCapital: {
            type: sequelize_1.DataTypes.DECIMAL
        },
        totalAmount: {
            type: sequelize_1.DataTypes.DECIMAL
        },
        totalCapital: {
            type: sequelize_1.DataTypes.DECIMAL
        },
        totalCapitalOnCuota: {
            type: sequelize_1.DataTypes.DECIMAL
        },
        totalInterest: {
            type: sequelize_1.DataTypes.DECIMAL
        },
        totalUtility: {
            type: sequelize_1.DataTypes.VIRTUAL,
            get() {
                const utility = Number(this.getDataValue("totalAmount")) -
                    (this.getDataValue("totalCapital"));
                return Number(utility.toFixed(2));
            }
        },
        percentUtility: {
            type: sequelize_1.DataTypes.VIRTUAL,
            get() {
                const utility = Number(this.getDataValue("totalAmount")) -
                    (this.getDataValue("totalCapital"));
                const percent = utility / Number(this.getDataValue("totalCapital"));
                return Number((percent * 100).toFixed(2));
            }
        },
        loanAmount: {
            type: sequelize_1.DataTypes.DECIMAL
        },
        loanBalance: {
            type: sequelize_1.DataTypes.DECIMAL
        },
        loanPayedPercent: {
            type: sequelize_1.DataTypes.VIRTUAL,
            get() {
                const percent = Number(this.getDataValue("totalCapital")) /
                    Number(this.getDataValue("loanAmount"));
                return Number((percent * 100).toFixed(2));
            }
        }
    };
    static initRelation() {
        PaymentStatView_1.belongsTo(models_1.Client, {
            foreignKey: "clientId",
            as: "client"
        });
        PaymentStatView_1.belongsTo(models_1.Loan, {
            foreignKey: "loanId",
            as: "loan"
        });
    }
};
PaymentStatView = PaymentStatView_1 = __decorate([
    ITenantModel_1.default.staticImplements()
], PaymentStatView);
exports.default = PaymentStatView;
//# sourceMappingURL=PaymentStatView.js.map