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
const tools_1 = __importDefault(require("@app/utils/tools"));
let Attribute = class Attribute extends sequelize_1.Model {
    static tableName = "attributes";
    static modelName = "Attribute";
    static additionalOptions = {};
    static attributes = {
        name: {
            type: sequelize_1.DataTypes.STRING(70),
            allowNull: false,
            unique: true,
            set(val) {
                this.setDataValue("name", tools_1.default.initialToUpper(val));
            }
        },
        type: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(SourceInterfaces_1.EAttributeType)),
            allowNull: false
        },
        options: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            set(val) {
                this.setDataValue("options", tools_1.default.initialToUpper(val.join(', ')));
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
Attribute = __decorate([
    ITenantModel_1.default.staticImplements()
], Attribute);
exports.default = Attribute;
//# sourceMappingURL=Attribute.js.map