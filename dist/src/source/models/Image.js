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
let Image = class Image extends sequelize_1.Model {
    getSearchables() {
        return ["caption", "path", "imageableType", "imageableId"];
    }
    getRelations() {
        return [];
    }
    static additionalOptions = {};
    static attributes = {
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.UUIDV4
        },
        path: {
            type: sequelize_1.DataTypes.STRING,
        },
        caption: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: new Date().getTime().toString(),
        },
        publicId: {
            type: sequelize_1.DataTypes.STRING,
        },
        size: {
            type: sequelize_1.DataTypes.DECIMAL,
        },
        imageableType: {
            type: sequelize_1.DataTypes.STRING,
        },
        imageableId: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATEONLY,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATEONLY,
        },
        deletedAt: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: true,
        },
    };
    static modelName = "Image";
    static tableName = "images";
};
Image = __decorate([
    ITenantModel_1.default.staticImplements()
], Image);
exports.default = Image;
//# sourceMappingURL=Image.js.map