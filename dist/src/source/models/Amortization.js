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
let Amortization = class Amortization extends sequelize_1.Model {
    static getSearchables() {
        return [
            "date",
            "nro",
            "cuota",
            "capital",
            "interest",
            "balance",
            "status",
            "loanId",
            "clientId",
        ];
    }
    static getRelations() {
        return ["loan", "client", 'loan.client', 'loan.condition', 'loan.guarantor', 'loan.lawyer'];
    }
    static additionalOptions = {};
    static tableName = "amortizations";
    static modelName = "Amortization";
    static attributes = {
        ...ITenantModel_1.default.commonAttributes,
        nro: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false,
        },
        cuota: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
            get() {
                return Number(this.getDataValue("cuota"));
            }
        },
        capital: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
            get() {
                return Number(this.getDataValue("capital"));
            }
        },
        interest: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
            get() {
                return Number(this.getDataValue("interest"));
            }
        },
        mora: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: true,
            defaultValue: 0,
            get() {
                return Number(this.getDataValue("mora"));
            }
        },
        balance: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
            get() {
                return Number(this.getDataValue("balance"));
            }
        },
        status: {
            type: sequelize_1.DataTypes.ENUM("Pendiente", "Pagado", "Cancelado"),
            allowNull: false,
        },
        loanId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        clientId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    };
};
Amortization = __decorate([
    ITenantModel_1.default.staticImplements()
], Amortization);
exports.default = Amortization;
//# sourceMappingURL=Amortization.js.map