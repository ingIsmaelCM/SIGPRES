"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@/app/repositories/BaseRepository");
const models_1 = require("@source/models");
class GuaranteeRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(models_1.Guarantee);
    }
}
exports.default = GuaranteeRepository;
//# sourceMappingURL=GuaranteeRepository.js.map