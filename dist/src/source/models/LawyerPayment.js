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
var LawyerPayment_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
const ITenantModel_1 = __importDefault(require("@app/models/ITenantModel"));
const index_1 = require("@source/models/index");
let LawyerPayment = class LawyerPayment extends sequelize_1.Model {
    static { LawyerPayment_1 = this; }
    static tableName = "lawyer_payments";
    static modelName = "LawyerPayment";
    static additionalOptions = {};
    static attributes = {
        amount: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false
        },
        payPrice: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false
        },
        date: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        closedAt: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        lawyerId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        loanId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        paymentId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        walletId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(SourceInterfaces_1.ELawyerPaymentStatus)),
            allowNull: false
        },
        ...ITenantModel_1.default.commonAttributes
    };
    getSearchables() {
        return ["loanId", "lawyerId", "paymentId", "amount", "closedAt", "payPrice", "status", "walletId"];
    }
    getRelations() {
        return ["lawyer", "payment", "loan", "wallet"];
    }
    static initRelation() {
        LawyerPayment_1.belongsTo(index_1.LawyerView, {
            foreignKey: "lawyerId",
            as: "lawyer"
        });
        LawyerPayment_1.belongsTo(index_1.Loan, {
            foreignKey: "loanId",
            as: "loan"
        });
        LawyerPayment_1.belongsTo(index_1.Payment, {
            foreignKey: "paymentId",
            as: "payment"
        });
        LawyerPayment_1.belongsTo(index_1.Wallet, {
            foreignKey: "walletId",
            as: "wallet"
        });
    }
};
LawyerPayment = LawyerPayment_1 = __decorate([
    ITenantModel_1.default.staticImplements()
], LawyerPayment);
exports.default = LawyerPayment;
//# sourceMappingURL=LawyerPayment.js.map