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
var Loan_1;
Object.defineProperty(exports, "__esModule", { value: true });
const ITenantModel_1 = __importDefault(require("@/app/models/ITenantModel"));
const sequelize_1 = require("sequelize");
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
const index_1 = require("@source/models/index");
const FileInterface_1 = require("@app/interfaces/FileInterface");
let Loan = class Loan extends sequelize_1.Model {
    static { Loan_1 = this; }
    static tableName = "loans";
    static modelName = "Loan";
    static additionalOptions = {};
    getSearchables() {
        return [
            "code",
            "clientId",
            "walletId",
            "lawyerId",
            "amount",
            "balance",
            "startAt",
            "endAt",
            "period",
            "term",
            "status",
            "guarantorId",
        ];
    }
    getRelations() {
        return [
            "lawyer",
            "guarantor",
            "client",
            "condition",
            "images",
            "documents",
            "payments",
            "moras",
            "amortizations",
        ];
    }
    static attributes = {
        ...ITenantModel_1.default.commonAttributes,
        code: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        amount: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        balance: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        term: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(SourceInterfaces_1.ELoanStatus)),
            allowNull: false,
            defaultValue: SourceInterfaces_1.ELoanStatus.Pendiente,
        },
        period: {
            type: sequelize_1.DataTypes.STRING,
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
        walletId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        guarantorId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        startAt: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false,
        },
        endAt: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false,
        },
        nextPaymentAt: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false,
        },
    };
    static initRelations() {
        Loan_1.belongsTo(index_1.LawyerView, {
            as: "lawyer",
            foreignKey: 'lawyerId',
        });
        Loan_1.belongsTo(index_1.ContactView, {
            as: 'guarantor',
            foreignKey: 'guarantorId'
        });
        Loan_1.belongsTo(index_1.ClientView, {
            as: 'client',
            foreignKey: 'clientId'
        });
        Loan_1.hasOne(index_1.Condition, {
            as: 'condition',
            foreignKey: 'loanId'
        });
        Loan_1.hasMany(index_1.Image, {
            as: 'images',
            foreignKey: 'imageableId',
            scope: {
                imageableType: FileInterface_1.EImageable.Loan
            }
        });
        Loan_1.hasMany(index_1.Document, {
            as: 'documents',
            foreignKey: 'documentableId',
            scope: {
                documentableType: FileInterface_1.EDocumentable.Loan
            }
        });
        Loan_1.hasMany(index_1.Payment, {
            as: 'payments',
            foreignKey: 'loanId',
        });
        Loan_1.hasMany(index_1.Mora, {
            as: 'moras',
            foreignKey: 'loanId',
        });
        Loan_1.hasMany(index_1.Amortization, {
            as: 'amortizations',
            foreignKey: 'loanId',
        });
    }
};
Loan = Loan_1 = __decorate([
    ITenantModel_1.default.staticImplements()
], Loan);
exports.default = Loan;
//# sourceMappingURL=Loan.js.map