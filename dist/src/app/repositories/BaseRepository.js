"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const sequelize_1 = require("sequelize");
const scopes_1 = __importDefault(require("../utils/scopes"));
const logger_1 = __importDefault(require("@/logger"));
const SocketService_1 = __importDefault(require("@app/services/SocketService"));
class BaseRepository {
    model;
    socketService;
    primaryKeyName = "id";
    constructor(model) {
        this.model = model;
        this.socketService = new SocketService_1.default();
    }
    async getAll(params) {
        return this.safeRun(() => scopes_1.default.get(this.model, params));
    }
    async find(key, value, withTrashed, params) {
        return this.safeRun(() => scopes_1.default.get(this.model, {
            ...params,
            page: undefined,
            perpage: undefined,
            order: undefined,
            desc: undefined,
            search: undefined,
            scopes: undefined,
            limit: 1,
            filter: [`${key}:${value}`],
            withtrashed: withTrashed,
        }));
    }
    async findById(dataId, params, withTrashed) {
        return this.safeRun(() => this.find("id", dataId, withTrashed, params));
    }
    async first(params, withTrashed) {
        return this.safeRun(() => {
            const parameters = {
                order: this.model.primaryKeyAttribute,
                ...params,
                limit: 1,
                withtrashed: withTrashed,
            };
            return scopes_1.default.get(this.model, parameters);
        });
    }
    async last(params, withTrashed) {
        return this.safeRun(() => {
            const parameters = {
                order: this.model.primaryKeyAttribute,
                desc: true,
                ...params,
                limit: 1,
                withtrashed: withTrashed,
            };
            return scopes_1.default.get(this.model, parameters);
        });
    }
    async create(data, trans) {
        return this.safeRun(() => this.model.create(data, { transaction: trans }));
    }
    async updateOrCreate(data, trans) {
        const newData = await this.safeRun(() => this.model.upsert(data, {
            transaction: trans,
        }));
        return newData[0];
    }
    async bulkCreate(data, trans) {
        return this.safeRun(() => this.model.bulkCreate(data, { transaction: trans }));
    }
    async update(data, primaryKey, trans, key) {
        return this.safeRun(async () => {
            const { updatedAt, createdAt, deletedAt, id, ...newData } = data;
            await this.model.update(newData, {
                where: sequelize_1.Sequelize.where(sequelize_1.Sequelize.col(key || this.primaryKeyName), primaryKey),
                transaction: trans,
            });
            const updated = await this.model.findByPk(primaryKey, { transaction: trans });
            this.socketService.emit(`update${this.model.tableName}`, updated);
            return updated;
        });
    }
    async delete(primaryKey, trans) {
        return this.safeRun(async () => {
            const dataToDelete = await this.find(this.primaryKeyName, primaryKey);
            if (dataToDelete) {
                return dataToDelete.destroy({ transaction: trans });
            }
            return Promise.reject({
                code: 404,
                message: "No se encontró el registro para eliminar"
            });
        });
    }
    async restore(primaryKey, trans) {
        return this.safeRun(async () => {
            const dataToRestore = await this.find(this.primaryKeyName, primaryKey, true);
            return dataToRestore.restore({ transaction: trans });
        });
    }
    async forceDelete(primaryKey, trans) {
        return this.safeRun(async () => {
            const dataToForceDelete = await this.find(this.primaryKeyName, primaryKey, true);
            return dataToForceDelete.destroy({
                force: true,
                transaction: trans,
            });
        });
    }
    async validateBeforeInsertRelation(model, id) {
        return this.safeRun(async () => {
            const exists = await model.findByPk(id);
            if (!exists) {
                return Promise.reject({
                    code: 404,
                    message: "No se encontró el registro relacionado"
                });
            }
            return exists;
        });
    }
    async safeRun(method) {
        try {
            this.primaryKeyName = this.model.primaryKeyAttribute;
            return await method();
        }
        catch (error) {
            logger_1.default.error(JSON.stringify(error));
            throw {
                code: error.code || 500,
                message: error.message
            };
        }
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map