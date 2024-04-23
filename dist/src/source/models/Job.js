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
let Job = class Job extends sequelize_1.Model {
    static getSearchables() {
        return ["startAt", "endAt", "status", "salary", "clientId", "company", "infoId", "position"];
    }
    static getRelations() {
        return ["client", "info", "image", "document"];
    }
    static tableName = "jobs";
    static modelName = "Job";
    static additionalOptions = {};
    static attributes = {
        startAt: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false,
        },
        endAt: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: true
        },
        status: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(SourceInterfaces_1.EJobStatus)),
            allowNull: false,
            defaultValue: SourceInterfaces_1.EJobStatus.Actual
        },
        salary: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
            get() {
                return Number(this.getDataValue("salary"));
            }
        },
        position: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("position", tools_1.default.initialToUpper(value));
            }
        },
        company: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("company", tools_1.default.initialToUpper(value));
            }
        },
        infoId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        clientId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        ...ITenantModel_1.default.commonAttributes,
    };
};
Job = __decorate([
    ITenantModel_1.default.staticImplements()
], Job);
exports.default = Job;
//# sourceMappingURL=Job.js.map