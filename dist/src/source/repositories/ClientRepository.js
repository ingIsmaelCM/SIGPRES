"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@/app/repositories/BaseRepository");
const Client_1 = __importDefault(require("@source/models/Client"));
class ClientRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Client_1.default);
    }
}
exports.default = ClientRepository;
//# sourceMappingURL=ClientRepository.js.map