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
var ClientContact_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Client_1 = __importDefault(require("@source/models/Client"));
const Contact_1 = __importDefault(require("@source/models/Contact"));
const ITenantModel_1 = __importDefault(require("@app/models/ITenantModel"));
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
const index_1 = require("@source/models/index");
let ClientContact = class ClientContact extends sequelize_1.Model {
    static { ClientContact_1 = this; }
    static tableName = "client_contacts";
    static modelName = "ClientContact";
    static attributes = {
        clientId: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: Client_1.default,
                key: "id"
            }
        },
        contactId: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: Contact_1.default,
                key: "id"
            }
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
    getSearchables() {
        return ["clientId", "contactId", "isGarante", "relationship"];
    }
    getRelations() {
        return ["client", "contact"];
    }
    static initRelation() {
        ClientContact_1.belongsTo(index_1.ClientView, {
            foreignKey: "clientId",
            as: "client",
        });
        ClientContact_1.belongsTo(index_1.ContactView, {
            foreignKey: "contactId",
            as: "contact",
        });
    }
};
ClientContact = ClientContact_1 = __decorate([
    ITenantModel_1.default.staticImplements()
], ClientContact);
exports.default = ClientContact;
//# sourceMappingURL=ClientContact.js.map