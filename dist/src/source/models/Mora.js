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
const ITenantModel_1 = __importDefault(require("@app/models/ITenantModel"));
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
let Mora = class Mora extends sequelize_1.Model {
    static tableName = "moras";
    static modelName = "Mora";
    static additionalOptions = {};
    static attributes = {
        initAmount: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false
        },
        lateAmount: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false
        },
        mora: {
            type: sequelize_1.DataTypes.VIRTUAL,
            get() {
                return (Number(this.getDataValue("initAmount"))
                    + Number(this.getDataValue("lateAmount"))).toFixed(2);
            }
        },
        status: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(SourceInterfaces_1.EMoraStatus)),
            allowNull: false,
        },
        dueAt: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false
        },
        closedAt: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false
        },
        loanId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        clientId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        paymentId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        ...ITenantModel_1.default.commonAttributes
    };
    static getSearchables() {
        return [
            "dueAt", "closedAt", "initAmount", "lateAmount", "status", "clientId", "paymentId", "loanId"
        ];
    }
    static getRelations() {
        return ["loan", "client", "payment"];
    }
};
Mora = __decorate([
    ITenantModel_1.default.staticImplements()
], Mora);
exports.default = Mora;
//# sourceMappingURL=Mora.js.map