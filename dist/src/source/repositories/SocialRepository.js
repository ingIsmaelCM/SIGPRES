"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@app/repositories/BaseRepository");
const Social_1 = __importDefault(require("@source/models/Social"));
class SocialRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Social_1.default);
    }
}
exports.default = SocialRepository;
//# sourceMappingURL=SocialRepository.js.map