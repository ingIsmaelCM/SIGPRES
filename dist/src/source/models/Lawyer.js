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
let Lawyer = class Lawyer extends sequelize_1.Model {
    static getSearchables() {
        return ["name", "lastname", "exequatur", "infoId"];
    }
    static getRelations() {
        return ["info", "loans", "payments", "expenses", "image", "document"];
    }
    static additionalOptions = {};
    static tableName = "lawyers";
    static modelName = "Lawyer";
    static attributes = {
        ...ITenantModel_1.default.commonAttributes,
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("name", tools_1.default.initialToUpper(value));
            }
        },
        lastname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("lastname", tools_1.default.initialToUpper(value));
            }
        },
        infoId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        payMode: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(SourceInterfaces_1.ELawyerPaymode)),
            allowNull: false
        },
        payPrice: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
            get() {
                return Number(this.getDataValue("payPrice"));
            }
        },
        exequatur: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        fullname: {
            type: sequelize_1.DataTypes.VIRTUAL,
            get() {
                return `${this.name} ${this.lastname}`;
            },
        },
    };
};
Lawyer = __decorate([
    ITenantModel_1.default.staticImplements()
], Lawyer);
exports.default = Lawyer;
//# sourceMappingURL=Lawyer.js.map