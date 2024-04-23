"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@app/repositories/BaseRepository");
const models_1 = require("@source/models");
class CardRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(models_1.Card);
    }
}
exports.default = CardRepository;
//# sourceMappingURL=CardRepository.js.map