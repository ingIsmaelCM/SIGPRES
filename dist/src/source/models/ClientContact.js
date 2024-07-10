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
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
let ClientContact = class ClientContact extends sequelize_1.Model {
    static tableName = "client_contacts";
    static modelName = "ClientContact";
    static attributes = {
        clientId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        contactId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        relationship: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(SourceInterfaces_1.EClientContactRelationship)),
            allowNull: false,
            defaultValue: SourceInterfaces_1.EClientContactRelationship.Otro
        },
        isGarante: {
            type: sequelize_1.DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        ...ITenantModel_1.default.commonAttributes
    };
    static additionalOptions = {};
    static getSearchables() {
        return ["clientId", "contactId", "isGarante", "relationship"];
    }
    static getRelations() {
        return ["client", "contact"];
    }
    static initRelation(sequelize) {
        sequelize.model("ClientContact")
            .belongsTo(sequelize.model("ClientView"), {
            foreignKey: "clientId",
            as: "client",
        });
        sequelize.model("ClientContact")
            .belongsTo(sequelize.model("ContactView"), {
            foreignKey: "contactId",
            as: "contact",
        });
    }
};
ClientContact = __decorate([
    ITenantModel_1.default.staticImplements()
], ClientContact);
exports.default = ClientContact;
//# sourceMappingURL=ClientContact.js.map