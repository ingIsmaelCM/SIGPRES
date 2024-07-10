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
const ITenantModel_1 = __importDefault(require("@/app/models/ITenantModel"));
const sequelize_1 = require("sequelize");
const tools_1 = __importDefault(require("@app/utils/tools"));
let Contact = class Contact extends sequelize_1.Model {
    static getSearchables() {
        return ["name", "lastname", "infoId"];
    }
    static getRelations() {
        return ["clients", "info",];
    }
    static tableName = "contacts";
    static modelName = "Contact";
    static additionalOptions = {};
    static attributes = {
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("name", tools_1.default.initialToUpper(value));
            }
        },
        lastname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("lastname", tools_1.default.initialToUpper(value));
            }
        },
        infoId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        fullname: {
            type: sequelize_1.DataTypes.VIRTUAL,
            get() {
                return `${this.name} ${this.lastname}`;
            },
        },
        ...ITenantModel_1.default.commonAttributes,
    };
};
Contact = __decorate([
    ITenantModel_1.default.staticImplements()
], Contact);
exports.default = Contact;
//# sourceMappingURL=Contact.js.map