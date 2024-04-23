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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tools_1 = __importDefault(require("@app/utils/tools"));
let Card = class Card extends sequelize_1.Model {
    static tableName = "cards";
    static modelName = "Card";
    static additionalOptions = {};
    static attributes = {
        value: {
            type: sequelize_1.DataTypes.TEXT("long"),
            allowNull: false,
            get() {
                const tenant = this.sequelize?.getDatabaseName();
                return jsonwebtoken_1.default.verify(this.getDataValue('value'), tenant);
            }
        },
        ending: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        brand: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            set(val) {
                this.setDataValue("brand", tools_1.default.initialToUpper(val));
            }
        },
        holdname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            set(val) {
                this.setDataValue("holdname", tools_1.default.initialToUpper(val));
            }
        },
        clientId: {
            type: sequelize_1.DataTypes.STRING(70),
            allowNull: false,
        },
        ...ITenantModel_1.default.commonAttributes,
    };
    static getSearchables() {
        return [
            'value', "clientId", "ending", "brand"
        ];
    }
    static getRelations() {
        return ["client"];
    }
    static initRelation(sequelize) {
        sequelize.model("Card")
            .belongsTo(sequelize.model("Client"), {
            as: "client",
            foreignKey: "clientId",
            targetKey: "id",
            onDelete: 'Cascade'
        });
    }
};
Card = __decorate([
    ITenantModel_1.default.staticImplements()
], Card);
exports.default = Card;
//# sourceMappingURL=Card.js.map