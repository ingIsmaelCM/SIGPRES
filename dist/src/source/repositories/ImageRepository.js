"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@app/repositories/BaseRepository");
const Image_1 = __importDefault(require("@source/models/Image"));
class ImageRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Image_1.default);
    }
}
exports.default = ImageRepository;
//# sourceMappingURL=ImageRepository.js.map