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
const models_1 = require("@source/models");
const FileInterface_1 = require("@app/interfaces/FileInterface");
let ContactView = class ContactView extends sequelize_1.Model {
    static tableName = "contactView";
    static modelName = "ContactView";
    static additionalOptions = {};
    static attributes = {
        ...models_1.Contact.attributes,
        ...models_1.Info.attributes
    };
    static getSearchables() {
        return ["name", "lastname", "email", "dni", "gender", "country", "infoId", "birthdate"];
    }
    static getRelations() {
        return ["clients", "profile"];
    }
    static initRelation(sequelize) {
        sequelize.model("ContactView")
            .belongsToMany(sequelize.model("ClientView"), {
            through: sequelize.model("ClientContact"),
            as: "clients",
            foreignKey: "contactId",
            otherKey: "clientId",
            targetKey: "id"
        });
        sequelize.model("ContactView")
            .hasOne(sequelize.model("Image"), {
            foreignKey: "imageableId",
            scope: {
                imageableType: FileInterface_1.EImageable.Contact,
                caption: "Perfil Contacto"
            },
            as: "profile"
        });
    }
};
ContactView = __decorate([
    ITenantModel_1.default.staticImplements()
], ContactView);
exports.default = ContactView;
//# sourceMappingURL=ContactView.js.map