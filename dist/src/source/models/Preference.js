"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ITenantModel_1 = require("@app/models/ITenantModel");
let Preference = class Preference extends sequelize_1.Model {
    static getSearchables() {
        return ["key", "value", "label"];
    }
    static getRelations() {
        return [];
    }
    static modelName = "Preference";
    static tableName = "preferences";
    static additionalOptions = {};
    static attributes = {
        key: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        value: {
            type: sequelize_1.DataTypes.TEXT("long"),
        },
        label: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        type: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        ...ITenantModel_1.commonAttributes,
    };
};
Preference = __decorate([
    (0, ITenantModel_1.staticImplements)()
], Preference);
exports.default = Preference;
//# sourceMappingURL=Preference.js.map