"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@/app/repositories/BaseRepository");
const models_1 = require("@source/models");
class JobViewRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(models_1.JobView);
    }
    async create(data, trans) {
        return Promise.reject({
            code: 500,
            message: "No puede guardar datos en una vista"
        });
    }
}
exports.default = JobViewRepository;
//# sourceMappingURL=JobViewRepository.js.map