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
var ContactView_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ITenantModel_1 = __importDefault(require("@app/models/ITenantModel"));
const models_1 = require("@source/models");
const Image_1 = __importDefault(require("../Image"));
const FileInterface_1 = require("@app/interfaces/FileInterface");
let ContactView = class ContactView extends sequelize_1.Model {
    static { ContactView_1 = this; }
    static tableName = "contactView";
    static modelName = "ContactView";
    static additionalOptions = {};
    static attributes = {
        ...models_1.Contact.attributes,
        ...models_1.Info.attributes
    };
    getSearchables() {
        return ["name", "lastname", "email", "dni", "gender", "country", "infoId", "birthdate"];
    }
    getRelations() {
        return ["clients", "profile"];
    }
    static initRelation() {
        ContactView_1.belongsToMany(models_1.ClientView, {
            through: models_1.ClientContact,
            as: "clients",
            foreignKey: "contactId",
            otherKey: "clientId",
            targetKey: "id"
        });
        ContactView_1.hasOne(Image_1.default, {
            foreignKey: "imageableId",
            scope: {
                imageableType: FileInterface_1.EImageable.Contact,
                caption: "Perfil Contacto"
            },
            as: "profile"
        });
    }
};
ContactView = ContactView_1 = __decorate([
    ITenantModel_1.default.staticImplements()
], ContactView);
exports.default = ContactView;
//# sourceMappingURL=ContactView.js.map