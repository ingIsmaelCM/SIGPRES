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
let ClientView = class ClientView extends sequelize_1.Model {
    static tableName = "clientview";
    static modelName = "ClientView";
    static additionalOptions = {};
    static attributes = {
        ...models_1.Client.attributes,
        ...models_1.Info.attributes
    };
    static getSearchables() {
        return ["name", "lastname", "email", "dni", "gender", "country", "code",
            "clienttype", "birthdate", "infoId", "address"];
    }
    static getRelations() {
        return ["contacts", "profile", "images", "loans", "payments", "documents",
            "jobs", "moras", "social"];
    }
    static initRelation(sequelize) {
        sequelize.model("ClientView")
            .belongsToMany(sequelize.model("ContactView"), {
            through: sequelize.model("ClientContact"),
            as: "contacts",
            foreignKey: "clientId",
            otherKey: "contactId",
            targetKey: "id"
        });
        sequelize.model("ClientView")
            .hasOne(sequelize.model("Image"), {
            foreignKey: "imageableId",
            scope: {
                imageableType: FileInterface_1.EImageable.Client,
                caption: "Perfil Cliente"
            },
            as: "profile"
        });
        sequelize.model("ClientView")
            .hasMany(sequelize.model("Image"), {
            foreignKey: "imageableId",
            scope: {
                imageableType: FileInterface_1.EImageable.Client,
            },
            as: "images"
        });
        sequelize.model("ClientView")
            .hasMany(sequelize.model("Document"), {
            foreignKey: "documentableId",
            scope: {
                imageableType: FileInterface_1.EDocumentable.Client,
            },
            as: "documents"
        });
        sequelize.model("ClientView")
            .hasMany(sequelize.model("Loan"), {
            foreignKey: "clientId",
            as: "loans"
        });
        sequelize.model("ClientView")
            .hasMany(sequelize.model("Payment"), {
            foreignKey: "clientId",
            as: "payments"
        });
        sequelize.model("ClientView")
            .hasMany(sequelize.model("Mora"), {
            foreignKey: "clientId",
            as: "moras"
        });
        sequelize.model("ClientView")
            .hasMany(sequelize.model("Job"), {
            foreignKey: "clientId",
            as: "jobs"
        });
        sequelize.model("ClientView")
            .hasOne(sequelize.model("Social"), {
            foreignKey: "clientId",
            as: "social"
        });
    }
};
ClientView = __decorate([
    ITenantModel_1.default.staticImplements()
], ClientView);
exports.default = ClientView;
//# sourceMappingURL=ClientView.js.map