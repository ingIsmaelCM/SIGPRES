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
var ClientContactView_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ITenantModel_1 = __importDefault(require("@app/models/ITenantModel"));
const models_1 = require("@source/models");
const Image_1 = __importDefault(require("../Image"));
const FileInterface_1 = require("@app/interfaces/FileInterface");
let ClientContactView = class ClientContactView extends sequelize_1.Model {
    static { ClientContactView_1 = this; }
    static tableName = "clientContactView";
    static modelName = "ClientContactView";
    static attributes = {
        ...models_1.ClientContact.attributes,
        ...models_1.ContactView.attributes,
        relationId: {
            type: sequelize_1.DataTypes.INTEGER
        }
    };
    static additionalOptions = {};
    getSearchables() {
        return ["contactId", "clientId", "relationship", "lastname", "name", "address", "email", "phone", "isGarante"];
    }
    getRelations() {
        return ["clients", "profile"];
    }
    static initRelation() {
        ClientContactView_1.hasOne(Image_1.default, {
            foreignKey: "imageableId",
            sourceKey: "contactId",
            scope: {
                imageableType: FileInterface_1.EImageable.Contact,
                caption: "Perfil Contacto"
            },
            as: "profile"
        });
    }
};
ClientContactView = ClientContactView_1 = __decorate([
    ITenantModel_1.default.staticImplements()
], ClientContactView);
exports.default = ClientContactView;
//# sourceMappingURL=ClientContactView.js.map