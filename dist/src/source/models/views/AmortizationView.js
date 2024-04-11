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
var AmortizationView_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ITenantModel_1 = __importDefault(require("@app/models/ITenantModel"));
const models_1 = require("@source/models");
const moment_1 = __importDefault(require("moment"));
const amortization_1 = __importDefault(require("@app/utils/amortization"));
let AmortizationView = class AmortizationView extends sequelize_1.Model {
    static { AmortizationView_1 = this; }
    static tableName = "amortizationView";
    static modelName = "AmortizationView";
    static additionalOptions = {};
    static attributes = {
        ...models_1.Amortization.attributes,
        ...models_1.Condition.attributes,
        expiresAt: {
            type: sequelize_1.DataTypes.DATE
        },
        cuota: {
            type: sequelize_1.DataTypes.DECIMAL,
            get() {
                const cuota = Number(this.getDataValue("cuota")) + Number(this.mora);
                return Number(cuota.toFixed(2));
            }
        },
        mora: {
            type: sequelize_1.DataTypes.VIRTUAL,
            get() {
                const { mora } = this.getDataValue("mora") || amortization_1.default.getMora(this);
                return mora;
            }
        },
        initMora: {
            type: sequelize_1.DataTypes.VIRTUAL,
            get() {
                const { initMora } = amortization_1.default.getMora(this);
                return initMora;
            }
        },
        finalMora: {
            type: sequelize_1.DataTypes.VIRTUAL,
            get() {
                const { finalMora } = amortization_1.default.getMora(this);
                return finalMora;
            }
        },
        isExpired: {
            type: sequelize_1.DataTypes.VIRTUAL,
            get() {
                return (0, moment_1.default)().subtract(25, 'hours').isAfter((0, moment_1.default)(this.getDataValue("expiresAt")));
            }
        }
    };
    getSearchables() {
        return [
            ...new models_1.Amortization().getSearchables(),
            "expiresAt",
            'date'
        ];
    }
    getRelations() {
        return new models_1.Amortization().getRelations();
    }
    static initRelation() {
        AmortizationView_1.belongsTo(models_1.Loan, {
            foreignKey: "loanId",
            as: "loan"
        });
        AmortizationView_1.belongsTo(models_1.ClientView, {
            foreignKey: "clientId",
            as: "client"
        });
    }
};
AmortizationView = AmortizationView_1 = __decorate([
    ITenantModel_1.default.staticImplements()
], AmortizationView);
exports.default = AmortizationView;
//# sourceMappingURL=AmortizationView.js.map