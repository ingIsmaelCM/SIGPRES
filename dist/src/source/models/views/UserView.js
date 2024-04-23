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
const ModelPermission_1 = __importDefault(require("@auth/models/ModelPermission"));
const Auth_1 = __importDefault(require("@auth/models/Auth"));
const Role_1 = __importDefault(require("@auth/models/Role"));
let UserView = class UserView extends sequelize_1.Model {
    static tableName = "userview";
    static modelName = "UserView";
    static additionalOptions = {};
    static attributes = {
        address: {
            type: sequelize_1.DataTypes.STRING
        },
        birthdate: {
            type: sequelize_1.DataTypes.DATE
        },
        country: {
            type: sequelize_1.DataTypes.STRING
        },
        dni: {
            type: sequelize_1.DataTypes.STRING
        },
        email: {
            type: sequelize_1.DataTypes.STRING
        },
        gender: {
            type: sequelize_1.DataTypes.STRING
        },
        infoId: {
            type: sequelize_1.DataTypes.STRING
        },
        lastlogin: {
            type: sequelize_1.DataTypes.DATE
        },
        lastname: {
            type: sequelize_1.DataTypes.STRING
        },
        name: {
            type: sequelize_1.DataTypes.STRING
        },
        username: {
            type: sequelize_1.DataTypes.STRING
        },
        phone: {
            type: sequelize_1.DataTypes.STRING
        },
        password: {
            type: sequelize_1.DataTypes.VIRTUAL,
            get() {
                return null;
            }
        },
        sessionId: {
            type: sequelize_1.DataTypes.VIRTUAL,
            get() {
                return null;
            }
        },
        ...ITenantModel_1.default.commonAttributes,
    };
    static getSearchables() {
        return [];
    }
    static getRelations() {
        return ["permissions", "roles.permissions"];
    }
    static initRelation(sequelize) {
        sequelize.model("UserView")
            .belongsToMany(Auth_1.default.sequelize.models.Permission, {
            as: "permissions",
            foreignKey: "modelId",
            through: {
                model: ModelPermission_1.default,
                scope: {
                    modelType: "auth",
                },
            },
            constraints: false,
        });
        sequelize.model("UserView")
            .belongsToMany(Role_1.default, {
            foreignKey: "roleId",
            through: "auth_roles",
            as: "roles",
        });
    }
};
UserView = __decorate([
    ITenantModel_1.default.staticImplements()
], UserView);
exports.default = UserView;
//# sourceMappingURL=UserView.js.map