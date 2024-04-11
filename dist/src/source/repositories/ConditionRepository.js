"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@/app/repositories/BaseRepository");
const Condition_1 = __importDefault(require("@source/models/Condition"));
class ConditionRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Condition_1.default);
    }
}
exports.default = ConditionRepository;
//# sourceMappingURL=ConditionRepository.js.map