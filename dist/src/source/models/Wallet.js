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
const ITenantModel_1 = __importDefault(require("@/app/models/ITenantModel"));
const tools_1 = __importDefault(require("@app/utils/tools"));
let Wallet = class Wallet extends sequelize_1.Model {
    static tableName = "wallets";
    static modelName = "Wallet";
    static additionalOptions = {};
    getSearchables() {
        return ["name", "balance", "authId"];
    }
    getRelations() {
        return ["expenses", "payments", "loans"];
    }
    static attributes = {
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            set(val) {
                this.setDataValue("name", tools_1.default.initialToUpper(val));
            }
        },
        authId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        balance: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
            get() {
                return Number(this.getDataValue('balance'));
            }
        },
        ...ITenantModel_1.default.commonAttributes,
    };
};
Wallet = __decorate([
    ITenantModel_1.default.staticImplements()
], Wallet);
exports.default = Wallet;
//# sourceMappingURL=Wallet.js.map