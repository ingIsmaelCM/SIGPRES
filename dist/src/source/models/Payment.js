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
var Payment_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ITenantModel_1 = __importDefault(require("@/app/models/ITenantModel"));
const index_1 = require("@source/models/index");
let Payment = class Payment extends sequelize_1.Model {
    static { Payment_1 = this; }
    getSearchables() {
        return [
            "amount",
            "capital",
            "interest",
            "balanceBefore",
            "balanceAfter",
            "dueAt",
            "payedAt",
            "note",
            "walletId",
            "loanId",
            "clientId",
            "lawyerId",
        ];
    }
    getRelations() {
        return ["wallet", "loan", "lawyer", "client", "mora", "images", "loan.client", "loan.condition", "loan.wallet"];
    }
    static tableName = "payments";
    static modelName = "Payment";
    static additionalOptions = {};
    static attributes = {
        ...ITenantModel_1.default.commonAttributes,
        amount: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        capital: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        interest: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        balanceBefore: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        balanceAfter: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        dueAt: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false,
        },
        payedAt: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false,
        },
        note: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        walletId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        loanId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        clientId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        lawyerId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
    };
    static initRelation() {
        Payment_1.hasOne(index_1.Mora, {
            foreignKey: "paymentId",
            as: "mora"
        });
        Payment_1.belongsTo(index_1.Wallet, {
            foreignKey: "walletId",
            as: "wallet"
        });
        Payment_1.belongsTo(index_1.Loan, {
            foreignKey: "loanId",
            as: "loan"
        });
        Payment_1.belongsTo(index_1.Client, {
            foreignKey: "clientId",
            as: "client"
        });
    }
};
Payment = Payment_1 = __decorate([
    ITenantModel_1.default.staticImplements()
], Payment);
exports.default = Payment;
//# sourceMappingURL=Payment.js.map