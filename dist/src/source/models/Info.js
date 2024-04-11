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
const tools_1 = __importDefault(require("@app/utils/tools"));
let Info = class Info extends sequelize_1.Model {
    static additionalOptions = {};
    static modelName = "Info";
    static tableName = "infos";
    static attributes = {
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.UUIDV4
        },
        dni: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        birthdate: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: true,
        },
        address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            set(value) {
                if (value) {
                    this.setDataValue("address", tools_1.default.initialToUpper(value));
                }
            }
        },
        gender: {
            type: sequelize_1.DataTypes.ENUM,
            values: Object.values(SourceInterfaces_1.EInfoGender),
            allowNull: false,
            defaultValue: SourceInterfaces_1.EInfoGender.Ninguno,
        },
        country: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: "República Dominicana",
            set(value) {
                this.setDataValue("country", tools_1.default.initialToUpper(value));
            }
        },
        createdBy: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        updatedBy: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
        },
        deletedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
    };
    getSearchables() {
        return [
            "dni",
            "phone",
            "email",
            "birthdate",
            "address",
            "gender",
            "country",
        ];
    }
    getRelations() {
        return ["image", "document"];
    }
};
Info = __decorate([
    ITenantModel_1.default.staticImplements()
], Info);
exports.default = Info;
//# sourceMappingURL=Info.js.map