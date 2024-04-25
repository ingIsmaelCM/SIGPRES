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
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
const ITenantModel_1 = __importDefault(require("@app/models/ITenantModel"));
let GuaranteeAttribute = class GuaranteeAttribute extends sequelize_1.Model {
    static tableName = "guarantee_attributes";
    static modelName = "GuaranteeAttribute";
    static additionalOptions = {};
    static attributes = {
        name: {
            type: sequelize_1.DataTypes.STRING(70),
            allowNull: false
        },
        type: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(SourceInterfaces_1.EGuaranteeAttributeType)),
            allowNull: false
        },
        options: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            get() {
                return this.getDataValue("options")?.split(',');
            }
        },
        ...ITenantModel_1.default.commonAttributes
    };
    static getSearchables() {
        return ["name", "type", "options"];
    }
    static getRelations() {
        return [];
    }
};
GuaranteeAttribute = __decorate([
    ITenantModel_1.default.staticImplements()
], GuaranteeAttribute);
exports.default = GuaranteeAttribute;
//# sourceMappingURL=GuaranteeAttribute.js.map