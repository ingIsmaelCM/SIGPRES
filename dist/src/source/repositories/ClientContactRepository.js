"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@/app/repositories/BaseRepository");
const models_1 = require("@source/models");
class ClientContactRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(models_1.ClientContact);
    }
}
exports.default = ClientContactRepository;
//# sourceMappingURL=ClientContactRepository.js.map