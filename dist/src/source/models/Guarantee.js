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
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
const sequelize_1 = require("sequelize");
const ITenantModel_1 = __importDefault(require("@app/models/ITenantModel"));
const tools_1 = __importDefault(require("@app/utils/tools"));
const FileInterface_1 = require("@app/interfaces/FileInterface");
let Guarantee = class Guarantee extends sequelize_1.Model {
    static tableName = "guarantees";
    static modelName = "Guarantee";
    static additionalOptions = {};
    static attributes = {
        name: {
            type: sequelize_1.DataTypes.STRING(70),
            allowNull: false,
            set(val) {
                this.setDataValue('name', tools_1.default.initialToUpper(val));
            }
        },
        status: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(SourceInterfaces_1.EGuaranteeStatus)),
            allowNull: false,
        },
        value: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        loanId: {
            type: sequelize_1.DataTypes.STRING(70),
            allowNull: false
        },
        clientId: {
            type: sequelize_1.DataTypes.STRING(70),
            allowNull: false
        },
        attributes: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            get() {
                return JSON.parse(this.getDataValue('attributes') || '{}');
            },
            set(val) {
                if (typeof val !== 'object') {
                    throw {
                        code: 422,
                        message: 'El campo attributes debe ser un objeto'
                    };
                }
                this.setDataValue("attributes", JSON.stringify(val));
            }
        },
        ...ITenantModel_1.default.commonAttributes,
    };
    static getSearchables() {
        return ["name", "value", "loanId", "clientId", "attributes"];
    }
    static getRelations() {
        return ["client", "loan", 'images', 'documents'];
    }
    static initRelation(sequelize) {
        sequelize.model("Guarantee")
            .belongsTo(sequelize.model("Client"), {
            foreignKey: "clientId",
            as: "client",
            targetKey: "id",
            onDelete: "CASCADE"
        });
        sequelize.model("Guarantee")
            .belongsTo(sequelize.model("Loan"), {
            foreignKey: "loanId",
            as: "loan",
            targetKey: "id",
            onDelete: "CASCADE"
        });
        sequelize.model("Guarantee")
            .hasMany(sequelize.model("Image"), {
            foreignKey: "imageableId",
            scope: {
                imageableType: FileInterface_1.EImageable.Guarantee,
            },
            as: "images"
        });
        sequelize.model("Guarantee")
            .hasMany(sequelize.model("Document"), {
            foreignKey: "documentableId",
            scope: {
                imageableType: FileInterface_1.EDocumentable.Guarantee,
            },
            as: "documents"
        });
    }
};
Guarantee = __decorate([
    ITenantModel_1.default.staticImplements()
], Guarantee);
exports.default = Guarantee;
//# sourceMappingURL=Guarantee.js.map