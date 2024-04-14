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
let Condition = class Condition extends sequelize_1.Model {
    getSearchables() {
        return ["initTerm", "initRateMora", "finalRateMora", "loanId", "clientId"];
    }
    getRelations() {
        return ["loan", "client"];
    }
    static additionalOptions = {};
    static tableName = "conditions";
    static modelName = "Condition";
    static attributes = {
        ...ITenantModel_1.default.commonAttributes,
        initTerm: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            get() {
                return Number(this.getDataValue("initTerm"));
            }
        },
        initRateMora: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
            get() {
                return Number(this.getDataValue("initRateMora"));
            }
        },
        grace: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            get() {
                return Number(this.getDataValue("grace"));
            }
        },
        rate: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            get() {
                return Number(this.getDataValue("rate"));
            }
        },
        finalRateMora: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
            get() {
                return Number(this.getDataValue("finalRateMora"));
            }
        },
        loanId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        clientId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    };
};
Condition = __decorate([
    ITenantModel_1.default.staticImplements()
], Condition);
exports.default = Condition;
//# sourceMappingURL=Condition.js.map