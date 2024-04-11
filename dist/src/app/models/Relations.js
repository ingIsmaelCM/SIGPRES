"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthRelations_1 = __importDefault(require("@/auth/models/AuthRelations"));
const FIleRelations_1 = __importDefault(require("@source/models/FIleRelations"));
class Relation {
    static initRelations() {
        AuthRelations_1.default.initRelations();
        FIleRelations_1.default.InitRelation();
    }
}
exports.default = Relation;
//# sourceMappingURL=Relations.js.map