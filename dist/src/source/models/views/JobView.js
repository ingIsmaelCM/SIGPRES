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
let JobView = class JobView extends sequelize_1.Model {
    static tableName = "jobView";
    static modelName = "JobView";
    static additionalOptions = {};
    static attributes = {
        ...models_1.Job.attributes,
        ...models_1.Info.attributes,
    };
    getSearchables() {
        return ["status", "clientId", "position", "company", "endAt", "startAt",
            "email", "dni", "gender", "country", "infoId", "birthdate"];
    }
    getRelations() {
        return ["client", "image", "document"];
    }
};
JobView = __decorate([
    ITenantModel_1.default.staticImplements()
], JobView);
exports.default = JobView;
//# sourceMappingURL=JobView.js.map