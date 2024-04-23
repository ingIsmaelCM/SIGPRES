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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
const ITenantModel_1 = __importDefault(require("@app/models/ITenantModel"));
let LawyerPayment = class LawyerPayment extends sequelize_1.Model {
    static tableName = "lawyer_payments";
    static modelName = "LawyerPayment";
    static additionalOptions = {};
    static attributes = {
        amount: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
            get() {
                return Number(this.getDataValue("amount"));
            }
        },
        payPrice: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
            get() {
                return Number(this.getDataValue("payPrice"));
            }
        },
        date: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        closedAt: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: true
        },
        lawyerId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        loanId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        paymentId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        walletId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(SourceInterfaces_1.ELawyerPaymentStatus)),
            allowNull: false
        },
        ...ITenantModel_1.default.commonAttributes
    };
    static getSearchables() {
        return ["loanId", "lawyerId", "paymentId", "amount", "closedAt", "payPrice", "status", "walletId"];
    }
    static getRelations() {
        return ["lawyer", "payment", "loan", "wallet"];
    }
    static initRelation(sequelize) {
        sequelize.model("LawyerPayment")
            .belongsTo(sequelize.model("LawyerView"), {
            foreignKey: "lawyerId",
            as: "lawyer"
        });
        sequelize.model("LawyerPayment")
            .belongsTo(sequelize.model("Loan"), {
            foreignKey: "loanId",
            as: "loan"
        });
        sequelize.model("LawyerPayment")
            .belongsTo(sequelize.model("Payment"), {
            foreignKey: "paymentId",
            as: "payment"
        });
        sequelize.model("LawyerPayment")
            .belongsTo(sequelize.model("Wallet"), {
            foreignKey: "walletId",
            as: "wallet"
        });
    }
};
LawyerPayment = __decorate([
    ITenantModel_1.default.staticImplements()
], LawyerPayment);
exports.default = LawyerPayment;
//# sourceMappingURL=LawyerPayment.js.map