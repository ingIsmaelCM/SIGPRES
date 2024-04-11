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
var ClientView_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ITenantModel_1 = __importDefault(require("@app/models/ITenantModel"));
const models_1 = require("@source/models");
const Image_1 = __importDefault(require("../Image"));
const FileInterface_1 = require("@app/interfaces/FileInterface");
let ClientView = class ClientView extends sequelize_1.Model {
    static { ClientView_1 = this; }
    static tableName = "clientView";
    static modelName = "ClientView";
    static additionalOptions = {};
    static attributes = {
        ...models_1.Client.attributes,
        ...models_1.Info.attributes
    };
    getSearchables() {
        return ["name", "lastname", "email", "dni", "gender", "country", "code",
            "clienttype", "birthdate", "infoId", "address"];
    }
    getRelations() {
        return ["contacts", "profile", "images", "loans", "payments", "documents",
            "jobs", "moras", "social"];
    }
    static initRelation() {
        ClientView_1.belongsToMany(models_1.ContactView, {
            through: models_1.ClientContact,
            as: "contacts",
            foreignKey: "clientId",
            otherKey: "contactId",
            targetKey: "id"
        });
        ClientView_1.hasOne(Image_1.default, {
            foreignKey: "imageableId",
            scope: {
                imageableType: FileInterface_1.EImageable.Client,
                caption: "Perfil Cliente"
            },
            as: "profile"
        });
        ClientView_1.hasMany(Image_1.default, {
            foreignKey: "imageableId",
            scope: {
                imageableType: FileInterface_1.EImageable.Client,
            },
            as: "images"
        });
        ClientView_1.hasMany(models_1.Document, {
            foreignKey: "documentableId",
            scope: {
                imageableType: FileInterface_1.EDocumentable.Client,
            },
            as: "documents"
        });
        ClientView_1.hasMany(models_1.Loan, {
            foreignKey: "clientId",
            as: "loans"
        });
        ClientView_1.hasMany(models_1.Payment, {
            foreignKey: "clientId",
            as: "payments"
        });
        ClientView_1.hasMany(models_1.Mora, {
            foreignKey: "clientId",
            as: "moras"
        });
        ClientView_1.hasMany(models_1.Job, {
            foreignKey: "clientId",
            as: "jobs"
        });
        ClientView_1.hasOne(models_1.Social, {
            foreignKey: "clientId",
            as: "social"
        });
    }
};
ClientView = ClientView_1 = __decorate([
    ITenantModel_1.default.staticImplements()
], ClientView);
exports.default = ClientView;
//# sourceMappingURL=ClientView.js.map