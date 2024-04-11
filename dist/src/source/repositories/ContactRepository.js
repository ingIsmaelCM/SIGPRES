"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@/app/repositories/BaseRepository");
const Contact_1 = __importDefault(require("@source/models/Contact"));
class ContactRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Contact_1.default);
    }
}
exports.default = ContactRepository;
//# sourceMappingURL=ContactRepository.js.map