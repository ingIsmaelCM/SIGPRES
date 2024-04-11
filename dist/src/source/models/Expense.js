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
var Expense_1;
Object.defineProperty(exports, "__esModule", { value: true });
const ITenantModel_1 = __importDefault(require("@/app/models/ITenantModel"));
const sequelize_1 = require("sequelize");
const index_1 = require("@source/models/index");
let Expense = class Expense extends sequelize_1.Model {
    static { Expense_1 = this; }
    getSearchables() {
        return ["amount", "date", "concepto", "walletId", "lawyerId"];
    }
    getRelations() {
        return ["wallet", "lawyer"];
    }
    static additionalOptions = {};
    static modelName = "Expense";
    static tableName = "expenses";
    static attributes = {
        ...ITenantModel_1.default.commonAttributes,
        amount: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        date: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false,
        },
        concepto: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        walletId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        lawyerId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
    };
    static initRelation() {
        Expense_1.belongsTo(index_1.Wallet, {
            as: "wallet",
            foreignKey: 'walletId'
        });
        Expense_1.belongsTo(index_1.Lawyer, {
            as: "lawyer",
            foreignKey: 'lawyerId'
        });
    }
};
Expense = Expense_1 = __decorate([
    ITenantModel_1.default.staticImplements()
], Expense);
exports.default = Expense;
//# sourceMappingURL=Expense.js.map