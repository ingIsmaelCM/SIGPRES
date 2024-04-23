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
let Document = class Document extends sequelize_1.Model {
    static additionalOptions = {};
    static tableName = "documents";
    static modelName = "Document";
    static attributes = {
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.UUIDV4
        },
        path: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        publicId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        size: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false
        },
        documentableType: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        documentableId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
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
    static getSearchables() {
        return ["path", "title", "size", "documentableType", "documentableId"];
    }
    static getRelations() {
        return [];
    }
};
Document = __decorate([
    ITenantModel_1.default.staticImplements()
], Document);
exports.default = Document;
//# sourceMappingURL=Document.js.map