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
let Social = class Social extends sequelize_1.Model {
    static tableName = "socials";
    static modelName = "Social";
    static additionalOptions = {};
    getSearchables() {
        return [
            "facebook", "instagram", "whatsapp"
        ];
    }
    getRelations() {
        return ["client"];
    }
    static attributes = {
        facebook: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        instagram: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        whatsapp: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        clientId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        ...ITenantModel_1.default.commonAttributes
    };
};
Social = __decorate([
    ITenantModel_1.default.staticImplements()
], Social);
exports.default = Social;
//# sourceMappingURL=Social.js.map