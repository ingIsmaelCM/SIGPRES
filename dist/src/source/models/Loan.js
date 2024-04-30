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
const ITenantModel_1 = __importDefault(require("@/app/models/ITenantModel"));
const sequelize_1 = require("sequelize");
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
const FileInterface_1 = require("@app/interfaces/FileInterface");
let Loan = class Loan extends sequelize_1.Model {
    static tableName = "loans";
    static modelName = "Loan";
    static additionalOptions = {};
    static getSearchables() {
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
            "type",
            "guarantorId",
        ];
    }
    static getRelations() {
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
            get() {
                return Number(this.getDataValue("amount"));
            }
        },
        balance: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
            get() {
                return Number(this.getDataValue("balance"));
            }
        },
        term: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            get() {
                return Number(this.getDataValue("term"));
            }
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
        type: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(SourceInterfaces_1.ELoanType)),
            allowNull: false,
            defaultValue: SourceInterfaces_1.ELoanType.Fixed
        },
        clientId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        lawyerId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        walletId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        guarantorId: {
            type: sequelize_1.DataTypes.STRING,
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
    static initRelations(sequelize, modelName = "Loan") {
        sequelize.model(modelName)
            .belongsTo(sequelize.model("LawyerView"), {
            as: "lawyer",
            foreignKey: 'lawyerId',
        });
        sequelize.model(modelName)
            .belongsTo(sequelize.model("ContactView"), {
            as: 'guarantor',
            foreignKey: 'guarantorId'
        });
        sequelize.model(modelName)
            .belongsTo(sequelize.model("ClientView"), {
            as: 'client',
            foreignKey: 'clientId'
        });
        sequelize.model(modelName)
            .hasOne(sequelize.model("Condition"), {
            as: 'condition',
            foreignKey: 'loanId'
        });
        sequelize.model(modelName)
            .hasMany(sequelize.model("Image"), {
            as: 'images',
            foreignKey: 'imageableId',
            scope: {
                imageableType: FileInterface_1.EImageable.Loan
            }
        });
        sequelize.model(modelName)
            .hasMany(sequelize.model("Document"), {
            as: 'documents',
            foreignKey: 'documentableId',
            scope: {
                documentableType: FileInterface_1.EDocumentable.Loan
            }
        });
        sequelize.model(modelName)
            .hasMany(sequelize.model("Payment"), {
            as: 'payments',
            foreignKey: 'loanId',
        });
        sequelize.model(modelName)
            .hasMany(sequelize.model("Mora"), {
            as: 'moras',
            foreignKey: 'loanId',
        });
        sequelize.model(modelName)
            .hasMany(sequelize.model("Amortization"), {
            as: 'amortizations',
            foreignKey: 'loanId',
        });
    }
};
Loan = __decorate([
    ITenantModel_1.default.staticImplements()
], Loan);
exports.default = Loan;
//# sourceMappingURL=Loan.js.map