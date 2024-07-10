"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@app/repositories/BaseRepository");
const Document_1 = __importDefault(require("@source/models/Document"));
class DocumentRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Document_1.default);
    }
}
exports.default = DocumentRepository;
//# sourceMappingURL=DocumentRepository.js.map