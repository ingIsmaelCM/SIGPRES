"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@/app/repositories/BaseRepository");
const models_1 = require("../models");
class InfoRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(models_1.Info);
    }
    async create(data, trans) {
        return await super.create(data, trans);
    }
}
exports.default = InfoRepository;
//# sourceMappingURL=InfoRepository.js.map