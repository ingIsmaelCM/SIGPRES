"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@/app/repositories/BaseRepository");
const models_1 = require("@source/models");
class AttributeRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(models_1.Attribute);
    }
}
exports.default = AttributeRepository;
//# sourceMappingURL=AttributeRepository.js.map